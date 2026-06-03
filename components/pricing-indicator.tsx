import Link from "next/link"
import { ChevronRight, DollarSign } from "lucide-react"

export function PricingIndicator() {
  return (
    <div className="cyber-card corner-accent p-5 rounded-sm relative">
      {/* Section header */}
      <h3 className="text-[10px] font-mono tracking-[0.2em] text-[#E63946] uppercase mb-5">
        Pricing Indicator
      </h3>

      {/* Price tiers visual */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="w-10 h-10 flex items-center justify-center bg-[#E63946] rounded-sm text-[#F2F2F2]">
          <DollarSign size={16} />
        </div>
        <div className="w-10 h-10 flex items-center justify-center border border-[#1a1a1a] rounded-sm text-[#A3A3A3] bg-[#141414]/50">
          <span className="text-[11px] font-mono">$$</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center border border-[#1a1a1a] rounded-sm text-[#A3A3A3] bg-[#141414]/50">
          <span className="text-[11px] font-mono">$$$</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-[10px] text-[#A3A3A3] text-center leading-relaxed mb-5">
        Our pricing is competitive and reflects the value, security, and expertise behind every service we provide.
      </p>

      {/* CTA */}
      <Link
        href="#pricing"
        className="inline-flex items-center gap-1 text-[10px] font-mono tracking-[0.15em] text-[#E63946] hover:text-[#F2F2F2] transition-colors"
      >
        VIEW PRICING
        <ChevronRight size={12} />
      </Link>
    </div>
  )
}
