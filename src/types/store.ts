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

