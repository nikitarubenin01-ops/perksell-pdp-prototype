import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// ─── SEO Content Block for MAX (HBO) Action PDP ──────────────────────────────
// Position: below reviews section, full-width left column
// Target keywords: buy MAX HBO cheap, MAX subscription digital code,
//   cheap MAX HBO subscription, MAX HBO 1 month global, how to activate MAX
// Structure mirrors G2A/Kinguin pattern: H2 → H3 → body → FAQ (H4)
// ─────────────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Is it safe to buy a MAX subscription on Perksell?",
    a: "Yes. Every seller on Perksell passes identity verification and maintains a minimum 97% successful delivery rate. Your payment is held in escrow and only released to the seller after you confirm receipt. If delivery fails for any reason, you receive a full refund or replacement within 24 hours — no questions asked.",
  },
  {
    q: "What is the difference between Global and regional MAX subscriptions?",
    a: "A Global subscription works on MAX accounts created in most countries worldwide. Regional subscriptions (Spain, EU, US) are tied to accounts registered in that specific region and are typically cheaper due to local pricing. If your MAX account was created in Spain, the Spain subscription is the correct choice — and you save up to 22% compared to the Global version.",
  },
  {
    q: "How do I activate a MAX subscription after purchase?",
    a: "After payment, you receive login credentials or an activation code instantly in your Perksell account. Go to max.com, sign in (or create an account if it's a fresh account delivery), navigate to Account → Subscription, and enter the code or use the provided credentials. Activation takes under 2 minutes for most users.",
  },
  {
    q: "Can I use a MAX subscription on multiple devices?",
    a: "The MAX Standard plan supports streaming on up to 2 devices simultaneously, while the Premium plan allows up to 4 devices with 4K UHD and Dolby Atmos support. All subscriptions sold on Perksell are official MAX plans — the same plans you would get directly from max.com, just at a significantly lower price.",
  },
  {
    q: "Why is the price cheaper than buying directly from MAX?",
    a: "Perksell is a multi-seller marketplace where verified resellers offer MAX subscriptions at competitive prices. Sellers source subscriptions through regional pricing differences and bulk purchasing. All subscriptions are 100% legitimate and activate on official MAX accounts — the savings come from the marketplace model, not from any compromise in quality.",
  },
  {
    q: "What happens if my MAX subscription stops working?",
    a: "Perksell's Delivery Guarantee covers all orders. If your subscription becomes inactive or fails to activate, contact Perksell support within 24 hours of purchase. We will provide a replacement subscription from another verified seller or issue a full refund. Our dispute resolution team responds within 2 hours.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        onClick={() => setOpen(!open)}
      >
        <h4 className="text-sm font-semibold text-foreground group-hover:text-[oklch(0.38_0.16_145)] transition-colors leading-snug">
          {q}
        </h4>
        <span className="flex-shrink-0 text-muted-foreground">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && (
        <p className="text-sm text-foreground/75 leading-relaxed pb-4 -mt-1">
          {a}
        </p>
      )}
    </div>
  );
}

