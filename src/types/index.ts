export type UserRole = 'user' | 'admin';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  bookmarks: string[]; // array of toolIds
}

export interface ChangelogItem {
  version: string;
  date: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SecretData {
  targetLink: string;
  prompt: string;
  instructions: string;
}

export interface ToolSEO {
  title: string;
  description: string;
  keywords: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  thumbnail: string; // URL ảnh tỷ lệ 9:16 (450x800)
  banner?: string; // URL ảnh ngang
  videoDemo?: string; // URL video preview / embed
  shortDescription: string;
  longDescription: string;
  priceOriginal: number;
  priceSale: number;
  rating: number; // default 5
  reviewCount: number;
  purchaseCount: number;
  copyCount: number;
  categoryId: string;
  tags: string[];
  isHot: boolean;
  isNew: boolean;
  isFree: boolean;
  version: string;
  lastUpdated: string;
  changelog: ChangelogItem[];
  secretData: SecretData;
  faq: FAQItem[];
  seo: ToolSEO;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // Lucide icon name
  color: string; // hex or tailwind class
  order: number;
}

export interface OrderItem {
  toolId: string;
  name: string;
  price: number;
  thumbnail?: string;
}

export type OrderStatus = 'pending' | 'paid' | 'cancelled';

export interface Order {
  id: string; // KHXXXX
  userId: string;
  userEmail: string;
  items: OrderItem[];
  totalAmount: number;
  couponUsed?: string;
  status: OrderStatus;
  paymentMethod: 'transfer';
  transferContent: string; // NAP TOOLAI KHXXXX
  createdAt: string;
  approvedAt?: string | null;
  approvedBy?: string | null;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed'; // % or VND
  value: number; // e.g. 20 for 20% or 50000 for 50k VND
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
}

export interface BankConfig {
  bankName: string;
  bankId: string; // e.g. TPB, VCB, MB, ACB, VPB for VietQR
  accountNumber: string;
  accountHolder: string;
}

export interface SystemSettings {
  siteName: string;
  logoText: string;
  logoUrl?: string;
  favicon?: string;
  hotline: string;
  supportTelegram?: string;
  socialLinks: {
    facebook?: string;
    telegram?: string;
    youtube?: string;
    discord?: string;
  };
  bankConfig: BankConfig;
  seo: {
    metaTitle: string;
    metaDescription: string;
    googleAnalyticsId?: string;
  };
}
