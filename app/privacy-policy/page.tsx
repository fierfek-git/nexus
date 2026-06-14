import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | fierfek.nexus",
  description:
    "Privacy policy for fierfek.nexus, including data collection, contact methods, Monero payments, and operational privacy.",
}

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-[#A3A3A3] leading-relaxed">
            Last updated: June 2026
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#D0D0D0]">
            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                1. Privacy by design
              </h2>
              <p className="mt-3">
                fierfek.nexus is designed to minimize unnecessary data
                collection. The site exists to present private digital
                services, Monero/XMR payment options, and secure contact
                methods.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                2. Information we do not intentionally collect
              </h2>
              <p className="mt-3">
                We do not require account registration, passwords, identity
                documents, or unnecessary personal information to browse this
                website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                3. Contact information
              </h2>
              <p className="mt-3">
                If you contact us through SimpleX, X, XMRBazaar, email, or any
                other method made available on the site, you control what
                information you choose to share. Any information voluntarily
                provided may be used only to respond to your request, evaluate
                service scope, coordinate delivery, or handle payment.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                4. Monero/XMR payments
              </h2>
              <p className="mt-3">
                Monero payments are handled directly by the client and the
                recipient wallet. Blockchain transactions are not processed by
                this website. Payment coordination may require sharing a
                transaction reference, amount, service scope, or delivery
                details.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                5. Analytics and tracking
              </h2>
              <p className="mt-3">
                This project aims to avoid invasive tracking. If analytics are
                used, they should be limited to basic operational statistics and
                should not be used to build advertising profiles or sell user
                data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                6. Third-party services
              </h2>
              <p className="mt-3">
                The website may be deployed through third-party infrastructure
                providers such as Vercel, domain registrars, DNS providers, or
                external contact platforms. Those providers may process limited
                technical data according to their own policies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                7. Data retention
              </h2>
              <p className="mt-3">
                We aim to retain only the information necessary to manage
                service requests, operational records, payment coordination, and
                legal or administrative obligations.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#F2F2F2]">
                8. Contact
              </h2>
              <p className="mt-3">
                For privacy-related questions, use one of the contact methods
                listed on the main website.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
