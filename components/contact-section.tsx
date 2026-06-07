import Image from "next/image"

const contactMethods = [
  {
    href: "https://smp19.simplex.im/a#yHTqtQd6GRLoUi8SvKXbVqvmNgfKIKG4EqVpJHHncBo",
    src: "/contact/Boton_Simplex.png",
    alt: "Contact through SimpleX Chat",
  },
  {
    href: "https://x.com/kriptoanarkisto",
    src: "/contact/Boton_x_com.png",
    alt: "Contact through X.com",
  },
  {
    href: "https://xmrbazaar.com/user/Fierfek/",
    src: "/contact/Boton_xmrbazaar.png",
    alt: "Contact through XMRBazaar",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-6 md:py-8 border-t border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-6 items-start">
          {/* Section header */}
          <div>
         <h2 className="text-[13px] md:text-[15px] font-mono tracking-[0.24em] text-[#E63946] uppercase mb-2 drop-shadow-[0_0_8px_rgba(230,57,70,0.75)]">
          Contact Us
         </h2>
         <div className="h-px w-16 bg-[#E63946] shadow-[0_0_12px_rgba(230,57,70,0.85)] mb-4" />

            <p className="max-w-3xl text-[#A3A3A3] text-[12px] leading-relaxed mb-6">
              Choose the contact method that fits your needs.
              <br />
              Use SimpleX for direct, secure, and private communication, <em>payment proof, or payment hash.</em>
              Use X for quick public contact, or XMRBazaar for inquiries related to services offered on that platform.
            </p>
          </div>

          {/* Contact buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {contactMethods.map((method) => (
              <a
                key={method.src}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={method.alt}
                className="group block rounded-md border border-[#8B0F1A]/40 bg-[#141414]/40 p-1.5 transition-all duration-300 hover:border-[#E63946] hover:bg-[#141414]/70 hover:shadow-[0_0_24px_rgba(230,57,70,0.22)] focus:outline-none focus:ring-2 focus:ring-[#E63946]/60"
              >
                <Image
                  src={method.src}
                  alt={method.alt}
                  width={900}
                  height={300}
                  className="h-auto w-full rounded-sm transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
