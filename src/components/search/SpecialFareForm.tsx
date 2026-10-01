import React, { useState } from "react";
import {
  Tag,
  Calendar,
  Users,
  Send,
  MessageSquare,
  AlertCircle,
  Percent,
} from "lucide-react";
import { AirportSelectInput } from "./AirportSelectInput";
import { POPULAR_AIRLINES } from "../../data/airports";
import {
  SpecialFareData,
  generateSpecialFareMessage,
  createWhatsAppUrl,
} from "../../config/whatsapp";
import { WhatsAppIcon } from "../common/WhatsAppIcon";

interface SpecialFareFormProps {
  onInquiryReady: (message: string, title: string) => void;
}

export const SpecialFareForm: React.FC<SpecialFareFormProps> = ({
  onInquiryReady,
}) => {
  const [from, setFrom] = useState("Dhaka (DAC)");
  const [to, setTo] = useState("London (LHR)");

  const today = new Date();
  const departDefault = new Date(today);
  departDefault.setDate(departDefault.getDate() + 14);
  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [travelDate, setTravelDate] = useState(formatDate(departDefault));
  const [passengers, setPassengers] = useState(1);
  const [airlinePreference, setAirlinePreference] = useState("Any Airline (Best Price)");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from.trim()) {
      setError("Please specify origin airport.");
      return;
    }
    if (!to.trim()) {
      setError("Please specify destination airport.");
      return;
    }

    const payload: SpecialFareData = {
      from,
      to,
      travelDate,
      passengers,
      airlinePreference,
      additionalRequirements,
    };

    const message = generateSpecialFareMessage(payload);

    try {
      const url = createWhatsAppUrl(message);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // preview modal handles it
    }

    onInquiryReady(message, "Exclusive Special Fare Request");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Promotional Callout Banner */}
      <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-amber-500/10 border border-[#FBC615]/30 text-xs text-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FBC615] text-slate-900 font-black text-[10px]">
            %
          </div>
          <span className="font-semibold text-slate-800">
            B2B Agent Privileges:
          </span>
          <span className="text-slate-600 hidden sm:inline">
            Access offline group allocations, student baggage discounts & unpublished consolidator fares.
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-[#2077B1] bg-sky-100 px-2 py-0.5 rounded">
          SAVE UP TO 25%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        {/* Origin & Destination */}
        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <AirportSelectInput
            label="From"
            value={from}
            onChange={setFrom}
            placeholder="e.g. Dhaka (DAC)"
            isOrigin={true}
            required
          />

          <AirportSelectInput
            label="To"
            value={to}
            onChange={setTo}
            placeholder="e.g. London (LHR)"
            isOrigin={false}
            required
          />
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

        {/* Passenger Count */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Passengers
          </label>
          <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
            <Users className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value={1}>1 Passenger</option>
              <option value={2}>2 Passengers</option>
              <option value={3}>3 Passengers</option>
              <option value={4}>4 Passengers</option>
              <option value={5}>5 Passengers</option>
              <option value={10}>Group (10+ Passengers)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Airline Preference & Target Budget/Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Airline Preference
          </label>
          <div className="relative flex items-center p-2.5 rounded-xl border border-slate-200 bg-white">
            <Tag className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
            <select
              value={airlinePreference}
              onChange={(e) => setAirlinePreference(e.target.value)}
              className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              {POPULAR_AIRLINES.map((airline) => (
                <option key={airline} value={airline}>
                  {airline}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Target Budget / Passenger Type (e.g. Student, Seaman, Group)
          </label>
          <input
            type="text"
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            placeholder="e.g. Student extra 40kg baggage required, budget within $850"
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#21A6DC]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <div className="text-xs text-slate-600 flex items-center gap-2">
          <WhatsAppIcon size={16} animateWave={true} className="text-[#25D366]" />
          <span>Our ticketing desk scans non-GDS agent inventories directly on WhatsApp</span>
        </div>

        <button
          type="submit"
          className="relative overflow-visible w-full sm:w-auto px-8 py-3.5 rounded-xl font-display font-bold text-sm bg-[#FBC615] hover:bg-[#e5b20d] text-slate-900 shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
        >
          <WhatsAppIcon size={18} animateWave={true} className="text-[#25D366]" />
          <span>Request Special Fare</span>
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
};
