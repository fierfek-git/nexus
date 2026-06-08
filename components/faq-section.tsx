"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Monero (XMR) for available services. XMR allows private, direct, and censorship-resistant payments. We do not process card payments or traditional payment gateways.",
  },
  {
    question: "Do you collect data, logs, or metadata?",
    answer:
      "No. We do not operate user accounts, login panels, or internal customer profiles. We do not request unnecessary personal data, and we do not collect logs, browsing history, IP addresses, or metadata for commercial tracking. Communication is limited to the channel chosen by the user.",
  },
  {
    question: "How do I get started?",
    answer:
      "Choose the contact channel that fits your needs: SimpleX for private communication, X for quick public contact, or XMRBazaar for inquiries related to services offered on that platform. Then we review the request, scope, price, and delivery method.",
  },
  {
    question: "Can you help improve the privacy of my Bitcoin or crypto funds?",
    answer:
      "We can provide legitimate financial privacy guidance: self-custody best practices, identity separation, wallet hygiene, public exposure reduction, responsible use of privacy tools, and protection against abusive surveillance by authoritarian governments or invasive companies. We do not help hide illicit funds, evade authorities, or erase traces of crimes.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on the type of service, technical complexity, and availability. Before starting, we define the scope, price, and estimated delivery time. Simple services may be completed quickly; custom work requires prior evaluation.",
  },
  {
    question: "Can I request a custom service?",
    answer:
      "Yes. We can evaluate custom services related to digital privacy, technical infrastructure, operational security, automation, digital support, and technical consulting. If the request is viable and legal, we provide a clear proposal before any payment.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-6 md:py-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="mb-6">
          <h2 className="text-[13px] md:text-[15px] font-mono tracking-[0.24em] text-[#E63946] uppercase mb-2 drop-shadow-[0_0_8px_rgba(230,57,70,0.75)]">
            FAQ Preview
          </h2>
          <div className="h-px w-16 bg-[#E63946] shadow-[0_0_12px_rgba(230,57,70,0.85)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {faqs.map((faq, index) => (
            <div key={index} className="cyber-card rounded-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#141414]/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-[12px] md:text-[13px] text-[#F2F2F2] pr-4 leading-relaxed">
                  {faq.question}
                </span>

                {openIndex === index ? (
                  <ChevronUp size={14} className="text-[#E63946] shrink-0" />
                ) : (
                  <ChevronDown size={14} className="text-[#A3A3A3] shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-4 pb-4 border-t border-[#1a1a1a]">
                  <p className="text-[11px] md:text-[12px] text-[#A3A3A3] leading-relaxed pt-3">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
