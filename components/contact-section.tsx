import Image from "next/image"

const contactMethods = [
  {
    href: "https://smp19.simplex.im/a#yHTqtQd6GRLoUi8SvKXbVqvmNgfKIKG4EqVpJHHncBo",
    imageSrc: "/contact/boton-simplex.png",
    alt: "SimpleX Chat - Private coordination",
    width: 900,
    height: 300,
  },
  {
    href: "https://x.com/kriptoanarkisto",
    imageSrc: "/contact/boton-x-com.png",
    alt: "X.com - Public contact",
    width: 900,
    height: 265,
  },
  {
    href: "https://xmrbazaar.com/user/Fierfek/",
    imageSrc: "/contact/boton-xmrbazaar.png",
    alt: "XMRBazaar - Marketplace profile",
    width: 900,
    height: 257,
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

          <p className="max-w-3xl text-[12px] md:text-[13px] leading-relaxed text-[#A3A3A3]">
            Choose the right channel. Use SimpleX for private coordination,
            X for public contact, and XMRBazaar for marketplace-related requests.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {contactMethods.map((method) => (
            <a
              key={method.href}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={method.alt}
              className="group block transition-transform duration-300 hover:scale-[1.015] focus:outline-none focus:ring-2 focus:ring-[#E63946]/70"
            >
              <Image
                src={method.imageSrc}
                alt={method.alt}
                width={method.width}
                height={method.height}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="h-auto w-full select-none"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
