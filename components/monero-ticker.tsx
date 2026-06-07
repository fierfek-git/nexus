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
    const usdPair = kraken.XXMRZUSD ?? kraken.XMRUSD ?? Object.values(kraken)[0]
    const eurPair = kraken.XXMRZEUR ?? kraken.XMREUR ?? Object.values(kraken)[1]

    usd = getSafeNumber((usdPair as any)?.c?.[0]) ?? usd
    eur = getSafeNumber((eurPair as any)?.c?.[0]) ?? eur
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
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const trend = getTrend(prices.usd24hChange)
  const trendColor = getTrendColor(trend)

  const chartStroke = trend === "up" ? GREEN : trend === "down" ? RED : WHITE

  const chartGlow =
    trend === "up"
      ? "drop-shadow(0 0 7px rgba(57,255,20,0.40))"
      : trend === "down"
        ? "drop-shadow(0 0 7px rgba(230,57,70,0.45))"
        : "drop-shadow(0 0 5px rgba(255,255,255,0.22))"

  const chartFill =
    trend === "up"
      ? "rgba(57,255,20,0.10)"
      : trend === "down"
        ? "rgba(230,57,70,0.12)"
        : "rgba(255,255,255,0.06)"

  const sparkline = useMemo(() => {
    if (chart24h.length < 2) {
      return {
        linePath: "",
        fillPath: "",
      }
    }

    const width = 170
    const height = 38
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

  function openDropdown() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }

    setOpen(true)
  }

  function closeDropdown() {
    closeTimerRef.current = setTimeout(() => {
      setOpen(false)
    }, 160)
  }

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
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group flex h-[47px] w-[395px] items-center overflow-hidden rounded-[15px] border border-[#2a2a2a] bg-[#050505]/95 pl-3 pr-2 text-left transition-all duration-300 hover:border-[#404040]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.05) inset, 0 0 0 1px rgba(230,57,70,0.10), 0 0 18px rgba(230,57,70,0.08), 0 10px 26px rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
        }}
        aria-label="Open Monero price details"
      >
        <div
          className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#343434] bg-[#0a0a0a]"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 14px rgba(0,0,0,0.45), 0 0 10px rgba(230,57,70,0.12)",
          }}
        >
          <Image
            src="/images/xmr-icon-red.png"
            alt="Monero"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
        </div>

        <div className="mr-3 min-w-[112px]">
          <div className="font-sans text-[13px] font-semibold leading-none text-[#F2F2F2]">
            Monero
          </div>

          <div className="mt-1 font-mono text-[10px] leading-none text-[#D8D8D8]">
            XMR {formatUsd(prices.usd)} $
          </div>
        </div>

        <div className="mr-2 flex min-w-[58px] flex-col items-start justify-center leading-none">
          <span
            className="font-mono text-[12px] font-bold tracking-[0.06em]"
            style={{
              color: trendColor,
              textShadow:
                trend === "up"
                  ? "0 0 8px rgba(57,255,20,0.25)"
                  : trend === "down"
                    ? "0 0 8px rgba(230,57,70,0.25)"
                    : "none",
            }}
          >
            24Hs
          </span>

          <span
            className="mt-1 font-mono text-[12px] font-bold tracking-[0.06em]"
            style={{
              color: trendColor,
              textShadow:
                trend === "up"
                  ? "0 0 8px rgba(57,255,20,0.25)"
                  : trend === "down"
                    ? "0 0 8px rgba(230,57,70,0.25)"
                    : "none",
            }}
          >
            {formatPercent(prices.usd24hChange)}
          </span>
        </div>

        <div className="relative ml-auto flex h-[38px] w-[170px] items-center overflow-hidden rounded-r-[12px]">
          <div
            className="absolute inset-0"
            style={{
              background:
                trend === "down"
                  ? "linear-gradient(90deg, rgba(88,12,20,0.72) 0%, rgba(70,8,15,0.55) 60%, rgba(50,6,10,0.35) 100%)"
                  : trend === "up"
                    ? "linear-gradient(90deg, rgba(10,55,12,0.55) 0%, rgba(8,42,10,0.40) 60%, rgba(5,30,8,0.25) 100%)"
                    : "linear-gradient(90deg, rgba(28,28,28,0.55) 0%, rgba(18,18,18,0.35) 100%)",
            }}
          />

          <svg
            viewBox="0 0 170 38"
            className="relative z-10 h-[38px] w-[170px]"
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
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: chartGlow }}
              />
            )}
          </svg>
        </div>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-3 min-w-[720px] rounded-md border border-[#E63946]/25 bg-[#090909]/98 px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-300"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.03) inset, 0 16px 40px rgba(0,0,0,0.55), 0 0 18px rgba(230,57,70,0.08)",
            backdropFilter: "blur(12px)",
          }}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.18em] text-[#A3A3A3]">
            <span className="flex items-center gap-2 text-[#F2F2F2]">
              <span className="h-2 w-2 rounded-full bg-[#E63946] shadow-[0_0_8px_#E63946]" />
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
