import { EyeOff, Shield, MessageSquare } from "lucide-react"

export function TrustBadges() {
  const badges = [
    {
      icon: EyeOff,
      label: "NO LOGS",
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
          <line x1="7" y1="1" x2="7" y2="4" />
          <line x1="17" y1="1" x2="17" y2="4" />
          <line x1="7" y1="20" x2="7" y2="23" />
          <line x1="17" y1="20" x2="17" y2="23" />
        </svg>
      ),
      label: "NO TRACKING",
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <text x="12" y="16" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="bold">M</text>
        </svg>
      ),
      label: "XMR ONLY",
    },
    {
      icon: MessageSquare,
      label: "DISCREET SUPPORT",
    },
  ]

  return (
    <section className="border-y border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <div key={index} className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-[#A3A3A3]">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono tracking-[0.15em]">{badge.label}</span>
                </div>
                {index < badges.length - 1 && (
                  <span className="hidden md:block ml-4 w-1 h-1 rounded-full bg-[#E63946]/40" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
