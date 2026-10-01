/**
 * Configuration and helpers for WhatsApp Inquiry Generation
 * Up 2 Sky Travels
 */

// Central configuration variable for WhatsApp number (can be updated here)
export const DEFAULT_WHATSAPP_NUMBER = "+8801812345678";

// Local storage key if user/admin overrides the WhatsApp number in the UI
const STORAGE_KEY = "up2sky_whatsapp_number";

export function getWhatsAppNumber(): string {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim().length >= 8) {
      return saved.trim();
    }
  }
  return DEFAULT_WHATSAPP_NUMBER;
}

export function setWhatsAppNumber(num: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, num.trim());
  }
}

export function cleanPhoneNumber(phone: string): string {
  // Remove all non-numeric characters except leading +
  return phone.replace(/[^0-9]/g, "");
}

export function createWhatsAppUrl(message: string, phone: string = getWhatsAppNumber()): string {
  const cleanPhone = cleanPhoneNumber(phone);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

// Interfaces for inquiries
export interface FlightSegment {
  from: string;
  to: string;
  date: string;
}

export interface FlightInquiryData {
  tripType: "Round Trip" | "One Way" | "Multi City";
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  cabin: string;
  segments?: FlightSegment[];
  directFlightOnly?: boolean;
}

export interface HotelInquiryData {
  city: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
  category: string;
  budgetPreference?: string;
  specialRequests?: string;
}

export interface TourInquiryData {
  destination: string;
  travelDate: string;
  travelers: number;
  tourType: string;
  duration: string;
  specialRequirements?: string;
}

export interface UmrahInquiryData {
  departureCity: string;
  preferredDate: string;
  travelers: number;
  nights: string;
  packagePreference: string;
  hotelPreference: string;
  additionalRequirements?: string;
}

export interface HajjInquiryData {
  departureCity: string;
  travelPeriod: string;
  travelers: number;
  packagePreference: string;
  accommodationPreference: string;
  additionalRequirements?: string;
}

export interface SpecialFareData {
  from: string;
  to: string;
  travelDate: string;
  passengers: number;
  airlinePreference: string;
  additionalRequirements?: string;
}

/**
 * Format structured messages for WhatsApp
 */
export function generateFlightInquiryMessage(data: FlightInquiryData): string {
  const lines: string[] = [
    "Hello Up 2 Sky Travels,",
    "",
    "I would like to request a flight inquiry.",
    "",
    `Trip Type: ${data.tripType}`,
  ];

  if (data.tripType === "Multi City" && data.segments && data.segments.length > 0) {
    lines.push("Flight Segments:");
    data.segments.forEach((seg, idx) => {
      lines.push(`  Segment ${idx + 1}: ${seg.from || "TBD"} ➔ ${seg.to || "TBD"} (${seg.date || "Date flexible"})`);
    });
  } else {
    lines.push(`From: ${data.from || "Not specified"}`);
    lines.push(`To: ${data.to || "Not specified"}`);
    lines.push(`Departure: ${data.departureDate || "Date flexible"}`);
    if (data.tripType === "Round Trip") {
      lines.push(`Return: ${data.returnDate || "Date flexible"}`);
    }
  }

  // Travellers summary
  const travelerParts: string[] = [];
  if (data.adults > 0) travelerParts.push(`${data.adults} Adult${data.adults > 1 ? "s" : ""}`);
  if (data.children > 0) travelerParts.push(`${data.children} Child${data.children > 1 ? "ren" : ""}`);
  if (data.infants > 0) travelerParts.push(`${data.infants} Infant${data.infants > 1 ? "s" : ""}`);
  
  lines.push(`Travellers: ${travelerParts.join(", ") || "1 Adult"}`);
  lines.push(`Cabin: ${data.cabin}`);
  if (data.directFlightOnly) {
    lines.push(`Preference: Direct flights preferred`);
  }

  lines.push("");
  lines.push("Please share the available options and best fare.");
  lines.push("");
  lines.push("Thank you.");

  return lines.join("\n");
}

export function generateHotelInquiryMessage(data: HotelInquiryData): string {
  const lines: string[] = [
    "Hello Up 2 Sky Travels,",
    "",
    "I would like to request a hotel reservation inquiry.",
    "",
    `Destination / City: ${data.city}`,
    `Check-in Date: ${data.checkIn || "Flexible"}`,
    `Check-out Date: ${data.checkOut || "Flexible"}`,
    `Rooms: ${data.rooms}`,
    `Guests: ${data.adults} Adults${data.children > 0 ? `, ${data.children} Children` : ""}`,
    `Hotel Category: ${data.category}`,
  ];

  if (data.budgetPreference) {
    lines.push(`Budget Preference: ${data.budgetPreference}`);
  }
  if (data.specialRequests && data.specialRequests.trim()) {
    lines.push(`Special Requests: ${data.specialRequests.trim()}`);
  }

  lines.push("");
  lines.push("Please share available hotel deals and verified rates.");
  lines.push("");
  lines.push("Thank you.");

  return lines.join("\n");
}

export function generateTourInquiryMessage(data: TourInquiryData): string {
  const lines: string[] = [
    "Hello Up 2 Sky Travels,",
    "",
    "I would like to inquire about a customized tour package.",
    "",
    `Destination: ${data.destination}`,
    `Preferred Travel Date: ${data.travelDate || "Flexible"}`,
    `Number of Travelers: ${data.travelers}`,
    `Tour Type: ${data.tourType}`,
    `Duration: ${data.duration}`,
  ];

  if (data.specialRequirements && data.specialRequirements.trim()) {
    lines.push(`Special Requirements: ${data.specialRequirements.trim()}`);
  }

  lines.push("");
  lines.push("Please send me a detailed itinerary and quotation.");
  lines.push("");
  lines.push("Thank you.");

  return lines.join("\n");
}

export function generateUmrahInquiryMessage(data: UmrahInquiryData): string {
  const lines: string[] = [
    "Hello Up 2 Sky Travels,",
    "",
    "I would like to request an Umrah package inquiry.",
    "",
    `Departure City: ${data.departureCity}`,
    `Preferred Travel Date: ${data.preferredDate || "Flexible"}`,
    `Number of Travelers: ${data.travelers}`,
    `Duration of Stay: ${data.nights}`,
    `Package Category: ${data.packagePreference}`,
    `Hotel Preference: ${data.hotelPreference}`,
  ];

  if (data.additionalRequirements && data.additionalRequirements.trim()) {
    lines.push(`Additional Requirements: ${data.additionalRequirements.trim()}`);
  }

  lines.push("");
  lines.push("Please provide complete package details with airfare, hotel, visa, and transport.");
  lines.push("");
  lines.push("Jazakallahu Khair.");

  return lines.join("\n");
}

export function generateHajjInquiryMessage(data: HajjInquiryData): string {
  const lines: string[] = [
    "Hello Up 2 Sky Travels,",
    "",
    "I would like to request a Hajj pre-registration / package inquiry.",
    "",
    `Departure City: ${data.departureCity}`,
    `Preferred Period: ${data.travelPeriod}`,
    `Number of Pilgrims: ${data.travelers}`,
    `Package Preference: ${data.packagePreference}`,
    `Accommodation Preference: ${data.accommodationPreference}`,
  ];

  if (data.additionalRequirements && data.additionalRequirements.trim()) {
    lines.push(`Special Requirements: ${data.additionalRequirements.trim()}`);
  }

  lines.push("");
  lines.push("Please provide the registration steps, packages, and schedule guidance.");
  lines.push("");
  lines.push("Thank you.");

  return lines.join("\n");
}

export function generateSpecialFareMessage(data: SpecialFareData): string {
  const lines: string[] = [
    "Hello Up 2 Sky Travels,",
    "",
    "I would like to request an exclusive special airfare quote.",
    "",
    `Origin: ${data.from}`,
    `Destination: ${data.to}`,
    `Travel Date: ${data.travelDate || "Flexible"}`,
    `Passengers: ${data.passengers}`,
    `Preferred Airline: ${data.airlinePreference}`,
  ];

  if (data.additionalRequirements && data.additionalRequirements.trim()) {
    lines.push(`Target Budget / Notes: ${data.additionalRequirements.trim()}`);
  }

  lines.push("");
  lines.push("Please check special consolidated/group agent fares for this route.");
  lines.push("");
  lines.push("Thank you.");

  return lines.join("\n");
}
