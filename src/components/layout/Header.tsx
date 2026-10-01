import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Menu,
  X,
  Phone,
  Plane,
  Building2,
  Compass,
  Moon,
  Sparkles,
  Tag,
  Clock,
  Mail,
} from "lucide-react";
import { Logo } from "../brand/Logo";
import { getWhatsAppNumber, createWhatsAppUrl } from "../../config/whatsapp";
import { ServiceTabType } from "../search/TravelSearchWidget";

interface HeaderProps {
  onSelectService: (service: ServiceTabType) => void;
  onOpenWhatsAppDirect: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectService,
  onOpenWhatsAppDirect,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const phone = getWhatsAppNumber();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: {
    label: string;
    action: () => void;
    highlight?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      label: "Home",
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setMobileMenuOpen(false);
      },
    },
    {
      label: "Flights",
      action: () => {
        onSelectService("flights");
        setMobileMenuOpen(false);
      },
      icon: Plane,
    },
    {
      label: "Hotels",
      action: () => {
        onSelectService("hotels");
        setMobileMenuOpen(false);
      },
      icon: Building2,
    },
    {
      label: "Tours",
      action: () => {
        onSelectService("tours");
        setMobileMenuOpen(false);
      },
      icon: Compass,
    },
    {
      label: "Umrah",
      action: () => {
        onSelectService("umrah");
        setMobileMenuOpen(false);
      },
      icon: Moon,
    },
    {
      label: "Hajj",
      action: () => {
        onSelectService("hajj");
        setMobileMenuOpen(false);
      },
      icon: Sparkles,
    },
    {
      label: "Special Fares",
      action: () => {
        onSelectService("special-fares");
        setMobileMenuOpen(false);
      },
      highlight: true,
      icon: Tag,
    },
    {
      label: "Contact",
      action: () => {
        const el = document.getElementById("contact-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      },
    },
  ];

  const quickWhatsAppUrl = createWhatsAppUrl(
    "Hello Up 2 Sky Travels, I would like to get in touch regarding my travel requirements."
  );

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#2077B1] text-white text-[11px] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-sky-100">
              <Clock className="h-3 w-3 text-[#FBC615]" />
              Desk Hours: 24/7 WhatsApp & Ticket Issue Support
            </span>
            <span className="flex items-center gap-1.5 text-sky-100">
              <Mail className="h-3 w-3 text-[#FBC615]" />
              support@up2skytravels.com
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 hover:text-[#FBC615] transition-colors font-medium"
            >
              <Phone className="h-3 w-3 text-[#FBC615]" />
              Hotline: {phone}
            </a>
            <span className="text-white/30">|</span>
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Direct WhatsApp Quotes
            </span>
          </div>
        </div>
      </div>

      {/* Main Responsive Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-2.5"
            : "bg-white border-b border-slate-100 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center group cursor-pointer"
          >
            <Logo size="md" variant="color-on-white" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={link.action}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  link.highlight
                    ? "text-[#2077B1] bg-sky-50 hover:bg-[#FBC615] hover:text-slate-900"
                    : "text-slate-700 hover:text-[#2077B1] hover:bg-slate-50"
                }`}
              >
                {link.label}
                {link.highlight && (
                  <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.2 bg-[#FBC615] text-slate-900 rounded-full">
                    Hot
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action: WhatsApp CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-xs shadow-emerald-600/20 transition-all hover:scale-102"
            >
              <MessageSquare className="h-4 w-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>

            <button
              type="button"
              onClick={onOpenWhatsAppDirect}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#2077B1] border border-[#2077B1]/30 hover:bg-sky-50 transition-colors"
            >
              <span>Get in Touch</span>
            </button>
          </div>

          {/* Mobile Hamburger & WhatsApp Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#25D366] text-white"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="h-4 w-4 fill-white" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-1 pb-3 border-b border-slate-100">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={link.action}
                    className="flex items-center gap-2 p-2.5 rounded-lg text-left text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#2077B1] transition-colors"
                  >
                    {Icon && <Icon className="h-3.5 w-3.5 text-[#21A6DC]" />}
                    <span>{link.label}</span>
                    {link.highlight && (
                      <span className="text-[9px] font-bold px-1.5 bg-[#FBC615] text-slate-900 rounded">
                        Hot
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 space-y-2">
              <a
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-xs"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>Chat on WhatsApp Directly</span>
              </a>

              <div className="text-center text-[11px] text-slate-500 pt-1">
                Direct hotline: <span className="font-semibold text-slate-800">{phone}</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
