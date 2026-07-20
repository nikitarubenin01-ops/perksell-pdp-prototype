export interface Variant {
  id: string;
  region: string;
  duration: string;
  monthCount: number;
  price: number;
  retailPrice: number; // Official retail price (HBO Max website) — used for strikethrough
  available: boolean;
  popular?: boolean;
  sellersCount: number;
}

export interface Seller {
  id: string;
  name: string;
  initials: string;
  color: string;
  rating: number;
  ratingLabel: string;
  totalOrders: number;
  itemSalesLast30: number;
  successRate: number;
  deliveryMode: "instant" | "manual";
  deliveryTime: string;
  price: number; // base price (1 Month / default)
  prices?: Record<string, number>; // prices by duration key
  isRecommended?: boolean;
  verifiedSince: string;
  verificationDetails: string[];
  disputeRate: number;
  lastSale: string;
  memberSince: string;
  replacements: "unlimited" | number; // replacements policy for account-type products
}

export interface Review {
  id: string;
  author: string;
  country: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  variant: string;
  helpfulCount: number;
}

export interface AlsoAvailableItem {
  id: string;
  region: string;
  duration: string;
  price: number;
  sellersCount: number;
  flag: string;
}

// All regions available for this product
export const REGIONS = ["Global", "Spain", "US", "EU"];

// All durations available for this product
export const DURATIONS = ["6 Months", "12 Months"];

// Full variant matrix — not every combination exists
export const variants: Variant[] = [
  // Global — retailPrice = MAX Standard plan official price × months (max.com: $15.99/mo)
  { id: "global-1m",  region: "Global", duration: "1 Month",   monthCount: 1,  price: 14.67, retailPrice: 15.99,  available: true,  popular: false, sellersCount: 51 },
  { id: "global-3m",  region: "Global", duration: "3 Months",  monthCount: 3,  price: 16.19, retailPrice: 47.97,  available: true,  popular: false, sellersCount: 28 },
  { id: "global-6m",  region: "Global", duration: "6 Months",  monthCount: 6,  price: 28.99, retailPrice: 95.94,  available: true,  popular: false, sellersCount: 14 },
  { id: "global-12m", region: "Global", duration: "12 Months", monthCount: 12, price: 49.99, retailPrice: 191.88, available: true,  popular: false, sellersCount: 31 },
  // Spain — MAX Standard ES: €13.99/mo (max.com/es)
  { id: "es-1m",      region: "Spain",  duration: "1 Month",   monthCount: 1,  price: 11.49, retailPrice: 13.99,  available: true,  popular: false, sellersCount: 18 },
  { id: "es-3m",      region: "Spain",  duration: "3 Months",  monthCount: 3,  price: 13.20, retailPrice: 41.97,  available: true,  popular: false, sellersCount: 9  },
  { id: "es-6m",      region: "Spain",  duration: "6 Months",  monthCount: 6,  price: 23.50, retailPrice: 83.94,  available: false, popular: false, sellersCount: 0  },
  { id: "es-12m",     region: "Spain",  duration: "12 Months", monthCount: 12, price: 39.99, retailPrice: 167.88, available: true,  popular: false, sellersCount: 14 },
  // US — MAX Standard US: $15.99/mo (max.com)
  { id: "us-1m",      region: "US",     duration: "1 Month",   monthCount: 1,  price: 12.49, retailPrice: 15.99, available: true,  popular: false, sellersCount: 11 },
  { id: "us-3m",      region: "US",     duration: "3 Months",  monthCount: 3,  price: 14.80, retailPrice: 47.97, available: false, popular: false, sellersCount: 0  },
  { id: "us-6m",      region: "US",     duration: "6 Months",  monthCount: 6,  price: 25.99, retailPrice: 95.94, available: false, popular: false, sellersCount: 0  },
  { id: "us-12m",     region: "US",     duration: "12 Months", monthCount: 12, price: 44.99, retailPrice: 191.88, available: false, popular: false, sellersCount: 0  },
  // EU — MAX Standard EU: €13.99/mo
  { id: "eu-1m",      region: "EU",     duration: "1 Month",   monthCount: 1,  price: 12.99, retailPrice: 13.99, available: true,  popular: false, sellersCount: 22 },
  { id: "eu-3m",      region: "EU",     duration: "3 Months",  monthCount: 3,  price: 15.50, retailPrice: 41.97, available: true,  popular: false, sellersCount: 12 },
  { id: "eu-6m",      region: "EU",     duration: "6 Months",  monthCount: 6,  price: 26.99, retailPrice: 83.94, available: true,  popular: false, sellersCount: 7  },
  { id: "eu-12m",     region: "EU",     duration: "12 Months", monthCount: 12, price: 46.99, retailPrice: 167.88, available: false, popular: false, sellersCount: 0  },
];

