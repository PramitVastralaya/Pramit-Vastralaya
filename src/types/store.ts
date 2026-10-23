export type CategoryId =
  | 'cotton-sarees'
  | 'cotton-shirt-cloth'
  | 'cotton-pant-cloth'
  | 'readymade-shirts'
  | 'normal-jeans'
  | 'synthetic-sarees';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  hindiName?: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
}

export type AvailabilityStatus =
  | 'In Stock'
  | 'Limited Stock'
  | 'Sample on Display'
  | 'Out of Stock';

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number; // in INR ₹
  pricePerMeter?: boolean; // true for cloth sold by the meter
  unit?: string; // 'meter' or 'piece' or 'set'
  fabric: string; // e.g. '100% Pure Mercerized Cotton'
  materialDetails: string;
  colors: string[];
  colorHexes?: string[];
  sizes?: string[]; // e.g. S, M, L or 30, 32, 34 or length specifications
  images: string[];
  description: string;
  availability: AvailabilityStatus;
  featured?: boolean;
  newArrival?: boolean;
  popular?: boolean;
  weaveType?: string;
  careInstructions?: string;
}

export interface StoreInfo {
  storeName: string;
  tagline: string;
  subtitle: string;
  announcement: string;
  address: string;
  cityState: string;
  pincode: string;
  landmark: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  hoursWeekday: string;
  hoursWeekend: string;
  googleMapsUrl: string;
  socialInstagram: string;
  socialFacebook: string;

  // Hero Section Customization
  heroKicker?: string;
  heroHeadline?: string;
  heroDescription?: string;
  heroImage?: string;
  heroFloatingTitle?: string;
  heroFloatingSubtitle?: string;
  heroPrimaryCta?: string;
  heroSecondaryCta?: string;
  heroBadge1Title?: string;
  heroBadge1Sub?: string;
  heroBadge2Title?: string;
  heroBadge2Sub?: string;
  heroBadge3Title?: string;
  heroBadge3Sub?: string;
  heroBadge4Title?: string;
  heroBadge4Sub?: string;

  // About Us Section Customization
  aboutKicker?: string;
  aboutHeadline?: string;
  aboutParagraph1?: string;
  aboutParagraph2?: string;
  aboutImage?: string;
  aboutCardTitle?: string;
  aboutCardSubtitle?: string;
  aboutCardText?: string;

  // Why Choose Us Section Customization
  whyUsKicker?: string;
  whyUsHeadline?: string;
  whyUsSubtitle?: string;
  whyUsReason1Title?: string;
  whyUsReason1Desc?: string;
  whyUsReason2Title?: string;
  whyUsReason2Desc?: string;
  whyUsReason3Title?: string;
  whyUsReason3Desc?: string;
  whyUsReason4Title?: string;
  whyUsReason4Desc?: string;

  // Featured Collections Customization
  featuredKicker?: string;
  featuredHeadline?: string;
  featuredSubtitle?: string;
  featuredCard1Tag?: string;
  featuredCard1Title?: string;
  featuredCard1Desc?: string;
  featuredCard1Image?: string;
  featuredCard1Cat?: CategoryId;

  featuredCard2Tag?: string;
  featuredCard2Title?: string;
  featuredCard2Desc?: string;
  featuredCard2Image?: string;
  featuredCard2Cat?: CategoryId;

  featuredCard3Tag?: string;
  featuredCard3Title?: string;
  featuredCard3Desc?: string;
  featuredCard3Image?: string;
  featuredCard3Cat?: CategoryId;

  // Footer & Notices Customization
  footerDescription?: string;
  showroomNoticeTitle?: string;
  showroomNoticeText?: string;
}

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'newest';

export interface FilterState {
  category: string; // 'all' or CategoryId
  search: string;
  availability: string; // 'all' or AvailabilityStatus
  sortBy: SortOption;
}

export interface AdminAccount {
  email: string;
  password: string;
  role: 'admin';
  name: string;
  updatedAt?: string;
}

export interface AdminSession {
  email: string;
  name: string;
  token: string;
  loginTime: string;
}

export type ShowcaseCategory =
  | 'all'
  | 'interior'
  | 'sarees'
  | 'shirting-suiting'
  | 'menswear'
  | 'festive';

export interface ShowcaseImage {
  id: string;
  title: string;
  hindiTitle?: string;
  category: 'interior' | 'sarees' | 'shirting-suiting' | 'menswear' | 'festive';
  categoryLabel: string;
  imageUrl: string;
  caption: string;
  highlight?: string;
  featured?: boolean;
}

