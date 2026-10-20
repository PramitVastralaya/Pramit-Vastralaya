import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterGalleryImages,
  getNextPrevIndex,
  buildWhatsAppInquiryLink,
  validateNewGalleryImage,
} from './galleryLogic.ts';
import type { ShowcaseImage } from '../types/store.ts';

const SAMPLE_GALLERY: ShowcaseImage[] = [
  {
    id: 'g-1',
    title: 'Showroom Main Counter',
    category: 'interior',
    categoryLabel: 'Showroom Interior',
    imageUrl: '/src/assets/images/vastralay_interior_counter_1792470623612.jpg',
    caption: 'Traditional wooden display counter with stacked rolls.',
    highlight: 'Warm Ambiance',
    featured: true,
  },
  {
    id: 'g-2',
    title: 'Handloom Zari Border',
    hindiTitle: 'हथकरघा जरी किनारा',
    category: 'sarees',
    categoryLabel: 'Sarees & Handloom',
    imageUrl: '/src/assets/images/handloom_zari_closeup_1792470711502.jpg',
    caption: 'Regal golden thread weave on deep crimson cotton.',
    highlight: 'Pure Handloom',
    featured: true,
  },
  {
    id: 'g-3',
    title: 'Giza Cotton Shirting Rolls',
    category: 'shirting-suiting',
    categoryLabel: 'Shirting & Suiting',
    imageUrl: '/src/assets/images/shirting_suiting_rolls_1792470726002.jpg',
    caption: 'Egyptian combed cotton shirting fabrics cut to order.',
    highlight: '60s & 80s Count',
    featured: false,
  },
];

test('filterGalleryImages returns all images when category is "all" and query is empty', () => {
  const result = filterGalleryImages(SAMPLE_GALLERY, 'all', '');
  assert.equal(result.length, 3);
});

test('filterGalleryImages filters by specific category', () => {
  const result = filterGalleryImages(SAMPLE_GALLERY, 'sarees', '');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'g-2');
});

test('filterGalleryImages searches across title, hindiTitle, caption, and highlights', () => {
  const titleSearch = filterGalleryImages(SAMPLE_GALLERY, 'all', 'shirting');
  assert.equal(titleSearch.length, 1);
  assert.equal(titleSearch[0].id, 'g-3');

  const hindiSearch = filterGalleryImages(SAMPLE_GALLERY, 'all', 'हथकरघा');
  assert.equal(hindiSearch.length, 1);
  assert.equal(hindiSearch[0].id, 'g-2');

  const highlightSearch = filterGalleryImages(SAMPLE_GALLERY, 'all', 'Warm Ambiance');
  assert.equal(highlightSearch.length, 1);
  assert.equal(highlightSearch[0].id, 'g-1');
});

test('getNextPrevIndex computes circular bounds correctly', () => {
  assert.deepEqual(getNextPrevIndex(0, 3), { next: 1, prev: 2 });
  assert.deepEqual(getNextPrevIndex(2, 3), { next: 0, prev: 1 });
  assert.deepEqual(getNextPrevIndex(1, 3), { next: 2, prev: 0 });
  assert.deepEqual(getNextPrevIndex(0, 1), { next: 0, prev: 0 });
  assert.deepEqual(getNextPrevIndex(0, 0), { next: -1, prev: -1 });
});

test('buildWhatsAppInquiryLink formats phone and polite encoded text', () => {
  const url = buildWhatsAppInquiryLink('+91 98765 43210', 'Royal Chanderi', 'Sarees & Handloom');
  assert.match(url, /https:\/\/wa\.me\/919876543210\?text=/);
  assert.match(url, /Royal%20Chanderi/);
});

test('validateNewGalleryImage validates required fields', () => {
  assert.equal(validateNewGalleryImage({ title: 'A', imageUrl: 'http://img.jpg', caption: 'Valid caption' }).valid, false);
  assert.equal(validateNewGalleryImage({ title: 'Fine Cloth', imageUrl: '', caption: 'Valid caption' }).valid, false);
  assert.equal(validateNewGalleryImage({ title: 'Fine Cloth', imageUrl: 'https://ex.com/img.jpg', caption: 'Hi' }).valid, false);
  assert.equal(validateNewGalleryImage({ title: 'Fine Cloth', imageUrl: 'https://ex.com/img.jpg', caption: 'Adequate length description' }).valid, true);
});
