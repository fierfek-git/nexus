import Image from "next/image"
import Link from "next/link"
import { Oxanium } from "next/font/google"
import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Headphones,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react"

const heroFont = Oxanium({
  subsets: ["latin"],
  weight: ["600", "700"],
})

const trustItems = [
  {
    icon: ShieldCheck,
    label: "MISSION REVIEW",
  },
  {
    icon: Wallet,
    label: "XMR ONLY",
  },
  {
    icon: ShieldCheck,
    label: "PRIVATE HANDLING",
  },
  {
    icon: Banknote,
    label: "BANKING COORDINATION",
  },
  {
    icon: Headphones,
    label: "EXECUTIVE SUPPORT",
  },
]

const sideHighlights = [
  {
    icon: UserRound,
    title: "EXECUTIVE",
    subtitle: "CONCIERGE",
  },
  {
    icon: Wallet,
    title: "PAYMENT",
    subtitle: "XMR ONLY",
  },
  {
    icon: BriefcaseBusiness,
    title: "OPERATION",
    subtitle: "ANONYMOUS",
  },
]

const marqueeItems = [...trustItems, ...trustItems]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#1a1a1a] bg-[#050505]">
      <style>{`
        @keyframes hero-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .hero-marquee-track {
          animation: hero-marquee 26s linear infinite;
        }

        .hero-marquee-panel:hover .hero-marquee-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-marquee-track {
            animation: none;
          }
        }
      `}</style>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:58px_58px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_44%,rgba(230,57,70,0.25),transparent_36%),radial-gradient(circle_at_34%_54%,rgba(139,15,26,0.24),transparent_42%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.78))]" />

      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E63946]/40 to-transparent" />

      <div className="relative mx-auto max-w-[1680px] px-4 py-12 md:px-8 md:py-16 lg:px-10 lg:py-20 xl:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(460px,0.98fr)_minmax(360px,0.82fr)_112px] xl:grid-cols-[minmax(620px,0.96fr)_minmax(520px,0.86fr)_132px] xl:gap-10">
          <div className="relative z-10">
            <div className="mb-6 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.36em] text-[#A3A3A3]">
              <span className="text-[#ff2a3d]">Private by design</span>
              <span className="text-[#565656]">·</span>
              <span>Paid with XMR</span>
              <span className="hidden h-px w-24 bg-[#E63946]/80 sm:block" />
            </div>

            <h1
              className={`${heroFont.className} max-w-[850px] text-[clamp(2.7rem,4.05vw,5.55rem)] font-bold leading-[0.96] tracking-[-0.055em] text-[#F2F2F2] drop-shadow-[0_0_18px_rgba(255,255,255,0.12)]`}
            >
              <span className="block whitespace-nowrap">Private executive</span>
              <span className="block">operations.</span>
              <span className="block">
                Paid with{" "}
                <span className="text-[#ff2638] drop-shadow-[0_0_22px_rgba(230,57,70,0.48)]">
                  Monero.
                </span>
              </span>
            </h1>

            <div className="mt-7 h-px w-20 bg-[#E63946] shadow-[0_0_16px_rgba(230,57,70,0.85)]" />

            <p className="mt-7 max-w-[620px] text-[15px] leading-8 text-[#A3A3A3] md:text-[17px]">
              Discreet digital, financial, and field support for demanding
              clients who require privacy, coordination, and turnkey execution.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#services"
                className="group relative inline-flex overflow-hidden border border-[#E63946] bg-gradient-to-b from-[#ff3a49] via-[#e62635] to-[#b80f1d] px-8 py-4 text-xs font-semibold uppercase tracking-[0.30em] text-white shadow-[0_0_34px_rgba(230,57,70,0.34)] transition hover:shadow-[0_0_55px_rgba(230,57,70,0.48)]"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/45" />
                <span className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-white/10 blur-xl transition-transform duration-700 group-hover:translate-x-40" />

                <span className="relative flex items-center gap-3">
                  View Services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="#process"
                className="inline-flex items-center gap-3 border border-[#343434] bg-[#080808]/85 px-7 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#F2F2F2] transition hover:border-[#E63946] hover:text-white"
              >
                How It Works
                <span className="text-[#E63946]">&lt;&gt;</span>
              </Link>
            </div>

            <div className="hero-marquee-panel mt-11 hidden max-w-[780px] overflow-hidden border border-[#2a2a2a] bg-[#080808]/86 shadow-[0_0_36px_rgba(0,0,0,0.65)] backdrop-blur-sm md:block">
              <div className="relative flex">
                <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-[#080808] to-transparent" />
                <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-[#080808] to-transparent" />

                <div className="hero-marquee-track flex w-max items-center py-4">
                  {marqueeItems.map((item, index) => {
                    const Icon = item.icon

                    return (
                      <div
                        key={`${item.label}-${index}`}
                        className="flex shrink-0 items-center gap-4 px-7"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#8B0F1A] bg-[#101010] text-[#E63946] shadow-[0_0_18px_rgba(230,57,70,0.12)]">
                          <Icon className="h-4 w-4" />
                        </span>

                        <span className="whitespace-nowrap text-[10px] font-mono uppercase tracking-[0.18em] text-[#BDBDBD]">
                          {item.label}
                        </span>

                        <span className="text-[#E63946]/70">•</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px] xl:max-w-[680px]">
            <div className="absolute -inset-10 bg-[#E63946]/20 blur-3xl" />
            <div className="absolute -inset-4 border border-[#E63946]/20" />

            <div className="relative border border-[#8B0F1A]/90 bg-[#060606] p-3 shadow-[0_0_90px_rgba(230,57,70,0.24)]">
              <div className="pointer-events-none absolute inset-0 border border-[#E63946]/25" />

              <div className="pointer-events-none absolute left-0 top-0 h-16 w-16 border-l border-t border-[#E63946]" />
              <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 border-r border-t border-[#E63946]" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 border-b border-l border-[#E63946]" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b border-r border-[#E63946]" />

              <div className="pointer-events-none absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-[#E63946]" />
              <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-32 -translate-x-1/2 bg-[#E63946]" />

              <Image
                src="/images/hero-character.png"
                alt="Fierfek Nexus anonymous executive operations"
                width={900}
                height={1100}
                className="relative h-auto w-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="hidden h-full min-h-[500px] w-full flex-col items-center justify-center gap-8 text-center lg:flex">
            {sideHighlights.map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={`${item.title}-${item.subtitle}`}
                  className="flex flex-col items-center"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#8B0F1A] bg-[#0b0b0b] text-[#E63946] shadow-[0_0_24px_rgba(230,57,70,0.22)]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.38em] text-[#8a8a8a]">
                      {item.title}
                    </p>

                    <p className="text-sm uppercase tracking-[0.28em] text-[#E63946]">
                      {item.subtitle}
                    </p>
                  </div>

                  {index < sideHighlights.length - 1 && (
                    <div className="mt-8 h-14 w-px bg-gradient-to-b from-[#E63946]/70 to-transparent" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 border border-[#2a2a2a] bg-[#0b0b0b]/82 p-3 md:hidden">
          {trustItems.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className="flex items-center gap-3 border border-[#1a1a1a] bg-[#090909] p-3"
              >
                <span className="flex h-8 w-8 items-center justify-center border border-[#8B0F1A] text-[#E63946]">
                  <Icon className="h-4 w-4" />
                </span>

                <span className="text-[9px] font-mono uppercase leading-4 tracking-[0.14em] text-[#BDBDBD]">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-9 hidden items-center justify-center gap-6 text-[10px] font-mono uppercase tracking-[0.28em] text-[#555555] xl:flex">
          <span className="h-px w-28 bg-gradient-to-r from-transparent to-[#E63946]/60" />
          <span>Privacy is our protocol</span>
          <span className="text-[#E63946]">·</span>
          <span>Confidentiality is our standard</span>
          <span className="h-px w-28 bg-gradient-to-l from-transparent to-[#E63946]/60" />
        </div>
      </div>
    </section>
  )
}
