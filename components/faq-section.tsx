"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We exclusively accept Monero (XMR) for all payments. This ensures maximum privacy and security for both parties. No exceptions.",
  },
  {
    question: "Do you keep any logs?",
    answer: "No. We operate on a strict zero-logs policy. We do not collect, store, or share any personal information or usage data.",
  },
  {
    question: "How do I get started?",
    answer: "Contact us through our secure communication channels. We'll discuss your requirements, provide a quote, and guide you through the onboarding process.",
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. We implement industry-leading security practices, end-to-end encryption, and hardened infrastructure to protect your data at all times.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery times vary depending on the service and complexity. We'll provide an estimated timeline during your initial consultation.",
  },
  {
    question: "Can I request custom services?",
    answer: "Yes. We offer custom solutions tailored to your specific needs. Contact us to discuss your requirements and we'll create a proposal.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(3)

  return (
    <section id="faq" className="py-6 md:py-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-6">
          <h2 className="text-[13px] md:text-[15px] font-mono tracking-[0.24em] text-[#E63946] uppercase mb-2 drop-shadow-[0_0_8px_rgba(230,57,70,0.75)]">
            FAQ Preview
          </h2>
          <div className="h-px w-16 bg-[#E63946] shadow-[0_0_12px_rgba(230,57,70,0.85)]" />
        </div>

        {/* FAQ grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="cyber-card rounded-sm overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#141414]/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-[12px] text-[#F2F2F2] pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={14} className="text-[#E63946] shrink-0" />
                ) : (
                  <ChevronDown size={14} className="text-[#A3A3A3] shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 border-t border-[#1a1a1a]">
                  <p className="text-[11px] text-[#A3A3A3] leading-relaxed pt-3">
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
