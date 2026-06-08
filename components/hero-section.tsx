import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const heroSignals = [
  { label: "ACCESS", value: "PRIVATE" },
  { label: "PAYMENT", value: "XMR ONLY" },
  { label: "EXECUTION", value: "DISCREET" },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-100" />

      {/* Red radial glow */}
      <div className="absolute inset-0 hero-radial" />

      {/* Geometric HUD lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#E63946" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        <line x1="0" y1="20%" x2="40%" y2="20%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="60%" y1="15%" x2="100%" y2="15%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="0" y1="80%" x2="35%" y2="80%" stroke="url(#lineGrad)" strokeWidth="1" />

        <path d="M 50 50 L 50 20 L 80 20" fill="none" stroke="#E63946" strokeWidth="1" opacity="0.3" />
        <path d="M 95% 50 L 95% 80 L 92% 80" fill="none" stroke="#E63946" strokeWidth="1" opacity="0.3" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 items-center min-h-[60vh]">
          {/* Left content */}
          <div className="lg:col-span-5 relative z-20">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#E63946] uppercase">
                Private by design.
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#A3A3A3] uppercase">
                Paid with XMR.
              </span>
              <div className="hidden md:block h-px flex-1 max-w-24 bg-gradient-to-r from-[#E63946]/60 to-transparent" />
            </div>

            {/* Main Headline */}
            <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-4 tracking-tight">
              <span className="text-[#F2F2F2]">Private executive operations.</span>
              <br />
              <span className="text-[#F2F2F2]">Paid with </span>
              <span className="text-[#E63946] glow-red-text">Monero.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#A3A3A3] text-sm md:text-base leading-relaxed mb-6 max-w-md">
              Discreet digital, financial, and field support for demanding clients who require privacy, coordination, and turnkey execution.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="#services"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#E63946] text-[#F2F2F2] font-mono text-[11px] tracking-[0.15em] uppercase rounded-sm hover:bg-[#8B0F1A] transition-all glow-red-subtle"
              >
                View Services
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#process"
                className="group inline-flex items-center gap-2 px-5 py-2.5 border border-[#2a2a2a] text-[#F2F2F2] font-mono text-[11px] tracking-[0.15em] uppercase rounded-sm hover:border-[#E63946]/40 transition-all bg-[#0a0a0a]/50"
              >
                How it works
                <span className="text-[#E63946]">{`<>`}</span>
              </Link>
            </div>
          </div>

          {/* Center image */}
          <div className="lg:col-span-5 relative order-first lg:order-none">
            <div className="absolute inset-0 bg-gradient-radial from-[#8B0F1A]/50 via-[#E63946]/10 to-transparent blur-3xl scale-110" />

            <div className="relative aspect-square max-w-sm md:max-w-md lg:max-w-lg mx-auto">
              <Image
                src="/images/hero-character.png"
                alt="fierfek.nexus - Private Executive Operations"
                fill
                className="object-contain drop-shadow-[0_0_40px_rgba(230,57,70,0.3)]"
                priority
              />
            </div>
          </div>

          {/* Right side premium signals */}
          <div className="hidden lg:flex lg:col-span-2 flex-col items-end justify-center gap-0 text-right">
            <div className="relative border border-[#E63946]/25 bg-[#050505]/25 px-7 py-8 rounded-sm shadow-[0_0_24px_rgba(230,57,70,0.10)]">
              {heroSignals.map((item, index) => (
                <div key={item.label} className="flex flex-col items-end">
                  <div className="text-[10px] font-mono tracking-[0.35em] text-[#A3A3A3] uppercase">
                    {item.label}
                  </div>

                  <div className="mt-2 text-[12px] font-mono tracking-[0.28em] text-[#E63946] uppercase drop-shadow-[0_0_12px_rgba(230,57,70,0.45)]">
                    {item.value}
                  </div>

                  {index < heroSignals.length - 1 && (
                    <div className="my-7 h-14 w-px bg-gradient-to-b from-transparent via-[#E63946]/45 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
