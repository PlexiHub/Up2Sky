import React, { useState } from "react";
import {
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  X,
  Phone,
  ArrowRight,
  ShieldCheck,
  Edit2,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import {
  getWhatsAppNumber,
  setWhatsAppNumber,
  createWhatsAppUrl,
} from "../../config/whatsapp";

interface WhatsAppPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  serviceTitle: string;
}

export const WhatsAppPreviewModal: React.FC<WhatsAppPreviewModalProps> = ({
  isOpen,
  onClose,
  message,
  serviceTitle,
}) => {
  const [copied, setCopied] = useState(false);
  const [phone, setPhone] = useState(getWhatsAppNumber());
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState(phone);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPhone.trim()) {
      setWhatsAppNumber(newPhone);
      setPhone(newPhone);
      setIsEditingPhone(false);
    }
  };

  const waUrl = createWhatsAppUrl(message, phone);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header with WhatsApp Green / Sky Accent */}
        <div className="bg-gradient-to-r from-[#2077B1] to-[#21A6DC] px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display">
                  WhatsApp Travel Inquiry
                </h3>
                <p className="text-xs text-sky-100">
                  {serviceTitle} · Ready to dispatch
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          {/* Target WhatsApp Hotline Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#2077B1]" />
              <span className="font-semibold text-slate-500">Official Desk:</span>
              <span className="font-mono font-bold text-slate-800">{phone}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setNewPhone(phone);
                setIsEditingPhone(!isEditingPhone);
              }}
              className="inline-flex items-center gap-1 text-[11px] text-[#2077B1] hover:underline font-medium"
            >
              <Edit2 className="h-3 w-3" />
              {isEditingPhone ? "Cancel" : "Change"}
            </button>
          </div>

          {/* Quick inline editor for the WhatsApp number if testing or customizing */}
          {isEditingPhone && (
            <form onSubmit={handleSavePhone} className="flex gap-2">
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="+8801812345678"
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#21A6DC]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#2077B1] text-white hover:bg-[#175d8d]"
              >
                Save
              </button>
            </form>
          )}

          {/* Generated Message Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-600">
                Generated Inquiry Message
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy text</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto select-all">
              {message}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="h-4 w-4 text-[#2077B1] shrink-0" />
            <span>
              Clicking below opens your WhatsApp chat directly with this inquiry pre-filled.
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                // Keep modal open or close shortly
                setTimeout(onClose, 800);
              }}
              className="relative overflow-visible flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.01]"
            >
              <span className="absolute inset-0 rounded-xl bg-[#25D366] animate-wa-wave opacity-50 pointer-events-none" />
              <WhatsAppIcon size={20} animateWave={true} className="relative z-10 text-white" />
              <span className="relative z-10">Send Message on WhatsApp</span>
              <ExternalLink className="relative z-10 h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="sm:w-auto px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Copied to Clipboard" : "Copy Inquiry"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