export const sellers: Seller[] = [
  {
    id: "s1",
    name: "CineCD",
    initials: "CI",
    color: "#2563EB",
    rating: 4.66,
    ratingLabel: "Excellent",
    totalOrders: 12847,
    itemSalesLast30: 124,
    successRate: 99.2,
    deliveryMode: "instant",
    deliveryTime: "< 1 min",
    price: 14.67,
    prices: { "6 Months": 28.99, "12 Months": 49.99 },
    isRecommended: true,
    verifiedSince: "Mar 2022",
    verificationDetails: [
      "Identity verified by Perksell",
      "Payment method verified",
      "12,847 completed orders",
      "99.2% successful delivery rate",
      "Active dispute resolution < 24h",
    ],
    disputeRate: 0.8,
    lastSale: "3 min ago",
    memberSince: "March 2022",
    replacements: "unlimited",
  },
  {
    id: "s2",
    name: "StreamVault",
    initials: "SV",
    color: "#0891B2",
    rating: 4.58,
    ratingLabel: "Excellent",
    totalOrders: 9341,
    itemSalesLast30: 89,
    successRate: 98.9,
    deliveryMode: "instant",
    deliveryTime: "< 2 min",
    price: 15.20,
    prices: { "6 Months": 30.40, "12 Months": 52.99 },
    verifiedSince: "Jun 2022",
    verificationDetails: [
      "Identity verified by Perksell",
      "Payment method verified",
      "9,341 completed orders",
      "98.9% successful delivery rate",
    ],
    disputeRate: 1.1,
    lastSale: "8 min ago",
    memberSince: "June 2022",
    replacements: "unlimited",
  },
  {
    id: "s3",
    name: "PlayEX",
    initials: "PL",
    color: "#7C3AED",
    rating: 4.61,
    ratingLabel: "Excellent",
    totalOrders: 8234,
    itemSalesLast30: 87,
    successRate: 98.6,
    deliveryMode: "instant",
    deliveryTime: "< 2 min",
    price: 16.19,
    prices: { "6 Months": 32.38, "12 Months": 55.99 },
    verifiedSince: "Aug 2022",
    verificationDetails: [
      "Identity verified by Perksell",
      "Payment method verified",
      "8,234 completed orders",
      "98.6% successful delivery rate",
    ],
    disputeRate: 1.4,
    lastSale: "12 min ago",
    memberSince: "August 2022",
    replacements: "unlimited",
  },
  {
    id: "s4",
    name: "DigitalHub",
    initials: "DH",
    color: "#0891B2",
    rating: 4.53,
    ratingLabel: "Very Good",
    totalOrders: 5612,
    itemSalesLast30: 43,
    successRate: 97.8,
    deliveryMode: "manual",
    deliveryTime: "up to 15 min",
    price: 13.99,
    prices: { "6 Months": 27.98, "12 Months": 47.99 },
    verifiedSince: "Jan 2023",
    verificationDetails: [
      "Identity verified by Perksell",
      "Payment method verified",
      "5,612 completed orders",
      "97.8% successful delivery rate",
    ],
    disputeRate: 2.2,
    lastSale: "1h ago",
    memberSince: "January 2023",
    replacements: 3,
  },
  {
    id: "s5",
    name: "SubStore",
    initials: "SS",
    color: "#059669",
    rating: 4.48,
    ratingLabel: "Very Good",
    totalOrders: 3891,
    itemSalesLast30: 31,
    successRate: 97.1,
    deliveryMode: "instant",
    deliveryTime: "< 3 min",
    price: 14.20,
    prices: { "6 Months": 28.40, "12 Months": 50.99 },
    verifiedSince: "Apr 2023",
    verificationDetails: [
      "Identity verified by Perksell",
      "Payment method verified",
      "3,891 completed orders",
    ],
    disputeRate: 2.9,
    lastSale: "2h ago",
    memberSince: "April 2023",
    replacements: "unlimited",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Alejandro M.",
    country: "ES",
    rating: 5,
    date: "May 28, 2026",
    text: "Instant delivery, worked perfectly. Already activated on my account. CineCD is reliable as always.",
    verified: true,
    variant: "1 Month · Global",
    helpfulCount: 34,
  },
  {
    id: "r2",
    author: "Sarah K.",
    country: "DE",
    rating: 5,
    date: "May 24, 2026",
    text: "Got the subscription code in under 30 seconds. No issues with activation. Will buy again.",
    verified: true,
    variant: "1 Month · Global",
    helpfulCount: 21,
  },
  {
    id: "r3",
    author: "Lucas P.",
    country: "FR",
    rating: 4,
    date: "May 19, 2026",
    text: "Good price, delivery was instant. Minor issue with first activation attempt but support resolved it in 10 minutes.",
    verified: true,
    variant: "3 Months · Global",
    helpfulCount: 18,
  },
  {
    id: "r4",
    author: "Maria T.",
    country: "ES",
    rating: 5,
    date: "May 15, 2026",
    text: "Best price I found anywhere. Perksell buyer protection gave me confidence to try. Smooth experience.",
    verified: true,
    variant: "1 Month · Spain",
    helpfulCount: 29,
  },
  {
    id: "r5",
    author: "Thomas B.",
    country: "DE",
    rating: 5,
    date: "Jun 1, 2026",
    text: "Third time buying here. Always instant, always works. The protection policy is what keeps me coming back.",
    verified: true,
    variant: "3 Months · EU",
    helpfulCount: 12,
  },
  {
    id: "r6",
    author: "Elena V.",
    country: "ES",
    rating: 4,
    date: "Jun 3, 2026",
    text: "Delivery was fast, activation worked first try. Price was better than official store by a good margin.",
    verified: true,
    variant: "1 Month · Spain",
    helpfulCount: 7,
  },
];

