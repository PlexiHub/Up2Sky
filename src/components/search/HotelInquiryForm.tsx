import React, { useState } from "react";
import {
  Building2,
  Calendar,
  Users,
  Star,
  Send,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import {
  HotelInquiryData,
  generateHotelInquiryMessage,
  createWhatsAppUrl,
} from "../../config/whatsapp";

interface HotelInquiryFormProps {
  onInquiryReady: (message: string, title: string) => void;
  prefilledCity?: string;
}

export const HotelInquiryForm: React.FC<HotelInquiryFormProps> = ({
  onInquiryReady,
  prefilledCity,
}) => {
  const [city, setCity] = useState(prefilledCity || "Dubai, UAE");

  const today = new Date();
  const checkInDefault = new Date(today);
  checkInDefault.setDate(checkInDefault.getDate() + 10);
  const checkOutDefault = new Date(checkInDefault);
  checkOutDefault.setDate(checkOutDefault.getDate() + 5);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(formatDate(checkInDefault));
  const [checkOut, setCheckOut] = useState(formatDate(checkOutDefault));
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [category, setCategory] = useState("5-Star Luxury");
  const [budgetPreference, setBudgetPreference] = useState("Standard Best Value");
  const [specialRequests, setSpecialRequests] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please specify your destination city or country.");
      return;
    }
    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    const payload: HotelInquiryData = {
      city,
      checkIn,
      checkOut,
      rooms,
      adults,
      children,
      category,
      budgetPreference,
      specialRequests,
    };

    const message = generateHotelInquiryMessage(payload);

    try {
      const url = createWhatsAppUrl(message);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // preview modal handles it
    }

    onInquiryReady(message, "Hotel Reservation Inquiry");
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
        {/* Destination City */}
        <div className="md:col-span-4">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Destination / City <span className="text-amber-500">*</span>
          </label>
          <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus-within:border-[#21A6DC] transition-all">
            <Building2 className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Dubai, Makkah, London, Bangkok"
              className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Check-in & Check-out */}
        <div className="md:col-span-4 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Check-In
            </label>
            <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
              <Calendar className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
              <input
                type="date"
                value={checkIn}
                min={formatDate(new Date())}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Check-Out
            </label>
            <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
              <Calendar className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Rooms & Guests */}
        <div className="md:col-span-4 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Rooms & Guests
            </label>
            <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
              <Users className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
              <select
                value={`${rooms}-${adults}-${children}`}
                onChange={(e) => {
                  const [r, a, c] = e.target.value.split("-").map(Number);
                  setRooms(r);
                  setAdults(a);
                  setChildren(c);
                }}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="1-1-0">1 Room · 1 Adult</option>
                <option value="1-2-0">1 Room · 2 Adults</option>
                <option value="1-2-1">1 Room · 2 Adults, 1 Child</option>
                <option value="1-2-2">1 Room · 2 Adults, 2 Children</option>
                <option value="2-4-0">2 Rooms · 4 Adults</option>
                <option value="3-6-0">3 Rooms · 6 Adults (Family)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Hotel Category
            </label>
            <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
              <Star className="h-4 w-4 text-[#FBC615] mr-2 shrink-0" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="5-Star Luxury">5-Star Luxury</option>
                <option value="4-Star Premium">4-Star Premium</option>
                <option value="3-Star Standard">3-Star Standard</option>
                <option value="Resort / Beachfront">Resort / Beachfront</option>
                <option value="Near Haram / Walking distance">Near Haram / Walking distance</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Special Requests / Notes */}
      <div className="pt-1">
        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Special Requests / Preferred Hotel Brand (Optional)
        </label>
        <input
          type="text"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="e.g. Twin beds, Breakfast included, Airport transfer, Swissôtel Makkah"
          className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#21A6DC]"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-[#2077B1]" />
          <span>We check exclusive wholesale B2B rates directly for you</span>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-display font-bold text-sm bg-[#FBC615] hover:bg-[#e5b20d] text-slate-900 shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>Send Hotel Inquiry</span>
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
};
