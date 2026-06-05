import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  ExternalLink,
  Headphones,
  HelpCircle,
  Info,
  Lock,
  ShieldCheck,
  ShoppingCart,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SellerTooltip from "@/components/SellerTooltip";
import ProtectionTooltip from "@/components/ProtectionTooltip";
import StarRating from "@/components/StarRating";
import { toast } from "sonner";
import {
  productStats,
  protectionItems,
  relatedProducts,
  reviews,
  sellers,
  variants,
  type Seller,
  type Variant,
} from "@/lib/mockData";

const PROTECTION_TOOLTIPS: Record<string, { title: string; description: string }> = {
  delivery: {
    title: "Delivery guarantee",
    description:
      "If you don't receive your order within the stated delivery time, Perksell will provide a replacement or full refund. Applies to all verified sellers.",
  },
  secure: {
    title: "Secure payment",
    description:
      "Your payment is held by Perksell and only released to the seller after you confirm delivery. We use 3DS-verified payment processing.",
  },
  verified: {
    title: "Verified sellers",
    description:
      "All sellers pass identity verification, payment method checks, and maintain a minimum 97% delivery success rate to stay listed on Perksell.",
  },
};

function SellerAvatar({ seller, size = 32 }: { seller: Seller; size?: number }) {
  return (
    <div
      className="rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: seller.color,
        fontSize: size * 0.35,
      }}
    >
      {seller.initials}
    </div>
  );
}

function DeliveryBadge({ mode }: { mode: "instant" | "manual" }) {
  if (mode === "instant") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[oklch(0.52_0.18_145)] bg-[oklch(0.95_0.05_145)] px-1.5 py-0.5 rounded-full">
        <Zap size={9} strokeWidth={2.5} />
        Instant
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[oklch(0.55_0.18_255)] bg-[oklch(0.94_0.04_255)] px-1.5 py-0.5 rounded-full">
      <Clock size={9} />
      Manual
    </span>
  );
}

function RatingBadge({ rating, label }: { rating: number; label: string }) {
  const color =
    rating >= 4.6
      ? "oklch(0.52 0.18 145)"
      : rating >= 4.3
      ? "oklch(0.78 0.16 75)"
      : "oklch(0.55 0.18 255)";
  const bg =
    rating >= 4.6
      ? "oklch(0.95 0.05 145)"
      : rating >= 4.3
      ? "oklch(0.96 0.05 75)"
      : "oklch(0.94 0.04 255)";
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-full"
      style={{ color, background: bg }}
    >
      <Star size={9} fill={color} strokeWidth={0} />
      {rating.toFixed(2)} · {label}
    </span>
  );
}

