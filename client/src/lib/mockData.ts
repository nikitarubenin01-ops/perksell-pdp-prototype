export interface Variant {
  id: string;
  name: string;
  region: string;
  type: string;
  duration?: string;
  price: number;
  available: boolean;
  popular?: boolean;
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
  recommendedLabel?: string;
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
}

export const variants: Variant[] = [
  {
    id: "v1",
    name: "MAX (HBO) Action",
    region: "Global",
    type: "Subscription",
    duration: "1 Month",
    price: 14.67,
    available: true,
    popular: true,
  },
  {
    id: "v2",
    name: "MAX (HBO) Action",
    region: "Global",
    type: "Subscription",
    duration: "3 Months",
    price: 16.19,
    available: true,
  },
  {
    id: "v3",
    name: "MAX (HBO) Premium",
    region: "Global",
    type: "Subscription",
    duration: "1 Month",
    price: 38.99,
    available: true,
  },
  {
    id: "v4",
    name: "MAX (HBO) Action",
    region: "US Only",
    type: "Subscription",
    duration: "1 Month",
    price: 12.49,
    available: false,
  },
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
    recommendedLabel: "Best price · Verified",
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
    price: 15.99,
    verifiedSince: "Mar 2022",
    verificationDetails: [
      "Identity verified by Perksell",
      "Payment method verified",
      "12,847 completed orders",
      "99.2% successful delivery rate",
    ],
    disputeRate: 0.8,
    lastSale: "3 min ago",
    memberSince: "March 2022",
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
    name: "KeyVault",
    initials: "KV",
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
  },
  {
    id: "r4",
    author: "Maria T.",
    country: "ES",
    rating: 5,
    date: "May 15, 2026",
    text: "Best price I found anywhere. Perksell buyer protection gave me confidence to try. Smooth experience.",
    verified: true,
    variant: "1 Month · Global",
  },
];

export const productStats = {
  totalSold: 1847,
  soldLast30Days: 312,
  rating: 4.6,
  reviewCount: 258,
  sellerCount: 51,
  successRate: 98.7,
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

export const relatedProducts = [
  {
    id: "rp1",
    name: "MAX (HBO) VOD Account",
    fromPrice: 15.0,
    image: null,
  },
  {
    id: "rp2",
    name: "DAZN VOD Account",
    fromPrice: 12.99,
    image: null,
  },
  {
    id: "rp3",
    name: "Disney Premium Account",
    fromPrice: 14.99,
    image: null,
  },
];
