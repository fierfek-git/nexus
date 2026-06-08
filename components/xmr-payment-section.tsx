import { ChevronRight, ClipboardCheck } from "lucide-react"

export function XmrPaymentSection() {
  return (
    <div id="process" className="target-section cyber-card corner-accent p-5 rounded-sm relative">
      {/* Section header */}
      <h3 className="text-[10px] font-mono tracking-[0.2em] text-[#E63946] uppercase mb-5">
        Mission Process
      </h3>

      {/* Process icon */}
      <div className="flex justify-center mb-5">
        <div className="w-14 h-14 flex items-center justify-center border border-[#E63946]/30 rounded-sm text-[#E63946] bg-[#E63946]/5">
          <ClipboardCheck size={28} strokeWidth={1.5} />
        </div>
      </div>

      {/* Title */}
      <h4 className="font-[family-name:var(--font-heading)] text-center text-xs font-bold text-[#F2F2F2] mb-2 uppercase tracking-wider">
        Clear Scope. Discreet Execution.
      </h4>

      {/* Description */}
      <p className="text-[11px] text-[#A3A3A3] text-center leading-relaxed mb-5">
        Request reviewed. Scope defined. XMR payment confirmed. Execution begins under clear terms and discreet handling.
      </p>

      {/* CTA */}
      <a
        href="https://xmrbazaar.com/user/Fierfek/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#1a1a1a] rounded-sm text-[10px] font-mono tracking-[0.15em] text-[#F2F2F2] hover:border-[#E63946]/30 transition-colors bg-[#141414]/50"
      >
        START PROCESS
        <ChevronRight size={12} />
      </a>
    </div>
  )
}
