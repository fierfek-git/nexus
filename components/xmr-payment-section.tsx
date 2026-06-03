import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function XmrPaymentSection() {
  return (
    <div className="cyber-card corner-accent p-5 rounded-sm relative">
      {/* Section header */}
      <h3 className="text-[10px] font-mono tracking-[0.2em] text-[#E63946] uppercase mb-5">
        Pay with XMR
      </h3>

      {/* Monero icon */}
      <div className="flex justify-center mb-5">
        <div className="w-14 h-14 flex items-center justify-center border border-[#E63946]/30 rounded-sm text-[#E63946] bg-[#E63946]/5">
          <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
            <text x="24" y="32" fontSize="22" textAnchor="middle" fill="currentColor" fontWeight="bold">M</text>
          </svg>
        </div>
      </div>

      {/* Title */}
      <h4 className="font-[family-name:var(--font-heading)] text-center text-xs font-bold text-[#F2F2F2] mb-2 uppercase tracking-wider">
        We only accept Monero (XMR)
      </h4>

      {/* Description */}
      <p className="text-[11px] text-[#A3A3A3] text-center leading-relaxed mb-5">
        Private, fast, and uncensorable payments. No exceptions.
      </p>

      {/* CTA */}
      <Link
        href="#payment-info"
        className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#1a1a1a] rounded-sm text-[10px] font-mono tracking-[0.15em] text-[#F2F2F2] hover:border-[#E63946]/30 transition-colors bg-[#141414]/50"
      >
        PAYMENT INFO
        <ChevronRight size={12} />
      </Link>
    </div>
  )
}
