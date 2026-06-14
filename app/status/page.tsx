import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Status | fierfek.nexus",
  description:
    "Operational status page for fierfek.nexus services, contact channels, Monero payment coordination, and private digital operations.",
}

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#F2F2F2]">
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          href="/"
          className="text-xs font-mono tracking-[0.18em] uppercase text-[#E63946] hover:text-[#F2F2F2] transition-colors"
        >
          ← Back to Home
        </Link>

        <div className="mt-10 border border-[#2a2a2a] bg-[#111111] p-6 md:p-10">
          <p className="text-xs font-mono tracking-[0.22em] uppercase text-[#E63946]">
            fierfek.nexus
          </p>

          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            Service Status
          </h1>

          <p className="mt-4 text-sm text-[#A3A3A3] leading-relaxed">
            Current operational overview for fierfek.nexus.
          </p>

          <div className="mt-10 space-y-6">
            <div className="border border-[#2a2a2a] bg-[#0d0d0d] p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-[#F2F2F2]">
                  Website
                </h2>
                <span className="text-xs font-mono tracking-[0.16em] uppercase text-green-400">
                  Operational
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#A3A3A3]">
                The public website is available and serving the main landing
                page.
              </p>
            </div>

            <div className="border border-[#2a2a2a] bg-[#0d0d0d] p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-[#F2F2F2]">
                  Contact channels
                </h2>
                <span className="text-xs font-mono tracking-[0.16em] uppercase text-green-400">
                  Available
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#A3A3A3]">
                Contact availability depends on the selected channel, response
                queue, operational workload, and service scope.
              </p>
            </div>

            <div className="border border-[#2a2a2a] bg-[#0d0d0d] p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-[#F2F2F2]">
                  Monero/XMR payment coordination
                </h2>
                <span className="text-xs font-mono tracking-[0.16em] uppercase text-green-400">
                  Available
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#A3A3A3]">
                Payment coordination is available for accepted service requests.
                Blockchain confirmation time depends on the Monero network.
              </p>
            </div>

            <div className="border border-[#2a2a2a] bg-[#0d0d0d] p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-[#F2F2F2]">
                  Private operations
                </h2>
                <span className="text-xs font-mono tracking-[0.16em] uppercase text-yellow-400">
                  Case by case
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#A3A3A3]">
                Each request is reviewed individually. Availability depends on
                legality, risk, scope, urgency, jurisdiction, and operational
                capacity.
              </p>
            </div>
          </div>

          <p className="mt-10 text-xs text-[#777777] leading-relaxed">
            This page is informational. It does not guarantee acceptance of any
            service request.
          </p>
        </div>
      </section>
    </main>
  )
}
