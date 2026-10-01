import React from "react";
import {
  Plane,
  Building2,
  Compass,
  Moon,
  Sparkles,
  Tag,
  ArrowRight,
} from "lucide-react";
import { ServiceTabType } from "../search/TravelSearchWidget";

interface ServicesSectionProps {
  onSelectService: (service: ServiceTabType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const services: {
    id: ServiceTabType;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    badge?: string;
  }[] = [
    {
      id: "flights",
      title: "Flight Ticketing",
      description:
        "Global airline ticketing across 500+ carriers with instant route options, flexible dates, and multi-city routing.",
      icon: Plane,
      accentColor: "bg-sky-50 text-[#2077B1] border-sky-100",
    },
    {
      id: "hotels",
      title: "Hotel Reservations",
      description:
        "From luxury 5-star suites overlooking the Haram to curated beachfront resorts and executive city hotels worldwide.",
      icon: Building2,
      accentColor: "bg-blue-50 text-[#21A6DC] border-blue-100",
    },
    {
      id: "tours",
      title: "Holiday Tour Packages",
      description:
        "Handcrafted itineraries for families, couples, and groups. Complete packages with sightseeing, transfers, and visa guidance.",
      icon: Compass,
      accentColor: "bg-amber-50 text-amber-700 border-amber-100",
    },
    {
      id: "umrah",
      title: "Umrah Services",
      description:
        "Complete spiritual pilgrimage assistance including hotel reservations in Makkah & Madinah, visa processing, and VIP transport.",
      icon: Moon,
      accentColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
      badge: "Specialized",
    },
    {
      id: "hajj",
      title: "Hajj Pilgrimage Support",
      description:
        "Comprehensive Hajj pre-registration counseling, premium Maktab arrangements, and dedicated guide support for a blessed journey.",
      icon: Sparkles,
      accentColor: "bg-indigo-50 text-indigo-700 border-indigo-100",
    },
    {
      id: "special-fares",
      title: "Exclusive Special Fares",
      description:
        "Take advantage of consolidated B2B allocations, extra student baggage allowances, and unpublished private airfares.",
      icon: Tag,
      accentColor: "bg-yellow-50 text-amber-800 border-amber-200",
      badge: "B2B Deals",
    },
  ];

  const handleCardClick = (id: ServiceTabType) => {
    onSelectService(id);
    const el = document.getElementById("search-widget");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="services-section" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#2077B1] uppercase tracking-widest">
              What We Offer
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 mt-2">
              Travel Services, <span className="text-[#2077B1]">Simplified</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Everything you need for seamless domestic and international travel, coordinated directly by experienced travel advisors over WhatsApp.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={() => handleCardClick("flights")}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#2077B1] hover:text-[#175d8d] transition-colors"
            >
              <span>Explore all services</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.id)}
                className="group relative p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white hover:border-[#21A6DC] hover:shadow-xl hover:shadow-sky-950/5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border ${service.accentColor} transition-transform group-hover:scale-110 duration-200`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {service.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FBC615] text-slate-900">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-[#2077B1] transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#2077B1] group-hover:text-[#175d8d]">
                  <span>Get WhatsApp Inquiry</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
