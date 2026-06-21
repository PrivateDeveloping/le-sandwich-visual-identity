// Local augmentation for menu items. The backend is the source of truth for
// price, name, description, category, and availability. The frontend keeps:
//   - Bundled image imports (can't be sent from backend without hosting)
//   - Albanian translations (descriptionAl)
//   - UI tags ("Best Seller", "Staff Pick", etc.)
//
// Joined with API data by `id` in src/hooks/useMenu.ts.

import heroBurger from "@/assets/hero-burger.jpg";
import bbqBurger from "@/assets/bbq-burger.jpg";
import chickenMozarella from "@/assets/chicken-mozarella.jpg";
import chickenSandwich from "@/assets/chicken-sandwich.jpg";
import steakSandwich from "@/assets/steak-sandwich.jpg";
import prosciuttoSandwich from "@/assets/prosciutto-sandwich.jpg";
import veggieSandwich from "@/assets/veggie-sandwich.jpg";
import eggSandwich from "@/assets/egg-sandwich.jpg";
import soup from "@/assets/soup.jpg";
import salad from "@/assets/salad.jpg";
import fries from "@/assets/fries.jpg";

export type MenuTag = "Best Seller" | "Staff Pick" | "Vegetarian" | "New";

export type MenuItemLocal = {
  image: string;
  descriptionAl?: string;
  tags?: MenuTag[];
};

export const MENU_ITEM_LOCAL: Record<string, MenuItemLocal> = {
  "le-burger": {
    image: heroBurger,
    descriptionAl:
      "Mish i bluar me djath të shkrirë, tranguj turshi, domate, qepë, sos shtëpie, rukolla dhe patate të fërguara.",
    tags: ["Best Seller"],
  },
  "bbq-burger": {
    image: bbqBurger,
    descriptionAl:
      "Mish i bluar me djath të shkrirë, qepë të karamelizuara, BBQ sos, domate, rukolla dhe patate të fërguara.",
    tags: ["Staff Pick"],
  },
  "chicken-mozarella": {
    image: chickenMozarella,
    descriptionAl: "Pulë e fërguar me mozarella, domate, rukolla në bukë baget",
  },
  "le-chicken": {
    image: chickenSandwich,
    descriptionAl: "Pulë me thërrime buke, djath gauda, domate, rukolla në bukë baget",
    tags: ["Best Seller"],
  },
  steak: {
    image: steakSandwich,
    descriptionAl: "Ramstek me djath të shkrirë dhe rukolla në bukë baget",
    tags: ["Staff Pick"],
  },
  prosciutto: {
    image: prosciuttoSandwich,
    descriptionAl: "Përshuté e tymosur me kaqkavall, domate, rukolla në bukë baget",
  },
  vegetarian: {
    image: veggieSandwich,
    descriptionAl: "Avokado, mocarella, domate, rukolla në bukë baget",
    tags: ["Vegetarian"],
  },
  "egg-sandwich": {
    image: eggSandwich,
    descriptionAl: "Dy vezë në sy me përshuté dhe djath",
  },
  "daily-soup": { image: soup },
  "mixed-salad": { image: salad },
  "salad-chicken": { image: salad },
  fries: { image: fries },
  extras: { image: fries },
  // Drinks have no images
  "coca-cola": { image: "" },
  "coca-cola-zero": { image: "" },
  "ice-tea": { image: "" },
  "uje-mineral": { image: "" },
  "uje-033": { image: "" },
};
