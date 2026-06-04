"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { MoneroTicker } from "@/components/monero-ticker"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "SERVICES", href: "#services" },
    { label: "ABOUT", href: "#about" },
    { label: "PROCESS", href: "#process" },
    { label: "PRICING", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "CONTACT", href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-horizontal.png"
              alt="fierfek.nexus"
              width={160}
              height={40}
              className="h-8 md:h-9 w-auto"
              priority
            />
          </Link>

          <MoneroTicker />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[10px] font-mono tracking-[0.15em] text-[#A3A3A3] hover:text-[#F2F2F2] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* XMR Button */}
            <Link
              href="#payment"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-[#E63946] text-[#E63946] rounded-sm hover:bg-[#E63946]/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <text x="12" y="16" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="bold">M</text>
              </svg>
              <span className="text-[10px] font-mono tracking-[0.15em]">PAY WITH XMR</span>
            </Link>

            {/* OPSEC Status */}
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-[#A3A3A3] tracking-[0.1em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] pulse-glow" />
              <span>OPSEC FIRST</span>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-[#A3A3A3] hover:text-[#F2F2F2]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-[#1a1a1a]">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[11px] font-mono tracking-[0.15em] text-[#A3A3A3] hover:text-[#F2F2F2] transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-3 border-t border-[#1a1a1a]">
                <Link
                  href="#payment"
                  className="flex items-center gap-2 px-3 py-1.5 border border-[#E63946] text-[#E63946] rounded-sm hover:bg-[#E63946]/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    <text x="12" y="16" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="bold">M</text>
                  </svg>
                  <span className="text-[10px] font-mono tracking-[0.15em]">PAY WITH XMR</span>
                </Link>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#A3A3A3] tracking-[0.1em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] pulse-glow" />
                  <span>OPSEC FIRST</span>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
