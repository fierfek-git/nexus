import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
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
      return NextResponse.json(
        { error: "Failed to fetch XMR prices" },
        { status: 502 }
      )
    }

    const data = await response.json()

    if (!data?.monero?.usd || !data?.monero?.eur || !data?.monero?.rub) {
      return NextResponse.json(
        { error: "Invalid XMR price data" },
        { status: 502 }
      )
    }

    return NextResponse.json({
      usd: data.monero.usd,
      eur: data.monero.eur,
      rub: data.monero.rub,
      updatedAt: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { error: "XMR price unavailable" },
      { status: 500 }
    )
  }
}
