import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

type SourceName = "coingecko" | "cryptocompare"

type SourcePrice = {
  usd: number
  eur: number
  rub: number
  source: SourceName
}

// Public response shape: only the numbers the client needs. We deliberately
// do NOT expose which provider answered or whether one was down, so an
// attacker can't learn what to target.
type PriceResponse = {
  usd: number
  eur: number
  rub: number
  updatedAt: string
}

// Server-side cache: every visitor reuses the same price for CACHE_TTL_MS,
// so heavy traffic collapses into one upstream call instead of thousands.
const CACHE_TTL_MS = 30_000
// Hard ceiling on each upstream call so a hung provider can't hang the route.
const FETCH_TIMEOUT_MS = 5_000
// If the two providers' USD price disagree by more than this, we don't trust
// a blind average — we anchor to the last known-good price instead.
const MAX_SOURCE_DIVERGENCE = 0.1

let cachedPrice: { payload: PriceResponse; expiresAt: number } | null = null

// A usable price must be a real, positive number — rejects 0, negatives,
// NaN and Infinity that would otherwise poison the average.
function isSanePrice(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
}

async function getPricesFromCoinGecko(): Promise<SourcePrice> {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd,eur,rub",
    {
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    }
  )

  if (!response.ok) {
    throw new Error("CoinGecko failed")
  }

  const data = await response.json()

  if (
    !isSanePrice(data?.monero?.usd) ||
    !isSanePrice(data?.monero?.eur) ||
    !isSanePrice(data?.monero?.rub)
  ) {
    throw new Error("Invalid CoinGecko data")
  }

  return {
    usd: data.monero.usd,
    eur: data.monero.eur,
    rub: data.monero.rub,
    source: "coingecko",
  }
}

async function getPricesFromCryptoCompare(): Promise<SourcePrice> {
  const response = await fetch(
    "https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=USD,EUR,RUB",
    {
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    }
  )

  if (!response.ok) {
    throw new Error("CryptoCompare failed")
  }

  const data = await response.json()

  if (
    !isSanePrice(data?.USD) ||
    !isSanePrice(data?.EUR) ||
    !isSanePrice(data?.RUB)
  ) {
    throw new Error("Invalid CryptoCompare data")
  }

  return {
    usd: data.USD,
    eur: data.EUR,
    rub: data.RUB,
    source: "cryptocompare",
  }
}

function average(values: number[]) {
  const total = values.reduce((sum, value) => sum + value, 0)
  return total / values.length
}

export async function GET() {
  // Serve from cache while it is still fresh: no upstream call at all.
  if (cachedPrice && cachedPrice.expiresAt > Date.now()) {
    return NextResponse.json(cachedPrice.payload)
  }

  const results = await Promise.allSettled([
    getPricesFromCoinGecko(),
    getPricesFromCryptoCompare(),
  ])

  const validPrices = results
    .filter((result): result is PromiseFulfilledResult<SourcePrice> => {
      return result.status === "fulfilled"
    })
    .map((result) => result.value)

  if (validPrices.length === 0) {
    // Upstream all failed: serve the last good price if we still have one,
    // so a transient provider outage doesn't blank the ticker.
    if (cachedPrice) {
      return NextResponse.json(cachedPrice.payload)
    }

    return NextResponse.json(
      { error: "Failed to fetch XMR prices" },
      { status: 502 }
    )
  }

  // When both sources agree we average them. When they diverge too much we
  // can't trust the midpoint, so we keep the one closest to the last good
  // price (or the lower one if we have no reference yet) and drop the outlier.
  let trustedPrices = validPrices

  if (validPrices.length > 1) {
    const [a, b] = validPrices
    const divergence = Math.abs(a.usd - b.usd) / Math.min(a.usd, b.usd)

    if (divergence > MAX_SOURCE_DIVERGENCE) {
      const anchor = cachedPrice?.payload.usd
      const closest =
        anchor !== undefined
          ? Math.abs(a.usd - anchor) <= Math.abs(b.usd - anchor)
            ? a
            : b
          : a.usd <= b.usd
            ? a
            : b

      trustedPrices = [closest]
    }
  }

  const usd = average(trustedPrices.map((price) => price.usd))
  const eur = average(trustedPrices.map((price) => price.eur))
  const rub = average(trustedPrices.map((price) => price.rub))

  const payload: PriceResponse = {
    usd,
    eur,
    rub,
    updatedAt: new Date().toISOString(),
  }

  cachedPrice = { payload, expiresAt: Date.now() + CACHE_TTL_MS }

  return NextResponse.json(payload)
}
