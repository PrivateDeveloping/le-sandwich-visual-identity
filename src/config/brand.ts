// ============================
// LE SANDWICH — BRAND CONFIG
// Edit this file to update menu, prices, promos, WhatsApp, and locations.
// ============================

export const WHATSAPP_NUMBER = "+38344364860";
export const INSTAGRAM_HANDLE = "lesandwichshop";
export const INSTAGRAM_URL = "https://www.instagram.com/lesandwichshop/";

export const LOCATIONS = [
  {
    name: "Location 1",
    address: "Robert Doll 130, Prishtina 10000",
    coords: { lat: 42.6575460434227, lng: 21.1544862255097 },
    hours: "Mon–Sat: 10:00 – 22:00 | Sun: 11:00 – 21:00",
    phone: "+383 44 364 860",
    mapUrl: "https://www.google.com/maps?q=42.6575460434227,21.1544862255097",
  },
  {
    name: "Location 2",
    address: "Rexhep Mala 60, Prishtina 10000",
    coords: { lat: 42.65652703856687, lng: 21.165760567838426 },
    hours: "Mon–Sat: 10:00 – 22:00 | Sun: 11:00 – 21:00",
    phone: "+383 44 364 860",
    mapUrl: "https://www.google.com/maps?q=42.65652703856687,21.165760567838426",
  },
];

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  descriptionAl?: string;
  image: string;
  category: "burgers" | "sandwiches" | "other" | "drinks";
  tags?: ("Best Seller" | "Staff Pick" | "Vegetarian" | "New")[];
  note?: string;
};

export type Promo = {
  title: string;
  subtitle: string;
  description: string;
  active: boolean;
};

export const PROMOS: Promo[] = [
  {
    title: "TUNA TUESDAY",
    subtitle: "Every Tuesday",
    description: "Special tuna sandwich — while supplies last!",
    active: true,
  },
  {
    title: "COMBO DEAL",
    subtitle: "Burger + Fries + Drink",
    description: "Get the full combo for just 6.50€",
    active: true,
  },
  {
    title: "DAILY SOUP",
    subtitle: "Fresh every day",
    description: "Ask us about today's soup — only 2.00€",
    active: true,
  },
];

export const buildWhatsAppUrl = (itemName: string, quantity: number) => {
  const message = encodeURIComponent(
    `Përshëndetje, dua të porosis ${quantity} x ${itemName}.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, "")}?text=${message}`;
};

export const buildGeneralWhatsAppUrl = () => {
  const message = encodeURIComponent("Përshëndetje, dua të bëj një porosi.");
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, "")}?text=${message}`;
};
