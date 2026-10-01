import React from "react";
import { MousePointerClick, FileSpreadsheet, MessageSquare, ArrowRight } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Choose Your Service",
      description:
        "Select Flights, Hotels, Tours, Umrah, Hajj, or Special Fares from our interactive search widget at the top of the page.",
      icon: MousePointerClick,
    },
    {
      step: "02",
      title: "Submit Your Travel Requirement",
      description:
        "Enter your departure city, destination, travel dates, passenger count, and any cabin or hotel preferences.",
      icon: FileSpreadsheet,
    },
    {
      step: "03",
      title: "Get Assistance on WhatsApp",
      description:
        "Click search to automatically format your request into WhatsApp. Our travel specialists will reply with verified flight options and live prices.",
      icon: MessageSquare,
    },
  ];

  const handleScrollToTop = () => {
    const el = document.getElementById("search-widget");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-[#2077B1] uppercase tracking-widest">
            Fast, Personal, Reliable
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 mt-2">
            How It <span className="text-[#2077B1]">Works</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Skip tedious registration forms. We convert your travel inquiry directly into a WhatsApp conversation so you get human answers in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#2077B1] via-[#21A6DC] to-[#FBC615] -translate-y-8 z-0 opacity-30" />

          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Step Number Tag */}
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2077B1] to-[#21A6DC] text-white shadow-md shadow-sky-900/20">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <div className="text-xs font-mono font-bold text-[#FBC615] tracking-wider mb-1">
                  STEP {st.step}
                </div>

                <h3 className="text-lg font-bold font-display text-slate-900 mb-2">
                  {st.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {st.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-xs font-bold text-[#2077B1] hover:border-[#21A6DC] hover:bg-sky-50 shadow-xs transition-all cursor-pointer"
          >
            <span>Start Your Inquiry Now</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
