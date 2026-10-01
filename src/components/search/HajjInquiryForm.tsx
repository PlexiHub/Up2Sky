import React, { useState } from "react";
import {
  Compass,
  Calendar,
  Users,
  Building,
  Send,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import {
  HajjInquiryData,
  generateHajjInquiryMessage,
  createWhatsAppUrl,
} from "../../config/whatsapp";
import { WhatsAppIcon } from "../common/WhatsAppIcon";

interface HajjInquiryFormProps {
  onInquiryReady: (message: string, title: string) => void;
}

export const HajjInquiryForm: React.FC<HajjInquiryFormProps> = ({
  onInquiryReady,
}) => {
  const [departureCity, setDepartureCity] = useState("Dhaka (DAC)");
  const [travelPeriod, setTravelPeriod] = useState("Upcoming Hajj Season (Pre-registration & Booking)");
  const [travelers, setTravelers] = useState(2);
  const [packagePreference, setPackagePreference] = useState("VIP Maktab A (Premium Tents in Mina)");
  const [accommodationPreference, setAccommodationPreference] = useState("5-Star Hotel in Makkah + Luxury Camp");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!departureCity.trim()) {
      setError("Please specify your departure city.");
      return;
    }

    const payload: HajjInquiryData = {
      departureCity,
      travelPeriod,
      travelers,
      packagePreference,
      accommodationPreference,
      additionalRequirements,
    };

    const message = generateHajjInquiryMessage(payload);

    try {
      const url = createWhatsAppUrl(message);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // preview modal handles it
    }

    onInquiryReady(message, "Hajj Pilgrimage Inquiry");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Advisory notice */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-50 border border-sky-200 text-[11px] text-[#2077B1]">
        <ShieldCheck className="h-4 w-4 shrink-0 text-[#21A6DC]" />
        <span>
          Official Hajj agency assistance: Pre-registration guidance, biometric verification, Ministry of Hajj & Umrah quotas, and dedicated Muallim services.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        {/* Departure City */}
        <div className="md:col-span-4">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Departure City <span className="text-amber-500">*</span>
          </label>
          <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus-within:border-[#21A6DC] transition-all">
            <Compass className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
            <input
              type="text"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              placeholder="e.g. Dhaka, Sylhet, London, New York"
              className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Travel Period */}
        <div className="md:col-span-5">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Hajj Season / Registration Status
          </label>
          <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
            <Calendar className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
            <select
              value={travelPeriod}
              onChange={(e) => setTravelPeriod(e.target.value)}
              className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Upcoming Season (New Pre-Registration)">
                Upcoming Season (New Pre-Registration)
              </option>
              <option value="Already Pre-Registered (Serial Number Ready)">
                Already Pre-Registered (Serial Number Ready)
              </option>
              <option value="Short Package (14 - 18 Days Express)">
                Short Package (14 - 18 Days Express)
              </option>
              <option value="Standard Package (30 - 40 Days Full Period)">
                Standard Package (30 - 40 Days Full Period)
              </option>
            </select>
          </div>
        </div>

        {/* Travelers */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Number of Pilgrims
          </label>
          <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
            <Users className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
            <select
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value={1}>1 Pilgrim</option>
              <option value={2}>2 Pilgrims (Husband & Wife)</option>
              <option value={3}>3 Pilgrims</option>
              <option value={4}>4 Pilgrims (Family)</option>
              <option value={6}>5–8 Pilgrims (Family Group)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Package & Accommodation Preference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Package Preference
          </label>
          <select
            value={packagePreference}
            onChange={(e) => setPackagePreference(e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:border-[#21A6DC]"
          >
            <option value="VIP Maktab A (Premium Mina AC Tents with Sofa-beds)">
              VIP Maktab A (Premium Mina AC Tents with Sofa-beds)
            </option>
            <option value="Non-Shifting Package (Stay in Makkah Hotel throughout)">
              Non-Shifting Package (Stay in Makkah Hotel throughout)
            </option>
            <option value="Shifting Package (Aziziyah Building + Makkah Hotel)">
              Shifting Package (Aziziyah Building + Makkah Hotel)
            </option>
            <option value="Executive Custom Hajj Solution">
              Executive Custom Hajj Solution
            </option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Accommodation Preference
          </label>
          <div className="relative flex items-center p-2.5 rounded-xl border border-slate-200 bg-white">
            <Building className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
            <select
              value={accommodationPreference}
              onChange={(e) => setAccommodationPreference(e.target.value)}
              className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="5-Star Hotel in Makkah (Front Row / Clock Tower)">
                5-Star Hotel in Makkah (Front Row / Clock Tower)
              </option>
              <option value="4-Star Walking Distance (Under 400m to Haram)">
                4-Star Walking Distance (Under 400m to Haram)
              </option>
              <option value="Double / Private Room for Couple">
                Double / Private Room for Couple
              </option>
              <option value="Quad Sharing Room (Family Friendly)">
                Quad Sharing Room (Family Friendly)
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Additional requirements */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Additional Requirements / Health Support
        </label>
        <input
          type="text"
          value={additionalRequirements}
          onChange={(e) => setAdditionalRequirements(e.target.value)}
          placeholder="e.g. Elderly parents requiring wheelchair in Mina/Jamarat, direct flights only"
          className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#21A6DC]"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <div className="text-xs text-slate-600 flex items-center gap-2">
          <WhatsAppIcon size={16} animateWave={true} className="text-[#25D366]" />
          <span>Connect with our registered Hajj counselor on WhatsApp</span>
        </div>

        <button
          type="submit"
          className="relative overflow-visible w-full sm:w-auto px-8 py-3.5 rounded-xl font-display font-bold text-sm bg-[#FBC615] hover:bg-[#e5b20d] text-slate-900 shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
        >
          <WhatsAppIcon size={18} animateWave={true} className="text-[#25D366]" />
          <span>Send Hajj Inquiry</span>
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
};
