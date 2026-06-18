"use client"

import { useEffect } from "react"
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
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
    icon: ShieldCheck,
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
    icon: Banknote,
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
      if (event.key === "Escape") {
        onClose()
      }
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
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/82 px-4 py-6 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Mission process"
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto border border-[#E63946] bg-[#080808] shadow-[0_0_70px_rgba(230,57,70,0.24)]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1a1a1a] px-5 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-[#8B0F1A] bg-[#101010] text-[#E63946] shadow-[0_0_18px_rgba(230,57,70,0.18)]">
              <ShieldCheck className="h-4 w-4" />
            </span>

            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#E63946]">
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
        <div className="grid gap-5 p-5 md:grid-cols-[0.95fr_1.05fr] md:p-6">
          {/* Left process cards */}
          <div className="space-y-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon

              return (
                <div
                  key={step.number}
                  className="relative border border-[#2a2a2a] bg-[#0d0d0d]/86 p-4 transition hover:border-[#E63946]/60 hover:shadow-[0_0_28px_rgba(230,57,70,0.14)]"
                >
                  <div className="grid grid-cols-[72px_1fr] gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center border border-[#8B0F1A] bg-[#101010] text-[#E63946] shadow-[0_0_20px_rgba(230,57,70,0.16)]">
                        <Icon className="h-7 w-7" />
                      </div>

                      {index < processSteps.length - 1 && (
                        <div className="absolute top-[72px] h-8 w-px bg-gradient-to-b from-[#E63946]/70 to-transparent" />
                      )}
                    </div>

                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#E63946]">
                        {step.number}
                      </p>

                      <h3 className="mt-2 font-mono text-[13px] uppercase tracking-[0.22em] text-[#ff3345]">
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

          {/* Right visual process panel */}
          <div className="space-y-4">
            <div className="relative overflow-hidden border border-[#8B0F1A]/80 bg-[#090909] p-5 shadow-[inset_0_0_40px_rgba(230,57,70,0.06)]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:34px_34px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(230,57,70,0.18),transparent_48%)]" />

              <div className="relative">
                <div className="pointer-events-none absolute left-0 top-0 h-10 w-10 border-l border-t border-[#E63946]" />
                <div className="pointer-events-none absolute right-0 top-0 h-10 w-10 border-r border-t border-[#E63946]" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-10 border-b border-l border-[#E63946]" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b border-r border-[#E63946]" />

                <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-4">
                  {processSteps.map((step) => {
                    const Icon = step.icon

                    return (
                      <div
                        key={`visual-${step.number}`}
                        className="grid w-full grid-cols-[1fr_120px] items-center gap-4"
                      >
                        <div className="relative flex items-center justify-center border border-[#8B0F1A]/70 bg-[#111111]/90 py-3 shadow-[0_0_22px_rgba(230,57,70,0.13)]">
                          <div className="absolute inset-x-10 top-0 h-px bg-[#E63946]/80" />

                          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8B0F1A] bg-[#0a0a0a] text-[#E63946]">
                            <Icon className="h-5 w-5" />
                          </span>
                        </div>

                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#E63946]">
                            {step.number}
                          </p>
                          <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.2em] text-[#F2F2F2]">
                            {step.title.split(" ")[0]}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="border border-[#2a2a2a] bg-[#0d0d0d]/90 p-5">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#E63946]">
                Operational Summary
              </p>

              <div className="space-y-3">
                {summaryItems.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E63946]" />
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
        <div className="mx-5 border border-[#8B0F1A] bg-[#140608] px-4 py-3 text-[#E63946] md:mx-6">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p className="font-mono text-[10px] uppercase tracking-[0.12em]">
              Unlawful, abusive, deceptive, or unauthorized requests are not
              accepted.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 px-5 py-5 md:flex-row md:px-6">
          <button
            type="button"
            onClick={goToContact}
            className="group inline-flex items-center justify-center gap-3 border border-[#E63946] bg-gradient-to-b from-[#ff3a49] via-[#e62635] to-[#b80f1d] px-8 py-4 text-xs font-semibold uppercase tracking-[0.30em] text-white shadow-[0_0_34px_rgba(230,57,70,0.34)] transition hover:shadow-[0_0_55px_rgba(230,57,70,0.48)]"
          >
            Start Process
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
