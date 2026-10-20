import type { Product, SortOption } from '../types/store.ts';

/**
 * Formats Indian Rupee currency with standard Indian numbering system (lakh/crore)
 */
export function formatCurrencyINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats product price with per-meter or per-piece indicators
 */
export function formatProductPrice(product: {
  price: number;
  pricePerMeter?: boolean;
  unit?: string;
}): string {
  const formatted = formatCurrencyINR(product.price);
  if (product.pricePerMeter) {
    const unit = product.unit || 'meter';
    return `${formatted} / ${unit}`;
  }
  return formatted;
}

export interface FilterCriteria {
  category?: string;
  search?: string;
  availability?: string;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Pure filter function for products
 */
export function filterProducts(
  products: Product[],
  criteria: FilterCriteria
): Product[] {
  return products.filter((p) => {
    // Category check
    if (criteria.category && criteria.category !== 'all' && p.category !== criteria.category) {
      return false;
    }

    // Availability check
    if (
      criteria.availability &&
      criteria.availability !== 'all' &&
      p.availability !== criteria.availability
    ) {
      return false;
    }

    // Price range
    if (criteria.minPrice !== undefined && p.price < criteria.minPrice) {
      return false;
    }
    if (criteria.maxPrice !== undefined && p.price > criteria.maxPrice) {
      return false;
    }

    // Search query matches name, fabric, description, materialDetails, or colors
    if (criteria.search && criteria.search.trim() !== '') {
      const q = criteria.search.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchFabric = p.fabric.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchMaterial = p.materialDetails.toLowerCase().includes(q);
      const matchColors = p.colors.some((c) => c.toLowerCase().includes(q));

      if (!matchName && !matchFabric && !matchDesc && !matchMaterial && !matchColors) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Pure sort function for products
 */
export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const cloned = [...products];

  switch (sortBy) {
    case 'price-asc':
      return cloned.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return cloned.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return cloned.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
      return cloned.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    case 'featured':
    default:
      return cloned.sort((a, b) => {
        if (a.featured === b.featured) {
          if (a.popular === b.popular) return 0;
          return a.popular ? -1 : 1;
        }
        return a.featured ? -1 : 1;
      });
  }
}

/**
 * Computes product counts per category
 */
export function getCategoryCounts(products: Product[]): Record<string, number> {
  const counts: Record<string, number> = { all: products.length };
  for (const product of products) {
    counts[product.category] = (counts[product.category] || 0) + 1;
  }
  return counts;
}
