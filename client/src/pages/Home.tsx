import { useState, useMemo } from "react";
import {
  AlertTriangle,
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
  ThumbsUp,
  TrendingUp,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SeoContent from "@/components/SeoContent";
import SellerTooltip from "@/components/SellerTooltip";
import ProtectionTooltip from "@/components/ProtectionTooltip";
import StarRating from "@/components/StarRating";
import { toast } from "sonner";
import {
  REGIONS,
  DURATIONS,
  productStats,
  protectionItems,
  relatedProducts,
  reviews,
  sellers,
  variants,
  type Seller,
  type Variant,
  type RelatedProduct,
} from "@/lib/mockData";

// ─── Design tokens (Perksell PDP) ───────────────────────────────────────────
// Primary green: oklch(0.52 0.18 145)  — CTA, success, verified
// Amber:         oklch(0.78 0.16 75)   — ratings, best-value
// Blue:          oklch(0.55 0.18 255)  — info, region notes
// Background:    oklch(0.98 0.002 240) — page bg
// ─────────────────────────────────────────────────────────────────────────────

const PROTECTION_TOOLTIPS: Record<string, { title: string; description: string }> = {
  delivery: {
    title: "Access guarantee",
    description:
      "If your access stops working at any point during the subscription period, the seller provides a replacement at no extra cost. If unresolved within 24h, Perksell issues a full refund.",
  },
  secure: {
    title: "Escrow payment",
    description:
      "Your payment is held securely by Perksell and only released to the seller after access is confirmed. Sellers cannot access funds until you receive your order.",
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
      style={{ width: size, height: size, background: seller.color, fontSize: size * 0.35 }}
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
      ~15 min
    </span>
  );
}

// Numeric seller rating badge — more differentiating than stars alone (Eneba pattern)
function NumericRatingBadge({ rating, label }: { rating: number; label: string }) {
  const score = (rating / 5) * 10;
  const color =
    score >= 9.0 ? "oklch(0.52 0.18 145)" : score >= 8.5 ? "oklch(0.78 0.16 75)" : "oklch(0.55 0.18 255)";
  const bg =
    score >= 9.0 ? "oklch(0.95 0.05 145)" : score >= 8.5 ? "oklch(0.96 0.05 75)" : "oklch(0.94 0.04 255)";
  void label; // label removed — number speaks for itself
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-full"
      style={{ color, background: bg }}
    >
      <span className="text-[12px] font-bold">{score.toFixed(1)}</span>
      <span className="opacity-70">/10</span>
    </span>
  );
}

// Helper: get variant for a region+duration combo
function findVariant(region: string, duration: string): Variant | undefined {
  return variants.find((v) => v.region === region && v.duration === duration);
}

// Helper: get available durations for a region
function getAvailableDurations(region: string): string[] {
  return DURATIONS.filter((d) => {
    const v = findVariant(region, d);
    return v !== undefined;
  });
}

