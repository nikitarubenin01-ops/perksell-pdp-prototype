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

    // Misc
    vsOfficial: 'vs oficial',
  },
} as const;

export type Translations = typeof translations.en;

export function useTranslations(locale: Locale): Translations {
  return translations[locale] as unknown as Translations;
}
