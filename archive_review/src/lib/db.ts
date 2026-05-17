// In-memory storage for demo purposes
// In production, replace with a real database like Prisma + PostgreSQL

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  slug: string;
  tier: 'starter' | 'professional' | 'agency';
  featured: boolean;
  features: string[];
  pdfPath: string;
}

export interface Purchase {
  id: string;
  email: string;
  amount: number;
  currency: string;
  stripePaymentId: string;
  stripeSessionId: string;
  downloadToken: string;
  downloadCount: number;
  maxDownloads: number;
  tokenExpiresAt: Date;
  productId: string;
  createdAt: Date;
}

// In-memory data stores
export const products: Product[] = [
  {
    id: 'prod_essential',
    name: 'Essential',
    description: 'Perfect for parents new to the IEP process',
    price: 2900, // $29
    slug: 'essential',
    tier: 'starter',
    featured: false,
    features: [
      'Complete 85+ page PDF guide',
      '4 essential templates',
      'Progress monitoring tracker',
      'Communication log template',
      'Email support',
    ],
    pdfPath: '/products/special-needs-parent-guide.pdf',
  },
  {
    id: 'prod_complete',
    name: 'Complete',
    description: 'Everything you need to confidently advocate',
    price: 6900, // $69
    slug: 'complete',
    tier: 'professional',
    featured: true,
    features: [
      'Everything in Essential, plus:',
      'All 15+ fillable templates',
      '12+ sample letters',
      'Behavior tracking forms',
      'Goal data collection sheets',
      'IEP meeting agenda template',
      'Priority email support',
    ],
    pdfPath: '/products/special-needs-parent-guide.pdf',
  },
  {
    id: 'prod_premium',
    name: 'Premium',
    description: 'Full toolkit with professional rights',
    price: 14900, // $149
    slug: 'premium',
    tier: 'agency',
    featured: false,
    features: [
      'Everything in Complete, plus:',
      'Full binder organization system',
      'Therapy coordination forms',
      'Mediation & complaint templates',
      'White-label rights',
      'Lifetime updates',
      'Priority 1-on-1 support',
    ],
    pdfPath: '/products/special-needs-parent-guide.pdf',
  },
];

export const purchases: Purchase[] = [];

// Helper functions
export function getProducts(): Product[] {
  return products.sort((a, b) => a.price - b.price);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function createPurchase(purchase: Omit<Purchase, 'id' | 'createdAt'>): Purchase {
  const newPurchase: Purchase = {
    ...purchase,
    id: `purchase_${Date.now()}`,
    createdAt: new Date(),
  };
  purchases.push(newPurchase);
  return newPurchase;
}

export function getPurchaseByToken(token: string): Purchase | undefined {
  return purchases.find((p) => p.downloadToken === token);
}

export function getPurchaseBySessionId(sessionId: string): Purchase | undefined {
  return purchases.find((p) => p.stripeSessionId === sessionId);
}

export function incrementDownloadCount(token: string): boolean {
  const purchase = purchases.find((p) => p.downloadToken === token);
  if (purchase) {
    purchase.downloadCount += 1;
    return true;
  }
  return false;
}

export function getStats() {
  const totalSales = purchases.length;
  const totalRevenue = purchases.reduce((sum, p) => sum + p.amount, 0);
  const totalDownloads = purchases.reduce((sum, p) => sum + p.downloadCount, 0);
  const uniqueBuyers = new Set(purchases.map((p) => p.email)).size;

  return {
    totalSales,
    totalRevenue,
    totalDownloads,
    uniqueBuyers,
    recentPurchases: purchases.slice(-10).reverse(),
  };
}