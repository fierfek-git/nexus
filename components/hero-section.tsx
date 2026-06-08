"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-red-950/40 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.16),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="container relative mx-auto px-4 py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.95fr_0.35fr]">
          {/* Left content */}
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-zinc-400">
              <span className="text-red-400">Private by design.</span>
              <span>Paid with XMR.</span>
              <span className="hidden h-px w-20 bg-red-700/70 sm:block" />
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
              Private executive operations.
              <br />
              Paid with <span className="text-red-500">Monero.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400 md:text-xl">
              Discreet digital, financial, and field support for demanding clients who require privacy,
              coordination, and turnkey execution.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#services"
                className="inline-flex items-center gap-2 rounded-sm border border-red-500 bg-red-500 px-6 py-4 text-xs uppercase tracking-[0.28em] text-white transition hover:bg-red-400"
              >
                View Services
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#process"
                className="inline-flex items-center gap-2 rounded-sm border border-zinc-800 px-6 py-4 text-xs uppercase tracking-[0.28em] text-zinc-200 transition hover:border-red-500 hover:text-white"
              >
                How It Works
                <span className="text-red-500">&lt;&gt;</span>
              </Link>
            </div>
          </div>

          {/* Center image */}
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute inset-0 bg-red-600/20 blur-3xl" />
            <div className="relative border border-red-950/50 bg-black/60 p-2 shadow-[0_0_60px_rgba(220,38,38,0.18)]">
              <Image
                src="/images/hero-character.png"
                alt="Fierfek hero"
                width={900}
                height={1100}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Right vertical highlights */}
          <div className="mx-auto flex h-full min-h-[420px] w-full max-w-[150px] flex-col items-center justify-center gap-10 text-center">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.38em] text-zinc-400">EXECUTIVE</p>
              <p className="text-sm uppercase tracking-[0.28em] text-red-500">CONCIERGE</p>
            </div>

            <div className="h-14 w-px bg-red-700/50" />

            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.38em] text-zinc-400">PAYMENT</p>
              <p className="text-sm uppercase tracking-[0.28em] text-red-500">XMR ONLY</p>
            </div>

            <div className="h-14 w-px bg-red-700/50" />

            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.38em] text-zinc-400">OPERATION</p>
              <p className="text-sm uppercase tracking-[0.28em] text-red-500">ANONYMOUS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
