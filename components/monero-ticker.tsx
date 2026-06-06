"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"

type MoneroPrices = {
  usd: number
  eur: number
  rub: number
  usd24hChange: number | null
}

type Trend = "up" | "down" | "flat"

const GREEN = "#39FF14"
const RED = "#E63946"
const GRAY = "#A3A3A3"

function getSafeNumber(value: unknown): number | null {
  if (typeof value !== "number") return null
  if (!Number.isFinite(value)) return null
  return value
}

function getUsd24hChange(data: Record<string, unknown>): number | null {
  return (
    getSafeNumber(data.usd24hChange) ??
    getSafeNumber(data.usd_24h_change) ??
    getSafeNumber(data.usd_24h_change_percent) ??
    getSafeNumber(data.change24h) ??
    getSafeNumber(data.change24hPercent) ??
    null
  )
}

function formatPrice(value: number, currency: "USD" | "EUR" | "RUB") {
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

function formatCompactUsd(value: number) {
  return value.toFixed(2)
}

function formatPercent(value: number | null) {
  if (value === null) return "--"

  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toFixed(1)}%`
}

function buildSparklinePath(values: number[], width = 190, height = 46) {
  if (values.length < 2) return ""

  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width
      const y = height - ((value - min) / range) * height

      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")
}

export function MoneroTicker() {
  const [prices, setPrices] = useState<MoneroPrices | null>(null)
  const [error, setError] = useState(false)
  const [trend, setTrend] = useState<Trend>("flat")
  const [utcTime, setUtcTime] = useState("--:--:-- UTC")
  const [open, setOpen] = useState(false)
  const [sparklinePrices, setSparklinePrices] = useState<number[]>([])

  const previousUsdPrice = useRef<number | null>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  async function fetchPrices() {
    try {
      const response = await fetch("/api/monero-price", {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch XMR prices")
      }

      const data = await response.json()

      const usd = getSafeNumber(data.usd)
      const eur = getSafeNumber(data.eur)
      const rub = getSafeNumber(data.rub)

      if (usd === null || eur === null || rub === null) {
        throw new Error("Invalid XMR price payload")
      }

      const newPrices: MoneroPrices = {
        usd,
        eur,
        rub,
        usd24hChange: getUsd24hChange(data),
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

      setSparklinePrices((current) => {
        const next = [...current, newPrices.usd]
        return next.slice(-32)
      })
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

  function openDropdown() {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
    }

    setOpen(true)
  }

  function closeDropdownWithDelay() {
    closeTimeout.current = setTimeout(() => {
      setOpen(false)
    }, 180)
  }

  const trendSymbol = trend === "up" ? "▲" : trend === "down" ? "▼" : "━"

  const trendClass =
    trend === "up"
      ? "text-[#39FF14]"
      : trend === "down"
        ? "text-[#E63946]"
        : "text-[#A3A3A3]"

  const change24h = prices?.usd24hChange ?? null
  const is24hUp = change24h !== null && change24h > 0
  const is24hDown = change24h !== null && change24h < 0
  const marketColor = is24hUp ? GREEN : is24hDown ? RED : GRAY
  const sparklinePath = useMemo(
    () => buildSparklinePath(sparklinePrices),
    [sparklinePrices],
  )

  return (
    <div
      className="relative hidden xl:block"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdownWithDelay}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="group flex h-12 min-w-[560px] items-center rounded-xl border border-[#1f1f1f] bg-[#070707]/95 px-3 shadow-[0_0_20px_rgba(230,57,70,0.08)] transition-colors hover:border-[#8B0F1A]/80"
      >
        <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1f1f1f] bg-[#141414] p-1 shadow-[0_0_18px_rgba(230,57,70,0.18)]">
          <Image
            src="/images/xmr-icon-red.png"
            alt="Monero XMR"
            width={30}
            height={30}
            className="h-7 w-7 object-contain"
            priority
          />
        </div>

        <div className="mr-5 min-w-[145px] text-left">
          <div className="font-mono text-[15px] font-bold leading-none text-[#F2F2F2]">
            Monero
          </div>

          <div className="mt-1 font-mono text-[13px] leading-none text-[#A3A3A3]">
            XMR{" "}
            <span className="text-[#F2F2F2]">
              {prices ? formatCompactUsd(prices.usd) : "..."} $
            </span>
          </div>
        </div>

        <div className="mr-5 flex min-w-[115px] items-end gap-2 font-mono">
          <span
            className="text-[18px] font-bold leading-none"
            style={{
              color: marketColor,
              textShadow:
                change24h === null
                  ? "none"
                  : `0 0 8px ${marketColor}99, 0 0 18px ${marketColor}55`,
            }}
          >
            {formatPercent(change24h)}
          </span>

          <span
            className="text-[18px] font-bold leading-none"
            style={{
              color: marketColor,
              textShadow:
                change24h === null
                  ? "none"
                  : `0 0 8px ${marketColor}99, 0 0 18px ${marketColor}55`,
            }}
          >
            24Hs
          </span>
        </div>

        <div className="h-10 flex-1 overflow-hidden">
          <svg
            viewBox="0 0 190 46"
            className="h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {sparklinePath ? (
              <>
                <path
                  d={`${sparklinePath} L 190 46 L 0 46 Z`}
                  fill={is24hUp ? "rgba(57,255,20,0.10)" : "rgba(230,57,70,0.13)"}
                />
                <path
                  d={sparklinePath}
                  fill="none"
                  stroke={marketColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    filter:
                      change24h === null
                        ? "none"
                        : `drop-shadow(0 0 5px ${marketColor})`,
                  }}
                />
              </>
            ) : (
              <path
                d="M 0 24 L 35 18 L 70 28 L 110 16 L 145 25 L 190 21"
                fill="none"
                stroke={marketColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>
      </button>

      {open && (
        <div
          className="absolute left-0 top-[56px] z-[80] w-full rounded-sm border border-[#8B0F1A]/70 bg-[#0a0a0a]/95 px-3 py-3 shadow-[0_0_30px_rgba(230,57,70,0.18)] backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdownWithDelay}
        >
          <div className="flex items-center h-8 whitespace-nowrap">
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
        </div>
      )}
    </div>
  )
}"use client"

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
