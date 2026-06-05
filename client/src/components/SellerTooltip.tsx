import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, Clock, ShieldCheck, Star, TrendingUp } from "lucide-react";
import type { Seller } from "@/lib/mockData";

interface SellerTooltipProps {
  seller: Seller;
  children: React.ReactNode;
}

function StarBar({ value }: { value: number }) {
  const pct = ((value - 1) / 4) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[oklch(0.92_0.006_240)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[oklch(0.78_0.16_75)] rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-[oklch(0.78_0.16_75)] w-7 text-right">
        {value.toFixed(2)}
      </span>
    </div>
  );
}

export default function SellerTooltip({ seller, children }: SellerTooltipProps) {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="start"
        sideOffset={8}
        className="p-0 border-0 shadow-2xl"
        style={{ background: "none" }}
      >
        <div
          className="w-72 rounded-xl overflow-hidden"
          style={{
            background: "oklch(0.14 0.02 250)",
            color: "white",
            boxShadow: "0 16px 48px oklch(0 0 0 / 0.35)",
          }}
        >
          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: seller.color }}
              >
                {seller.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{seller.name}</span>
                  <span className="flex items-center gap-1 text-[10px] font-medium bg-[oklch(0.52_0.18_145)] text-white px-1.5 py-0.5 rounded-full">
                    <CheckCircle2 size={9} />
                    Verified
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-0.5">
                  Member since {seller.memberSince}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-4 py-3 grid grid-cols-2 gap-3 border-b border-white/10">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                Total orders
              </p>
              <p className="text-base font-bold text-white">
                {seller.totalOrders.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                Sold (30 days)
              </p>
              <p className="text-base font-bold text-white">
                {seller.itemSalesLast30}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                Success rate
              </p>
              <p className="text-base font-bold text-[oklch(0.75_0.18_145)]">
                {seller.successRate}%
              </p>
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                Dispute rate
              </p>
              <p
                className="text-base font-bold"
                style={{
                  color:
                    seller.disputeRate < 1.5
                      ? "oklch(0.75 0.18 145)"
                      : seller.disputeRate < 3
                      ? "oklch(0.78 0.16 75)"
                      : "oklch(0.65 0.22 27)",
                }}
              >
                {seller.disputeRate}%
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-white/40 uppercase tracking-wider">
                Seller rating
              </p>
              <div className="flex items-center gap-1">
                <Star size={11} className="fill-[oklch(0.78_0.16_75)] text-[oklch(0.78_0.16_75)]" />
                <span className="text-xs font-semibold text-[oklch(0.78_0.16_75)]">
                  {seller.ratingLabel}
                </span>
              </div>
            </div>
            <StarBar value={seller.rating} />
          </div>

          {/* Delivery */}
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-white/40 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-white">
                  {seller.deliveryMode === "instant"
                    ? "Instant delivery"
                    : "Manual delivery"}
                </p>
                <p className="text-[11px] text-white/50">
                  {seller.deliveryMode === "instant"
                    ? "Code sent automatically after payment"
                    : `Seller sends manually · ${seller.deliveryTime}`}
                </p>
              </div>
            </div>
          </div>

          {/* Verification list */}
          <div className="px-4 py-3">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">
              Verification checks
            </p>
            <ul className="space-y-1.5">
              {seller.verificationDetails.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                  <ShieldCheck
                    size={12}
                    className="text-[oklch(0.75_0.18_145)] flex-shrink-0 mt-0.5"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Last sale */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-1.5 text-[11px] text-white/40">
              <TrendingUp size={11} />
              Last sale: {seller.lastSale}
            </div>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
