import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

type MoneroPrices = {
  usd: number
  eur: number
  rub: number
  source: "coingecko" | "cryptocompare"
}

async function getPricesFromCoinGecko(): Promise<MoneroPrices> {
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

async function getPricesFromCryptoCompare(): Promise<MoneroPrices> {
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

export async function GET() {
  try {
    let prices: MoneroPrices

    try {
      prices = await getPricesFromCoinGecko()
    } catch {
      prices = await getPricesFromCryptoCompare()
    }

    return NextResponse.json({
      usd: prices.usd,
      eur: prices.eur,
      rub: prices.rub,
      source: prices.source,
      updatedAt: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch XMR prices" },
      { status: 502 }
    )
  }
}
