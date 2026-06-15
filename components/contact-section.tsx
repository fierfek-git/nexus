const contactMethods = [
  {
    href: "https://smp19.simplex.im/a#yHTqtQd6GRLoUi8SvKXbVqvmNgfKIKG4EqVpJHHncBo",
    code: "SX",
    label: "SimpleX Chat",
    description: "Private coordination",
    cta: "Open SimpleX",
  },
  {
    href: "https://x.com/kriptoanarkisto",
    code: "X",
    label: "X.com",
    description: "Public contact",
    cta: "Open X",
  },
  {
    href: "https://xmrbazaar.com/user/Fierfek/",
    code: "XB",
    label: "XMRBazaar",
    description: "Marketplace profile",
    cta: "Open XMRBazaar",
  },
]

export function ContactSection() {
  return (
    <section
      id="contact"
      className="target-section border-t border-[#1a1a1a] bg-[#0a0a0a] py-8 md:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mb-6">
          <h2 className="mb-2 text-[13px] md:text-[15px] font-mono uppercase tracking-[0.24em] text-[#E63946]">
            Contact Us
          </h2>

          <div className="mb-4 h-px w-16 bg-[#E63946]" />

          <p className="max-w-2xl text-[12px] md:text-[13px] leading-relaxed text-[#A3A3A3]">
            Choose the right channel. Use SimpleX for private coordination,
            X for public contact, and XMRBazaar for marketplace-related requests.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {contactMethods.map((method) => (
            <a
              key={method.href}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={method.label}
              className="group relative flex min-h-[92px] items-center justify-between overflow-hidden border border-[#8B0F1A]/60 bg-[#0f0f0f] px-5 py-4 transition-all duration-300 hover:border-[#E63946] hover:bg-[#141414] focus:outline-none focus:ring-2 focus:ring-[#E63946]/60"
            >
              <div className="absolute left-0 top-0 h-full w-[2px] bg-[#E63946] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#8B0F1A] bg-[#080808] text-[11px] font-mono font-bold tracking-[0.16em] text-[#E63946] transition-colors duration-300 group-hover:border-[#E63946] group-hover:text-[#F2F2F2]">
                  {method.code}
                </div>

                <div>
                  <h3 className="text-[15px] md:text-[16px] font-semibold tracking-tight text-[#F2F2F2]">
                    {method.label}
                  </h3>

                  <p className="mt-1 text-[11px] font-mono uppercase tracking-[0.14em] text-[#777777]">
                    {method.description}
                  </p>

                  <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.18em] text-[#A3A3A3] transition-colors duration-300 group-hover:text-[#E63946]">
                    {method.cta}
                  </p>
                </div>
              </div>

              <span className="ml-4 text-lg text-[#E63946] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
