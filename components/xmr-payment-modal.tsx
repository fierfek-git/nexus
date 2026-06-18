"use client"

import Image from "next/image"
import { X, Copy, AlertTriangle, RefreshCw } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { useEffect, useMemo, useState } from "react"

const XMR_ADDRESS =
  "88wdLwfpxT3GRUzGZsmms4dYMPJ437EyYKFKfEkSuXArVXyrJfmDs3cXeYCHiw8P3jAa5Efv4kgAdV76HJDEvvoP1vUvSaB"

function shortenAddress(address: string) {
  return `${address.slice(0, 15)}...${address.slice(-15)}`
}

function cleanNumber(value: string) {
  return value.replace(",", ".").replace(/[^\d.]/g, "")
}

function formatUsd(value: number) {
  if (!Number.isFinite(value)) return "0.00"
  return value.toFixed(2)
}

function formatXmr(value: number) {
  if (!Number.isFinite(value)) return "0.000000"
  return value.toFixed(6)
}

type XmrPaymentModalProps = {
  open: boolean
  onClose: () => void
}

export function XmrPaymentModal({ open, onClose }: XmrPaymentModalProps) {
  const [usdAmount, setUsdAmount] = useState("100")
  const [xmrAmount, setXmrAmount] = useState("0.000000")
  const [xmrUsdPrice, setXmrUsdPrice] = useState<number | null>(null)
  const [priceError, setPriceError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lastEdited, setLastEdited] = useState<"usd" | "xmr">("usd")

  async function fetchPrice() {
    try {
      const response = await fetch("/api/monero-price", {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch XMR price")
      }

      const data = await response.json()

      if (!data.usd || typeof data.usd !== "number") {
        throw new Error("Invalid XMR price")
      }

      setXmrUsdPrice(data.usd)
      setPriceError(false)
    } catch {
      setPriceError(true)
    }
  }

  useEffect(() => {
    if (!open) return

    fetchPrice()

    const interval = setInterval(() => {
      fetchPrice()
    }, 30000)

    return () => clearInterval(interval)
  }, [open])

  useEffect(() => {
    if (!xmrUsdPrice) return

    if (lastEdited === "usd") {
      const usd = Number(usdAmount)

      if (!usd || usd <= 0) {
        setXmrAmount("0.000000")
        return
      }

      setXmrAmount(formatXmr(usd / xmrUsdPrice))
      return
    }

    const xmr = Number(xmrAmount)

    if (!xmr || xmr <= 0) {
      setUsdAmount("0.00")
      return
    }

    setUsdAmount(formatUsd(xmr * xmrUsdPrice))
  }, [xmrUsdPrice])

  function handleUsdChange(value: string) {
    const cleanValue = cleanNumber(value)
    setUsdAmount(cleanValue)
    setLastEdited("usd")

    if (!xmrUsdPrice) return

    const usd = Number(cleanValue)

    if (!usd || usd <= 0) {
      setXmrAmount("0.000000")
      return
    }

    setXmrAmount(formatXmr(usd / xmrUsdPrice))
  }

  function handleXmrChange(value: string) {
    const cleanValue = cleanNumber(value)
    setXmrAmount(cleanValue)
    setLastEdited("xmr")

    if (!xmrUsdPrice) return

    const xmr = Number(cleanValue)

    if (!xmr || xmr <= 0) {
      setUsdAmount("0.00")
      return
    }

    setUsdAmount(formatUsd(xmr * xmrUsdPrice))
  }

  const paymentUri = useMemo(() => {
    const amount = Number(xmrAmount)
    const params = new URLSearchParams()

    if (amount && amount > 0) {
      params.set("tx_amount", formatXmr(amount))
    }

    params.set("recipient_name", "fierfek.nexus")
    params.set("tx_description", "Fierfek XMR payment")

    return `monero:${XMR_ADDRESS}?${params.toString()}`
  }, [xmrAmount])

  async function copyAddress() {
    await navigator.clipboard.writeText(XMR_ADDRESS)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1800)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 px-2 py-3 backdrop-blur-sm sm:px-4 sm:py-6 md:pt-12 animate-in fade-in duration-500">
      <div className="relative w-full max-w-5xl overflow-hidden border border-[#8B0F1A] bg-[#0a0a0a] shadow-[0_0_60px_rgba(230,57,70,0.12)] animate-in slide-in-from-top-8 fade-in duration-700">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1a1a1a] px-4 py-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-[#8B0F1A] bg-[#141414] p-1">
              <Image
                src="/images/xmr-icon-red.png"
                alt="Monero XMR"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </div>

            <h2 className="truncate font-mono text-xs tracking-[0.2em] text-[#E63946] sm:text-sm">
              PAY WITH XMR
            </h2>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 text-[#E63946] transition-colors hover:text-[#F2F2F2]"
            aria-label="Close XMR payment modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Status line */}
        <div className="flex flex-col gap-2 border-b border-[#1a1a1a] px-4 py-3 font-mono text-[10px] text-[#A3A3A3] sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:text-[11px]">
          <span>Secure. Private. Untraceable.</span>
          <span className="text-[#E63946]">MONERO ONLY</span>
        </div>

        {/* Content */}
        <div className="grid gap-6 p-4 md:grid-cols-2 md:p-5">
          {/* Left side */}
          <div className="min-w-0 border-[#1a1a1a] md:border-r md:pr-6">
            <h3 className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[#E63946]">
              SCAN TO PAY
            </h3>

            <div className="flex justify-center">
              <div className="rounded-sm bg-white p-2 shadow-[0_0_25px_rgba(230,57,70,0.25)] sm:p-3">
                <QRCodeSVG
                  value={paymentUri}
                  size={260}
                  marginSize={1}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#000000"
                  className="h-[220px] w-[220px] sm:h-[260px] sm:w-[260px]"
                />
              </div>
            </div>

            <div className="mt-6 min-w-0">
              <h4 className="mb-2 font-mono text-[10px] tracking-[0.15em] text-[#E63946] sm:text-[11px]">
                RECEIVE ADDRESS (SUBADDRESS)
              </h4>

              <div className="flex min-w-0 items-center justify-between border border-[#1a1a1a] bg-[#141414]/60">
                <div className="min-w-0 flex-1 truncate px-3 py-3 font-mono text-sm text-[#F2F2F2] sm:px-4 sm:text-lg">
                  {shortenAddress(XMR_ADDRESS)}
                </div>

                <button
                  onClick={copyAddress}
                  className="shrink-0 border-l border-[#8B0F1A] px-4 py-3 text-[#F2F2F2] transition-colors hover:bg-[#E63946]/10 hover:text-[#E63946]"
                  aria-label="Copy XMR address"
                >
                  <Copy size={18} />
                </button>
              </div>

              <div className="mt-3 max-h-24 overflow-y-auto break-all border border-[#1a1a1a] bg-[#141414]/40 p-3 font-mono text-[10px] leading-relaxed text-[#A3A3A3]">
                {XMR_ADDRESS}
              </div>

              <button
                onClick={copyAddress}
                className="mt-3 flex w-full items-center justify-center gap-2 border border-[#8B0F1A] px-4 py-3 font-mono text-[10px] tracking-[0.15em] text-[#E63946] transition-colors hover:bg-[#E63946]/10"
              >
                <Copy size={14} />
                {copied ? "COPIED" : "COPY FULL ADDRESS"}
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="min-w-0">
            <h3 className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[#E63946]">
              AMOUNT
            </h3>

            <label className="mb-2 block font-mono text-[11px] tracking-[0.12em] text-[#F2F2F2]">
              YOU PAY (USD)
            </label>

            <div className="flex min-w-0 border border-[#1a1a1a] bg-[#0a0a0a]">
              <input
                value={usdAmount}
                onChange={(event) => handleUsdChange(event.target.value)}
                inputMode="decimal"
                className="min-w-0 flex-1 bg-transparent px-4 py-4 font-mono text-xl text-[#F2F2F2] outline-none sm:text-2xl"
              />

              <div className="flex shrink-0 items-center border-l border-[#1a1a1a] px-4 font-mono text-sm text-[#F2F2F2] sm:px-5">
                USD
              </div>
            </div>

            <div className="flex justify-center py-4 text-[#E63946]">
              <RefreshCw size={20} />
            </div>

            <label className="mb-2 block font-mono text-[11px] tracking-[0.12em] text-[#F2F2F2]">
              SEND EXACTLY (XMR)
            </label>

            <div className="flex min-w-0 border border-[#1a1a1a] bg-[#0a0a0a]">
              <input
                value={xmrAmount}
                onChange={(event) => handleXmrChange(event.target.value)}
                inputMode="decimal"
                className="min-w-0 flex-1 bg-transparent px-4 py-4 font-mono text-xl text-[#F2F2F2] outline-none sm:text-2xl"
              />

              <div className="flex shrink-0 items-center gap-2 border-l border-[#1a1a1a] px-3 font-mono text-sm text-[#F2F2F2] sm:px-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-[#8B0F1A] bg-[#141414] p-1">
                  <Image
                    src="/images/xmr-icon-red.png"
                    alt="Monero XMR"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </span>
                XMR
              </div>
            </div>

            <div
              className="mt-5 flex flex-wrap items-center gap-2 font-mono text-base font-bold tracking-[0.08em] text-[#F2F2F2] sm:gap-3 md:text-lg"
              style={{
                textShadow:
                  "0 0 6px rgba(230,57,70,0.55), 0 0 14px rgba(230,57,70,0.42), 0 0 28px rgba(230,57,70,0.28)",
              }}
            >
              <span>
                1 XMR ={" "}
                {xmrUsdPrice ? xmrUsdPrice.toFixed(2) : "..."} USD
              </span>

              <span className="text-[#E63946]">•</span>

              <span
                className="text-[#E63946]"
                style={{
                  textShadow:
                    "0 0 8px rgba(230,57,70,0.95), 0 0 18px rgba(230,57,70,0.7), 0 0 34px rgba(230,57,70,0.45)",
                }}
              >
                {priceError ? "PRICE UNAVAILABLE" : "LIVE RATE"}
              </span>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 font-mono text-[11px] tracking-[0.2em] text-[#E63946]">
                INSTRUCTIONS
              </h3>

              <div className="border border-[#1a1a1a] bg-[#141414]/40 p-4 text-[11px] leading-7 text-[#A3A3A3]">
                <p>• Confirm service and amount before sending.</p>
                <p>• Scan the QR code or copy the address.</p>
                <p>• Send the exact amount in XMR.</p>
                <p>
                  • After payment, send the transaction hash through the secure
                  contact channel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mx-4 mb-5 flex items-center justify-center gap-3 border border-[#8B0F1A] bg-[#8B0F1A]/10 px-4 py-4 text-center text-xs text-[#F2F2F2] sm:mx-5 sm:px-5 sm:text-sm">
          <AlertTriangle className="shrink-0 text-[#E63946]" size={20} />
          <p className="font-mono tracking-[0.04em]">
            Send only XMR to this address. Wrong payments cannot be recovered.
          </p>
        </div>
      </div>
    </div>
  )
}