export const productStats = {
  totalSold: 1847,
  soldLast30Days: 312,
  rating: 4.6,
  reviewCount: 258,
  sellerCount: 51,
  successRate: 98.7,
  platformBuyersTotal: 50000,
  platformRating: 4.8,
  viewingNow: 14,
  lastPurchaseAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
};

export const protectionItems = [
  {
    icon: "shield",
    title: "Access guarantee",
    description:
      "If your access stops working at any point during the subscription period, the seller provides a replacement at no extra cost. If unresolved within 24h, Perksell issues a full refund.",
    color: "green",
  },
  {
    icon: "zap",
    title: "Instant access delivery",
    description:
      "Login credentials are delivered automatically after payment confirmation. You get immediate access — usually under 1 minute for instant sellers.",
    color: "amber",
  },
  {
    icon: "lock",
    title: "Escrow payment",
    description:
      "Your payment is held securely by Perksell until access is confirmed. Sellers receive funds only after successful delivery — your money is protected at every step.",
    color: "blue",
  },
  {
    icon: "headphones",
    title: "Support within 2h",
    description:
      "Our team responds to access issues within 2 hours. Replacement requests and disputes are resolved within 24–48 hours.",
    color: "purple",
  },
];

// "Also available" — other regions of the same product for cross-navigation
export const alsoAvailableItems: AlsoAvailableItem[] = [
  { id: "aa1", region: "Spain",  duration: "1 Month",  price: 11.49, sellersCount: 18, flag: "🇪🇸" },
  { id: "aa2", region: "EU",     duration: "1 Month",  price: 12.99, sellersCount: 22, flag: "🇪🇺" },
  { id: "aa3", region: "US",     duration: "1 Month",  price: 12.49, sellersCount: 11, flag: "🇺🇸" },
  { id: "aa4", region: "Global", duration: "3 Months", price: 16.19, sellersCount: 28, flag: "🌍" },
  { id: "aa5", region: "EU",     duration: "3 Months", price: 15.50, sellersCount: 12, flag: "🇪🇺" },
];

export interface RelatedProduct {
  id: string;
  name: string;
  shortName: string;
  category: string;
  fromPrice: number;        // cheapest offer on marketplace
  retailPrice: number;      // official monthly price
  rating: number;           // 0–5
  reviewCount: number;
  sellersCount: number;
  color: string;            // brand accent for avatar bg
  initials: string;         // 2-char logo fallback
  tag?: string;             // optional badge e.g. "Best value"
  imageUrl: string;         // cover image for card
}

export const relatedProducts: RelatedProduct[] = [
  {
    id: "rp1",
    name: "Netflix Standard · 1 Month",
    shortName: "Netflix",
    category: "Streaming",
    fromPrice: 11.99,
    retailPrice: 15.49,
    rating: 4.7,
    reviewCount: 3241,
    sellersCount: 44,
    color: "#E50914",
    initials: "NF",
    tag: "Most popular",
    imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=280&fit=crop",
  },
  {
    id: "rp2",
    name: "Disney+ Standard · 1 Month",
    shortName: "Disney+",
    category: "Streaming",
    fromPrice: 7.49,
    retailPrice: 8.99,
    rating: 4.5,
    reviewCount: 1876,
    sellersCount: 31,
    color: "#113CCF",
    initials: "D+",
    imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=280&fit=crop",
  },
  {
    id: "rp3",
    name: "Spotify Premium · 1 Month",
    shortName: "Spotify",
    category: "Music",
    fromPrice: 8.49,
    retailPrice: 10.99,
    rating: 4.8,
    reviewCount: 5102,
    sellersCount: 58,
    color: "#1DB954",
    initials: "SP",
    tag: "Best value",
    imageUrl: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=400&h=280&fit=crop",
  },
  {
    id: "rp4",
    name: "Prime Video · 1 Month",
    shortName: "Prime Video",
    category: "Streaming",
    fromPrice: 6.99,
    retailPrice: 8.99,
    rating: 4.4,
    reviewCount: 987,
    sellersCount: 19,
    color: "#00A8E1",
    initials: "PV",
    imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=280&fit=crop",
  },
  {
    id: "rp5",
    name: "Apple TV+ · 1 Month",
    shortName: "Apple TV+",
    category: "Streaming",
    fromPrice: 5.99,
    retailPrice: 9.99,
    rating: 4.3,
    reviewCount: 642,
    sellersCount: 14,
    color: "#555555",
    initials: "TV",
    imageUrl: "https://images.unsplash.com/photo-1586899028174-e7098604235b?w=400&h=280&fit=crop",
  },
];
