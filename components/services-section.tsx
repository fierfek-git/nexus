import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function ServicesSection() {
  const services = [
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
      ),
      title: "PRIVATE SERVICES",
      description: "Digital services crafted for privacy by design. No tracking. No logs. No compromises.",
      href: "#services",
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <text x="12" y="16" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="bold">
            M
          </text>
        </svg>
      ),
      title: "XMR PAYMENTS",
      description: "We accept Monero (XMR) for private, uncensorable payments.",
      href: "#payment",
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="8" rx="1" />
          <rect x="2" y="14" width="20" height="8" rx="1" />
          <circle cx="6" cy="6" r="1" fill="currentColor" />
          <circle cx="6" cy="18" r="1" fill="currentColor" />
          <line x1="10" y1="6" x2="18" y2="6" />
          <line x1="10" y1="18" x2="18" y2="18" />
        </svg>
      ),
      title: "INFRASTRUCTURE",
      description: "Hardened systems. Redundant. Encrypted. Built for reliability.",
      href: "#infrastructure",
    },
  ]

  return (
    <section id="services" className="py-6 md:py-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="mb-6">
          <h2 className="text-[13px] md:text-[15px] font-mono tracking-[0.24em] text-[#E63946] uppercase mb-2 drop-shadow-[0_0_8px_rgba(230,57,70,0.75)]">
            Our Services
          </h2>
          <div className="h-px w-16 bg-[#E63946] shadow-[0_0_12px_rgba(230,57,70,0.85)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <div
                key={index}
                className="group cyber-card corner-accent p-5 rounded-sm hover:border-[#E63946]/30 transition-all relative"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-4 border border-[#E63946]/20 rounded-sm text-[#E63946] bg-[#E63946]/5">
                  <Icon />
                </div>

                <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold text-[#F2F2F2] mb-2 tracking-wide">
                  {service.title}
                </h3>

                <p className="text-[11px] text-[#A3A3A3] leading-relaxed mb-4">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1 text-[10px] font-mono tracking-[0.15em] text-[#E63946] hover:text-[#F2F2F2] transition-colors group-hover:gap-2"
                >
                  LEARN MORE
                  <ChevronRight size={12} />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