export default function SeoContent() {
  return (
    <section className="mt-8 space-y-8">

      {/* ── H2: Primary keyword block ── */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-3 leading-snug">
          Buy MAX (HBO) Subscription Cheap — Instant Digital Delivery
        </h2>
        <p className="text-sm text-foreground/75 leading-relaxed mb-4">
          Perksell is the fastest way to get a cheap MAX (HBO) subscription with instant delivery. Instead of paying the full retail price of $9.99–$22.99/month directly on max.com, you buy from verified sellers on our marketplace and save up to 40% on the same official subscription. Every offer is backed by Perksell's Delivery Guarantee — if anything goes wrong, you get a replacement or full refund within 24 hours.
        </p>
        <p className="text-sm text-foreground/75 leading-relaxed">
          MAX — formerly known as HBO Max — is the premium streaming platform from Warner Bros. Discovery, home to HBO originals, Warner Bros. blockbusters, DC films, and live sports. With over 35,000 hours of content including Game of Thrones, The Last of Us, House of the Dragon, and thousands of movies, a MAX subscription is one of the most valuable streaming purchases you can make. Buying it cheap on Perksell means you get the same content at a fraction of the cost.
        </p>
      </div>

      {/* ── H3: Subscription plans comparison ── */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-bold text-foreground mb-3">
          MAX Subscription Plans: Which One to Choose?
        </h3>
        <p className="text-sm text-foreground/75 leading-relaxed mb-5">
          MAX offers three official plan tiers. On Perksell, all three are available from verified sellers at below-retail prices. Here is a direct comparison to help you choose the right plan before you buy.
        </p>

        {/* Plans table */}
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Plan</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Devices</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Quality</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ads</th>
                <th className="text-right py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Retail price</th>
                <th className="text-right py-2.5 px-3 text-xs font-semibold text-[oklch(0.52_0.18_145)] uppercase tracking-wide">On Perksell</th>
              </tr>
            </thead>
            <tbody>
              {[
                { plan: "Basic with Ads", devices: "2", quality: "1080p", ads: "Yes", retail: "$9.99/mo", perksell: "from $7.20/mo" },
                { plan: "Standard", devices: "2", quality: "1080p", ads: "No", retail: "$18.49/mo", perksell: "from $11.49/mo" },
                { plan: "Premium", devices: "4", quality: "4K UHD", ads: "No", retail: "$22.99/mo", perksell: "from $14.67/mo" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-[oklch(0.98_0.005_240)] transition-colors">
                  <td className="py-3 px-3 font-medium text-foreground">{row.plan}</td>
                  <td className="py-3 px-3 text-foreground/70">{row.devices}</td>
                  <td className="py-3 px-3 text-foreground/70">{row.quality}</td>
                  <td className="py-3 px-3 text-foreground/70">{row.ads}</td>
                  <td className="py-3 px-3 text-right text-foreground/70 line-through">{row.retail}</td>
                  <td className="py-3 px-3 text-right font-bold text-[oklch(0.52_0.18_145)]">{row.perksell}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          * Retail prices as of June 2026. Perksell prices reflect the lowest available offer from verified sellers and may vary by region and duration.
        </p>
      </div>

      {/* ── H3: Duration savings ── */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-bold text-foreground mb-3">
          Save More with Longer MAX Subscriptions
        </h3>
        <p className="text-sm text-foreground/75 leading-relaxed mb-4">
          The longer the subscription period you buy, the lower the effective monthly cost. This is true both on the official MAX website and on Perksell — but the savings are significantly larger when you combine a longer duration with Perksell's marketplace pricing.
        </p>
        <p className="text-sm text-foreground/75 leading-relaxed mb-4">
          For example, a 1-month Global MAX subscription on Perksell starts at <strong className="text-foreground">$14.67</strong>. A 6-month subscription brings the effective monthly cost down to <strong className="text-foreground">$4.83/month</strong> — a 67% reduction compared to buying month-by-month. If you are a regular MAX viewer, the 3-month or 6-month option is the most cost-efficient purchase on this page.
        </p>
        <p className="text-sm text-foreground/75 leading-relaxed">
          All duration variants — 1 month, 3 months, and 6 months — are available for Global, Spain, EU, and US regions. Select your region and duration above to see the exact price from each verified seller.
        </p>
      </div>

      {/* ── H3: How to buy + activate ── */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-bold text-foreground mb-4">
          How to Buy and Activate a MAX Subscription on Perksell
        </h3>

        <div className="space-y-4">
          {[
            {
              step: "1",
              title: "Select your region and duration",
              body: "Choose the region that matches your MAX account (Global works for most countries). Select the subscription duration — 1, 3, or 6 months. The price updates instantly to show the best available offer from verified sellers.",
            },
            {
              step: "2",
              title: "Choose a seller and complete payment",
              body: "Review the seller offers below the variant selector. Each seller shows their rating, delivery speed, and price. The Recommended offer is pre-selected based on price and reliability. Click Buy Now and complete the secure checkout — your payment is held in escrow until delivery is confirmed.",
            },
            {
              step: "3",
              title: "Receive your subscription instantly",
              body: "For instant-delivery sellers, your subscription credentials or activation code appear in your Perksell account within seconds of payment confirmation. For manual sellers, delivery takes up to 15 minutes. You receive an email notification as soon as your order is ready.",
            },
            {
              step: "4",
              title: "Activate on max.com",
              body: "Go to max.com and sign in to your existing account, or create a new one if the seller provided fresh account credentials. Navigate to Account → Subscription → Redeem Code, enter your code, and your MAX subscription activates immediately. You can start watching right away.",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="w-7 h-7 rounded-full bg-[oklch(0.95_0.05_145)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-[oklch(0.38_0.16_145)]">{item.step}</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-foreground/70 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── H3: Why buy on Perksell ── */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-bold text-foreground mb-3">
          Why Buy a Cheap MAX Subscription on Perksell?
        </h3>
        <p className="text-sm text-foreground/75 leading-relaxed mb-4">
          There are dozens of sites that claim to sell cheap streaming subscriptions. Most of them either sell shared accounts (which can be revoked at any time) or operate without any buyer protection. Perksell is different in three ways that matter for digital goods.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {[
            {
              title: "Verified sellers only",
              body: "Every seller on Perksell passes identity verification and maintains a minimum 97% delivery success rate. Sellers with dispute rates above 3% are automatically suspended. You are never buying from an anonymous source.",
            },
            {
              title: "Escrow payment protection",
              body: "Your money is held by Perksell and only released to the seller after you confirm that your subscription is working. If delivery fails, you get a full refund — the seller never touches your payment until you are satisfied.",
            },
            {
              title: "Instant delivery infrastructure",
              body: "Over 80% of sellers on this product offer instant automated delivery. Your subscription code arrives in under 60 seconds for most orders. No waiting, no manual fulfillment delays, no support tickets needed.",
            },
          ].map((card, i) => (
            <div key={i} className="p-4 rounded-lg bg-[oklch(0.98_0.005_240)] border border-border">
              <h4 className="text-sm font-semibold text-foreground mb-2">{card.title}</h4>
              <p className="text-xs text-foreground/65 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-foreground/75 leading-relaxed">
          With over 50,000 buyers and a platform rating of 4.8 out of 5, Perksell has established itself as a trusted marketplace for digital subscriptions in Spain and across Europe. The 98.7% success rate on MAX subscriptions specifically reflects the quality of sellers active on this product page.
        </p>
      </div>

      {/* ── H2: FAQ ── */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-1">
          Frequently Asked Questions — MAX (HBO) Subscription
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Common questions about buying cheap MAX subscriptions on Perksell.
        </p>
        <div className="divide-y-0">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>

    </section>
  );
}