// Helper: get available regions (those that have at least one available variant)
function getAvailableRegions(): string[] {
  return REGIONS.filter((r) => variants.some((v) => v.region === r));
}

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState<string>("Global");
  const [selectedDuration, setSelectedDuration] = useState<string>("12 Months");
  const [selectedSeller, setSelectedSeller] = useState<Seller>(sellers[0]);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [showProtectionDetails, setShowProtectionDetails] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cardFlash, setCardFlash] = useState(false);
  // Helpful votes state — local, per review id
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>(
    Object.fromEntries(reviews.map((r) => [r.id, r.helpfulCount]))
  );

  function flashCard() {
    setCardFlash(true);
    setTimeout(() => setCardFlash(false), 400);
  }

  // Current active variant
  const activeVariant: Variant | undefined = useMemo(
    () => findVariant(selectedRegion, selectedDuration),
    [selectedRegion, selectedDuration]
  );

  // Durations available for selected region
  const durationsForRegion = useMemo(() => getAvailableDurations(selectedRegion), [selectedRegion]);

  // All regions
  const availableRegions = useMemo(() => getAvailableRegions(), []);

  // Savings comparison for duration chips
  const baseMonthlyPrice = useMemo(() => {
    const oneMonth = findVariant(selectedRegion, "1 Month");
    return oneMonth?.available ? oneMonth.price : null;
  }, [selectedRegion]);

  function handleRegionChange(region: string) {
    setSelectedRegion(region);
    flashCard();
    const durations = getAvailableDurations(region);
    if (!durations.includes(selectedDuration)) {
      const firstAvailable = durations.find((d) => {
        const v = findVariant(region, d);
        return v?.available;
      });
      if (firstAvailable) setSelectedDuration(firstAvailable);
    }
    setSelectedSeller(sellers[0]);
  }

  function handleDurationChange(duration: string) {
    const v = findVariant(selectedRegion, duration);
    if (!v?.available) return;
    setSelectedDuration(duration);
    setSelectedSeller(sellers[0]);
    flashCard();
  }

  function handleHelpful(reviewId: string) {
    if (helpfulVotes[reviewId]) return; // already voted
    setHelpfulVotes((prev) => ({ ...prev, [reviewId]: true }));
    setHelpfulCounts((prev) => ({ ...prev, [reviewId]: (prev[reviewId] ?? 0) + 1 }));
  }

  // Split reviews: most helpful (by helpfulCount desc) and most recent (by date desc)
  const sortedByHelpful = useMemo(
    () => [...reviews].sort((a, b) => b.helpfulCount - a.helpfulCount),
    []
  );
  const sortedByRecent = useMemo(
    () =>
      [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  // Recommended seller (first with isRecommended) and other sellers
  const recommendedSeller = sellers.find((s) => s.isRecommended) ?? sellers[0];
  const otherSellers = sellers.filter((s) => s.id !== recommendedSeller.id);
  const displayedOtherSellers = showAllOffers ? otherSellers : otherSellers.slice(0, 2);

  function handleBuyNow() {
    toast.success(`Redirecting to checkout — ${selectedSeller.name} · $${selectedSeller.price}`, {
      description: "Secure payment via Perksell",
      duration: 3000,
    });
  }

  function handleAddToCart() {
    setAddedToCart(true);
    toast.success("Added to cart", {
      description: `MAX (HBO) Action · ${selectedDuration} · ${selectedRegion}`,
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

  const currentPrice = activeVariant?.available ? activeVariant.price : selectedSeller.price;

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

          {/* ═══════════════════════════════════════════════════════════════
              LEFT COLUMN
          ═══════════════════════════════════════════════════════════════ */}
          <div className="space-y-6">

            {/* ═══════════════════════════════════════════════════════════════
                PRODUCT HERO — image left, info + variants right (Яндекс.Маркет pattern)
            ═══════════════════════════════════════════════════════════════ */}
            <div className="animate-fade-in-up">
              <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-6 items-start">

                {/* ── LEFT: Cover image ── */}
                <div className="rounded-2xl overflow-hidden border border-border shadow-md flex-shrink-0 w-full sm:w-[280px]" style={{ aspectRatio: "3/4" }}>
                  <img
                    src="/manus-storage/max-hbo-cover_50d9d410.png"
                    alt="MAX (HBO) subscription cover"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* ── RIGHT: Info + variants + specs ── */}
                <div className="flex flex-col gap-5 min-w-0">

                  {/* Title block */}
                  <div>
                    {/* Breadcrumb brand line — G2A pattern: Brand > Product */}
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium">
                      MAX (HBO)
                    </p>
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-tight">
                      Buy MAX (HBO) Subscription — Cheap Price, Instant Delivery
                    </h1>
                    <div className="flex flex-wrap items-center gap-2.5 mt-2">
                      <div className="flex items-center gap-1.5">
                        <StarRating rating={productStats.rating} size={13} />
                        <span className="text-sm font-semibold text-[oklch(0.78_0.16_75)]">{productStats.rating}</span>
                        <a href="#reviews" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          ({productStats.reviewCount} reviews)
                        </a>
                      </div>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">{productStats.totalSold.toLocaleString()}</span> sold
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <TrendingUp size={12} className="text-[oklch(0.52_0.18_145)]" />
                      <span className="text-sm text-[oklch(0.38_0.16_145)] font-semibold">{productStats.soldLast30Days} activations</span>
                      <span className="text-sm text-muted-foreground">in the last 30 days</span>
                    </div>
                  </div>

                  {/* Region chips */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="section-label">Region</p>
                      <ProtectionTooltip
                        title="What is region?"
                        description="Region determines which country or zone the subscription is valid for. Make sure to select the region that matches your account."
                        side="left"
                      >
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                          <HelpCircle size={11} />
                          What is this?
                        </button>
                      </ProtectionTooltip>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {availableRegions.map((region) => {
                        const hasAvailable = variants.some((v) => v.region === region && v.available);
                        const isSelected = selectedRegion === region;
                        return (
                          <button
                            key={region}
                            onClick={() => hasAvailable && handleRegionChange(region)}
                            disabled={!hasAvailable}
                            className={`px-3.5 py-1.5 rounded-lg border text-sm font-medium transition-all duration-150 ${
                              isSelected
                                ? "border-[oklch(0.52_0.18_145)] bg-[oklch(0.97_0.03_145)] text-[oklch(0.38_0.16_145)] shadow-[0_0_0_2px_oklch(0.52_0.18_145_/_0.12)]"
                                : hasAvailable
                                ? "border-border bg-white text-foreground hover:border-[oklch(0.75_0.12_145)] hover:bg-[oklch(0.99_0.01_145)]"
                                : "border-border bg-[oklch(0.97_0_0)] text-muted-foreground opacity-40 cursor-not-allowed"
                            }`}
                          >
                            {region}
                          </button>
                        );
                      })}
                    </div>
                    {selectedRegion !== "Global" && (
                      <div className="mt-3 flex items-start gap-2 p-3 bg-[oklch(0.97_0.04_75)] border border-[oklch(0.88_0.10_75)] rounded-lg">
                        <AlertTriangle size={13} className="text-[oklch(0.60_0.18_75)] flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-[oklch(0.45_0.12_75)] leading-relaxed">
                          Activates only on <strong>{selectedRegion}</strong> accounts.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Duration chips */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="section-label">Duration</p>
                      {activeVariant && (
                        <span className="text-xs text-muted-foreground">{activeVariant.sellersCount} sellers</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {DURATIONS.map((duration) => {
                        const variant = findVariant(selectedRegion, duration);
                        const exists = variant !== undefined;
                        const isAvailable = variant?.available ?? false;
                        const isSelected = selectedDuration === duration && exists;
                        const savingsPct =
                          baseMonthlyPrice && variant?.monthCount && variant.monthCount > 1 && isAvailable
                            ? Math.round(((baseMonthlyPrice - variant.price / variant.monthCount) / baseMonthlyPrice) * 100)
                            : null;
                        return (
                          <button
                            key={duration}
                            onClick={() => isAvailable && handleDurationChange(duration)}
                            disabled={!isAvailable}
                            className={`relative flex flex-col items-start gap-0.5 px-3.5 py-2.5 rounded-xl border transition-all duration-150 min-w-[96px] ${
                              isSelected
                                ? "border-[oklch(0.52_0.18_145)] bg-[oklch(0.97_0.03_145)] shadow-[0_0_0_2px_oklch(0.52_0.18_145_/_0.12)]"
                                : isAvailable
                                ? "border-border bg-white hover:border-[oklch(0.75_0.12_145)] hover:bg-[oklch(0.99_0.01_145)]"
                                : "border-border bg-[oklch(0.97_0_0)] opacity-40 cursor-not-allowed"
                            }`}
                          >
                            {variant?.popular && (
                              <span className="absolute -top-2 left-2.5 text-[9px] font-bold text-white bg-[oklch(0.52_0.18_145)] px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                                Popular
                              </span>
                            )}
                            {savingsPct && savingsPct > 0 && (
                              <span className="absolute -top-2 right-2 text-[9px] font-bold text-white bg-[oklch(0.78_0.16_75)] px-1.5 py-0.5 rounded-full">
                                -{savingsPct}%
                              </span>
                            )}
                            <span className={`text-sm font-semibold leading-tight ${isSelected ? "text-[oklch(0.38_0.16_145)]" : "text-foreground"}`}>
                              {duration}
                            </span>
                            {exists ? (
                              isAvailable ? (
                                <>
                                  <div className="flex items-baseline gap-1">
                                    <span className={`text-sm font-bold leading-none ${isSelected ? "text-[oklch(0.38_0.16_145)]" : "text-foreground"}`}>
                                      ${variant!.price.toFixed(2)}
                                    </span>
                                    {variant!.monthCount === 1 && variant!.retailPrice > variant!.price && (
                                      <span className="text-[10px] text-muted-foreground line-through leading-none">${variant!.retailPrice.toFixed(2)}</span>
                                    )}
                                  </div>
                                  {variant!.monthCount > 1 && (
                                    <span className={`text-[10px] font-medium leading-none ${isSelected ? "text-[oklch(0.52_0.18_145)]" : "text-muted-foreground"}`}>
                                      ${(variant!.price / variant!.monthCount).toFixed(2)}/mo
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="text-xs text-muted-foreground">Out of stock</span>
                              )
                            ) : (
                              <span className="text-xs text-muted-foreground">N/A</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Specs table — dotted leaders like Яндекс.Маркет */}
                  <SpecsTable
                    selectedRegion={selectedRegion}
                    selectedDuration={selectedDuration}
                    totalSold={productStats.totalSold}
                    soldLast30Days={productStats.soldLast30Days}
                  />

                </div>
              </div>
            </div>

            {/* ── OFFERS LIST ── Recommended / Other split (Baymard: visual hierarchy) */}
            <section className="animate-fade-in-up" style={{ animationDelay: "150ms" }} id="offers">
              <div className="flex items-center justify-between mb-3">
                <h2 className="section-label">
                  Available offers
                  <span className="ml-2 text-xs font-normal text-muted-foreground normal-case tracking-normal">
                    {activeVariant?.sellersCount ?? productStats.sellerCount} sellers
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

              {/* Recommended offer — Baymard: platform as curator reduces decision anxiety */}
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold text-[oklch(0.52_0.18_145)] uppercase tracking-wide">
                    Recommended
                  </span>
                  <ProtectionTooltip
                    title="How we recommend"
                    description="Recommended offer is selected by Perksell based on price, seller reliability, delivery success rate, and dispute history — not by payment."
                    side="right"
                  >
                    <Info size={11} className="text-muted-foreground/50 cursor-help" />
                  </ProtectionTooltip>
                </div>
                <div
                  className={`seller-row border-[oklch(0.85_0.10_145)] bg-[oklch(0.99_0.01_145)] ${selectedSeller.id === recommendedSeller.id ? "selected" : ""}`}
                  onClick={() => { setSelectedSeller(recommendedSeller); flashCard(); }}
                >
                  <SellerTooltip seller={recommendedSeller}>
                    <button onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
                      <SellerAvatar seller={recommendedSeller} size={36} />
                    </button>
                  </SellerTooltip>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <SellerTooltip seller={recommendedSeller}>
                        <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 hover:underline">
                          <span className="text-sm font-semibold text-foreground">{recommendedSeller.name}</span>
                          <Info size={12} className="text-muted-foreground/60" />
                        </button>
                      </SellerTooltip>
                      <span className="text-[10px] font-bold text-[oklch(0.52_0.18_145)] bg-[oklch(0.95_0.05_145)] border border-[oklch(0.85_0.10_145)] px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                        Best price
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <NumericRatingBadge rating={recommendedSeller.rating} label={recommendedSeller.ratingLabel} />
                      <DeliveryBadge mode={recommendedSeller.deliveryMode} />
                      <span className="text-[11px] text-muted-foreground">{recommendedSeller.itemSalesLast30} sold this month</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-right mr-1">
                      <div className="text-base font-bold text-foreground leading-tight">${recommendedSeller.price.toFixed(2)}</div>
                      <div className="text-[10px] text-[oklch(0.52_0.18_145)] font-medium">Best price</div>
                    </div>
                    <button
                      className="offer-cart-btn"
                      onClick={(e) => { e.stopPropagation(); toast.success("Added to cart", { duration: 1500 }); }}
                      title="Add to cart"
                    >
                      <ShoppingCart size={14} />
                    </button>
                    <button
                      className="offer-buy-btn"
                      onClick={(e) => { e.stopPropagation(); handleOfferBuy(recommendedSeller); }}
                    >
                      <Zap size={12} strokeWidth={2.5} />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Other offers */}
              <div>
                <div className="flex items-center gap-2 mb-1.5 mt-3">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
                    Other offers
                  </span>
                </div>
                <div className="space-y-2">
                  {displayedOtherSellers.map((seller, idx) => (
                    <div
                      key={seller.id + idx}
                      className={`seller-row ${selectedSeller.id === seller.id && selectedSeller.price === seller.price ? "selected" : ""}`}
                      onClick={() => { setSelectedSeller(seller); flashCard(); }}
                    >
                      <SellerTooltip seller={seller}>
                        <button onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
                          <SellerAvatar seller={seller} size={36} />
                        </button>
                      </SellerTooltip>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <SellerTooltip seller={seller}>
                            <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 hover:underline">
                              <span className="text-sm font-semibold text-foreground">{seller.name}</span>
                              <Info size={12} className="text-muted-foreground/60" />
                            </button>
                          </SellerTooltip>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <NumericRatingBadge rating={seller.rating} label={seller.ratingLabel} />
                          <DeliveryBadge mode={seller.deliveryMode} />
                          <span className="text-[11px] text-muted-foreground">{seller.totalOrders.toLocaleString()} orders</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="text-right mr-1">
                          <div className="text-base font-bold text-foreground leading-tight">${seller.price.toFixed(2)}</div>
                        </div>
                        <button
                          className="offer-cart-btn"
                          onClick={(e) => { e.stopPropagation(); toast.success("Added to cart", { duration: 1500 }); }}
                          title="Add to cart"
                        >
                          <ShoppingCart size={14} />
                        </button>
                        <button
                          className="offer-buy-btn"
                          onClick={(e) => { e.stopPropagation(); handleOfferBuy(seller); }}
                        >
                          <Zap size={12} strokeWidth={2.5} />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {otherSellers.length > 2 && (
                  <button
                    className="w-full mt-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-xl hover:border-[oklch(0.75_0.12_145)] hover:bg-[oklch(0.99_0.01_145)] transition-all flex items-center justify-center gap-2"
                    onClick={() => setShowAllOffers(!showAllOffers)}
                  >
                    {showAllOffers ? <><ChevronUp size={15} />Show less</> : <><ChevronDown size={15} />Show {otherSellers.length - 2} more offers</>}
                  </button>
                )}
              </div>
            </section>

            {/* ── YOU MAY ALSO LIKE — full-width product cards with hover reveal ── */}
            <section className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="text-xl font-bold text-foreground">You may also like</h2>
                <span className="text-sm text-muted-foreground">Similar subscriptions</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {relatedProducts.map((product: RelatedProduct) => {
                  const savePct = Math.round((1 - product.fromPrice / product.retailPrice) * 100);
                  return (
                    <div
                      key={product.id}
                      className="group relative rounded-xl overflow-hidden border border-border bg-white cursor-pointer"
                      style={{ boxShadow: "0 1px 4px oklch(0 0 0 / 0.06)" }}
                      onClick={() => toast.info(`${product.shortName} — coming soon`, { duration: 1500 })}
                    >
                      {/* Cover image */}
                      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                        <img
                          src={product.imageUrl}
                          alt={product.shortName}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Dark overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                        {/* Discount badge */}
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] font-bold text-white bg-[oklch(0.45_0.22_25)] px-1.5 py-0.5 rounded-full">
                            -{savePct}%
                          </span>
                        </div>
                        {/* Tag badge */}
                        {product.tag && (
                          <div className="absolute top-2 right-2">
                            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-[oklch(0.95_0.05_145)] text-[oklch(0.38_0.16_145)] leading-none">
                              {product.tag}
                            </span>
                          </div>
                        )}
                        {/* Hover CTA buttons */}
                        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out p-2 flex flex-col gap-1.5">
                          <button className="w-full py-1.5 text-[11px] font-bold text-white bg-[oklch(0.45_0.22_145)] rounded-lg hover:bg-[oklch(0.38_0.16_145)] transition-colors">
                            Buy Now
                          </button>
                          <button className="w-full py-1.5 text-[11px] font-semibold text-white border border-white/60 rounded-lg hover:bg-white/10 transition-colors">
                            View offers
                          </button>
                        </div>
                      </div>
                      {/* Card body */}
                      <div className="p-3">
                        {/* Brand row */}
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div
                            className="w-4 h-4 rounded flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
                            style={{ background: product.color }}
                          >
                            {product.initials[0]}
                          </div>
                          <span className="text-[10px] text-muted-foreground">{product.category}</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground leading-tight mb-2 group-hover:text-[oklch(0.38_0.16_145)] transition-colors">
                          {product.shortName}
                        </p>
                        {/* Price row */}
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs text-muted-foreground">from</span>
                          <span className="text-sm font-bold text-foreground">${product.fromPrice.toFixed(2)}</span>
                          <span className="text-[10px] text-muted-foreground line-through">${product.retailPrice.toFixed(2)}</span>
                        </div>
                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star size={9} className="fill-[oklch(0.78_0.16_75)] text-[oklch(0.78_0.16_75)]" />
                          <span className="text-[10px] text-muted-foreground">{product.rating.toFixed(1)} · {product.sellersCount} sellers</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── REVIEWS — two-column desktop layout (Instant Gaming pattern) ── */}
            <section className="animate-fade-in-up" style={{ animationDelay: "200ms" }} id="reviews">
              <div className="flex items-center justify-between mb-4">
                <h2 className="section-label">
                  Buyer reviews
                  <span className="ml-2 text-xs font-normal text-muted-foreground normal-case tracking-normal">
                    {productStats.reviewCount} verified
                  </span>
                </h2>
                <div className="flex items-center gap-1.5">
                  <StarRating rating={productStats.rating} size={13} />
                  <span className="text-sm font-bold text-foreground">{productStats.rating}</span>
                </div>
              </div>

              {/* Rating summary */}
              <div className="bg-white rounded-xl border border-border p-4 mb-5">
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground tracking-tight">{productStats.rating}</div>
                    <StarRating rating={productStats.rating} size={16} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">{productStats.reviewCount} reviews</p>
                  </div>
                  <div className="space-y-1.5">
                    {[{ stars: 5, pct: 78 }, { stars: 4, pct: 14 }, { stars: 3, pct: 5 }, { stars: 2, pct: 2 }, { stars: 1, pct: 1 }].map((row) => (
                      <div key={row.stars} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-3">{row.stars}</span>
                        <Star size={10} className="text-[oklch(0.78_0.16_75)] fill-[oklch(0.78_0.16_75)] flex-shrink-0" />
                        <div className="flex-1 h-1.5 bg-[oklch(0.92_0.006_240)] rounded-full overflow-hidden">
                          <div className="h-full bg-[oklch(0.78_0.16_75)] rounded-full" style={{ width: `${row.pct}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-7 text-right">{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Two-column reviews on desktop — Instant Gaming pattern */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Most helpful */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">Most helpful</p>
                  <div className="space-y-3">
                    {sortedByHelpful.slice(0, 3).map((review) => (
                      <ReviewCard
                        key={review.id}
                        review={review}
                        helpfulCount={helpfulCounts[review.id] ?? review.helpfulCount}
                        voted={helpfulVotes[review.id] ?? false}
                        onHelpful={() => handleHelpful(review.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Right: Most recent */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">Most recent</p>
                  <div className="space-y-3">
                    {sortedByRecent.slice(0, 3).map((review) => (
                      <ReviewCard
                        key={review.id}
                        review={review}
                        helpfulCount={helpfulCounts[review.id] ?? review.helpfulCount}
                        voted={helpfulVotes[review.id] ?? false}
                        onHelpful={() => handleHelpful(review.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-xl hover:border-[oklch(0.75_0.12_145)] transition-all flex items-center justify-center gap-2"
                onClick={() => toast.info(`All ${productStats.reviewCount} reviews`, { description: "Full review page coming soon", duration: 2000 })}
              >
                <ChevronDown size={15} />Show all {productStats.reviewCount} reviews
              </button>
            </section>

            {/* SEO Content Block — H2/H3/H4/FAQ — below reviews */}
            <SeoContent />

          </div>

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT COLUMN — Purchase Card
          ═══════════════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
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
                <div className="px-5 pt-4 pb-4 border-b border-border">
                  <div className="flex items-baseline gap-2.5 mb-1">
                    <span className="price-display">${currentPrice.toFixed(2)}</span>
                    {activeVariant?.retailPrice && activeVariant.retailPrice > currentPrice && (
                      <span className="text-base font-medium text-muted-foreground line-through">
                        ${activeVariant.retailPrice.toFixed(2)}
                      </span>
                    )}
                    {activeVariant?.retailPrice && activeVariant.retailPrice > currentPrice && (
                      <span className="text-xs font-bold text-white bg-[oklch(0.52_0.18_145)] px-1.5 py-0.5 rounded-full">
                        -{Math.round((1 - currentPrice / activeVariant.retailPrice) * 100)}% vs retail
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    {activeVariant && activeVariant.monthCount > 1 && (
                      <span className="text-sm text-[oklch(0.52_0.18_145)] font-semibold">
                        ${(activeVariant.price / activeVariant.monthCount).toFixed(2)}/mo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Best price of {activeVariant?.sellersCount ?? productStats.sellerCount} sellers
                    {" · "}<span className="font-medium text-foreground">{selectedDuration} · {selectedRegion}</span>
                  </p>
                </div>

                {/* Selected seller */}
                <div className="px-5 py-4 border-b border-border">
                  <p className="section-label mb-3">Seller</p>
                  <div className="flex items-center gap-3">
                    <SellerTooltip seller={selectedSeller}>
                      <button className="flex-shrink-0"><SellerAvatar seller={selectedSeller} size={38} /></button>
                    </SellerTooltip>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <SellerTooltip seller={selectedSeller}>
                          <button className="flex items-center gap-1 hover:underline">
                            <span className="text-sm font-semibold text-foreground">{selectedSeller.name}</span>
                            <Info size={12} className="text-muted-foreground/60" />
                          </button>
                        </SellerTooltip>
                        {selectedSeller.isRecommended && (
                          <span className="text-[10px] font-bold text-[oklch(0.52_0.18_145)] bg-[oklch(0.95_0.05_145)] border border-[oklch(0.85_0.10_145)] px-1.5 py-0.5 rounded-full">
                            Most orders
                          </span>
                        )}
                      </div>
                      {/* Numeric rating in purchase card — Eneba pattern */}
                                            <div className="flex items-center gap-1.5 mt-0.5">
                        <NumericRatingBadge rating={selectedSeller.rating} label={selectedSeller.ratingLabel} />
                        <DeliveryBadge mode={selectedSeller.deliveryMode} />
                      </div>
                    </div>
                    
                  </div>

                  {selectedSeller.isRecommended && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {selectedSeller.successRate}% delivery success · {selectedSeller.totalOrders.toLocaleString()} completed orders
                    </p>
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

                {/* Protection */}
                <div className="px-5 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="section-label">Buyer protection</p>
                    <button
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                      onClick={() => setShowProtectionDetails(!showProtectionDetails)}
                    >
                      {showProtectionDetails ? "Hide" : "Details"}
                      {showProtectionDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                  </div>

                  {/* 2 protection icons — removed Instant delivery (it’s the norm, not a feature) */}
                  <div className="grid grid-cols-2 gap-2">
                    <ProtectionTooltip title={PROTECTION_TOOLTIPS.delivery.title} description={PROTECTION_TOOLTIPS.delivery.description} side="bottom">
                      <button className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[oklch(0.97_0.003_240)] hover:bg-[oklch(0.95_0.04_145)] transition-colors text-center">
                        <ShieldCheck size={16} className="text-[oklch(0.52_0.18_145)]" />
                        <span className="text-[10px] font-medium text-muted-foreground leading-tight">Delivery guarantee</span>
                      </button>
                    </ProtectionTooltip>
                    <ProtectionTooltip title={PROTECTION_TOOLTIPS.verified.title} description={PROTECTION_TOOLTIPS.verified.description} side="bottom">
                      <button className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-[oklch(0.97_0.003_240)] hover:bg-[oklch(0.94_0.04_255)] transition-colors text-center">
                        <Lock size={16} className="text-[oklch(0.55_0.18_255)]" />
                        <span className="text-[10px] font-medium text-muted-foreground leading-tight">Verified sellers</span>
                      </button>
                    </ProtectionTooltip>
                  </div>

                  {showProtectionDetails && (
                    <div className="mt-3 space-y-0 border border-border rounded-xl overflow-hidden animate-fade-in-up">
                      {protectionItems.map((item, i) => {
                        const Icon = item.icon === "shield" ? ShieldCheck : item.icon === "zap" ? Zap : item.icon === "lock" ? Lock : Headphones;
                        const iconColor = item.color === "green" ? "oklch(0.52 0.18 145)" : item.color === "amber" ? "oklch(0.78 0.16 75)" : item.color === "blue" ? "oklch(0.55 0.18 255)" : "oklch(0.6 0.18 295)";
                        const iconBg = item.color === "green" ? "oklch(0.95 0.05 145)" : item.color === "amber" ? "oklch(0.96 0.05 75)" : item.color === "blue" ? "oklch(0.94 0.04 255)" : "oklch(0.94 0.04 295)";
                        return (
                          <div key={i} className="flex items-start gap-3 p-3 border-b border-border last:border-0 bg-white">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: iconBg }}>
                              <Icon size={13} style={{ color: iconColor }} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-foreground">{item.title}</p>
                              <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{item.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* ScamAdviser trust signal */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5 flex-1">
                        <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="32" height="32" rx="6" fill="#E8F5E9"/>
                          <path d="M16 4L6 8v8c0 5.5 4.3 10.7 10 12 5.7-1.3 10-6.5 10-12V8L16 4z" fill="#2E7D32"/>
                          <path d="M13 16l2.5 2.5L20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-[11px] font-semibold text-foreground">ScamAdviser</span>
                        <span className="text-[10px] text-muted-foreground">Trust score</span>
                        <span className="text-[11px] font-bold text-[oklch(0.52_0.18_145)]">100/100</span>
                      </div>
                      <a
                        href="https://www.scamadviser.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink size={10} />
                      </a>
                    </div>
                    {/* Payment methods */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[
                        { label: "Visa",       bg: "#1A1F71", text: "VISA",    textColor: "#fff",    w: 36 },
                        { label: "Mastercard", bg: "#EB001B", text: "MC",      textColor: "#fff",    w: 28 },
                        { label: "PayPal",     bg: "#003087", text: "PP",      textColor: "#009cde", w: 28 },
                        { label: "Google Pay", bg: "#fff",    text: "G Pay",   textColor: "#3c4043", w: 36, border: true },
                        { label: "Apple Pay",  bg: "#000",    text: "Pay",     textColor: "#fff",    w: 32 },
                      ].map((pm) => (
                        <div
                          key={pm.label}
                          className="h-5 rounded flex items-center justify-center px-1.5 flex-shrink-0"
                          style={{
                            background: pm.bg,
                            width: pm.w,
                            border: pm.border ? "1px solid #dadce0" : undefined,
                          }}
                          title={pm.label}
                        >
                          <span
                            className="font-bold leading-none"
                            style={{ fontSize: 8, color: pm.textColor, letterSpacing: pm.label === "Visa" ? "0.02em" : undefined }}
                          >
                            {pm.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </aside>
        </div>
      </main>

      {/* Mobile sticky bar */}
      <div className="mobile-sticky-bar lg:hidden">
        <div className="flex-1 min-w-0">
          <div className="text-lg font-bold text-foreground leading-tight">${currentPrice.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground truncate">{selectedSeller.name} · {selectedDuration} · {selectedRegion}</div>
        </div>
        <button className="offer-cart-btn flex-shrink-0" onClick={handleAddToCart} style={{ width: 44, height: 44 }}>
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

// ── Review Card component — with variant tag and Helpful button ──────────────
function ReviewCard({
  review,
  helpfulCount,
  voted,
  onHelpful,
}: {
  review: { id: string; author: string; country: string; rating: number; date: string; text: string; verified: boolean; variant: string };
  helpfulCount: number;
  voted: boolean;
  onHelpful: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-border p-4">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[oklch(0.94_0.04_255)] flex items-center justify-center text-xs font-bold text-[oklch(0.55_0.18_255)] flex-shrink-0">
          {review.author.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{review.author}</span>
            <span className="text-xs text-muted-foreground">{review.country}</span>
            {review.verified && (
              <span className="flex items-center gap-0.5 text-[10px] font-medium text-[oklch(0.52_0.18_145)]">
                <ShieldCheck size={10} />Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating rating={review.rating} size={11} />
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{review.text}</p>

      {/* Variant tag — Fernandes et al. 2022: relevance is one of 4 factors driving review influence */}
      <div className="mt-2 mb-2">
        <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{review.variant}</span>
      </div>

      {/* Helpful button — Instant Gaming pattern: improves review quality signal without registration */}
      <div className="flex items-center justify-end mt-1">
        <button
          onClick={onHelpful}
          disabled={voted}
          className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full transition-all ${
            voted
              ? "text-[oklch(0.52_0.18_145)] bg-[oklch(0.95_0.05_145)]"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <ThumbsUp size={11} className={voted ? "fill-[oklch(0.52_0.18_145)]" : ""} />
          Helpful {helpfulCount > 0 && <span>({helpfulCount})</span>}
        </button>
      </div>
    </div>
  );
}

// ── SpecsTable — dotted leaders + expandable "All characteristics" ────────────
function SpecsTable({
  selectedRegion,
  selectedDuration,
  totalSold,
  soldLast30Days,
}: {
  selectedRegion: string;
  selectedDuration: string;
  totalSold: number;
  soldLast30Days: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const mainRows: { label: string; value: React.ReactNode }[] = [
    { label: "Region", value: selectedRegion },
    { label: "Duration", value: selectedDuration },
    { label: "Delivery", value: "Instant · Login credentials" },
    {
      label: "Total sales",
      value: `${totalSold.toLocaleString()} orders`,
    },
    {
      label: "Sold last 30 days",
      value: (
        <span className="flex items-center gap-1 text-[oklch(0.52_0.18_145)] font-semibold">
          <TrendingUp size={12} />
          {soldLast30Days} orders
        </span>
      ),
    },
  ];

  const extraRows: { label: string; value: React.ReactNode }[] = [
    { label: "Platforms", value: "Web, iOS, Android, Smart TV, Consoles" },
    { label: "Languages", value: "English, Spanish, French, Portuguese" },
    { label: "Streams", value: "Up to 3 simultaneous streams" },
    { label: "Activation", value: "Login credentials · Instant access" },
    { label: "Replacements", value: "Unlimited — if access stops working" },
    { label: "Content", value: "HBO Originals, Warner Bros., DC, Max Originals" },
  ];

  const rows = expanded ? [...mainRows, ...extraRows] : mainRows;

  return (
    <div className="border-t border-border pt-4">
      <div className="space-y-0">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-baseline gap-2 py-2 border-b border-dashed border-border/60 last:border-0"
          >
            <span className="text-sm text-muted-foreground whitespace-nowrap flex-shrink-0 w-32">
              {row.label}
            </span>
            <span className="flex-1 border-b border-dashed border-border/40 mb-1 mx-1" />
            <span className="text-sm font-medium text-foreground text-right">{row.value}</span>
          </div>
        ))}
      </div>
      <button
        className="mt-3 flex items-center gap-1 text-sm font-medium text-[oklch(0.52_0.18_145)] hover:text-[oklch(0.38_0.16_145)] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <>
            <ChevronUp size={14} />
            Hide characteristics
          </>
        ) : (
          <>
            <ChevronDown size={14} />
            All characteristics ›
          </>
        )}
      </button>
    </div>
  );
}
