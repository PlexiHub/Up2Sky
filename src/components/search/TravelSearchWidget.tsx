import React, { useState } from "react";
import {
  Plane,
  Building2,
  Compass,
  Moon,
  Sparkles,
  Tag,
} from "lucide-react";
import { FlightSearchForm } from "./FlightSearchForm";
import { HotelInquiryForm } from "./HotelInquiryForm";
import { TourInquiryForm } from "./TourInquiryForm";
import { UmrahInquiryForm } from "./UmrahInquiryForm";
import { HajjInquiryForm } from "./HajjInquiryForm";
import { SpecialFareForm } from "./SpecialFareForm";

export type ServiceTabType = "flights" | "hotels" | "tours" | "umrah" | "hajj" | "special-fares";

interface TravelSearchWidgetProps {
  activeTab: ServiceTabType;
  setActiveTab: (tab: ServiceTabType) => void;
  onInquiryReady: (message: string, title: string) => void;
  prefilledDestination?: string;
}

export const TravelSearchWidget: React.FC<TravelSearchWidgetProps> = ({
  activeTab,
  setActiveTab,
  onInquiryReady,
  prefilledDestination,
}) => {
  const tabs: {
    id: ServiceTabType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: "flights", label: "Flights", icon: Plane },
    { id: "hotels", label: "Hotels", icon: Building2 },
    { id: "tours", label: "Tours", icon: Compass },
    { id: "umrah", label: "Umrah", icon: Moon, badge: "Popular" },
    { id: "hajj", label: "Hajj", icon: Sparkles },
    { id: "special-fares", label: "Special Fares", icon: Tag, badge: "Save 25%" },
  ];

  return (
    <div
      id="search-widget"
      className="w-full max-w-6xl mx-auto rounded-3xl bg-white shadow-2xl shadow-sky-950/15 border border-slate-100 overflow-hidden transition-all"
    >
      {/* 6 Service Tabs Bar */}
      <div className="bg-slate-50/90 border-b border-slate-200/80 px-2 sm:px-4 pt-2">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 sm:px-5 py-3 rounded-t-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white text-[#2077B1] shadow-[0_-2px_10px_rgba(0,0,0,0.03)]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                {/* Active Indicator Top Pill/Stripe */}
                {isSelected && (
                  <span className="absolute top-0 left-0 right-0 h-1 bg-[#FBC615] rounded-t-xl" />
                )}

                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-lg transition-colors ${
                    isSelected
                      ? "bg-[#21A6DC] text-white"
                      : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>

                <span>{tab.label}</span>

                {tab.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-[#FBC615] text-slate-900"
                        : "bg-sky-100 text-[#2077B1]"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Panel */}
      <div className="p-4 sm:p-6 lg:p-7 bg-white">
        {activeTab === "flights" && (
          <FlightSearchForm
            onInquiryReady={onInquiryReady}
            prefilledDestination={prefilledDestination}
          />
        )}

        {activeTab === "hotels" && (
          <HotelInquiryForm
            onInquiryReady={onInquiryReady}
            prefilledCity={prefilledDestination}
          />
        )}

        {activeTab === "tours" && (
          <TourInquiryForm
            onInquiryReady={onInquiryReady}
            prefilledDestination={prefilledDestination}
          />
        )}

        {activeTab === "umrah" && (
          <UmrahInquiryForm onInquiryReady={onInquiryReady} />
        )}

        {activeTab === "hajj" && (
          <HajjInquiryForm onInquiryReady={onInquiryReady} />
        )}

        {activeTab === "special-fares" && (
          <SpecialFareForm onInquiryReady={onInquiryReady} />
        )}
      </div>
    </div>
  );
};
