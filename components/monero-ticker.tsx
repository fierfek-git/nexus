"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"

type MoneroPrices = {
  usd: number | null
  eur: number | null
  rub: number | null
  usd24hChange: number | null
}

type Trend = "up" | "down" | "flat"

const GREEN = "#39FF14"
const RED = "#E63946"
const GRAY = "#A3A3A3"
const WHITE = "#F2F2F2"

function getSafeNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

function formatUsd(value: number | null): string {
  if (value === null) return "--"
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function formatEur(value: number | null): string {
  if (value === null) return "--"
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function formatRub(value: number | null): string {
  if (value === null) return "--"
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })
}

function formatPercent(value: number | null): string {
  if (value === null) return "--"
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
}

function getTrend(change: number | null): Trend {
  if (change === null) return "flat"
  if (change > 0) return "up"
  if (change < 0) return "down"
  return "flat"
}

function getTrendColor(trend: Trend): string {
  if (trend === "up") return GREEN
  if (trend === "down") return RED
  return GRAY
}

async function fetchJsonWithTimeout(url: string, timeout = 8000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}

async function fetchLivePrices(): Promise<MoneroPrices> {
  const [krakenResult, coinGeckoResult] = await Promise.allSettled([
    fetchJsonWithTimeout(
      "https://api.kraken.com/0/public/Ticker?pair=XMRUSD,XMREUR",
    ),
    fetchJsonWithTimeout(
      "https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd,eur,rub&include_24hr_change=true",
    ),
  ])

  let usd: number | null = null
  let eur: number | null = null
  let rub: number | null = null
  let usd24hChange: number | null = null

  if (krakenResult.status === "fulfilled") {
    const kraken = krakenResult.value?.result ?? {}
    const usdPair =
      kraken.XXMRZUSD ??
      kraken.XMRUSD ??
      Object.values(kraken)[0]

    const eurPair =
      kraken.XXMRZEUR ??
      kraken.XMREUR ??
      Object.values(kraken)[1]

    usd = getSafeNumber(usdPair?.c?.[0]) ?? usd
    eur = getSafeNumber(eurPair?.c?.[0]) ?? eur
  }

  if (coinGeckoResult.status === "fulfilled") {
    const monero = coinGeckoResult.value?.monero ?? {}
    usd = usd ?? getSafeNumber(monero.usd)
    eur = eur ?? getSafeNumber(monero.eur)
    rub = getSafeNumber(monero.rub)
    usd24hChange = getSafeNumber(monero.usd_24h_change)
  }

  return { usd, eur, rub, usd24hChange }
}

async function fetch24hChart(): Promise<number[]> {
  const data = await fetchJsonWithTimeout(
    "https://api.coingecko.com/api/v3/coins/monero/market_chart?vs_currency=usd&days=1&interval=hourly",
  )

  const prices = Array.isArray(data?.prices) ? data.prices : []

  return prices
    .map((item: unknown) => {
      if (!Array.isArray(item)) return null
      return getSafeNumber(item[1])
    })
    .filter((value: number | null): value is number => value !== null)
}

