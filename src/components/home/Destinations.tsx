import React from "react";
import { ArrowUpRight, Plane } from "lucide-react";
import { ServiceTabType } from "../search/TravelSearchWidget";

interface DestinationsProps {
  onQuickInquire: (destinationAirport: string, tab?: ServiceTabType) => void;
}

export const Destinations: React.FC<DestinationsProps> = ({ onQuickInquire }) => {
  const destinations = [
    {
      city: "Dubai",
      country: "United Arab Emirates",
      code: "Dubai (DXB)",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      tag: "Top Corporate & Leisure",
      route: "DAC ➔ DXB",
      tab: "flights" as ServiceTabType,
    },
    {
      city: "Makkah & Madinah",
      country: "Saudi Arabia",
      code: "Jeddah (JED)",
      image:
        "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80",
      tag: "Umrah & Ziyarah",
      route: "DAC ➔ JED",
      tab: "umrah" as ServiceTabType,
    },
    {
      city: "London",
      country: "United Kingdom",
      code: "London (LHR)",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
      tag: "Student & Expat Special",
      route: "DAC ➔ LHR",
      tab: "special-fares" as ServiceTabType,
    },
    {
      city: "Kuala Lumpur",
      country: "Malaysia",
      code: "Kuala Lumpur (KUL)",
      image:
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
      tag: "Family Vacation",
      route: "DAC ➔ KUL",
      tab: "flights" as ServiceTabType,
    },
    {
      city: "Bangkok",
      country: "Thailand",
      code: "Bangkok (BKK)",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
      tag: "Shopping & Medical",
      route: "DAC ➔ BKK",
      tab: "tours" as ServiceTabType,
    },
    {
      city: "Istanbul",
      country: "Turkey",
      code: "Istanbul (IST)",
      image:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
      tag: "Heritage & Scenic",
      route: "DAC ➔ IST",
      tab: "flights" as ServiceTabType,
    },
    {
      city: "Singapore",
      country: "Singapore",
      code: "Singapore (SIN)",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
      tag: "Business & Urban",
      route: "DAC ➔ SIN",
      tab: "flights" as ServiceTabType,
    },
    {
      city: "Maldives",
      country: "Indian Ocean",
      code: "Malé (MLE)",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
      tag: "Luxury Honeymoon",
      route: "DAC ➔ MLE",
      tab: "hotels" as ServiceTabType,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-[#2077B1] uppercase tracking-widest">
            Inspiration & Popular Routes
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 mt-2">
            Trending Travel <span className="text-[#2077B1]">Destinations</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Explore our most requested international hubs and holiday spots. Click any destination to populate your WhatsApp inquiry.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              onClick={() => onQuickInquire(dest.code, dest.tab)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Background Image */}
              <img
                src={dest.image}
                alt={dest.city}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-slate-900 backdrop-blur-xs">
                  {dest.tag}
                </span>

                <div className="h-7 w-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#FBC615] group-hover:text-slate-900 transition-colors">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono font-semibold mb-1">
                  <Plane className="h-3 w-3" />
                  <span>{dest.route}</span>
                </div>

                <h3 className="text-xl font-bold font-display text-white group-hover:text-amber-300 transition-colors">
                  {dest.city}
                </h3>
                <p className="text-xs text-slate-300">{dest.country}</p>

                <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] font-semibold text-sky-200 group-hover:text-white">
                  <span>Inquire on WhatsApp</span>
                  <span className="text-[#FBC615]">Instant Quotes →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
