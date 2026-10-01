import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Shield,
  Plane,
} from "lucide-react";
import { Logo } from "../brand/Logo";
import { WhatsAppIcon } from "../common/WhatsAppIcon";
import { getWhatsAppNumber, createWhatsAppUrl } from "../../config/whatsapp";
import { ServiceTabType } from "../search/TravelSearchWidget";

interface FooterProps {
  onSelectService: (service: ServiceTabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService }) => {
  const phone = getWhatsAppNumber();
  const waUrl = createWhatsAppUrl("Hello Up 2 Sky Travels, I have a general query.");

  const handleNav = (tab: ServiceTabType) => {
    onSelectService(tab);
    const el = document.getElementById("search-widget");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="contact-section" className="bg-[#1E293B] text-slate-300 border-t border-slate-800">
      {/* Top Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Info & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" variant="light" />

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Up 2 Sky Travels is your premier partner for domestic & international air travel, luxury hotel bookings, custom world tours, and certified Umrah & Hajj arrangements.
            </p>

            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-visible inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-md shadow-emerald-950/20 transition-all hover:scale-102"
              >
                <span className="absolute inset-0 rounded-xl bg-[#25D366] animate-wa-wave opacity-50 pointer-events-none" />
                <WhatsAppIcon size={16} animateWave={true} className="relative z-10 text-white" />
                <span className="relative z-10">Instant WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Travel Services (Col 5-7) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Travel Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("flights")}
                  className="hover:text-[#FBC615] transition-colors cursor-pointer text-left"
                >
                  Worldwide Flight Booking
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("hotels")}
                  className="hover:text-[#FBC615] transition-colors cursor-pointer text-left"
                >
                  Luxury & Haram Hotels
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("tours")}
                  className="hover:text-[#FBC615] transition-colors cursor-pointer text-left"
                >
                  Holiday & Tour Packages
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("umrah")}
                  className="hover:text-[#FBC615] transition-colors cursor-pointer text-left"
                >
                  Executive Umrah Packages
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("hajj")}
                  className="hover:text-[#FBC615] transition-colors cursor-pointer text-left"
                >
                  Hajj Pre-Registration & Maktab
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav("special-fares")}
                  className="hover:text-[#FBC615] transition-colors cursor-pointer text-left"
                >
                  Special Consolidated Fares
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links (Col 8-9) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="#services-section"
                  className="hover:text-white transition-colors"
                >
                  Services Overview
                </a>
              </li>
              <li>
                <a
                  href="#search-widget"
                  className="hover:text-white transition-colors"
                >
                  Flight Inquiry
                </a>
              </li>
              <li>
                <a
                  href="#search-widget"
                  className="hover:text-white transition-colors"
                >
                  Hotel Inquiry
                </a>
              </li>
              <li>
                <a
                  href="#search-widget"
                  className="hover:text-white transition-colors"
                >
                  Special Fares
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone}`}
                  className="hover:text-white transition-colors"
                >
                  Support Hotline
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contact & Desk
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <MapPin className="h-4 w-4 text-[#21A6DC] shrink-0 mt-0.5" />
              <span>
                Suite 402, Sky Tower, Aviation Avenue, Motijheel C/A, Dhaka-1000, Bangladesh
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Phone className="h-4 w-4 text-[#FBC615] shrink-0" />
              <a href={`tel:${phone}`} className="hover:text-white font-mono">
                {phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <WhatsAppIcon size={16} animateWave={true} className="text-[#25D366] shrink-0" />
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp Desk Active
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Mail className="h-4 w-4 text-[#21A6DC] shrink-0" />
              <a href="mailto:info@up2skytravels.com" className="hover:text-white">
                info@up2skytravels.com
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Clock className="h-4 w-4 text-slate-500 shrink-0" />
              <span>Available 24/7 for booking inquiries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Compliance */}
      <div className="border-t border-slate-800 bg-[#0F172A] py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Up 2 Sky Travels. All rights reserved.</span>
            <span>·</span>
            <span>Travel Agency & Tour Operator</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span className="text-amber-400 font-medium">B2B Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
