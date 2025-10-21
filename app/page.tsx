import HeroSection from "@/components/hero-section"

import TestimonialsSection from "@/components/testimonials"
import BentoGrid from "@/components/kokonutui/bento-grid"
import Pricing from "@/components/pricing"
import FAQsFour from "@/components/faq"
import Footer from "@/components/footer"
import StatsSection from "@/components/stats-4"

export default function Home() {
  return (
    <main className="bg-background">
      <HeroSection />      
      <TestimonialsSection />
      <StatsSection />
      <BentoGrid />
      <FAQsFour/>
      <Pricing />          
      <Footer />
    </main>
  )
}
