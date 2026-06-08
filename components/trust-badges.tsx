import { EyeOff, Blocks, CircleDollarSign, MessageSquare } from "lucide-react"

export function TrustBadges() {
  const badges = [
    {
      icon: EyeOff,
      label: "NO LOGS",
    },
    {
      icon: Blocks,
      label: "NO TRACKING",
    },
    {
      icon: CircleDollarSign,
      label: "XMR ONLY",
    },
    {
      icon: MessageSquare,
      label: "DISCREET SUPPORT",
    },
  ]

  return (
    <section className="py-5 md:py-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="group mx-auto flex flex-wrap items-center justify-center gap-4 md:gap-7 rounded-sm border border-[#1a1a1a] bg-[#050505]/70 px-5 py-4 transition-all duration-300 ease-out hover:scale-105 hover:border-[#E63946]/40 hover:bg-[#141414]/70 hover:shadow-[0_0_22px_rgba(230,57,70,0.18)]">
          {badges.map((badge, index) => {
            const Icon = badge.icon

            return (
              <div key={badge.label} className="flex items-center gap-2">
                <Icon
                  size={13}
                  strokeWidth={1.5}
                  className="text-[#A3A3A3] transition-colors duration-300 group-hover:text-[#E63946]"
                />

                <span className="text-[9px] md:text-[10px] font-mono tracking-[0.22em] text-[#A3A3A3] uppercase transition-colors duration-300 group-hover:text-[#F2F2F2]">
                  {badge.label}
                </span>

                {index < badges.length - 1 && (
                  <span className="ml-3 md:ml-5 text-[#8B0F1A] transition-colors duration-300 group-hover:text-[#E63946]">
                    •
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
