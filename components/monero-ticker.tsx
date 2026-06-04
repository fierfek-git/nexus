"use client"

import { useEffect, useRef, useState } from "react"

type MoneroPrices = {
  usd: number
  eur: number
  rub: number
}

type Trend = "up" | "down" | "flat"

export function MoneroTicker() {
  const [prices, setPrices] = useState<MoneroPrices | null>(null)
  const [error, setError] = useState(false)
  const [trend, setTrend] = useState<Trend>("flat")
  const [utcTime, setUtcTime] = useState("--:--:-- UTC")

  const previousUsdPrice = useRef<number | null>(null)

  async function fetchPrices() {
    try {
      const response = await fetch("/api/monero-price", {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch XMR prices")
      }

      const data = await response.json()

      const newPrices: MoneroPrices = {
        usd: data.usd,
        eur: data.eur,
        rub: data.rub,
      }

      if (previousUsdPrice.current !== null) {
        if (newPrices.usd > previousUsdPrice.current) {
          setTrend("up")
        } else if (newPrices.usd < previousUsdPrice.current) {
          setTrend("down")
        } else {
          setTrend("flat")
        }
      }

      previousUsdPrice.current = newPrices.usd
      setPrices(newPrices)
      setError(false)
    } catch {
      setError(true)
    }
  }

  useEffect(() => {
    fetchPrices()

    const priceInterval = setInterval(() => {
      fetchPrices()
    }, 30000)

    return () => clearInterval(priceInterval)
  }, [])

  useEffect(() => {
    function updateUtcTime() {
      const now = new Date()

      const formattedTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now)

      setUtcTime(`${formattedTime} UTC`)
    }

    updateUtcTime()

    const clockInterval = setInterval(() => {
      updateUtcTime()
    }, 1000)

    return () => clearInterval(clockInterval)
  }, [])

  const formatPrice = (value: number, currency: "USD" | "EUR" | "RUB") => {
    if (currency === "USD") {
      return `$${value.toFixed(2)}`
    }

    if (currency === "EUR") {
      return `€${value.toFixed(2)}`
    }

    if (currency === "RUB") {
      return `₽${Math.round(value).toLocaleString("en-US")}`
    }

    return value.toString()
  }

  const trendSymbol = trend === "up" ? "▲" : trend === "down" ? "▼" : "━"

  const trendClass =
    trend === "up"
      ? "text-[#39FF14]"
      : trend === "down"
        ? "text-[#E63946]"
        : "text-[#A3A3A3]"

  return (
    <div className="hidden xl:flex items-center h-8 px-3 border border-[#8B0F1A]/70 bg-[#0a0a0a]/80 rounded-sm shadow-[0_0_14px_rgba(230,57,70,0.12)] whitespace-nowrap">
      <div className="flex items-center gap-2 pr-3 border-r border-[#8B0F1A]/50">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_8px_#E63946]" />
        <span className="text-[9px] font-mono tracking-[0.18em] text-[#E63946]">
          LIVE
        </span>
      </div>

      <div className="flex items-center gap-2 px-3 border-r border-[#8B0F1A]/50">
        <span className={`text-[10px] font-mono ${trendClass}`}>
          {trendSymbol}
        </span>
        <span className="text-[9px] font-mono tracking-[0.12em] text-[#A3A3A3]">
          {utcTime}
        </span>
      </div>

      {error ? (
        <div className="pl-3 text-[10px] font-mono tracking-[0.12em] text-[#A3A3A3]">
          XMR DATA UNAVAILABLE
        </div>
      ) : (
        <div className="flex items-center gap-3 pl-3">
          <span className="text-[9px] font-mono tracking-[0.14em] text-[#A3A3A3]">
            XMR/USD
          </span>
          <span className="text-[10px] font-mono text-[#F2F2F2]">
            {prices ? formatPrice(prices.usd, "USD") : "..."}
          </span>

          <div className="h-4 w-px bg-[#8B0F1A]/50" />

          <span className="text-[9px] font-mono tracking-[0.14em] text-[#A3A3A3]">
            XMR/EUR
          </span>
          <span className="text-[10px] font-mono text-[#F2F2F2]">
            {prices ? formatPrice(prices.eur, "EUR") : "..."}
          </span>

          <div className="h-4 w-px bg-[#8B0F1A]/50" />

          <span className="text-[9px] font-mono tracking-[0.14em] text-[#A3A3A3]">
            XMR/RUB
          </span>
          <span className="text-[10px] font-mono text-[#F2F2F2]">
            {prices ? formatPrice(prices.rub, "RUB") : "..."}
          </span>
        </div>
      )}
    </div>
  )
}
