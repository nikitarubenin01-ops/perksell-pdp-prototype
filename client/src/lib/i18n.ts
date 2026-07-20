export type Locale = 'en' | 'es';

export const translations = {
  en: {
    // Header
    searchPlaceholder: 'Search for games, top-ups and more',
    topUp: 'Top Up',
    support: 'Support',

    // Breadcrumb
    home: 'Home',
    subscriptions: 'Subscriptions',

    // Product hero
    h1: 'Buy MAX (HBO) Subscription — Cheap Price, Instant Delivery',
    reviews: 'reviews',
    sold: 'sold',
    activationsLastMonth: 'activations in the last 30 days',
    whatIsThis: 'What is this?',

    // Region / Duration
    regionLabel: 'REGION',
    durationLabel: 'DURATION',
    sellers: 'sellers',

    // Specs table
    delivery: 'Delivery',
    deliveryValue: 'Instant · Login credentials',
    soldLast30Days: 'Sold last 30 days',
    orders: 'orders',
    allCharacteristics: 'All characteristics',
    hideCharacteristics: 'Hide characteristics',
    region: 'Region',
    duration: 'Duration',
    platform: 'Platform',
    activation: 'Activation',

    // Offer list
    availableOffers: 'AVAILABLE OFFERS',
    howThisWorks: 'How this works',
    recommended: 'RECOMMENDED',
    howWeRecommend: 'How we recommend',
    howWeRecommendDesc:
      'Recommended offer is selected by Perksell based on price, seller reliability, delivery success rate, and dispute history — not by payment.',
    howOffersWork: 'How offers work',
    howOffersWorkDesc:
      'Multiple verified sellers list the same product at different prices. All sellers pass Perksell verification. You choose who to buy from.',
    otherOffers: 'OTHER OFFERS',
    showMoreOffers: (n: number) => `Show ${n} more offers`,
    showLess: 'Show less',
    buyNow: 'Buy Now',
    addToCart: 'Add to cart',
    addedToCart: 'Added to cart',

    // Purchase card
    perMonth: '/mo',
    buyNowBtn: 'Buy Now',
    addToCartBtn: 'Add to Cart',
    buyerProtection: 'BUYER PROTECTION',
    details: 'Details',
    deliveryGuarantee: 'Delivery guarantee',
    verifiedSellers: 'Verified sellers',
    trustScore: 'Trust score',
    recommendedBadge: 'Recommended',

    // Buyer protection tooltip
    protectionTitle: 'Buyer Protection',
    protectionDesc:
      'If your order is not delivered within 24 hours, you will receive a full refund. All sellers are verified by Perksell.',

    // Sticky bar
    savingsLabel: (amount: string) => `Save ${amount}`,

    // Reviews
    buyerReviews: 'Buyer reviews',
    verified: 'verified',
    writeReview: 'Write a review',
    verifiedPurchase: 'Verified purchase',
    helpful: 'Helpful',
    notHelpful: 'Not helpful',
    showAllReviews: 'Show all reviews',

    // Similar products
    youMayAlsoLike: 'You may also like',
    similarSubscriptions: 'Similar subscriptions',
    from: 'from',

    // SEO section
    seoTitle: (product: string) =>
      `Buy ${product} Subscription — FAQ & Buyer Guide`,
    seoSubtitle: 'Frequently asked questions',

    // Delivery modes
    instant: 'Instant',
    manual: 'Manual',

    // Protection items (expanded list)
    protectionItems: [
      { title: 'Access guarantee', description: 'If your access stops working at any point during the subscription period, the seller provides a replacement at no extra cost. If unresolved within 24h, Perksell issues a full refund.' },
      { title: 'Instant access delivery', description: 'Login credentials are delivered automatically after payment confirmation. You get immediate access — usually under 1 minute for instant sellers.' },
      { title: 'Escrow payment', description: 'Your payment is held securely by Perksell until access is confirmed. Sellers receive funds only after successful delivery — your money is protected at every step.' },
      { title: 'Support within 2h', description: 'Our team responds to access issues within 2 hours. Replacement requests and disputes are resolved within 24–48 hours.' },
    ],

    // Protection tooltips
    tooltipDeliveryTitle: 'Access guarantee',
    tooltipDeliveryDesc: 'If your access stops working at any point during the subscription period, the seller provides a replacement at no extra cost. If unresolved within 24h, Perksell issues a full refund.',
    tooltipSecureTitle: 'Escrow payment',
    tooltipSecureDesc: 'Your payment is held securely by Perksell and only released to the seller after access is confirmed. Sellers cannot access funds until you receive your order.',
    tooltipVerifiedTitle: 'Verified sellers',
    tooltipVerifiedDesc: 'All sellers pass identity verification, payment method checks, and maintain a minimum 97% delivery success rate to stay listed on Perksell.',
    tooltipRegionTitle: 'What is region?',
    tooltipRegionDesc: 'Region determines which country or zone the subscription is valid for. Make sure to select the region that matches your account.',
    tooltipOffersTitle: 'How offers work',
    tooltipOffersDesc: 'Multiple verified sellers list the same product at different prices. All sellers pass Perksell verification. You choose who to buy from.',
    tooltipRecommendTitle: 'How we recommend',
    tooltipRecommendDesc: 'Recommended offer is selected by Perksell based on price, seller reliability, delivery success rate, and dispute history — not by payment.',

    // Social proof urgency block
    viewingNow: (n: number) => `${n} people viewing right now`,
    lastPurchase: (t: string) => `Last purchase ${t}`,
    boughtToday: (n: number) => `${n} bought today`,

    // Misc
    vsOfficial: 'vs official',
  },

  es: {
    // Header
    searchPlaceholder: 'Busca juegos, recargas y más',
    topUp: 'Recargar',
    support: 'Soporte',

    // Breadcrumb
    home: 'Inicio',
    subscriptions: 'Suscripciones',

    // Product hero
    h1: 'Comprar Suscripción MAX (HBO) — Precio Barato, Entrega Instantánea',
    reviews: 'reseñas',
    sold: 'vendidos',
    activationsLastMonth: 'activaciones en los últimos 30 días',
    whatIsThis: '¿Qué es esto?',

    // Region / Duration
    regionLabel: 'REGIÓN',
    durationLabel: 'DURACIÓN',
    sellers: 'vendedores',

    // Specs table
    delivery: 'Entrega',
    deliveryValue: 'Instantánea · Credenciales de acceso',
    soldLast30Days: 'Vendidos últimos 30 días',
    orders: 'pedidos',
    allCharacteristics: 'Todas las características',
    hideCharacteristics: 'Ocultar características',
    region: 'Región',
    duration: 'Duración',
    platform: 'Plataforma',
    activation: 'Activación',

    // Offer list
    availableOffers: 'OFERTAS DISPONIBLES',
    howThisWorks: 'Cómo funciona',
    recommended: 'RECOMENDADO',
    howWeRecommend: 'Cómo recomendamos',
    howWeRecommendDesc:
      'La oferta recomendada es seleccionada por Perksell en base al precio, fiabilidad del vendedor, tasa de entrega exitosa e historial de disputas — no por pago.',
    howOffersWork: 'Cómo funcionan las ofertas',
    howOffersWorkDesc:
      'Múltiples vendedores verificados ofrecen el mismo producto a distintos precios. Todos los vendedores pasan la verificación de Perksell. Tú eliges a quién comprar.',
    otherOffers: 'OTRAS OFERTAS',
    showMoreOffers: (n: number) => `Ver ${n} ofertas más`,
    showLess: 'Ver menos',
    buyNow: 'Comprar',
    addToCart: 'Añadir al carrito',
    addedToCart: 'Añadido al carrito',

    // Purchase card
    perMonth: '/mes',
    buyNowBtn: 'Comprar Ahora',
    addToCartBtn: 'Añadir al Carrito',
    buyerProtection: 'PROTECCIÓN AL COMPRADOR',
    details: 'Detalles',
    deliveryGuarantee: 'Garantía de entrega',
    verifiedSellers: 'Vendedores verificados',
    trustScore: 'Puntuación de confianza',
    recommendedBadge: 'Recomendado',

    // Buyer protection tooltip
    protectionTitle: 'Protección al Comprador',
    protectionDesc:
      'Si tu pedido no se entrega en 24 horas, recibirás un reembolso completo. Todos los vendedores están verificados por Perksell.',

    // Sticky bar
    savingsLabel: (amount: string) => `Ahorro ${amount}`,

    // Reviews
    buyerReviews: 'Reseñas de compradores',
    verified: 'verificadas',
    writeReview: 'Escribir reseña',
    verifiedPurchase: 'Compra verificada',
    helpful: 'Útil',
    notHelpful: 'No útil',
    showAllReviews: 'Ver todas las reseñas',

    // Similar products
    youMayAlsoLike: 'También te puede gustar',
    similarSubscriptions: 'Suscripciones similares',
    from: 'desde',

    // SEO section
    seoTitle: (product: string) =>
      `Comprar Suscripción ${product} — Preguntas Frecuentes y Guía`,
    seoSubtitle: 'Preguntas frecuentes',

    // Delivery modes
    instant: 'Instantánea',
    manual: 'Manual',

    // Protection items (expanded list)
    protectionItems: [
      { title: 'Garantía de acceso', description: 'Si tu acceso deja de funcionar en cualquier momento durante el período de suscripción, el vendedor proporciona un reemplazo sin coste adicional. Si no se resuelve en 24h, Perksell emite un reembolso completo.' },
      { title: 'Entrega instantánea de acceso', description: 'Las credenciales de acceso se entregan automáticamente tras la confirmación del pago. Obtienes acceso inmediato — normalmente en menos de 1 minuto para vendedores instantáneos.' },
      { title: 'Pago en custodia', description: 'Tu pago es retenido de forma segura por Perksell hasta que se confirma el acceso. Los vendedores reciben los fondos solo después de una entrega exitosa — tu dinero está protegido en cada paso.' },
      { title: 'Soporte en 2h', description: 'Nuestro equipo responde a los problemas de acceso en 2 horas. Las solicitudes de reemplazo y disputas se resuelven en 24–48 horas.' },
    ],

    // Protection tooltips
    tooltipDeliveryTitle: 'Garantía de acceso',
    tooltipDeliveryDesc: 'Si tu acceso deja de funcionar, el vendedor proporciona un reemplazo sin coste. Si no se resuelve en 24h, Perksell emite un reembolso completo.',
    tooltipSecureTitle: 'Pago en custodia',
    tooltipSecureDesc: 'Tu pago es retenido por Perksell y solo se libera al vendedor tras confirmar el acceso. Los vendedores no pueden acceder a los fondos hasta que recibas tu pedido.',
    tooltipVerifiedTitle: 'Vendedores verificados',
    tooltipVerifiedDesc: 'Todos los vendedores pasan verificación de identidad y mantienen una tasa mínima del 97% de entrega exitosa para estar listados en Perksell.',
    tooltipRegionTitle: '¿Qué es la región?',
    tooltipRegionDesc: 'La región determina en qué país o zona es válida la suscripción. Asegúrate de seleccionar la región que coincide con tu cuenta.',
    tooltipOffersTitle: 'Cómo funcionan las ofertas',
    tooltipOffersDesc: 'Múltiples vendedores verificados ofrecen el mismo producto a distintos precios. Todos pasan la verificación de Perksell. Tú eliges a quién comprar.',
    tooltipRecommendTitle: 'Cómo recomendamos',
    tooltipRecommendDesc: 'La oferta recomendada es seleccionada por Perksell en base al precio, fiabilidad del vendedor, tasa de entrega exitosa e historial de disputas — no por pago.',

    // Social proof urgency block
    viewingNow: (n: number) => `${n} personas viendo ahora`,
    lastPurchase: (t: string) => `Última compra ${t}`,
    boughtToday: (n: number) => `${n} compras hoy`,

    // Misc
    vsOfficial: 'vs oficial',
  },
} as const;

export type Translations = typeof translations.en;

export function useTranslations(locale: Locale): Translations {
  return translations[locale] as unknown as Translations;
}
