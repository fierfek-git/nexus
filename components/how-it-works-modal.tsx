"use client"

import Image from "next/image"
import { useEffect } from "react"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Crosshair,
  Headphones,
  ShieldCheck,
  Wallet,
  X,
} from "lucide-react"

type HowItWorksModalProps = {
  open: boolean
  onClose: () => void
}

const processSteps = [
  {
    number: "01",
    title: "MISSION REVIEW",
    description:
      "Scope, urgency, legality, and feasibility are reviewed before acceptance.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "SECURE CONTACT",
    description:
      "Private coordination continues through the most appropriate channel.",
    icon: Headphones,
  },
  {
    number: "03",
    title: "SCOPE & PAYMENT",
    description:
      "Terms, delivery conditions, and XMR settlement are confirmed.",
    icon: Wallet,
  },
  {
    number: "04",
    title: "PRIVATE EXECUTION",
    description:
      "Work is handled discreetly and delivered according to the agreed scope.",
    icon: ShieldCheck,
  },
]

const summaryItems = [
  "Private review before acceptance",
  "Secure contact channels",
  "Monero-first settlement",
  "Discreet mission delivery",
]

export function HowItWorksModal({ open, onClose }: HowItWorksModalProps) {
  useEffect(() => {
    if (!open) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  function goToContact() {
    onClose()

    window.setTimeout(() => {
      const contactSection = document.getElementById("contact")
      contactSection?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 120)
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/84 px-4 py-6 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Mission process"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-[940px] overflow-y-auto border border-[#E63946] bg-[#080808] shadow-[0_0_80px_rgba(230,57,70,0.24)]"
        onClick={(event) => event.stopPropagation()}
      >
        <style>{`
          @keyframes mission-pulse {
            0%, 100% {
              opacity: 0.42;
            }
            50% {
              opacity: 1;
            }
          }

          .mission-pulse {
            animation: mission-pulse 2.8s ease-in-out infinite;
          }
        `}</style>

        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(230,57,70,0.16),transparent_36%),radial-gradient(circle_at_22%_72%,rgba(139,15,26,0.18),transparent_38%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:42px_42px]" />

        {/* Outer technical corners */}
        <div className="pointer-events-none absolute left-0 top-0 h-12 w-12 border-l border-t border-[#E63946]" />
        <div className="pointer-events-none absolute right-0 top-0 h-12 w-12 border-r border-t border-[#E63946]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-12 border-b border-l border-[#E63946]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 border-b border-r border-[#E63946]" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-[#1a1a1a] px-5 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-[#8B0F1A] bg-[#101010] text-[#E63946] shadow-[0_0_20px_rgba(230,57,70,0.18)]">
              <Crosshair className="h-4 w-4" />
            </span>

            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.34em] text-[#E63946]">
                Mission Process
              </p>
              <p className="mt-1 text-[10px] text-[#777777]">
                Discreet requests. Clear scope. Private execution.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center text-[#E63946] transition hover:bg-[#E63946]/10 hover:text-white"
            aria-label="Close mission process modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="relative grid gap-5 p-5 md:grid-cols-[0.95fr_1.05fr] md:p-6">
          {/* Left process cards */}
          <div className="space-y-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon

              return (
                <div
                  key={step.number}
                  className="group relative overflow-hidden border border-[#2a2a2a] bg-[#0d0d0d]/88 p-4 transition hover:border-[#E63946]/70 hover:shadow-[0_0_32px_rgba(230,57,70,0.16)]"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E63946]/45 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r border-t border-[#E63946]/50 opacity-0 transition group-hover:opacity-100" />
                  <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-8 border-b border-l border-[#E63946]/50 opacity-0 transition group-hover:opacity-100" />

                  <div className="grid grid-cols-[74px_1fr] gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="relative flex h-16 w-16 items-center justify-center border border-[#8B0F1A] bg-[#101010] text-[#E63946] shadow-[0_0_20px_rgba(230,57,70,0.16)]">
                        <div className="pointer-events-none absolute inset-1 border border-[#E63946]/20" />
                        <Icon className="relative h-7 w-7" />
                      </div>

                      {index < processSteps.length - 1 && (
                        <div className="absolute top-[72px] flex h-8 flex-col items-center">
                          <div className="h-7 w-px bg-gradient-to-b from-[#E63946]/80 to-transparent" />
                          <div className="h-1.5 w-1.5 rounded-full bg-[#E63946]" />
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#E63946]">
                        {step.number}
                      </p>

                      <h3 className="mt-2 font-mono text-[13px] uppercase tracking-[0.25em] text-[#ff3345]">
                        {step.title}
                      </h3>

                      <p className="mt-3 max-w-sm text-[12px] leading-6 text-[#BDBDBD]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right visual image panel */}
          <div className="space-y-4">
            <div className="relative overflow-hidden border border-[#8B0F1A]/90 bg-[#050505] p-3 shadow-[inset_0_0_50px_rgba(230,57,70,0.07),0_0_34px_rgba(230,57,70,0.10)]">
              <div className="pointer-events-none absolute left-3 top-3 z-10 h-9 w-9 border-l border-t border-[#E63946]" />
              <div className="pointer-events-none absolute right-3 top-3 z-10 h-9 w-9 border-r border-t border-[#E63946]" />
              <div className="pointer-events-none absolute bottom-3 left-3 z-10 h-9 w-9 border-b border-l border-[#E63946]" />
              <div className="pointer-events-none absolute bottom-3 right-3 z-10 h-9 w-9 border-b border-r border-[#E63946]" />

              <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_55%,rgba(0,0,0,0.45))]" />

              <Image
                src="/images/mission-process-flow.png"
                alt="Mission process workflow: review, contact, payment, execution"
                width={1402}
                height={1122}
                className="relative h-auto w-full object-contain"
                priority={false}
              />
            </div>

            <div className="relative overflow-hidden border border-[#2a2a2a] bg-[#0d0d0d]/92 p-5 transition hover:border-[#E63946]/50 hover:shadow-[0_0_26px_rgba(230,57,70,0.12)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E63946]/35 to-transparent" />

              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.30em] text-[#E63946]">
                Operational Summary
              </p>

              <div className="space-y-3">
                {summaryItems.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#E63946]" />
                    <p className="text-[12px] leading-5 text-[#BDBDBD]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="relative mx-5 border border-[#8B0F1A] bg-[#140608] px-4 py-3 text-[#E63946] shadow-[0_0_26px_rgba(230,57,70,0.10)] md:mx-6">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p className="font-mono text-[10px] uppercase tracking-[0.12em]">
              Unlawful, abusive, deceptive, or unauthorized requests are not
              accepted.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="relative flex flex-col items-center justify-center gap-4 px-5 py-5 md:flex-row md:px-6">
          <button
            type="button"
            onClick={goToContact}
            className="group relative inline-flex overflow-hidden border border-[#E63946] bg-gradient-to-b from-[#ff3a49] via-[#e62635] to-[#b80f1d] px-8 py-4 text-xs font-semibold uppercase tracking-[0.30em] text-white shadow-[0_0_34px_rgba(230,57,70,0.34)] transition hover:shadow-[0_0_55px_rgba(230,57,70,0.48)]"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/45" />
            <span className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-white/10 blur-xl transition-transform duration-700 group-hover:translate-x-40" />

            <span className="relative flex items-center gap-3">
              Start Process
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>

          <button
            type="button"
            onClick={goToContact}
            className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#A3A3A3] transition hover:text-[#F2F2F2]"
          >
            Back to Contact
          </button>
        </div>
      </div>
    </div>
  )
}