export function MoneroTicker() {
  const [prices, setPrices] = useState<MoneroPrices>({
    usd: null,
    eur: null,
    rub: null,
    usd24hChange: null,
  })

  const [chart24h, setChart24h] = useState<number[]>([])
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)
  const [open, setOpen] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const trend = getTrend(prices.usd24hChange)
  const trendColor = getTrendColor(trend)

  const chartStroke = trend === "up" ? GREEN : trend === "down" ? RED : WHITE
  const chartFill =
    trend === "up"
      ? "rgba(57, 255, 20, 0.12)"
      : trend === "down"
        ? "rgba(230, 57, 70, 0.14)"
        : "rgba(255, 255, 255, 0.08)"

  const sparkline = useMemo(() => {
    if (chart24h.length < 2) {
      return {
        linePath: "",
        fillPath: "",
      }
    }

    const width = 190
    const height = 42
    const min = Math.min(...chart24h)
    const max = Math.max(...chart24h)
    const range = max - min || 1

    const points = chart24h.map((value, index) => {
      const x = (index / (chart24h.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return { x, y }
    })

    const linePath = points
      .map((point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
      )
      .join(" ")

    const fillPath = [
      `M ${points[0].x.toFixed(2)} ${height}`,
      ...points.map((point) => `L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`),
      `L ${points[points.length - 1].x.toFixed(2)} ${height}`,
      "Z",
    ].join(" ")

    return { linePath, fillPath }
  }, [chart24h])

  useEffect(() => {
    let mounted = true

    async function loadInitial() {
      try {
        const [live, history] = await Promise.all([
          fetchLivePrices(),
          fetch24hChart(),
        ])

        if (!mounted) return

        setPrices(live)
        setChart24h(history)
        setUpdatedAt(new Date())
      } catch (error) {
        console.error("Failed to load Monero ticker:", error)
      }
    }

    loadInitial()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    let mounted = true

    const interval = setInterval(async () => {
      try {
        const live = await fetchLivePrices()
        if (!mounted) return
        setPrices(live)
        setUpdatedAt(new Date())
      } catch (error) {
        console.error("Failed to refresh live Monero prices:", error)
      }
    }, 30000)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    let mounted = true

    const interval = setInterval(async () => {
      try {
        const history = await fetch24hChart()
        if (!mounted) return
        setChart24h(history)
      } catch (error) {
        console.error("Failed to refresh 24h Monero chart:", error)
      }
    }, 300000)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current) return
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const utcText = updatedAt
    ? updatedAt.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
      })
    : "--:--:--"

  return (
    <div
      ref={wrapperRef}
      className="relative hidden xl:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group flex h-[58px] w-[480px] items-center overflow-hidden rounded-2xl border border-[#262626] bg-[#070707]/95 px-4 text-left transition-all duration-300 hover:border-[#3a3a3a]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(230,57,70,0.08), 0 0 12px rgba(230,57,70,0.06), 0 10px 28px rgba(0,0,0,0.45)",
          backdropFilter: "blur(10px)",
        }}
        aria-label="Open Monero price details"
      >
        <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#2c2c2c] bg-[#0d0d0d] shadow-[0_0_14px_rgba(230,57,70,0.16)]">
          <Image
            src="/images/xmr-icon-red.png"
            alt="Monero"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
        </div>

        <div className="mr-5 min-w-[140px]">
          <div className="font-sans text-[14px] font-semibold leading-none text-[#F2F2F2]">
            Monero
          </div>
          <div className="mt-1 font-mono text-[11px] leading-none text-[#CFCFCF]">
            XMR {formatUsd(prices.usd)} $
          </div>
        </div>

        <div className="mr-6 flex min-w-[120px] items-center gap-3">
          <span
            className="font-mono text-[13px] font-bold tracking-[0.06em]"
            style={{ color: trendColor }}
          >
            24Hs
          </span>

          <span
            className="font-mono text-[13px] font-bold tracking-[0.06em]"
            style={{ color: trendColor }}
          >
            {formatPercent(prices.usd24hChange)}
          </span>
        </div>

        <div className="relative flex-1">
          <div
            className="pointer-events-none absolute inset-0 rounded-md"
            style={{
              background:
                trend === "down"
                  ? "linear-gradient(90deg, rgba(230,57,70,0.10) 0%, rgba(230,57,70,0.02) 100%)"
                  : trend === "up"
                    ? "linear-gradient(90deg, rgba(57,255,20,0.10) 0%, rgba(57,255,20,0.02) 100%)"
                    : "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            }}
          />

          <svg
            viewBox="0 0 190 42"
            className="relative z-10 h-[42px] w-[190px]"
            aria-hidden="true"
          >
            {sparkline.fillPath && (
              <path d={sparkline.fillPath} fill={chartFill} />
            )}
            {sparkline.linePath && (
              <path
                d={sparkline.linePath}
                fill="none"
                stroke={chartStroke}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter:
                    trend === "down"
                      ? "drop-shadow(0 0 6px rgba(230,57,70,0.45))"
                      : trend === "up"
                        ? "drop-shadow(0 0 6px rgba(57,255,20,0.4))"
                        : "drop-shadow(0 0 6px rgba(255,255,255,0.25))",
                }}
              />
            )}
          </svg>
        </div>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-3 min-w-[760px] rounded-md border border-[#E63946]/25 bg-[#090909]/98 px-4 py-3"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.03) inset, 0 16px 40px rgba(0,0,0,0.55), 0 0 18px rgba(230,57,70,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.18em] text-[#A3A3A3]">
            <span className="flex items-center gap-2 text-[#F2F2F2]">
              <span className="h-2 w-2 rounded-full bg-[#E63946]" />
              LIVE
            </span>

            <span className="text-[#2d2d2d]">|</span>

            <span style={{ color: trendColor }}>
              {trend === "up" ? "▲" : trend === "down" ? "▼" : "•"}
            </span>

            <span>{utcText} UTC</span>

            <span className="text-[#2d2d2d]">|</span>

            <span>XMR/USD</span>
            <span className="text-[#F2F2F2]">${formatUsd(prices.usd)}</span>

            <span className="text-[#2d2d2d]">|</span>

            <span>XMR/EUR</span>
            <span className="text-[#F2F2F2]">€{formatEur(prices.eur)}</span>

            <span className="text-[#2d2d2d]">|</span>

            <span>XMR/RUB</span>
            <span className="text-[#F2F2F2]">₽{formatRub(prices.rub)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
