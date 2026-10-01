import React, { useState } from "react";
import {
  ArrowRightLeft,
  Calendar,
  Plus,
  Trash2,
  Send,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { AirportSelectInput } from "./AirportSelectInput";
import { PassengerCabinPicker } from "./PassengerCabinPicker";
import {
  FlightInquiryData,
  FlightSegment,
  generateFlightInquiryMessage,
  createWhatsAppUrl,
} from "../../config/whatsapp";

interface FlightSearchFormProps {
  onInquiryReady: (message: string, title: string) => void;
  prefilledDestination?: string;
}

export const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  onInquiryReady,
  prefilledDestination,
}) => {
  const [tripType, setTripType] = useState<"Round Trip" | "One Way" | "Multi City">("Round Trip");
  const [from, setFrom] = useState("Dhaka (DAC)");
  const [to, setTo] = useState(prefilledDestination || "Dubai (DXB)");
  
  // Set default dates: Departure tomorrow, Return in 7 days
  const today = new Date();
  const departDefault = new Date(today);
  departDefault.setDate(departDefault.getDate() + 7);
  const returnDefault = new Date(departDefault);
  returnDefault.setDate(returnDefault.getDate() + 7);

  const formatDateForInput = (d: Date) => d.toISOString().split("T")[0];

  const [departureDate, setDepartureDate] = useState(formatDateForInput(departDefault));
  const [returnDate, setReturnDate] = useState(formatDateForInput(returnDefault));

  // Passengers & Cabin
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabin, setCabin] = useState("Economy");
  const [directFlightOnly, setDirectFlightOnly] = useState(false);

  // Multi-city segments
  const [segments, setSegments] = useState<FlightSegment[]>([
    { from: "Dhaka (DAC)", to: "Dubai (DXB)", date: formatDateForInput(departDefault) },
    { from: "Dubai (DXB)", to: "London (LHR)", date: formatDateForInput(returnDefault) },
  ]);

  const [validationError, setValidationError] = useState<string | null>(null);

  // Swap From and To
  const handleSwapAirports = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  // Multi-city segment handlers
  const handleSegmentChange = (index: number, field: keyof FlightSegment, val: string) => {
    const updated = [...segments];
    updated[index] = { ...updated[index], [field]: val };
    setSegments(updated);
  };

  const handleAddSegment = () => {
    if (segments.length >= 5) return;
    const lastSeg = segments[segments.length - 1];
    const nextDate = new Date(lastSeg?.date || departureDate);
    nextDate.setDate(nextDate.getDate() + 4);

    setSegments([
      ...segments,
      {
        from: lastSeg ? lastSeg.to : "Dubai (DXB)",
        to: "",
        date: formatDateForInput(nextDate),
      },
    ]);
  };

  const handleRemoveSegment = (index: number) => {
    if (segments.length <= 2) return;
    setSegments(segments.filter((_, i) => i !== index));
  };

  // Submit and generate WhatsApp message
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (tripType === "Multi City") {
      for (let i = 0; i < segments.length; i++) {
        if (!segments[i].from.trim() || !segments[i].to.trim()) {
          setValidationError(`Please specify both origin and destination for Flight ${i + 1}.`);
          return;
        }
      }
    } else {
      if (!from.trim()) {
        setValidationError("Please specify an origin airport.");
        return;
      }
      if (!to.trim()) {
        setValidationError("Please specify a destination airport.");
        return;
      }
      if (tripType === "Round Trip" && returnDate && departureDate > returnDate) {
        setValidationError("Return date cannot be earlier than departure date.");
        return;
      }
    }

    const payload: FlightInquiryData = {
      tripType,
      from,
      to,
      departureDate,
      returnDate: tripType === "Round Trip" ? returnDate : undefined,
      adults,
      children: childrenCount,
      infants,
      cabin,
      segments: tripType === "Multi City" ? segments : undefined,
      directFlightOnly,
    };

    const message = generateFlightInquiryMessage(payload);

    // Attempt direct dispatch
    try {
      const url = createWhatsAppUrl(message);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // Handled by modal preview
    }

    onInquiryReady(message, `Flight Search (${tripType})`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Trip Type Selector & Direct Flights Checkbox */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div className="inline-flex rounded-xl bg-slate-100 p-1">
          {(["Round Trip", "One Way", "Multi City"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setTripType(type);
                setValidationError(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tripType === type
                  ? "bg-white text-[#2077B1] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
          <input
            type="checkbox"
            checked={directFlightOnly}
            onChange={(e) => setDirectFlightOnly(e.target.checked)}
            className="rounded border-slate-300 text-[#2077B1] focus:ring-[#21A6DC]"
          />
          <span>Direct flights only</span>
        </label>
      </div>

      {validationError && (
        <div className="flex items-center gap-2 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Standard Flights: Round Trip or One Way */}
      {tripType !== "Multi City" ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          {/* Origin & Destination with Swap button */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2 relative">
            <AirportSelectInput
              label="From"
              value={from}
              onChange={setFrom}
              placeholder="e.g. Dhaka (DAC)"
              isOrigin={true}
              required
            />

            {/* Swap Button */}
            <div className="absolute left-1/2 top-9 -translate-x-1/2 z-10 hidden sm:flex">
              <button
                type="button"
                onClick={handleSwapAirports}
                title="Swap origin and destination"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 shadow-xs hover:border-[#21A6DC] hover:text-[#2077B1] hover:rotate-180 transition-all duration-300"
              >
                <ArrowRightLeft className="h-3.5 w-3.5" />
              </button>
            </div>

            <AirportSelectInput
              label="To"
              value={to}
              onChange={setTo}
              placeholder="e.g. Dubai (DXB)"
              isOrigin={false}
              required
            />
          </div>

          {/* Dates */}
          <div
            className={`md:col-span-3 grid ${
              tripType === "Round Trip" ? "grid-cols-2" : "grid-cols-1"
            } gap-2`}
          >
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Departure
              </label>
              <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus-within:border-[#21A6DC] transition-all">
                <Calendar className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
                <input
                  type="date"
                  value={departureDate}
                  min={formatDateForInput(new Date())}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            {tripType === "Round Trip" && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Return
                </label>
                <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus-within:border-[#21A6DC] transition-all">
                  <Calendar className="h-4 w-4 text-[#2077B1] mr-2 shrink-0" />
                  <input
                    type="date"
                    value={returnDate}
                    min={departureDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Travellers & Cabin */}
          <div className="md:col-span-3">
            <PassengerCabinPicker
              adults={adults}
              childrenCount={childrenCount}
              infants={infants}
              cabin={cabin}
              onChange={(data) => {
                setAdults(data.adults);
                setChildrenCount(data.childrenCount);
                setInfants(data.infants);
                setCabin(data.cabin);
              }}
            />
          </div>
        </div>
      ) : (
        /* Multi City Form Layout */
        <div className="space-y-3">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#2077B1] uppercase tracking-wider">
                  Flight {index + 1}
                </span>
                {segments.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSegment(index)}
                    className="inline-flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-800"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-5">
                  <AirportSelectInput
                    label="From"
                    value={segment.from}
                    onChange={(v) => handleSegmentChange(index, "from", v)}
                    placeholder="e.g. Dhaka (DAC)"
                    isOrigin={true}
                  />
                </div>
                <div className="sm:col-span-5">
                  <AirportSelectInput
                    label="To"
                    value={segment.to}
                    onChange={(v) => handleSegmentChange(index, "to", v)}
                    placeholder="e.g. London (LHR)"
                    isOrigin={false}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <div className="relative flex items-center p-3 rounded-xl border border-slate-200 bg-white">
                    <input
                      type="date"
                      value={segment.date}
                      onChange={(e) => handleSegmentChange(index, "date", e.target.value)}
                      className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={handleAddSegment}
              disabled={segments.length >= 5}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-dashed border-[#2077B1] text-[#2077B1] hover:bg-sky-50 transition-colors disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Another Flight</span>
            </button>

            <div className="w-full sm:w-72">
              <PassengerCabinPicker
                adults={adults}
                childrenCount={childrenCount}
                infants={infants}
                cabin={cabin}
                onChange={(data) => {
                  setAdults(data.adults);
                  setChildrenCount(data.childrenCount);
                  setInfants(data.infants);
                  setCabin(data.cabin);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Submission CTA: Brand Yellow Background */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-[#2077B1]" />
          <span>Generates an instant flight quote request on WhatsApp</span>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-display font-bold text-sm bg-[#FBC615] hover:bg-[#e5b20d] text-slate-900 shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>Search Flights</span>
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
};
