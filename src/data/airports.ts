export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
}

export const POPULAR_AIRPORTS: Airport[] = [
  { code: "DAC", city: "Dhaka", name: "Hazrat Shahjalal International Airport", country: "Bangladesh" },
  { code: "DXB", city: "Dubai", name: "Dubai International Airport", country: "United Arab Emirates" },
  { code: "JED", city: "Jeddah", name: "King Abdulaziz International Airport", country: "Saudi Arabia" },
  { code: "MED", city: "Madinah", name: "Prince Mohammad bin Abdulaziz Airport", country: "Saudi Arabia" },
  { code: "RUH", city: "Riyadh", name: "King Khalid International Airport", country: "Saudi Arabia" },
  { code: "DOH", city: "Doha", name: "Hamad International Airport", country: "Qatar" },
  { code: "AUH", city: "Abu Dhabi", name: "Zayed International Airport", country: "United Arab Emirates" },
  { code: "LHR", city: "London", name: "Heathrow Airport", country: "United Kingdom" },
  { code: "LGW", city: "London", name: "Gatwick Airport", country: "United Kingdom" },
  { code: "JFK", city: "New York", name: "John F. Kennedy International Airport", country: "United States" },
  { code: "SIN", city: "Singapore", name: "Changi Airport", country: "Singapore" },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi Airport", country: "Thailand" },
  { code: "KUL", city: "Kuala Lumpur", name: "Kuala Lumpur International Airport", country: "Malaysia" },
  { code: "IST", city: "Istanbul", name: "Istanbul Airport", country: "Turkey" },
  { code: "YYZ", city: "Toronto", name: "Toronto Pearson International Airport", country: "Canada" },
  { code: "SYD", city: "Sydney", name: "Sydney Kingsford Smith Airport", country: "Australia" },
  { code: "DEL", city: "New Delhi", name: "Indira Gandhi International Airport", country: "India" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj Airport", country: "India" },
  { code: "CGP", city: "Chittagong", name: "Shah Amanat International Airport", country: "Bangladesh" },
  { code: "ZYL", city: "Sylhet", name: "Osmani International Airport", country: "Bangladesh" },
  { code: "CXB", city: "Cox's Bazar", name: "Cox's Bazar Airport", country: "Bangladesh" },
  { code: "MLE", city: "Malé", name: "Velana International Airport", country: "Maldives" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle Airport", country: "France" },
  { code: "FRA", city: "Frankfurt", name: "Frankfurt Airport", country: "Germany" },
  { code: "AMS", city: "Amsterdam", name: "Amsterdam Airport Schiphol", country: "Netherlands" },
  { code: "KWI", city: "Kuwait City", name: "Kuwait International Airport", country: "Kuwait" },
  { code: "MCT", city: "Muscat", name: "Muscat International Airport", country: "Oman" },
  { code: "BAH", city: "Manama", name: "Bahrain International Airport", country: "Bahrain" },
];

export const POPULAR_AIRLINES = [
  "Any Airline (Best Price)",
  "Biman Bangladesh Airlines",
  "Emirates",
  "Qatar Airways",
  "Saudia",
  "Singapore Airlines",
  "flydubai",
  "Gulf Air",
  "Air Arabia",
  "Turkish Airlines",
  "Malaysia Airlines",
  "Thai Airways",
  "British Airways",
  "Kuwait Airways",
];
