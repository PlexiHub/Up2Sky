import { ExternalLink, Phone, ShieldCheck, Clock } from "lucide-react";
import { WhatsAppIcon } from "../common/WhatsAppIcon";
import { getWhatsAppNumber, createWhatsAppUrl } from "../../config/whatsapp";

interface WhatsAppCTAProps {
  onDirectInquiry: () => void;
}

export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({ onDirectInquiry }) => {
  const phone = getWhatsAppNumber();
  const waUrl = createWhatsAppUrl(
    "Hello Up 2 Sky Travels, I am planning a journey and would like to speak with a travel consultant."
  );

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#2077B1] via-[#1a6699] to-[#0d3f61] text-white relative overflow-hidden">
      {/* Decorative subtle aviation curves */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 rounded-full bg-[#21A6DC]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 rounded-full bg-[#FBC615]/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-sky-200 mb-6 backdrop-blur-xs">
          <Clock className="h-3.5 w-3.5 text-[#FBC615]" />
          <span>Average response time: Under 5 minutes</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white mb-4">
          Planning Your Next <span className="text-[#FBC615]">Journey?</span>
        </h2>

        <p className="text-base sm:text-lg text-sky-100/90 max-w-2xl mx-auto leading-relaxed mb-8">
          Send us your travel requirements and our team will assist you on WhatsApp with personalized flight itineraries, verified hotel rates, and custom packages.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-base shadow-xl shadow-emerald-950/20 transition-all hover:scale-102 overflow-visible"
          >
            {/* Wave ring aura around button */}
            <span className="absolute inset-0 rounded-2xl bg-[#25D366] animate-wa-wave opacity-50 pointer-events-none" />
            <WhatsAppIcon size={22} animateWave={true} className="relative z-10 text-white" />
            <span className="relative z-10">Chat on WhatsApp</span>
            <ExternalLink className="relative z-10 h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={onDirectInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-base backdrop-blur-xs transition-colors"
          >
            <Phone className="h-4 w-4 text-[#FBC615]" />
            <span>Call Hotline: {phone}</span>
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-sky-200/80">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#FBC615]" />
            No hidden booking fees
          </span>
          <span>·</span>
          <span>Official airline tickets & PNR validation</span>
          <span>·</span>
          <span>Complete privacy guaranteed</span>
        </div>
      </div>
    </section>
  );
};
