import type { ShowcaseCategory, ShowcaseImage } from '../types/store.ts';

export const SHOWCASE_CATEGORIES: { id: ShowcaseCategory; label: string; hindiLabel: string }[] = [
  { id: 'all', label: 'All Photos', hindiLabel: 'सभी तस्वीरें' },
  { id: 'interior', label: 'Showroom Interior', hindiLabel: 'शोरूम का दृश्य' },
  { id: 'sarees', label: 'Sarees & Handloom', hindiLabel: 'सूती साड़ियाँ' },
  { id: 'shirting-suiting', label: 'Shirting & Suiting', hindiLabel: 'शर्ट-पैंट कपड़ा' },
  { id: 'menswear', label: 'Readymade & Denim', hindiLabel: 'रेडीमेड व जींस' },
  { id: 'festive', label: 'Festive & Bridal', hindiLabel: 'विवाह व उत्सव' },
];

/**
 * Filter gallery images by category and optional search term
 */
export function filterGalleryImages(
  images: ShowcaseImage[],
  category: ShowcaseCategory = 'all',
  searchQuery: string = ''
): ShowcaseImage[] {
  const query = searchQuery.trim().toLowerCase();

  return images.filter((img) => {
    const matchesCategory = category === 'all' || img.category === category;
    if (!matchesCategory) return false;

    if (!query) return true;

    return (
      img.title.toLowerCase().includes(query) ||
      (img.hindiTitle && img.hindiTitle.toLowerCase().includes(query)) ||
      img.caption.toLowerCase().includes(query) ||
      img.categoryLabel.toLowerCase().includes(query) ||
      (img.highlight && img.highlight.toLowerCase().includes(query))
    );
  });
}

/**
 * Get the next and previous index in a circular list
 */
export function getNextPrevIndex(currentIndex: number, total: number): { next: number; prev: number } {
  if (total <= 0) return { next: -1, prev: -1 };
  if (total === 1) return { next: 0, prev: 0 };

  const next = (currentIndex + 1) % total;
  const prev = (currentIndex - 1 + total) % total;
  return { next, prev };
}

/**
 * Generates direct WhatsApp inquiry link with prefilled polite message
 */
export function buildWhatsAppInquiryLink(
  phone: string,
  imageTitle: string,
  categoryLabel: string
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const message = `Namaste Pramit Vastralay! I am browsing your Showroom Image Gallery and would like to inquire about: "${imageTitle}" (${categoryLabel}). Is this fabric or style available in the showroom?`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Validate new showcase image inputs
 */
export function validateNewGalleryImage(img: {
  title?: string;
  imageUrl?: string;
  caption?: string;
}): { valid: boolean; error?: string } {
  if (!img.title || img.title.trim().length < 3) {
    return { valid: false, error: 'Photo title must be at least 3 characters long.' };
  }
  if (!img.imageUrl || img.imageUrl.trim().length < 4) {
    return { valid: false, error: 'Please provide a valid image URL or asset path.' };
  }
  if (!img.caption || img.caption.trim().length < 5) {
    return { valid: false, error: 'Caption must be at least 5 characters to describe the photo.' };
  }
  return { valid: true };
}
