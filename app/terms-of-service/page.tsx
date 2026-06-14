import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | fierfek.nexus",
  description:
    "Terms of service for fierfek.nexus, including service scope, payments, client responsibilities, limitations, and acceptable use.",
}

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>

          <p className="mt-4 text-sm text-[#A3A3A3] leading-relaxed">
            Last updated: June 2026
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#D0D0D0]">
            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                1. Scope of services
              </h2>
              <p className="mt-3">
                fierfek.nexus provides private digital operations, technical
                coordination, privacy-oriented infrastructure support, Monero/XMR
                payment coordination, and related consulting services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                2. No unlawful use
              </h2>
              <p className="mt-3">
                Services may not be used for fraud, extortion, malware,
                unauthorized access, harassment, theft, illegal surveillance,
                sanctions evasion, or any activity that violates applicable law.
                Requests that appear unlawful, abusive, or deceptive may be
                rejected without explanation.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                3. Client responsibility
              </h2>
              <p className="mt-3">
                The client is responsible for providing accurate information,
                lawful instructions, required access, payment details, and clear
                service scope. Delays caused by incomplete or incorrect
                information are the responsibility of the client.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                4. Payments
              </h2>
              <p className="mt-3">
                Payments may be requested in Monero/XMR or another agreed method.
                Work may require partial or full payment before execution. Paid
                work begins only after scope, price, and payment terms are
                accepted.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                5. Refunds
              </h2>
              <p className="mt-3">
                Refunds depend on the nature of the work, time already spent,
                costs incurred, and the agreed scope. Custom, urgent, or
                completed work may not be refundable.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                6. No financial or legal advice
              </h2>
              <p className="mt-3">
                Information provided through this website or related services
                should not be treated as financial, legal, tax, investment, or
                regulatory advice. Clients must obtain qualified professional
                advice when needed.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                7. Service availability
              </h2>
              <p className="mt-3">
                Service availability may vary depending on workload, technical
                requirements, jurisdictional limits, infrastructure availability,
                and operational risk. No guarantee is made that every request
                will be accepted.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                8. Limitation of liability
              </h2>
              <p className="mt-3">
                To the maximum extent permitted by applicable law,
                fierfek.nexus is not responsible for indirect losses,
                third-party failures, blockchain network issues, client misuse,
                loss of credentials, or damages caused by inaccurate
                instructions provided by the client.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                9. Changes to these terms
              </h2>
              <p className="mt-3">
                These terms may be updated as the service evolves. Continued use
                of the website or services after updates means acceptance of the
                revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                10. Contact
              </h2>
              <p className="mt-3">
                For questions about these terms, use one of the contact methods
                listed on the main website.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
