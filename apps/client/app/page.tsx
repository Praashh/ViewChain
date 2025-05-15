"use client";
import { Hero } from "@/components/landing/main/hero";
import useGetWalletKey from "@/hooks/useGetWalletKey";
import Navbar from "@/components/ui/main-nav";
import { Features } from "@/components/landing/main/features";
import { Working } from "@/components/landing/main/working";
import { Faq } from "@/components/landing/main/faq";
import { Footer } from "@/components/landing/main/footer";
import { CTA } from "@/components/landing/main/cta";
import Testimonials from "@/components/landing/main/testimonial";

export default function Page() {
  useGetWalletKey();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-4 ">
        <Navbar />
        <Hero />
        <Features />
        <Working />
        <Testimonials />
        <Faq />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
