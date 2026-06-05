export interface Variant {
  id: string;
  region: string;
  duration: string;
  monthCount: number;
  price: number;
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
  price: number;
  isRecommended?: boolean;
  verifiedSince: string;
  verificationDetails: string[];
  disputeRate: number;
  lastSale: string;
  memberSince: string;
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
export const DURATIONS = ["1 Month", "3 Months", "6 Months", "12 Months"];

// Full variant matrix — not every combination exists
export const variants: Variant[] = [
  // Global
  { id: "global-1m", region: "Global", duration: "1 Month",  monthCount: 1,  price: 14.67, available: true,  popular: true,  sellersCount: 51 },
  { id: "global-3m", region: "Global", duration: "3 Months", monthCount: 3,  price: 16.19, available: true,  popular: false, sellersCount: 28 },
  { id: "global-6m", region: "Global", duration: "6 Months", monthCount: 6,  price: 28.99, available: true,  popular: false, sellersCount: 14 },
  { id: "global-12m",region: "Global", duration: "12 Months",monthCount: 12, price: 49.99, available: false, popular: false, sellersCount: 0  },
  // Spain
  { id: "es-1m",     region: "Spain",  duration: "1 Month",  monthCount: 1,  price: 11.49, available: true,  popular: false, sellersCount: 18 },
  { id: "es-3m",     region: "Spain",  duration: "3 Months", monthCount: 3,  price: 13.20, available: true,  popular: false, sellersCount: 9  },
  { id: "es-6m",     region: "Spain",  duration: "6 Months", monthCount: 6,  price: 23.50, available: false, popular: false, sellersCount: 0  },
  { id: "es-12m",    region: "Spain",  duration: "12 Months",monthCount: 12, price: 39.99, available: false, popular: false, sellersCount: 0  },
  // US
  { id: "us-1m",     region: "US",     duration: "1 Month",  monthCount: 1,  price: 12.49, available: true,  popular: false, sellersCount: 11 },
  { id: "us-3m",     region: "US",     duration: "3 Months", monthCount: 3,  price: 14.80, available: false, popular: false, sellersCount: 0  },
  { id: "us-6m",     region: "US",     duration: "6 Months", monthCount: 6,  price: 25.99, available: false, popular: false, sellersCount: 0  },
  { id: "us-12m",    region: "US",     duration: "12 Months",monthCount: 12, price: 44.99, available: false, popular: false, sellersCount: 0  },
  // EU
  { id: "eu-1m",     region: "EU",     duration: "1 Month",  monthCount: 1,  price: 12.99, available: true,  popular: false, sellersCount: 22 },
  { id: "eu-3m",     region: "EU",     duration: "3 Months", monthCount: 3,  price: 15.50, available: true,  popular: false, sellersCount: 12 },
  { id: "eu-6m",     region: "EU",     duration: "6 Months", monthCount: 6,  price: 26.99, available: true,  popular: false, sellersCount: 7  },
  { id: "eu-12m",    region: "EU",     duration: "12 Months",monthCount: 12, price: 46.99, available: false, popular: false, sellersCount: 0  },
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
    verifiedSince: "Apr 2023",
    verificationDetails: [
      "Identity verified by Perksell",
      "Payment method verified",
      "3,891 completed orders",
    ],
    disputeRate: 2.9,
    lastSale: "2h ago",
    memberSince: "April 2023",
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
};

export const protectionItems = [
  {
    icon: "shield",
    title: "Delivery guarantee",
    description:
      "If delivery fails, Perksell provides a replacement or full refund. No questions asked within 24h.",
    color: "green",
  },
  {
    icon: "zap",
    title: "Instant delivery",
    description:
      "Codes and access credentials are delivered automatically after payment confirmation. Usually under 1 minute.",
    color: "amber",
  },
  {
    icon: "lock",
    title: "Secure payment",
    description:
      "Payment is held by Perksell until delivery is confirmed. Sellers cannot access funds until you receive your order.",
    color: "blue",
  },
  {
    icon: "headphones",
    title: "Support within 2h",
    description:
      "Our team responds to delivery issues within 2 hours. Disputes are resolved within 24–48 hours.",
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

export const relatedProducts = [
  { id: "rp1", name: "MAX (HBO) VOD Account", fromPrice: 15.0 },
  { id: "rp2", name: "DAZN VOD Account",       fromPrice: 12.99 },
  { id: "rp3", name: "Disney Premium Account",  fromPrice: 14.99 },
];
