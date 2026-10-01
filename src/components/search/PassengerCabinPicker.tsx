import React, { useState, useRef, useEffect } from "react";
import { Users, Minus, Plus, ChevronDown, Check } from "lucide-react";

interface PassengerCabinPickerProps {
  adults: number;
  childrenCount: number;
  infants: number;
  cabin: string;
  onChange: (data: {
    adults: number;
    childrenCount: number;
    infants: number;
    cabin: string;
  }) => void;
}

const CABIN_CLASSES = [
  { id: "Economy", label: "Economy", desc: "Best value" },
  { id: "Premium Economy", label: "Premium Economy", desc: "Extra legroom & perks" },
  { id: "Business", label: "Business Class", desc: "Priority & lie-flat comfort" },
  { id: "First Class", label: "First Class", desc: "Ultimate luxury & privacy" },
];

export const PassengerCabinPicker: React.FC<PassengerCabinPickerProps> = ({
  adults,
  childrenCount,
  infants,
  cabin,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPassengers = adults + childrenCount + infants;

  const updateCount = (type: "adults" | "childrenCount" | "infants", delta: number) => {
    let newAdults = adults;
    let newChildren = childrenCount;
    let newInfants = infants;

    if (type === "adults") {
      newAdults = Math.max(1, Math.min(9, adults + delta));
      // Infants cannot exceed adults
      if (newInfants > newAdults) newInfants = newAdults;
    } else if (type === "childrenCount") {
      newChildren = Math.max(0, Math.min(8, childrenCount + delta));
    } else if (type === "infants") {
      newInfants = Math.max(0, Math.min(adults, infants + delta));
    }

    onChange({
      adults: newAdults,
      childrenCount: newChildren,
      infants: newInfants,
      cabin,
    });
  };

  const handleCabinSelect = (newCabin: string) => {
    onChange({
      adults,
      childrenCount,
      infants,
      cabin: newCabin,
    });
  };

  return (
    <div className="relative flex-1" ref={containerRef}>
      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
        Travellers & Cabin
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all bg-white ${
          isOpen
            ? "border-[#21A6DC] ring-2 ring-[#21A6DC]/20 shadow-sm"
            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
        }`}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-[#2077B1] group-hover:bg-[#21A6DC] group-hover:text-white transition-colors">
          <Users className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800 truncate">
              {totalPassengers} {totalPassengers === 1 ? "Traveller" : "Travellers"}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-slate-400 transition-transform ${
                isOpen ? "rotate-180 text-[#21A6DC]" : ""
              }`}
            />
          </div>
          <p className="text-[11px] text-slate-500 truncate">{cabin}</p>
        </div>
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute right-0 sm:left-0 top-full z-50 mt-1.5 w-76 max-w-[92vw] rounded-xl border border-slate-200 bg-white p-4 shadow-xl animate-in fade-in zoom-in-95 duration-150">
          {/* Passenger Counters */}
          <div className="space-y-3 pb-3 border-b border-slate-100">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-800">Adults</div>
                <div className="text-[11px] text-slate-400">Age 12+</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={adults <= 1}
                  onClick={() => updateCount("adults", -1)}
                  className="h-7 w-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-5 text-center text-xs font-bold text-slate-800 font-mono">
                  {adults}
                </span>
                <button
                  type="button"
                  disabled={adults >= 9}
                  onClick={() => updateCount("adults", 1)}
                  className="h-7 w-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-800">Children</div>
                <div className="text-[11px] text-slate-400">Age 2–11 yrs</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={childrenCount <= 0}
                  onClick={() => updateCount("childrenCount", -1)}
                  className="h-7 w-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-5 text-center text-xs font-bold text-slate-800 font-mono">
                  {childrenCount}
                </span>
                <button
                  type="button"
                  disabled={childrenCount >= 8}
                  onClick={() => updateCount("childrenCount", 1)}
                  className="h-7 w-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-800">Infants</div>
                <div className="text-[11px] text-slate-400">Under 2 yrs (on lap)</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={infants <= 0}
                  onClick={() => updateCount("infants", -1)}
                  className="h-7 w-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-5 text-center text-xs font-bold text-slate-800 font-mono">
                  {infants}
                </span>
                <button
                  type="button"
                  disabled={infants >= adults}
                  onClick={() => updateCount("infants", 1)}
                  className="h-7 w-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Cabin Selection */}
          <div className="pt-3">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Cabin Class
            </div>
            <div className="grid grid-cols-1 gap-1">
              {CABIN_CLASSES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleCabinSelect(c.id)}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
                    cabin === c.id
                      ? "bg-sky-50 text-[#2077B1] font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{c.label}</span>
                  {cabin === c.id && <Check className="h-3.5 w-3.5 text-[#21A6DC]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Done CTA */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-3 w-full py-1.5 text-xs font-semibold rounded-lg bg-[#2077B1] text-white hover:bg-[#175d8d] transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};
