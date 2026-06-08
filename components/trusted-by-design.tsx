import { Shield, Lock, ClipboardCheck } from "lucide-react"

export function TrustedByDesign() {
  const features = [
    {
      icon: Shield,
      title: "PRIVACY FIRST",
      description: "Minimal data exposure. No unnecessary collection.",
    },
    {
      icon: Lock,
      title: "OPERATIONAL SECURITY",
      description: "Private channels, secure processes, and disciplined handling.",
    },
    {
      icon: ClipboardCheck,
      title: "MISSION REVIEW",
      description: "Every request is reviewed privately before acceptance. I decide whether the mission is viable and aligned with clear terms.",
    },
  ]

  return (
    <div className="cyber-card corner-accent p-5 rounded-sm relative">
      {/* Section header */}
      <h3 className="text-[10px] font-mono tracking-[0.2em] text-[#E63946] uppercase mb-5">
        Trusted by Design
      </h3>

      {/* Features list */}
      <div className="space-y-4">
        {features.map((feature, index) => {
          const Icon = feature.icon

          return (
            <div key={index}>
              <div className="flex items-center gap-2 mb-1.5">
                <Icon size={12} className="text-[#E63946]" />
                <h4 className="text-[10px] font-mono tracking-[0.15em] text-[#F2F2F2]">
                  {feature.title}
                </h4>
              </div>

              <p className="text-[10px] text-[#A3A3A3] leading-relaxed pl-5">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
