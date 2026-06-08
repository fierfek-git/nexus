import { ClipboardCheck, CircleDollarSign, ShieldCheck, Building2, BriefcaseBusiness } from "lucide-react"

export function TrustBadges() {
  const badges = [
    {
      icon: ClipboardCheck,
      label: "MISSION REVIEW",
    },
    {
      icon: CircleDollarSign,
      label: "XMR ONLY",
    },
    {
      icon: ShieldCheck,
      label: "PRIVATE HANDLING",
    },
    {
      icon: Building2,
      label: "BANKING COORDINATION",
    },
    {
      icon: BriefcaseBusiness,
      label: "EXECUTIVE SUPPORT",
    },
  ]

  return (
    <section className="py-5 md:py-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="group mx-auto flex items-center justify-center gap-3 md:gap-5 rounded-sm border border-[#1a1a1a] bg-[#050505]/70 px-4 md:px-6 py-4 transition-all duration-300 ease-out hover:scale-[1.03] hover:border-[#E63946]/40 hover:bg-[#141414]/70 hover:shadow-[0_0_22px_rgba(230,57,70,0.18)] overflow-x-auto">
          {badges.map((badge, index) => {
            const Icon = badge.icon

            return (
              <div key={badge.label} className="flex items-center gap-2 shrink-0">
                <Icon
                  size={13}
                  strokeWidth={1.5}
                  className="text-[#A3A3A3] transition-colors duration-300 group-hover:text-[#E63946]"
                />

                <span className="text-[8.5px] md:text-[10px] font-mono tracking-[0.18em] text-[#A3A3A3] uppercase whitespace-nowrap transition-colors duration-300 group-hover:text-[#F2F2F2]">
                  {badge.label}
                </span>

                {index < badges.length - 1 && (
                  <span className="ml-2 md:ml-3 text-[#8B0F1A] transition-colors duration-300 group-hover:text-[#E63946]">
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
