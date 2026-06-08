import Link from "next/link"
import Image from "next/image"
import { Shield, Code } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Main footer content */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center mb-2">
              <Image
                src="/images/logo-horizontal.png"
                alt="fierfek.nexus"
                width={156}
                height={39}
                className="h-8 w-auto drop-shadow-[0_0_10px_rgba(230,57,70,0.35)]"
              />
            </Link>
            <p className="text-[9px] text-[#A3A3A3] uppercase tracking-[0.15em] leading-relaxed">
              Fierce by design.
              <br />
              Private by default.
            </p>
          </div>

          {/* Info columns */}
          <div className="flex items-start gap-2.5">
            <Image
              src="/images/xmr-icon-red.png"
              alt="Monero XMR"
              width={22}
              height={22}
              className="mt-0.5 h-5 w-5 shrink-0 rounded-sm drop-shadow-[0_0_8px_rgba(230,57,70,0.65)]"
            />
            <div>
              <h4 className="text-[9px] font-mono tracking-[0.15em] text-[#F2F2F2] mb-0.5 uppercase">
                We accept Monero (XMR)
              </h4>
              <p className="text-[9px] text-[#A3A3A3] uppercase tracking-[0.1em]">
                Private. Fast. Uncensorable.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Shield className="w-3.5 h-3.5 text-[#E63946] mt-0.5 shrink-0 drop-shadow-[0_0_8px_rgba(230,57,70,0.55)]" />
            <div>
              <h4 className="text-[9px] font-mono tracking-[0.15em] text-[#F2F2F2] mb-0.5 uppercase">
                Discreet Digital Services
              </h4>
              <p className="text-[9px] text-[#A3A3A3] uppercase tracking-[0.1em]">
                Built on trust and technology.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Code className="w-3.5 h-3.5 text-[#E63946] mt-0.5 shrink-0 drop-shadow-[0_0_8px_rgba(230,57,70,0.55)]" />
            <div>
              <h4 className="text-[9px] font-mono tracking-[0.15em] text-[#F2F2F2] mb-0.5 uppercase">
                Infrastructure First.
              </h4>
              <p className="text-[9px] text-[#A3A3A3] uppercase tracking-[0.1em]">
                Privacy Always.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-4 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Legal links */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="#privacy"
              className="text-[9px] font-mono tracking-[0.15em] text-[#A3A3A3] hover:text-[#F2F2F2] transition-colors uppercase"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="text-[9px] font-mono tracking-[0.15em] text-[#A3A3A3] hover:text-[#F2F2F2] transition-colors uppercase"
            >
              Terms of Service
            </Link>
            <Link
              href="#status"
              className="text-[9px] font-mono tracking-[0.15em] text-[#A3A3A3] hover:text-[#F2F2F2] transition-colors uppercase"
            >
              Status
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-[9px] text-[#A3A3A3] text-center md:text-right">
            <p>&copy; {currentYear} fierfek.nexus. All rights reserved.</p>
            <p className="mt-0.5 text-[#666]">Not affiliated with Monero.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
