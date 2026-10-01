import React, { useState } from "react";
import {
  Compass,
  Calendar,
  Users,
  Clock,
  Send,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import {
  TourInquiryData,
  generateTourInquiryMessage,
  createWhatsAppUrl,
} from "../../config/whatsapp";
import { WhatsAppIcon } from "../common/WhatsAppIcon";

interface TourInquiryFormProps {
  onInquiryReady: (message: string, title: string) => void;
  prefilledDestination?: string;
}

export const TourInquiryForm: React.FC<TourInquiryFormProps> = ({
  onInquiryReady,
  prefilledDestination,
}) => {
  const [destination, setDestination] = useState(prefilledDestination || "Thailand (Bangkok & Phuket)");

  const today = new Date();
  const departDefault = new Date(today);
  departDefault.setDate(departDefault.getDate() + 20);
  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [travelDate, setTravelDate] = useState(formatDate(departDefault));
  const [travelers, setTravelers] = useState(2);
  const [tourType, setTourType] = useState("Family Holiday");
  const [duration, setDuration] = useState("5 Days / 4 Nights");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setError("Please specify your desired tour destination.");
      return;
    }

    const payload: TourInquiryData = {
      destination,
      travelDate,
      travelers,
      tourType,
      duration,
      specialRequirements,
    };

    const message = generateTourInquiryMessage(payload);

    try {
      const url = createWhatsAppUrl(message);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // preview modal fallback
    }

    onInquiryReady(message, "Tour Package Inquiry");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        {/* Destination */}
        <div className="md:col-span-4">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Destination / Region <span className="text-amber-500">*</span>
          </label>
          <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus-within:border-[#21A6DC] transition-all">
            <Compass className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Malaysia, Turkey, Egypt, Maldives"
              className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Travel Date */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Travel Date
          </label>
          <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
            <Calendar className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
            <input
              type="date"
              value={travelDate}
              min={formatDate(new Date())}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Travelers & Duration */}
        <div className="md:col-span-5 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Travelers
            </label>
            <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
              <Users className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
              <select
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Traveler (Solo)</option>
                <option value={2}>2 Travelers (Couple)</option>
                <option value={3}>3 Travelers</option>
                <option value={4}>4 Travelers (Family)</option>
                <option value={6}>5–8 Travelers (Group)</option>
                <option value={12}>10+ Travelers (Corporate)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Duration
            </label>
            <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
              <Clock className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="3 Days / 2 Nights">3 Days / 2 Nights</option>
                <option value="4 Days / 3 Nights">4 Days / 3 Nights</option>
                <option value="5 Days / 4 Nights">5 Days / 4 Nights</option>
                <option value="7 Days / 6 Nights">7 Days / 6 Nights</option>
                <option value="10 Days / 9 Nights">10 Days / 9 Nights</option>
                <option value="Custom Duration">Custom Duration</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Type & Special Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-4">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Tour Type
          </label>
          <select
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:border-[#21A6DC]"
          >
            <option value="Family Holiday">Family Holiday</option>
            <option value="Honeymoon Special">Honeymoon Special</option>
            <option value="Adventure & Nature">Adventure & Nature</option>
            <option value="Cultural & Historical">Cultural & Historical</option>
            <option value="Luxury Beach Resort">Luxury Beach Resort</option>
            <option value="Corporate / Incentive">Corporate / Incentive</option>
          </select>
        </div>

        <div className="md:col-span-8">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Special Requirements / Sightseeing Preferences
          </label>
          <input
            type="text"
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
            placeholder="e.g. English-speaking guide, halal meals, private transfers, visa support"
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#21A6DC]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <div className="text-xs text-slate-600 flex items-center gap-2">
          <WhatsAppIcon size={16} animateWave={true} className="text-[#25D366]" />
          <span>Our tour curators will design a personalized itinerary via WhatsApp</span>
        </div>

        <button
          type="submit"
          className="relative overflow-visible w-full sm:w-auto px-8 py-3.5 rounded-xl font-display font-bold text-sm bg-[#FBC615] hover:bg-[#e5b20d] text-slate-900 shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
        >
          <WhatsAppIcon size={18} animateWave={true} className="text-[#25D366]" />
          <span>Send Tour Inquiry</span>
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
};
