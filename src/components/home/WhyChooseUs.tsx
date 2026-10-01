import React from "react";
import {
  UserCheck,
  BadgeDollarSign,
  Briefcase,
  HeadphonesIcon,
  Shield,
  Clock,
  Sparkles,
  PlaneTakeoff,
} from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: UserCheck,
      title: "Personalized Travel Assistance",
      description:
        "Every traveler's needs are unique. We take the time to understand your preferred schedules, transit layovers, seat preferences, and budget to find the ideal match.",
      badge: "Tailored to You",
    },
    {
      icon: BadgeDollarSign,
      title: "Competitive Airfares",
      description:
        "By leveraging direct consolidator partnerships and specialized agency allocations, we provide attractive airfares for both individual passengers and group bookings.",
      badge: "Verified Rates",
    },
    {
      icon: Briefcase,
      title: "Complete Travel Solutions",
      description:
        "From air tickets and luxury hotel stays to visa processing, airport meet-and-assist, and full Umrah ground arrangements — manage your entire journey with one contact.",
      badge: "End-to-End",
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Customer Support",
      description:
        "Travel plans change unexpectedly. Our support team is ready on WhatsApp before, during, and after your trip to help with date changes, cancellations, and reissuance.",
      badge: "24/7 Response",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold text-[#2077B1] uppercase tracking-widest">
              The Up 2 Sky Difference
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 mt-2 leading-tight">
              Why Discerning Travelers Choose <span className="text-[#2077B1]">Up 2 Sky Travels</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              We bridge modern travel technology with high-touch human expertise. Rather than dealing with confusing booking engines and non-responsive automated bots, you speak directly with seasoned travel consultants.
            </p>

            {/* Quick Metrics / Reassurance Cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-black font-display text-[#2077B1]">
                  100%
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-0.5">
                  Verified Itineraries
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Official GDS & airline PNR tickets
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-black font-display text-[#FBC615]">
                  &lt; 5 Min
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-0.5">
                  WhatsApp Response
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Real human ticketing agents
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs text-slate-600">
              <Shield className="h-4 w-4 text-[#2077B1] shrink-0" />
              <span>Full compliance with civil aviation regulations & IATA standards</span>
            </div>
          </div>

          {/* Right Column: 4 Value Propositions */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {points.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#21A6DC] hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-[#2077B1]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {pt.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-display text-slate-900 mb-2">
                      {pt.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
