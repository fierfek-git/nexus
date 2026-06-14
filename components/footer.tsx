import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Main footer content */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {/* Brand column */}
          <div className="flex items-start gap-3">
            <Link href="/" className="shrink-0">
              <Image
                src="/images/logo-horizontal.png"
                alt="fierfek.nexus"
                width={156}
                height={39}
                className="h-9 w-auto drop-shadow-[0_0_10px_rgba(230,57,70,0.40)]"
              />
            </Link>

            <p className="pt-1 text-[10px] text-[#A3A3A3] uppercase tracking-[0.15em] leading-relaxed">
              Fierce by design.
              <br />
              Private by default.
            </p>
          </div>

          {/* Monero column */}
          <div className="flex items-start gap-3">
            <Image
              src="/images/xmr-icon-red.png"
              alt="Monero XMR"
              width={44}
              height={44}
              className="h-10 w-10 shrink-0 rounded-sm drop-shadow-[0_0_14px_rgba(230,57,70,0.85)]"
            />

            <div className="pt-0.5">
              <h4 className="text-[10px] font-mono tracking-[0.16em] text-[#F2F2F2] mb-1 uppercase">
                We accept Monero (XMR)
              </h4>
              <p className="text-[10px] text-[#A3A3A3] uppercase tracking-[0.1em]">
                Private. Fast. Uncensorable.
              </p>
            </div>
          </div>

          {/* Discreet digital services */}
          <div className="flex items-start gap-3">
            <Image
              src="/images/discret_di_services.png"
              alt="Discreet Digital Services"
              width={44}
              height={44}
              className="h-10 w-10 shrink-0 rounded-sm drop-shadow-[0_0_14px_rgba(230,57,70,0.85)]"
            />

            <div className="pt-0.5">
              <h4 className="text-[10px] font-mono tracking-[0.16em] text-[#F2F2F2] mb-1 uppercase">
                Discreet Digital Services
              </h4>
              <p className="text-[10px] text-[#A3A3A3] uppercase tracking-[0.1em]">
                Built on trust and technology.
              </p>
            </div>
          </div>

          {/* Infrastructure first */}
          <div className="flex items-start gap-3">
            <Image
              src="/images/infra_first.png"
              alt="Infrastructure First"
              width={44}
              height={44}
              className="h-10 w-10 shrink-0 rounded-sm drop-shadow-[0_0_14px_rgba(230,57,70,0.85)]"
            />

            <div className="pt-0.5">
              <h4 className="text-[10px] font-mono tracking-[0.16em] text-[#F2F2F2] mb-1 uppercase">
                Infrastructure First.
              </h4>
              <p className="text-[10px] text-[#A3A3A3] uppercase tracking-[0.1em]">
                Privacy Always.
              </p>
            </div>
          </div>
        </div>

        {/* Center banner */}
        <div className="py-3 border-t border-[#1a1a1a]">
          <div className="flex justify-center">
            <Image
              src="/images/center-banner.png"
              alt="Privacy Liberty"
              width={900}
              height={90}
              className="h-auto w-full max-w-[560px] opacity-90 drop-shadow-[0_0_14px_rgba(230,57,70,0.32)]"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-4 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Legal links */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/privacy-policy"
              className="text-[10px] md:text-[11px] font-mono tracking-[0.15em] text-[#A3A3A3] hover:text-[#F2F2F2] transition-colors uppercase"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-[10px] md:text-[11px] font-mono tracking-[0.15em] text-[#A3A3A3] hover:text-[#F2F2F2] transition-colors uppercase"
            >
              Terms of Service
            </Link>
            <Link
              href="/status"
              className="text-[10px] md:text-[11px] font-mono tracking-[0.15em] text-[#A3A3A3] hover:text-[#F2F2F2] transition-colors uppercase"
            >
              Status
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-[10px] md:text-[11px] text-[#A3A3A3] text-center md:text-right">
            <p>&copy; {currentYear} fierfek.nexus. All rights reserved.</p>
            <p className="mt-0.5 text-[#666]">Not affiliated with Monero.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
