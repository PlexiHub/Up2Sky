import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Headphones,
  Sparkles,
  Plane,
  Building,
  Palmtree,
  Moon,
  Tag,
  Award,
} from "lucide-react";
import { TravelSearchWidget, ServiceTabType } from "../search/TravelSearchWidget";

interface HeroProps {
  activeTab: ServiceTabType;
  setActiveTab: (tab: ServiceTabType) => void;
  onInquiryReady: (message: string, title: string) => void;
  prefilledDestination?: string;
}

export const Hero: React.FC<HeroProps> = ({
  activeTab,
  setActiveTab,
  onInquiryReady,
  prefilledDestination,
}) => {
  const trustBadges = [
    { icon: Plane, label: "Flight Booking Assistance" },
    { icon: Building, label: "Hotel Reservations" },
    { icon: Palmtree, label: "Tour Packages" },
    { icon: Moon, label: "Umrah & Hajj Certified" },
    { icon: Tag, label: "Special Fare Requests" },
    { icon: Headphones, label: "Personalized Support" },
  ];

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 sm:pb-24 overflow-hidden bg-slate-900">
      {/* Background with Atmospheric Travel Imagery & Blue/Dark Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2074&q=80"
          alt="International flight in the sky"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        {/* Layered brand gradients for depth and search widget contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2077B1]/85 via-slate-900/90 to-[#0F172A]" />
        {/* Subtle geometric aeronautical grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#21A6DC_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Title & Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Brand trust label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-200 text-xs font-medium backdrop-blur-xs mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[#FBC615] fill-[#FBC615]" />
            <span>Modern Travel Solutions · Instant WhatsApp Quotes</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-tight">
            Fly Beyond <span className="text-[#FBC615]">Expectations</span>
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-sky-100/90 max-w-2xl mx-auto leading-relaxed text-balance">
            Your trusted travel agency for wholesale airfares, luxury hotel stays, customized international tours, and licensed Umrah & Hajj services.
          </p>
        </div>

        {/* The Dominant Search Widget */}
        <div className="mb-10 sm:mb-14">
          <TravelSearchWidget
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onInquiryReady={onInquiryReady}
            prefilledDestination={prefilledDestination}
          />
        </div>

        {/* Hero Supporting Trust Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs text-white/90 hover:bg-white/10 transition-colors"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#21A6DC]/20 text-[#FBC615]">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-medium leading-snug">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
