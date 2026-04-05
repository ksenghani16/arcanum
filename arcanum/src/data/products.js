export const PRODUCTS = [
  { id: 1,  title: "Codex Astronomicus",      author: "R. Flammarion",  year: "1874",  price: 4800,  badge: "rare", era: "XIX Century",  emoji: "🌌", category: "science" },
  { id: 2,  title: "Herbarium Magicum",        author: "A. Albertus",    year: "1553",  price: 12200, origPrice: 15000, badge: "rare", era: "XVI Century",  emoji: "🌿", category: "occult"  },
  { id: 3,  title: "Atlas of the New World",   author: "W. Blaeu",       year: "1640",  price: 8750,  badge: "new",  era: "XVII Century", emoji: "🗺️", category: "maps"    },
  { id: 4,  title: "Mechanica Automata",       author: "J. von Kempelen",year: "1783",  price: 3300,  origPrice: 4200, badge: "sale", era: "XVIII Century", emoji: "⚙️", category: "science" },
  { id: 5,  title: "Liber Noctis",             author: "Anonymous",      year: "~1490", price: 22000, badge: "rare", era: "XV Century",   emoji: "🌙", category: "occult"  },
  { id: 6,  title: "Typographia Universalis",  author: "C. Plantin",     year: "1566",  price: 6100,  badge: "new",  era: "XVI Century",  emoji: "📖", category: "arts"    },
  { id: 7,  title: "The Alchemy Compendium",   author: "Paracelsus",     year: "1541",  price: 9800,  badge: "rare", era: "XVI Century",  emoji: "🧪", category: "occult"  },
  { id: 8,  title: "Cartae Mundi Novae",       author: "G. Mercator",    year: "1595",  price: 5200,  origPrice: 6500, badge: "sale", era: "XVI Century",  emoji: "🧭", category: "maps"    },
];

export const CATEGORIES = ["all", "science", "occult", "maps", "arts"];

export const BADGE_LABEL = { rare: "Rare Folio", new: "New Acquisition", sale: "Discounted" };

export const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
