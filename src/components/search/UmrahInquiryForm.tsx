import React, { useState } from "react";
import {
  Moon,
  Calendar,
  Users,
  Building,
  Send,
  MessageSquare,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  UmrahInquiryData,
  generateUmrahInquiryMessage,
  createWhatsAppUrl,
} from "../../config/whatsapp";
import { WhatsAppIcon } from "../common/WhatsAppIcon";

interface UmrahInquiryFormProps {
  onInquiryReady: (message: string, title: string) => void;
}

export const UmrahInquiryForm: React.FC<UmrahInquiryFormProps> = ({
  onInquiryReady,
}) => {
  const [departureCity, setDepartureCity] = useState("Dhaka (DAC)");

  const today = new Date();
  const departDefault = new Date(today);
  departDefault.setDate(departDefault.getDate() + 15);
  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [preferredDate, setPreferredDate] = useState(formatDate(departDefault));
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState("10 Nights (5 Makkah + 5 Madinah)");
  const [packagePreference, setPackagePreference] = useState("5-Star VIP Executive");
  const [hotelPreference, setHotelPreference] = useState("Walking distance to Haram (within 200m)");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!departureCity.trim()) {
      setError("Please specify your departure city.");
      return;
    }

    const payload: UmrahInquiryData = {
      departureCity,
      preferredDate,
      travelers,
      nights,
      packagePreference,
      hotelPreference,
      additionalRequirements,
    };

    const message = generateUmrahInquiryMessage(payload);

    try {
      const url = createWhatsAppUrl(message);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // preview modal handles it
    }

    onInquiryReady(message, "Umrah Package Inquiry");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Notice badge */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900">
        <Sparkles className="h-3.5 w-3.5 text-[#FBC615] shrink-0 fill-[#FBC615]" />
        <span>
          Licensed Umrah agency support: Complete visa processing, direct airline ticketing, private GMC transfers & guided Ziyarah included.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        {/* Departure City */}
        <div className="md:col-span-4">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Departure City <span className="text-amber-500">*</span>
          </label>
          <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus-within:border-[#21A6DC] transition-all">
            <Moon className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
            <input
              type="text"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              placeholder="e.g. Dhaka, Chittagong, Sylhet, London"
              className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Preferred Date */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Preferred Travel Date
          </label>
          <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
            <Calendar className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
            <input
              type="date"
              value={preferredDate}
              min={formatDate(new Date())}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Travelers & Duration */}
        <div className="md:col-span-5 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Pilgrims / Travelers
            </label>
            <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
              <Users className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
              <select
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Person</option>
                <option value={2}>2 Persons (Couple)</option>
                <option value={3}>3 Persons (Triple)</option>
                <option value={4}>4 Persons (Quad Family)</option>
                <option value={6}>5–8 Persons (Family Group)</option>
                <option value={12}>10+ Persons (Group)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Duration of Stay
            </label>
            <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
              <Clock className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
              <select
                value={nights}
                onChange={(e) => setNights(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="7 Nights (4 Makkah + 3 Madinah)">7 Nights (4 M + 3 M)</option>
                <option value="10 Nights (5 Makkah + 5 Madinah)">10 Nights (5 M + 5 M)</option>
                <option value="14 Nights (7 Makkah + 7 Madinah)">14 Nights (7 M + 7 M)</option>
                <option value="21 Nights (Full Month / Ramadan)">21 Nights (Extended)</option>
                <option value="Custom Itinerary">Custom Itinerary</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Package & Hotel Preference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Package Category
          </label>
          <select
            value={packagePreference}
            onChange={(e) => setPackagePreference(e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:border-[#21A6DC]"
          >
            <option value="5-Star VIP Executive (Swissôtel / Pullman Zamzam)">
              5-Star VIP Executive (Swissôtel / Pullman Zamzam)
            </option>
            <option value="4-Star Standard Comfort (Clock Tower adjacent)">
              4-Star Standard Comfort (Clock Tower adjacent)
            </option>
            <option value="Economy Saver (Shuttle / 500m walk)">
              Economy Saver (Shuttle / 500m walk)
            </option>
            <option value="Custom Tailored Private Package">
              Custom Tailored Private Package
            </option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Hotel Proximity Preference
          </label>
          <div className="relative flex items-center p-2.5 rounded-xl border border-slate-200 bg-white">
            <Building className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
            <select
              value={hotelPreference}
              onChange={(e) => setHotelPreference(e.target.value)}
              className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Front Row / Direct Haram Courtyard (0m)">Front Row / Direct Courtyard (0m)</option>
              <option value="Walking distance to Haram (within 200m)">Walking distance (within 200m)</option>
              <option value="300m - 500m Comfortable Walking">300m - 500m Comfortable Walking</option>
              <option value="24/7 Dedicated AC Shuttle Bus Service">24/7 Dedicated AC Shuttle Service</option>
            </select>
          </div>
        </div>
      </div>

      {/* Additional requirements */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Special Notes (Senior citizens, Wheelchair, Private GMC, Infant care)
        </label>
        <input
          type="text"
          value={additionalRequirements}
          onChange={(e) => setAdditionalRequirements(e.target.value)}
          placeholder="e.g. Need Saudi tourist / Umrah visa assistance, wheelchair for elderly parent"
          className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#21A6DC]"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <div className="text-xs text-slate-600 flex items-center gap-2">
          <WhatsAppIcon size={16} animateWave={true} className="text-[#25D366]" />
          <span>Instant consultation with our Umrah specialist via WhatsApp</span>
        </div>

        <button
          type="submit"
          className="relative overflow-visible w-full sm:w-auto px-8 py-3.5 rounded-xl font-display font-bold text-sm bg-[#FBC615] hover:bg-[#e5b20d] text-slate-900 shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
        >
          <WhatsAppIcon size={18} animateWave={true} className="text-[#25D366]" />
          <span>Send Umrah Inquiry</span>
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
};
