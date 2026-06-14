const contactMethods = [
  {
    href: "https://smp19.simplex.im/a#yHTqtQd6GRLoUi8SvKXbVqvmNgfKIKG4EqVpJHHncBo",
    label: "SimpleX Chat",
    eyebrow: "Private direct contact",
    description: "Use SimpleX for secure communication, payment proof, payment hash, and private coordination.",
    cta: "Open SimpleX",
  },
  {
    href: "https://x.com/kriptoanarkisto",
    label: "X.com",
    eyebrow: "Public contact",
    description: "Use X for quick public contact, visibility, short messages, and basic inquiries.",
    cta: "Open X",
  },
  {
    href: "https://xmrbazaar.com/user/Fierfek/",
    label: "XMRBazaar",
    eyebrow: "Marketplace profile",
    description: "Use XMRBazaar for service inquiries, Monero-related requests, and marketplace reputation.",
    cta: "Open XMRBazaar",
  },
]

export function ContactSection() {
  return (
    <section
      id="contact"
      className="target-section py-6 md:py-8 border-t border-[#1a1a1a] bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-6 items-start">
          <div>
            <h2 className="text-[13px] md:text-[15px] font-mono tracking-[0.24em] text-[#E63946] uppercase mb-2 drop-shadow-[0_0_8px_rgba(230,57,70,0.75)]">
              Contact Us
            </h2>

            <div className="h-px w-16 bg-[#E63946] shadow-[0_0_12px_rgba(230,57,70,0.85)] mb-4" />

            <p className="max-w-3xl text-[#A3A3A3] text-[12px] md:text-[13px] leading-relaxed mb-6">
              Choose the contact method that fits your needs.
              <br />
              For private coordination, use SimpleX first. For public contact,
              use X. For marketplace-related requests, use XMRBazaar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {contactMethods.map((method) => (
              <a
                key={method.href}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={method.label}
                className="group block min-h-[160px] rounded-sm border border-[#8B0F1A]/50 bg-[#111111] p-5 transition-all duration-300 hover:border-[#E63946] hover:bg-[#141414] hover:shadow-[0_0_24px_rgba(230,57,70,0.22)] focus:outline-none focus:ring-2 focus:ring-[#E63946]/60"
              >
                <div className="flex h-full flex-col justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#E63946]">
                      {method.eyebrow}
                    </p>

                    <h3 className="mt-3 text-lg font-bold tracking-tight text-[#F2F2F2]">
                      {method.label}
                    </h3>

                    <p className="mt-3 text-[12px] leading-relaxed text-[#A3A3A3]">
                      {method.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#F2F2F2]">
                      {method.cta}
                    </span>

                    <span className="text-[#E63946] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
