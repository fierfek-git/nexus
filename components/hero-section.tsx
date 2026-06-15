"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Headphones,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react"

const trustItems = [
  {
    icon: ShieldCheck,
    title: "MISSION",
    subtitle: "REVIEW",
  },
  {
    icon: Wallet,
    title: "XMR",
    subtitle: "ONLY",
  },
  {
    icon: ShieldCheck,
    title: "PRIVATE",
    subtitle: "HANDLING",
  },
  {
    icon: Banknote,
    title: "BANKING",
    subtitle: "COORDINATION",
  },
  {
    icon: Headphones,
    title: "EXECUTIVE",
    subtitle: "SUPPORT",
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

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#1a1a1a] bg-[#050505]">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px]" />

      {/* Red atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_46%,rgba(230,57,70,0.24),transparent_38%),radial-gradient(circle_at_36%_52%,rgba(139,15,26,0.22),transparent_44%)]" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.72))]" />

      {/* Subtle top HUD line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E63946]/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20 lg:px-12 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.92fr_0.26fr]">
          {/* Left content */}
          <div className="max-w-2xl">
            <div className="mb-7 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-[#A3A3A3]">
              <span className="text-[#E63946]">Private by design</span>
              <span className="text-[#555555]">·</span>
              <span>Paid with XMR</span>
              <span className="hidden h-px w-20 bg-[#E63946]/70 sm:block" />
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.055em] text-[#F2F2F2] sm:text-6xl md:text-7xl">
              Private executive
              <br />
              operations.
              <br />
              Paid with{" "}
              <span className="text-[#ff2638] drop-shadow-[0_0_20px_rgba(230,57,70,0.42)]">
                Monero.
              </span>
            </h1>

            <div className="mt-7 h-px w-20 bg-[#E63946]" />

            <p className="mt-7 max-w-xl text-base leading-8 text-[#A3A3A3] md:text-lg">
              Discreet digital, financial, and field support for demanding
              clients who require privacy, coordination, and turnkey execution.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#services"
                className="group inline-flex items-center gap-3 border border-[#E63946] bg-[#E63946] px-7 py-4 text-xs font-bold uppercase tracking-[0.28em] text-white shadow-[0_0_30px_rgba(230,57,70,0.22)] transition hover:bg-[#ff3345] hover:shadow-[0_0_42px_rgba(230,57,70,0.35)]"
              >
                View Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#process"
                className="inline-flex items-center gap-3 border border-[#333333] bg-[#090909]/80 px-7 py-4 text-xs font-bold uppercase tracking-[0.28em] text-[#F2F2F2] transition hover:border-[#E63946] hover:text-white"
              >
                How It Works
                <span className="text-[#E63946]">&lt;&gt;</span>
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-12 hidden max-w-3xl border border-[#2a2a2a] bg-[#0b0b0b]/82 backdrop-blur-sm md:block">
              <div className="grid grid-cols-5 divide-x divide-[#262626]">
                {trustItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={`${item.title}-${item.subtitle}`}
                      className="flex items-center justify-center gap-3 px-3 py-4"
                    >
                      <span className="flex h-9 w-9 items-center justify-center border border-[#8B0F1A] bg-[#101010] text-[#E63946]">
                        <Icon className="h-4 w-4" />
                      </span>

                      <span className="text-[9px] font-mono uppercase leading-4 tracking-[0.16em] text-[#BDBDBD]">
                        {item.title}
                        <br />
                        {item.subtitle}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main image */}
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -inset-8 bg-[#E63946]/20 blur-3xl" />
            <div className="absolute -inset-3 border border-[#E63946]/20" />

            <div className="relative border border-[#8B0F1A]/80 bg-[#060606] p-3 shadow-[0_0_80px_rgba(230,57,70,0.22)]">
              <div className="pointer-events-none absolute inset-0 border border-[#E63946]/25" />

              <div className="pointer-events-none absolute left-0 top-0 h-12 w-12 border-l border-t border-[#E63946]" />
              <div className="pointer-events-none absolute right-0 top-0 h-12 w-12 border-r border-t border-[#E63946]" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-12 border-b border-l border-[#E63946]" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 border-b border-r border-[#E63946]" />

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

          {/* Right vertical highlights */}
          <div className="hidden h-full min-h-[500px] w-full flex-col items-center justify-center gap-8 text-center lg:flex">
            {sideHighlights.map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={`${item.title}-${item.subtitle}`}
                  className="flex flex-col items-center"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#8B0F1A] bg-[#0b0b0b] text-[#E63946] shadow-[0_0_22px_rgba(230,57,70,0.18)]">
                    <Icon className="h-5 w-5" />
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
                    <div className="mt-8 h-12 w-px bg-gradient-to-b from-[#E63946]/60 to-transparent" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile trust strip */}
        <div className="mt-10 grid grid-cols-2 gap-3 border border-[#2a2a2a] bg-[#0b0b0b]/82 p-3 md:hidden">
          {trustItems.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={`${item.title}-${item.subtitle}`}
                className="flex items-center gap-3 border border-[#1a1a1a] bg-[#090909] p-3"
              >
                <span className="flex h-8 w-8 items-center justify-center border border-[#8B0F1A] text-[#E63946]">
                  <Icon className="h-4 w-4" />
                </span>

                <span className="text-[9px] font-mono uppercase leading-4 tracking-[0.14em] text-[#BDBDBD]">
                  {item.title}
                  <br />
                  {item.subtitle}
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-10 hidden items-center justify-center gap-6 text-[10px] font-mono uppercase tracking-[0.28em] text-[#555555] lg:flex">
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