export default function Home() {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);
  const [selectedSeller, setSelectedSeller] = useState<Seller>(sellers[0]);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [showProtectionDetails, setShowProtectionDetails] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cardFlash, setCardFlash] = useState(false);

  function flashCard() {
    setCardFlash(true);
    setTimeout(() => setCardFlash(false), 400);
  }

  const displayedSellers = showAllOffers ? sellers : sellers.slice(0, 3);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  function handleBuyNow() {
    toast.success(`Redirecting to checkout — ${selectedSeller.name} · $${selectedSeller.price}`, {
      description: "Secure payment via Perksell",
      duration: 3000,
    });
  }

  function handleAddToCart() {
    setAddedToCart(true);
    toast.success("Added to cart", {
      description: `${selectedVariant.name} · ${selectedVariant.duration}`,
      duration: 2000,
    });
    setTimeout(() => setAddedToCart(false), 2000);
  }

  function handleOfferBuy(seller: Seller) {
    setSelectedSeller(seller);
    flashCard();
    toast.success(`Selected ${seller.name} · $${seller.price}`, {
      description: "Scroll up to confirm purchase",
      duration: 2000,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.002_240)]">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Home</a>
          <ChevronRight size={12} />
          <a href="#" className="hover:text-foreground transition-colors">Subscriptions</a>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">MAX (HBO) Action</span>
        </nav>
      </div>

      {/* Main content */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-32 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Product header */}
            <div className="animate-fade-in-up">
              {/* Product image + info */}
              <div className="flex gap-5 items-start">
                {/* Image */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-gradient-to-br from-[oklch(0.25_0.06_255)] to-[oklch(0.18_0.04_250)] flex items-center justify-center flex-shrink-0 border border-border overflow-hidden shadow-sm">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-lg bg-white/10 flex items-center justify-center mb-1">
                      <span className="text-white text-lg font-bold">M</span>
                    </div>
                    <span className="text-white/60 text-[10px]">MAX</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-[oklch(0.52_0.18_145)] bg-[oklch(0.95_0.05_145)] px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Subscription
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-tight">
                    MAX (HBO) Action
                  </h1>

                  {/* Rating row */}
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={productStats.rating} size={14} />
                      <span className="text-sm font-semibold text-[oklch(0.78_0.16_75)]">
                        {productStats.rating}
                      </span>
                      <a
                        href="#reviews"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ({productStats.reviewCount} reviews)
                      </a>
                    </div>
                    <span className="text-muted-foreground text-sm">·</span>
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {productStats.totalSold.toLocaleString()}
                      </span>{" "}
                      sold
                    </span>
                    <span className="text-muted-foreground text-sm">·</span>
                    <ProtectionTooltip
                      title="Success rate"
                      description="Percentage of orders that were delivered successfully without disputes or refund requests across all sellers."
                      side="bottom"
                    >
                      <span className="text-sm text-muted-foreground cursor-help flex items-center gap-1">
                        <span className="font-semibold text-[oklch(0.52_0.18_145)]">
                          {productStats.successRate}%
                        </span>{" "}
                        success rate
                        <Info size={12} className="text-muted-foreground/60" />
                      </span>
                    </ProtectionTooltip>
                  </div>

                  {/* Trust badges */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <ProtectionTooltip
                      title={PROTECTION_TOOLTIPS.delivery.title}
                      description={PROTECTION_TOOLTIPS.delivery.description}
                      side="bottom"
                    >
                      <button className="trust-badge">
                        <Zap size={11} className="text-[oklch(0.52_0.18_145)]" />
                        Instant Delivery
                      </button>
                    </ProtectionTooltip>
                    <ProtectionTooltip
                      title={PROTECTION_TOOLTIPS.secure.title}
                      description={PROTECTION_TOOLTIPS.secure.description}
                      side="bottom"
                    >
                      <button className="trust-badge">
                        <Lock size={11} className="text-[oklch(0.55_0.18_255)]" />
                        Secure Purchase
                      </button>
                    </ProtectionTooltip>
                    <ProtectionTooltip
                      title={PROTECTION_TOOLTIPS.verified.title}
                      description={PROTECTION_TOOLTIPS.verified.description}
                      side="bottom"
                    >
                      <button className="trust-badge">
                        <ShieldCheck size={11} className="text-[oklch(0.52_0.18_145)]" />
                        Verified Sellers
                      </button>
                    </ProtectionTooltip>
                  </div>
                </div>
              </div>
            </div>

            {/* Variant selector */}
            <section className="animate-fade-in-up" style={{ animationDelay: "50ms" }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="section-label">Available variants</h2>
                <span className="text-xs text-muted-foreground">
                  {variants.filter((v) => v.available).length} available
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      if (!variant.available) return;
                      setSelectedVariant(variant);
                      const cheapestSeller = sellers
                        .filter(() => true)
                        .sort((a, b) => a.price - b.price)[0];
                      setSelectedSeller(cheapestSeller);
                      flashCard();
                    }}
                    className={`variant-chip ${
                      selectedVariant.id === variant.id ? "selected" : ""
                    } ${!variant.available ? "unavailable" : ""}`}
                    disabled={!variant.available}
                    title={!variant.available ? "Currently out of stock" : undefined}
                  >
                    <div className="flex items-center gap-1.5 w-full">
                      <span className="text-sm font-semibold text-foreground leading-tight">
                        {variant.duration || variant.type}
                      </span>
                      {variant.popular && (
                        <span className="text-[9px] font-bold text-white bg-[oklch(0.52_0.18_145)] px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{variant.region}</span>
                    <span className="text-sm font-bold text-foreground mt-0.5">
                      ${variant.price.toFixed(2)}
                    </span>
                    {!variant.available && (
                      <span className="text-[10px] text-muted-foreground">Out of stock</span>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Product details */}
            <section
              className="bg-white rounded-xl border border-border p-5 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <h2 className="section-label mb-4">Product details</h2>
              <div className="space-y-0">
                {[
                  { label: "Category", value: "Subscriptions" },
                  { label: "Region", value: selectedVariant.region },
                  { label: "Duration", value: selectedVariant.duration || "—" },
                  { label: "Delivery", value: "Instant (digital code)" },
                  {
                    label: "Total sales",
                    value: `${productStats.totalSold.toLocaleString()} orders`,
                  },
                  {
                    label: "Sold last 30 days",
                    value: (
                      <span className="flex items-center gap-1 text-[oklch(0.52_0.18_145)] font-semibold">
                        <TrendingUp size={13} />
                        {productStats.soldLast30Days} orders
                      </span>
                    ),
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-muted-foreground">{row.label}</span>
                    <span className="text-sm font-medium text-foreground">{row.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Offers list */}
            <section
              className="animate-fade-in-up"
              style={{ animationDelay: "150ms" }}
              id="offers"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="section-label">
                  Available offers
                  <span className="ml-2 text-xs font-normal text-muted-foreground normal-case tracking-normal">
                    {productStats.sellerCount} sellers
                  </span>
                </h2>
                <ProtectionTooltip
                  title="How offers work"
                  description="Multiple verified sellers list the same product at different prices. All sellers pass Perksell verification. You choose who to buy from."
                  side="left"
                >
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <HelpCircle size={13} />
                    How this works
                  </button>
                </ProtectionTooltip>
              </div>

              <div className="space-y-2">
                {displayedSellers.map((seller, idx) => (
                  <div
                    key={seller.id + idx}
                    className={`seller-row ${selectedSeller.id === seller.id && selectedSeller.price === seller.price ? "selected" : ""}`}
                    onClick={() => { setSelectedSeller(seller); flashCard(); }}
                  >
                    {/* Avatar */}
                    <SellerTooltip seller={seller}>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                      >
                        <SellerAvatar seller={seller} size={36} />
                      </button>
                    </SellerTooltip>

                    {/* Seller info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <SellerTooltip seller={seller}>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 hover:underline"
                          >
                            <span className="text-sm font-semibold text-foreground">
                              {seller.name}
                            </span>
                            <Info size={12} className="text-muted-foreground/60" />
                          </button>
                        </SellerTooltip>
                        {seller.isRecommended && (
                          <span className="text-[10px] font-bold text-[oklch(0.78_0.16_75)] bg-[oklch(0.96_0.05_75)] border border-[oklch(0.85_0.12_75)] px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                            Best price
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <RatingBadge rating={seller.rating} label={seller.ratingLabel} />
                        <DeliveryBadge mode={seller.deliveryMode} />
                        <span className="text-[11px] text-muted-foreground">
                          {seller.totalOrders.toLocaleString()} orders
                        </span>
                      </div>
                    </div>

                    {/* Price + actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-right mr-1">
                        <div className="text-base font-bold text-foreground leading-tight">
                          ${seller.price.toFixed(2)}
                        </div>
                        {seller.isRecommended && (
                          <div className="text-[10px] text-[oklch(0.52_0.18_145)] font-medium">
                            Best price
                          </div>
                        )}
                      </div>
                      <button
                        className="offer-cart-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success("Added to cart", { duration: 1500 });
                        }}
                        title="Add to cart"
                      >
                        <ShoppingCart size={14} />
                      </button>
                      <button
                        className="offer-buy-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOfferBuy(seller);
                        }}
                      >
                        <Zap size={12} strokeWidth={2.5} />
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {sellers.length > 3 && (
                <button
                  className="w-full mt-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-xl hover:border-[oklch(0.75_0.12_145)] hover:bg-[oklch(0.99_0.01_145)] transition-all flex items-center justify-center gap-2"
                  onClick={() => setShowAllOffers(!showAllOffers)}
                >
                  {showAllOffers ? (
                    <>
                      <ChevronUp size={15} />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={15} />
                      Show {sellers.length - 3} more offers
                    </>
                  )}
                </button>
              )}
            </section>

            {/* Reviews */}
            <section
              className="animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
              id="reviews"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="section-label">
                  Buyer reviews
                  <span className="ml-2 text-xs font-normal text-muted-foreground normal-case tracking-normal">
                    {productStats.reviewCount} verified
                  </span>
                </h2>
                <div className="flex items-center gap-1.5">
                  <StarRating rating={productStats.rating} size={13} />
                  <span className="text-sm font-bold text-foreground">
                    {productStats.rating}
                  </span>
                </div>
              </div>

              {/* Rating breakdown */}
              <div className="bg-white rounded-xl border border-border p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground tracking-tight">
                      {productStats.rating}
                    </div>
                    <StarRating rating={productStats.rating} size={16} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {productStats.reviewCount} reviews
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { stars: 5, pct: 78 },
                      { stars: 4, pct: 14 },
                      { stars: 3, pct: 5 },
                      { stars: 2, pct: 2 },
                      { stars: 1, pct: 1 },
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-3">{row.stars}</span>
                        <Star
                          size={10}
                          className="text-[oklch(0.78_0.16_75)] fill-[oklch(0.78_0.16_75)] flex-shrink-0"
                        />
                        <div className="flex-1 h-1.5 bg-[oklch(0.92_0.006_240)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[oklch(0.78_0.16_75)] rounded-full"
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-7 text-right">
                          {row.pct}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {displayedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-xl border border-border p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[oklch(0.94_0.04_255)] flex items-center justify-center text-xs font-bold text-[oklch(0.55_0.18_255)] flex-shrink-0">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">
                              {review.author}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {review.country}
                            </span>
                            {review.verified && (
                              <span className="flex items-center gap-0.5 text-[10px] font-medium text-[oklch(0.52_0.18_145)]">
                                <ShieldCheck size={10} />
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <StarRating rating={review.rating} size={11} />
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 mt-3 leading-relaxed">
                      {review.text}
                    </p>
                    <div className="mt-2">
                      <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {review.variant}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {reviews.length > 2 && (
                <button
                  className="w-full mt-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-xl hover:border-[oklch(0.75_0.12_145)] transition-all flex items-center justify-center gap-2"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                >
                  {showAllReviews ? (
                    <>
                      <ChevronUp size={15} />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={15} />
                      Show all {productStats.reviewCount} reviews
                    </>
                  )}
                </button>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN — Purchase Card (sticky) */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              {/* Main purchase card */}
              <div
                className="bg-white rounded-2xl border shadow-sm overflow-hidden animate-scale-in transition-all duration-300"
                style={{
                  borderColor: cardFlash ? "oklch(0.52 0.18 145)" : "oklch(0.9 0.006 240)",
                  boxShadow: cardFlash
                    ? "0 0 0 3px oklch(0.52 0.18 145 / 0.15), 0 4px 16px oklch(0 0 0 / 0.08)"
                    : "0 1px 3px oklch(0 0 0 / 0.06)",
                }}
              >
                {/* Price header */}
                <div className="px-5 pt-5 pb-4 border-b border-border">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="price-display">${selectedSeller.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Best price of {productStats.sellerCount} sellers
                  </p>
                </div>

                {/* Selected seller */}
                <div className="px-5 py-4 border-b border-border">
                  <p className="section-label mb-3">Seller</p>
                  <div className="flex items-center gap-3">
                    <SellerTooltip seller={selectedSeller}>
                      <button className="flex-shrink-0">
                        <SellerAvatar seller={selectedSeller} size={38} />
                      </button>
                    </SellerTooltip>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <SellerTooltip seller={selectedSeller}>
                          <button className="flex items-center gap-1 hover:underline">
                            <span className="text-sm font-semibold text-foreground">
                              {selectedSeller.name}
                            </span>
                            <Info size={12} className="text-muted-foreground/60" />
                          </button>
                        </SellerTooltip>
                        {selectedSeller.isRecommended && (
                          <span className="text-[10px] font-bold text-[oklch(0.78_0.16_75)] bg-[oklch(0.96_0.05_75)] border border-[oklch(0.85_0.12_75)] px-1.5 py-0.5 rounded-full">
                            Best price
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <StarRating rating={selectedSeller.rating} size={11} />
                        <span className="text-xs text-muted-foreground">
                          {selectedSeller.rating.toFixed(2)} · {selectedSeller.ratingLabel}
                        </span>
                      </div>
                    </div>
                    <DeliveryBadge mode={selectedSeller.deliveryMode} />
                  </div>

                  {/* Why recommended */}
                  {selectedSeller.isRecommended && (
                    <div className="mt-3 p-2.5 bg-[oklch(0.97_0.03_145)] rounded-lg border border-[oklch(0.88_0.08_145)]">
                      <p className="text-xs text-[oklch(0.38_0.16_145)] font-medium leading-relaxed">
                        Best price among verified sellers · {selectedSeller.successRate}% delivery
                        success · {selectedSeller.totalOrders.toLocaleString()} completed orders
                      </p>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="px-5 py-4 space-y-2.5">
                  <button className="btn-buy-now" onClick={handleBuyNow}>
                    <Zap size={16} strokeWidth={2.5} />
                    Buy Now
                  </button>
                  <button
                    className="btn-add-cart"
                    onClick={handleAddToCart}
                    style={addedToCart ? { background: "oklch(0.95 0.05 145)", borderColor: "oklch(0.52 0.18 145)" } : {}}
                  >
                    <ShoppingCart size={15} />
                    {addedToCart ? "Added to cart!" : "Add to Cart"}
                  </button>
                </div>

                {/* Protection summary */}
                <div className="px-5 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="section-label">Buyer protection</p>
                    <button
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                      onClick={() => setShowProtectionDetails(!showProtectionDetails)}
                    >
                      {showProtectionDetails ? "Hide" : "Details"}
                      {showProtectionDetails ? (
                        <ChevronUp size={12} />
                      ) : (
                        <ChevronDown size={12} />
                      )}
                    </button>
                  </div>

                  {/* Always-visible trust icons */}
                  <div className="grid grid-cols-3 gap-2">
                    <ProtectionTooltip
                      title={PROTECTION_TOOLTIPS.delivery.title}
                      description={PROTECTION_TOOLTIPS.delivery.description}
                      side="bottom"
                    >
                      <button className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[oklch(0.97_0.003_240)] hover:bg-[oklch(0.95_0.04_145)] transition-colors text-center">
                        <ShieldCheck size={16} className="text-[oklch(0.52_0.18_145)]" />
                        <span className="text-[10px] font-medium text-muted-foreground leading-tight">
                          Delivery guarantee
                        </span>
                      </button>
                    </ProtectionTooltip>
                    <ProtectionTooltip
                      title={PROTECTION_TOOLTIPS.delivery.title}
                      description="Codes and credentials are delivered automatically after payment. Usually under 1 minute for instant sellers."
                      side="bottom"
                    >
                      <button className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[oklch(0.97_0.003_240)] hover:bg-[oklch(0.96_0.05_75)] transition-colors text-center">
                        <Zap size={16} className="text-[oklch(0.78_0.16_75)]" />
                        <span className="text-[10px] font-medium text-muted-foreground leading-tight">
                          Instant delivery
                        </span>
                      </button>
                    </ProtectionTooltip>
                    <ProtectionTooltip
                      title={PROTECTION_TOOLTIPS.verified.title}
                      description={PROTECTION_TOOLTIPS.verified.description}
                      side="bottom"
                    >
                      <button className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[oklch(0.97_0.003_240)] hover:bg-[oklch(0.94_0.04_255)] transition-colors text-center">
                        <Lock size={16} className="text-[oklch(0.55_0.18_255)]" />
                        <span className="text-[10px] font-medium text-muted-foreground leading-tight">
                          Verified sellers
                        </span>
                      </button>
                    </ProtectionTooltip>
                  </div>

                  {/* Expandable details */}
                  {showProtectionDetails && (
                    <div className="mt-3 space-y-0 border border-border rounded-xl overflow-hidden animate-fade-in-up">
                      {protectionItems.map((item, i) => {
                        const Icon =
                          item.icon === "shield"
                            ? ShieldCheck
                            : item.icon === "zap"
                            ? Zap
                            : item.icon === "lock"
                            ? Lock
                            : Headphones;
                        const iconColor =
                          item.color === "green"
                            ? "oklch(0.52 0.18 145)"
                            : item.color === "amber"
                            ? "oklch(0.78 0.16 75)"
                            : item.color === "blue"
                            ? "oklch(0.55 0.18 255)"
                            : "oklch(0.6 0.18 295)";
                        const iconBg =
                          item.color === "green"
                            ? "oklch(0.95 0.05 145)"
                            : item.color === "amber"
                            ? "oklch(0.96 0.05 75)"
                            : item.color === "blue"
                            ? "oklch(0.94 0.04 255)"
                            : "oklch(0.94 0.04 295)";
                        return (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3 border-b border-border last:border-0 bg-white"
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ background: iconBg }}
                            >
                              <Icon size={13} style={{ color: iconColor }} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-foreground">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Refund policy link */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Refund policy", {
                          description:
                            "Digital goods are non-refundable after delivery confirmation, unless delivery fails. Contact support within 24h.",
                          duration: 5000,
                        });
                      }}
                    >
                      <Info size={12} />
                      Refund policy for digital goods
                      <ExternalLink size={10} className="ml-auto" />
                    </a>
                  </div>
                </div>
              </div>

              {/* You might also like */}
              <div className="bg-white rounded-2xl border border-border p-4 animate-scale-in" style={{ animationDelay: "80ms" }}>
                <p className="section-label mb-3">You might also like</p>
                <div className="space-y-2">
                  {relatedProducts.map((product) => (
                    <a
                      key={product.id}
                      href="#"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted transition-colors group"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Feature coming soon", { duration: 1500 });
                      }}
                    >
                      <div className="w-9 h-9 rounded-lg bg-[oklch(0.94_0.02_250)] flex items-center justify-center flex-shrink-0 border border-border">
                        <span className="text-xs font-bold text-muted-foreground">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate group-hover:text-[oklch(0.52_0.18_145)] transition-colors">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          from ${product.fromPrice.toFixed(2)}
                        </p>
                      </div>
                      <ChevronRight
                        size={14}
                        className="text-muted-foreground/50 group-hover:text-[oklch(0.52_0.18_145)] transition-colors flex-shrink-0"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile sticky bar */}
      <div className="mobile-sticky-bar lg:hidden">
        <div className="flex-1 min-w-0">
          <div className="text-lg font-bold text-foreground leading-tight">
            ${selectedSeller.price.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {selectedSeller.name} · {selectedVariant.duration}
          </div>
        </div>
        <button
          className="offer-cart-btn flex-shrink-0"
          onClick={handleAddToCart}
          style={{ width: 44, height: 44 }}
        >
          <ShoppingCart size={16} />
        </button>
        <button
          className="btn-buy-now flex-shrink-0"
          style={{ width: "auto", paddingLeft: 20, paddingRight: 20 }}
          onClick={handleBuyNow}
        >
          <Zap size={15} strokeWidth={2.5} />
          Buy Now
        </button>
      </div>
    </div>
  );
}
