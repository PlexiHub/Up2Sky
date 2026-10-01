import React from "react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { createWhatsAppUrl } from "../../config/whatsapp";

export const FloatingWhatsAppButton: React.FC = () => {
  const waUrl = createWhatsAppUrl(
    "Hello Up 2 Sky Travels, I would like to make an inquiry regarding my upcoming trip."
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in fade-in duration-300">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
        title="Chat with Up 2 Sky Travels on WhatsApp"
      >
        {/* Animated Concentric Wave Rings radiating outward */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-wa-wave pointer-events-none" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-wa-wave-delay pointer-events-none" />

        {/* Original WhatsApp Icon with animated wave motion */}
        <div className="relative z-10 flex items-center justify-center">
          <WhatsAppIcon size={24} animateWave={true} className="text-white" />
        </div>

        <span className="relative z-10 text-xs font-extrabold tracking-wide hidden sm:inline">
          WhatsApp Us
        </span>

        {/* Live indicator dot */}
        <span className="relative z-10 -ml-1 h-2 w-2 rounded-full bg-[#FBC615] animate-ping" />
      </a>
    </div>
  );
};
