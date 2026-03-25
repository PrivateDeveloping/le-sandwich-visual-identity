import type { MenuItem } from "./brand";

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

export const MENU_ITEMS: MenuItem[] = [
  // BURGERS
  {
    id: "le-burger",
    name: "Le Burger",
    price: 4.3,
    description: "Ground beef, melted cheese, pickles, tomatoes, onions, house sauce, rucola on a bun with fries. Add egg +0.50€",
    descriptionAl: "Mish i bluar me djath të shkrirë, tranguj turshi, domate, qepë, sos shtëpie, rukolla dhe patate të fërguara.",
    image: heroBurger,
    category: "burgers",
    tags: ["Best Seller"],
  },
  {
    id: "bbq-burger",
    name: "BBQ Burger",
    price: 4.3,
    description: "Ground beef, melted cheese, caramelized onions, BBQ sauce, tomatoes, rucola & fries. Add egg +0.50€",
    descriptionAl: "Mish i bluar me djath të shkrirë, qepë të karamelizuara, BBQ sos, domate, rukolla dhe patate të fërguara.",
    image: bbqBurger,
    category: "burgers",
    tags: ["Staff Pick"],
  },
  // SANDWICHES
  {
    id: "chicken-mozarella",
    name: "Chicken Mozarella",
    price: 3.9,
    description: "Grilled chicken, mozarella, tomatoes, rucola on a baguette",
    descriptionAl: "Pulë e fërguar me mozarella, domate, rukolla në bukë baget",
    image: chickenMozarella,
    category: "sandwiches",
  },
  {
    id: "le-chicken",
    name: "Le Chicken",
    price: 3.9,
    description: "Breaded chicken, gauda cheese, tomatoes, rucola on a baguette",
    descriptionAl: "Pulë me thërrime buke, djath gauda, domate, rukolla në bukë baget",
    image: chickenSandwich,
    category: "sandwiches",
    tags: ["Best Seller"],
  },
  {
    id: "steak",
    name: "Steak",
    price: 4.5,
    description: "Steak with melted cheese & rucola on a baguette",
    descriptionAl: "Ramstek me djath të shkrirë dhe rukolla në bukë baget",
    image: steakSandwich,
    category: "sandwiches",
    tags: ["Staff Pick"],
  },
  {
    id: "prosciutto",
    name: "Prosciutto",
    price: 3.9,
    description: "Beef prosciutto, cheese, tomatoes, rucola on a baguette",
    descriptionAl: "Përshuté e tymosur me kaqkavall, domate, rukolla në bukë baget",
    image: prosciuttoSandwich,
    category: "sandwiches",
  },
  {
    id: "vegetarian",
    name: "Vegetarian",
    price: 3.9,
    description: "Avocado, mozarella, tomatoes, rucola on a baguette",
    descriptionAl: "Avokado, mocarella, domate, rukolla në bukë baget",
    image: veggieSandwich,
    category: "sandwiches",
    tags: ["Vegetarian"],
  },
  // OTHER
  {
    id: "egg-sandwich",
    name: "Egg Sandwich",
    price: 2.9,
    description: "Two eggs sunny side with crispy prosciutto & cheese",
    descriptionAl: "Dy vezë në sy me përshuté dhe djath",
    image: eggSandwich,
    category: "other",
  },
  {
    id: "daily-soup",
    name: "Daily Soup",
    price: 2.0,
    description: "Fresh daily soup — ask us what's cooking today!",
    image: soup,
    category: "other",
  },
  {
    id: "mixed-salad",
    name: "Mixed Salad",
    price: 3.5,
    description: "Fresh mixed salad",
    image: salad,
    category: "other",
  },
  {
    id: "salad-chicken",
    name: "Mixed Salad w/ Grilled Chicken",
    price: 3.9,
    description: "Mixed salad with grilled chicken",
    image: salad,
    category: "other",
  },
  {
    id: "fries",
    name: "French Fries w/sauce",
    price: 1.5,
    description: "Crispy golden fries with dipping sauce",
    image: fries,
    category: "other",
  },
  {
    id: "extras",
    name: "Extras (sauce, avocado)",
    price: 0.5,
    description: "Add sauce or avocado to any item",
    image: fries,
    category: "other",
  },
  // DRINKS
  {
    id: "coca-cola",
    name: "Coca Cola",
    price: 1.2,
    description: "330ml",
    image: "",
    category: "drinks",
  },
  {
    id: "coca-cola-zero",
    name: "Coca Cola Zero",
    price: 1.2,
    description: "330ml",
    image: "",
    category: "drinks",
  },
  {
    id: "ice-tea",
    name: "Ice Tea",
    price: 1.2,
    description: "330ml",
    image: "",
    category: "drinks",
  },
  {
    id: "uje-mineral",
    name: "Ujë Mineral",
    price: 1.0,
    description: "Sparkling water",
    image: "",
    category: "drinks",
  },
  {
    id: "uje-033",
    name: "Ujë 0.33l",
    price: 0.5,
    description: "Still water",
    image: "",
    category: "drinks",
  },
];
