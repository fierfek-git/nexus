import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { XmrPaymentSection } from "@/components/xmr-payment-section"
import { TrustedByDesign } from "@/components/trusted-by-design"
import { PricingIndicator } from "@/components/pricing-indicator"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] relative scanline">
      <Header />
      <HeroSection />
      <ServicesSection />

      <section className="py-6 md:py-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <XmrPaymentSection />
            <TrustedByDesign />
            <PricingIndicator />
          </div>
        </div>
      </section>

      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
