import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrencyINR,
  formatProductPrice,
  filterProducts,
  sortProducts,
  getCategoryCounts,
} from './catalogLogic.ts';
import type { Product } from '../types/store.ts';

const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Chanderi Pure Cotton Zari Saree',
    category: 'cotton-sarees',
    price: 1850,
    pricePerMeter: false,
    fabric: 'Pure Chanderi Handloom Cotton',
    materialDetails: 'Fine 80s count cotton warp with silver zari',
    colors: ['Maroon', 'Gold'],
    images: ['/images/saree1.jpg'],
    description: 'Traditional festive drape',
    availability: 'In Stock',
    featured: true,
    newArrival: false,
    popular: true,
  },
  {
    id: 'prod-2',
    name: 'Giza Satin Stripe Shirt Cloth',
    category: 'cotton-shirt-cloth',
    price: 450,
    pricePerMeter: true,
    unit: 'meter',
    fabric: '100% Giza Egyptian Long-Staple Cotton',
    materialDetails: '60s count compact yarn with lustrous finish',
    colors: ['Powder Blue', 'White'],
    images: ['/images/shirting1.jpg'],
    description: 'Luxury unstitched shirting fabric',
    availability: 'In Stock',
    featured: false,
    newArrival: true,
    popular: true,
  },
  {
    id: 'prod-3',
    name: 'Heavy Cotton Twill Pant Cloth',
    category: 'cotton-pant-cloth',
    price: 650,
    pricePerMeter: true,
    unit: 'meter',
    fabric: '100% Heavy Cotton Drill Twill',
    materialDetails: 'Sturdy 280 GSM wrinkle-resistant',
    colors: ['Khaki', 'Dark Charcoal'],
    images: ['/images/suiting1.jpg'],
    description: 'Unstitched trouser cloth',
    availability: 'Limited Stock',
    featured: false,
    newArrival: false,
    popular: false,
  },
  {
    id: 'prod-4',
    name: 'Regular Fit Dark Indigo Jeans',
    category: 'normal-jeans',
    price: 1299,
    pricePerMeter: false,
    fabric: 'Ring-spun Cotton Denim with 2% Elastane',
    materialDetails: '12.5 oz heavy duty denim',
    colors: ['Indigo Dark Wash'],
    sizes: ['32', '34', '36'],
    images: ['/images/jeans1.jpg'],
    description: 'Everyday comfortable classic jeans',
    availability: 'In Stock',
    featured: true,
    newArrival: true,
    popular: false,
  },
];

test('formatCurrencyINR formats Indian Rupee numbers accurately', () => {
  const result = formatCurrencyINR(1850);
  assert.ok(result.includes('1,850') || result.includes('1850'));
  assert.ok(result.startsWith('₹'));
});

test('formatProductPrice appends unit for per-meter fabrics', () => {
  const standard = formatProductPrice({ price: 1850, pricePerMeter: false });
  assert.ok(!standard.includes('/ meter'));

  const perMeter = formatProductPrice({ price: 450, pricePerMeter: true, unit: 'meter' });
  assert.ok(perMeter.includes('/ meter'));
  assert.ok(perMeter.includes('450'));
});

test('filterProducts filters by category correctly', () => {
  const sarees = filterProducts(mockProducts, { category: 'cotton-sarees' });
  assert.equal(sarees.length, 1);
  assert.equal(sarees[0].id, 'prod-1');

  const shirting = filterProducts(mockProducts, { category: 'cotton-shirt-cloth' });
  assert.equal(shirting.length, 1);
  assert.equal(shirting[0].id, 'prod-2');

  const all = filterProducts(mockProducts, { category: 'all' });
  assert.equal(all.length, 4);
});

test('filterProducts searches across name, fabric, and colors', () => {
  const byName = filterProducts(mockProducts, { search: 'Jeans' });
  assert.equal(byName.length, 1);
  assert.equal(byName[0].id, 'prod-4');

  const byFabric = filterProducts(mockProducts, { search: 'Giza' });
  assert.equal(byFabric.length, 1);
  assert.equal(byFabric[0].id, 'prod-2');

  const byColor = filterProducts(mockProducts, { search: 'Gold' });
  assert.equal(byColor.length, 1);
  assert.equal(byColor[0].id, 'prod-1');
});

test('sortProducts sorts by price asc and desc', () => {
  const asc = sortProducts(mockProducts, 'price-asc');
  assert.equal(asc[0].price, 450);
  assert.equal(asc[asc.length - 1].price, 1850);

  const desc = sortProducts(mockProducts, 'price-desc');
  assert.equal(desc[0].price, 1850);
  assert.equal(desc[desc.length - 1].price, 450);
});

test('getCategoryCounts calculates counts for all categories', () => {
  const counts = getCategoryCounts(mockProducts);
  assert.equal(counts.all, 4);
  assert.equal(counts['cotton-sarees'], 1);
  assert.equal(counts['cotton-shirt-cloth'], 1);
  assert.equal(counts['cotton-pant-cloth'], 1);
  assert.equal(counts['normal-jeans'], 1);
});
