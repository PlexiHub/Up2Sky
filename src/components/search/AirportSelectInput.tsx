import React, { useState, useRef, useEffect } from "react";
import { MapPin, PlaneTakeoff, PlaneLanding, Search, X } from "lucide-react";
import { POPULAR_AIRPORTS, Airport } from "../../data/airports";

interface AirportSelectInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  isOrigin?: boolean;
  required?: boolean;
}

export const AirportSelectInput: React.FC<AirportSelectInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "City or Airport",
  isOrigin = true,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Parse code if present e.g. "Dhaka (DAC)"
  const codeMatch = value.match(/\(([A-Z]{3})\)/);
  const displayCode = codeMatch ? codeMatch[1] : null;

  // Filter airports based on search term
  const filteredAirports = POPULAR_AIRPORTS.filter((a) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      a.city.toLowerCase().includes(term) ||
      a.code.toLowerCase().includes(term) ||
      a.country.toLowerCase().includes(term) ||
      a.name.toLowerCase().includes(term)
    );
  }).slice(0, 7);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (airport: Airport) => {
    onChange(`${airport.city} (${airport.code})`);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
        {label} {required && <span className="text-amber-500">*</span>}
      </label>

      <div
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className={`group relative flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer bg-white ${
          isOpen
            ? "border-[#21A6DC] ring-2 ring-[#21A6DC]/20 shadow-sm"
            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
        }`}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-[#2077B1] group-hover:bg-[#21A6DC] group-hover:text-white transition-colors">
          {isOrigin ? (
            <PlaneTakeoff className="h-4 w-4" />
          ) : (
            <PlaneLanding className="h-4 w-4" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span
              className={`text-sm font-semibold truncate ${
                value ? "text-slate-800" : "text-slate-400"
              }`}
            >
              {value || placeholder}
            </span>
            {displayCode && (
              <span className="shrink-0 text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-sky-100 text-[#2077B1]">
                {displayCode}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 truncate">
            {value ? "Tap to change city or code" : "Search airport or city"}
          </p>
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-80 max-w-[92vw] rounded-xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type city or airport code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#21A6DC] focus:ring-1 focus:ring-[#21A6DC]"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
            Popular Destinations
          </div>

          <div className="max-h-60 overflow-y-auto space-y-0.5">
            {filteredAirports.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => handleSelect(airport)}
                className="w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-sky-50/80 transition-colors group"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-slate-400 group-hover:text-[#21A6DC]" />
                    <span className="text-xs font-semibold text-slate-800 group-hover:text-[#2077B1]">
                      {airport.city}
                    </span>
                    <span className="text-[11px] text-slate-400">· {airport.country}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate pl-4.5">
                    {airport.name}
                  </div>
                </div>
                <span className="shrink-0 text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 group-hover:bg-[#FBC615] group-hover:text-slate-900 transition-colors">
                  {airport.code}
                </span>
              </button>
            ))}

            {filteredAirports.length === 0 && (
              <div className="p-3 text-center text-xs text-slate-500">
                <p>No airports matched "{searchTerm}"</p>
                <button
                  type="button"
                  onClick={() => {
                    onChange(searchTerm);
                    setIsOpen(false);
                  }}
                  className="mt-1 text-xs text-[#2077B1] font-semibold underline"
                >
                  Use "{searchTerm}" as custom entry
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
