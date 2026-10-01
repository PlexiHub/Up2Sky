import React, { useState } from "react";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/home/Hero";
import { ServicesSection } from "./components/home/ServicesSection";
import { Destinations } from "./components/home/Destinations";
import { WhyChooseUs } from "./components/home/WhyChooseUs";
import { HowItWorks } from "./components/home/HowItWorks";
import { WhatsAppCTA } from "./components/home/WhatsAppCTA";
import { Footer } from "./components/layout/Footer";
import { WhatsAppPreviewModal } from "./components/common/WhatsAppPreviewModal";
import { FloatingWhatsAppButton } from "./components/common/FloatingWhatsAppButton";
import { ServiceTabType } from "./components/search/TravelSearchWidget";
import { createWhatsAppUrl } from "./config/whatsapp";

export default function App() {
  const [activeTab, setActiveTab] = useState<ServiceTabType>("flights");
  const [prefilledDestination, setPrefilledDestination] = useState<string | undefined>(undefined);

  // WhatsApp Preview Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    message: string;
    serviceTitle: string;
  }>({
    isOpen: false,
    message: "",
    serviceTitle: "",
  });

  const handleInquiryReady = (message: string, serviceTitle: string) => {
    setModalState({
      isOpen: true,
      message,
      serviceTitle,
    });
  };

  const handleSelectService = (service: ServiceTabType) => {
    setActiveTab(service);
    const searchEl = document.getElementById("search-widget");
    if (searchEl) {
      searchEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleQuickInquire = (destinationAirport: string, tab: ServiceTabType = "flights") => {
    setActiveTab(tab);
    setPrefilledDestination(destinationAirport);
    const searchEl = document.getElementById("search-widget");
    if (searchEl) {
      searchEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleOpenWhatsAppDirect = () => {
    const generalMsg =
      "Hello Up 2 Sky Travels,\n\nI would like to get in touch with your travel consultation desk regarding flight and package options.\n\nThank you.";
    try {
      const url = createWhatsAppUrl(generalMsg);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // preview modal handles it
    }
    handleInquiryReady(generalMsg, "General Travel Inquiry");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#3E3E3E] font-sans selection:bg-[#FBC615]/30">
      {/* Responsive Header */}
      <Header
        onSelectService={handleSelectService}
        onOpenWhatsAppDirect={handleOpenWhatsAppDirect}
      />

      <main className="flex-1">
        {/* Hero with Embedded Travel Search Card */}
        <Hero
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onInquiryReady={handleInquiryReady}
          prefilledDestination={prefilledDestination}
        />

        {/* Travel Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Popular Destinations / Routes */}
        <Destinations onQuickInquire={handleQuickInquire} />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* How It Works (3 Steps) */}
        <HowItWorks />

        {/* Bottom WhatsApp Conversion CTA */}
        <WhatsAppCTA onDirectInquiry={handleOpenWhatsAppDirect} />
      </main>

      {/* Footer */}
      <Footer onSelectService={handleSelectService} />

      {/* Floating Sticky WhatsApp button */}
      <FloatingWhatsAppButton />

      {/* WhatsApp Message Preview & Action Confirmation Modal */}
      <WhatsAppPreviewModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        message={modalState.message}
        serviceTitle={modalState.serviceTitle}
      />
    </div>
  );
}
