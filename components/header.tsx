"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { XmrPaymentModal } from "./components/xmr-payment-modal"
import { MoneroTicker } from "@/components/monero-ticker"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [xmrModalOpen, setXmrModalOpen] = useState(false)

  const navItems = [
    { label: "SERVICES", href: "#services" },
    { label: "PROCESS", href: "#process" },
    { label: "PRICING", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "CONTACT", href: "#contact" },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1680px] px-4 md:px-8 lg:px-10 xl:px-14">
          <div className="flex h-14 items-center justify-between gap-6 md:h-16">
            {/* Left cluster: Logo + Monero ticker */}
            <div className="flex min-w-0 items-center gap-5 md:gap-7">
              <Link href="/" className="flex shrink-0 items-center">
                <Image
                  src="/images/logo-horizontal.png"
                  alt="fierfek.nexus"
                  width={220}
                  height={55}
                  className="h-10 w-auto md:h-12"
                  priority
                />
              </Link>

              <div className="hidden shrink-0 md:block">
                <MoneroTicker />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-5 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[10px] font-mono tracking-[0.15em] text-[#A3A3A3] transition-colors hover:text-[#F2F2F2]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex shrink-0 items-center gap-3">
              {/* XMR Button - Desktop */}
              <button
                type="button"
                onClick={() => setXmrModalOpen(true)}
                className="hidden items-center gap-3 rounded-sm border border-[#E63946] bg-[#0a0a0a] px-5 py-2.5 text-[#E63946] transition-all duration-300 hover:bg-[#E63946]/10 md:flex"
                style={{
                  boxShadow:
                    "0 0 8px rgba(230,57,70,0.35), 0 0 18px rgba(230,57,70,0.22), inset 0 0 10px rgba(230,57,70,0.08)",
                  textShadow:
                    "0 0 6px rgba(230,57,70,0.65), 0 0 14px rgba(230,57,70,0.45), 0 0 24px rgba(230,57,70,0.28)",
                }}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-[#8B0F1A] bg-[#141414] p-0.5">
                  <Image
                    src="/images/xmr-icon-red.png"
                    alt="Monero XMR"
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] object-contain"
                  />
                </span>

                <span className="text-[12px] font-mono font-bold tracking-[0.18em]">
                  PAY WITH XMR
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                className="p-2 text-[#A3A3A3] hover:text-[#F2F2F2] lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="border-t border-[#1a1a1a] py-4 lg:hidden">
              <div className="flex flex-col gap-3">
                <div className="md:hidden">
                  <MoneroTicker />
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="py-1 text-[11px] font-mono tracking-[0.15em] text-[#A3A3A3] transition-colors hover:text-[#F2F2F2]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="flex items-center gap-3 border-t border-[#1a1a1a] pt-3">
                  {/* XMR Button - Mobile */}
                  <button
                    type="button"
                    className="flex items-center gap-3 rounded-sm border border-[#E63946] bg-[#0a0a0a] px-5 py-2.5 text-[#E63946] transition-all duration-300 hover:bg-[#E63946]/10"
                    style={{
                      boxShadow:
                        "0 0 8px rgba(230,57,70,0.35), 0 0 18px rgba(230,57,70,0.22), inset 0 0 10px rgba(230,57,70,0.08)",
                      textShadow:
                        "0 0 6px rgba(230,57,70,0.65), 0 0 14px rgba(230,57,70,0.45), 0 0 24px rgba(230,57,70,0.28)",
                    }}
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setXmrModalOpen(true)
                    }}
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-[#8B0F1A] bg-[#141414] p-0.5">
                      <Image
                        src="/images/xmr-icon-red.png"
                        alt="Monero XMR"
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px] object-contain"
                      />
                    </span>

                    <span className="text-[12px] font-mono font-bold tracking-[0.18em]">
                      PAY WITH XMR
                    </span>
                  </button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <XmrPaymentModal
        open={xmrModalOpen}
        onClose={() => setXmrModalOpen(false)}
      />
    </>
  )
}
