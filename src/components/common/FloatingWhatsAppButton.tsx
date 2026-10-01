import React from "react";
import { MessageSquare } from "lucide-react";
import { createWhatsAppUrl } from "../../config/whatsapp";

export const FloatingWhatsAppButton: React.FC = () => {
  const waUrl = createWhatsAppUrl(
    "Hello Up 2 Sky Travels, I would like to make an inquiry regarding my upcoming trip."
  );

  return (
    <div className="fixed bottom-5 right-5 z-40 animate-in fade-in duration-300">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-emerald-950/25 transition-all hover:scale-105 active:scale-95"
        title="Chat with Up 2 Sky Travels on WhatsApp"
      >
        <div className="relative">
          <MessageSquare className="h-5 w-5 fill-white text-white" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#FBC615] border-2 border-[#25D366] animate-pulse" />
        </div>
        <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
          WhatsApp Desk
        </span>
      </a>
    </div>
  );
};
