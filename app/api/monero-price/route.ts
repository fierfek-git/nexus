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

async function getPricesFromCoinGecko(): Promise<SourcePrice> {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd,eur,rub",
    {
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("CoinGecko failed")
  }

  const data = await response.json()

  if (
    typeof data?.monero?.usd !== "number" ||
    typeof data?.monero?.eur !== "number" ||
    typeof data?.monero?.rub !== "number"
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
    }
  )

  if (!response.ok) {
    throw new Error("CryptoCompare failed")
  }

  const data = await response.json()

  if (
    typeof data?.USD !== "number" ||
    typeof data?.EUR !== "number" ||
    typeof data?.RUB !== "number"
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
    return NextResponse.json(
      { error: "Failed to fetch XMR prices" },
      { status: 502 }
    )
  }

  const usd = average(validPrices.map((price) => price.usd))
  const eur = average(validPrices.map((price) => price.eur))
  const rub = average(validPrices.map((price) => price.rub))

  return NextResponse.json({
    usd,
    eur,
    rub,
    mode: validPrices.length > 1 ? "average" : "single-source",
    sourcesUsed: validPrices.map((price) => price.source),
    updatedAt: new Date().toISOString(),
  })
}
