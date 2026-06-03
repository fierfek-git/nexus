import Link from "next/link"
import { Mail, MessageSquare, ChevronRight } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-6 md:py-8 border-t border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left side */}
          <div className="lg:col-span-8">
            {/* Section header */}
            <h2 className="text-[10px] font-mono tracking-[0.2em] text-[#E63946] uppercase mb-2">
              Contact Us
            </h2>
            <div className="h-px w-8 bg-[#E63946]/40 mb-4" />
            
            <p className="text-[#A3A3A3] text-[12px] leading-relaxed mb-6">
              Have questions or need a custom solution?
              <br />
              Reach out securely. We respond fast.
            </p>

            {/* Contact methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-2.5">
                <MessageSquare size={14} className="text-[#E63946] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-[10px] font-mono tracking-[0.15em] text-[#F2F2F2] mb-1">
                    SECURE MESSAGE
                  </h4>
                  <p className="text-[10px] text-[#A3A3A3]">
                    Use our secure contact form.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail size={14} className="text-[#E63946] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-[10px] font-mono tracking-[0.15em] text-[#F2F2F2] mb-1">
                    EMAIL (PGP ENCRYPTED)
                  </h4>
                  <p className="text-[10px] text-[#A3A3A3]">
                    hello@fierfek.nexus
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#E63946] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <text x="12" y="16" fontSize="10" textAnchor="middle" fill="currentColor" fontWeight="bold">M</text>
                </svg>
                <div>
                  <h4 className="text-[10px] font-mono tracking-[0.15em] text-[#F2F2F2] mb-1">
                    XMEBAZAAR PROFILE
                  </h4>
                <a
                  href="https://xmrbazaar.com/user/Fierfek/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#A3A3A3] hover:text-[#E63946] transition-colors"
                 >
                   EMAIL
               </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - CTA */}
          <div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
            <Link
              href="#contact-form"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#E63946] text-[#F2F2F2] font-mono text-[10px] tracking-[0.15em] uppercase rounded-sm hover:bg-[#8B0F1A] transition-all glow-red-subtle"
            >
              Contact Form
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
