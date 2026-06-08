import { ChevronRight } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: () => (
        <img
          src="/images/centurion.png"
          alt="Centurion icon"
          className="h-10 w-10 object-contain scale-110 drop-shadow-[0_0_12px_rgba(230,57,70,0.85)]"
        />
      ),
      title: "EXECUTIVE CONCIERGE & PRIVATE OPERATIONS",
      description:
        "Tailored digital and field support for demanding clients who require discretion, technical authority, banking coordination, and turnkey execution.",
      href: "https://smp19.simplex.im/a#yHTqtQd6GRLoUi8SvKXbVqvmNgfKIKG4EqVpJHHncBo",
      cta: "LEARN MORE",
    },
    {
      icon: () => (
        <img
          src="/images/xmr-icon-black.png"
          alt="Monero XMR"
          className="h-7 w-7 object-contain drop-shadow-[0_0_8px_rgba(230,57,70,0.65)]"
        />
      ),
      title: "XMR PAYMENTS",
      description: "I accept Monero (XMR) for private, direct, and censorship-resistant payments.",
      href: "https://www.getmonero.org/get-started/what-is-monero/",
      cta: "LEARN MORE",
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
      title: "SECURE INFRASTRUCTURE",
      description:
        "Linux servers, nodes, backups, hardening, monitoring, resilient technical environments, and privacy-oriented mobile setups.",
    },
  ]

  return (
    <section id="services" className="target-section py-6 md:py-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="mb-6">
          <h2 className="text-[13px] md:text-[15px] font-mono tracking-[0.24em] text-[#E63946] uppercase mb-2 drop-shadow-[0_0_8px_rgba(230,57,70,0.75)]">
            Services
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

                {service.href && service.cta && (
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-mono tracking-[0.15em] text-[#E63946] hover:text-[#F2F2F2] transition-colors group-hover:gap-2"
                  >
                    {service.cta}
                    <ChevronRight size={12} />
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
