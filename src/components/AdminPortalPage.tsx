import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  LogOut,
  Store,
  Plus,
  Trash2,
  Edit2,
  Check,
  RotateCcw,
  KeyRound,
  Sparkles,
  AlertCircle,
  Scissors,
  ExternalLink,
  X,
  Camera,
  Search,
  Filter,
  Image as ImageIcon,
  Zap,
  Layers,
  LayoutTemplate,
  Award,
  HeartHandshake,
  Compass,
  Phone,
  Clock,
  MapPin,
  Save,
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import type { Product, CategoryId, AvailabilityStatus, CategoryInfo, StoreInfo } from '../types/store.ts';

// Quick showroom image presets for easy product adding & banners
const ALL_SHOWROOM_IMAGE_PRESETS: { label: string; category?: CategoryId; url: string }[] = [
  {
    label: 'Cotton Saree',
    category: 'cotton-sarees',
    url: '/src/assets/images/cat_cotton_sarees_1792387123642.jpg',
  },
  {
    label: 'Handloom Zari Saree',
    category: 'cotton-sarees',
    url: '/src/assets/images/handloom_zari_closeup_1792470711502.jpg',
  },
  {
    label: 'Cotton Shirt Cloth',
    category: 'cotton-shirt-cloth',
    url: '/src/assets/images/cat_cotton_shirting_1792387123731.jpg',
  },
  {
    label: 'Fabric Bolts & Rolls',
    category: 'cotton-shirt-cloth',
    url: '/src/assets/images/shirting_suiting_rolls_1792470726002.jpg',
  },
  {
    label: 'Cotton Pant Cloth',
    category: 'cotton-pant-cloth',
    url: '/src/assets/images/cat_cotton_suiting_1792387123915.jpg',
  },
  {
    label: 'Readymade Shirt',
    category: 'readymade-shirts',
    url: '/src/assets/images/cat_readymade_shirts_1792387124762.jpg',
  },
  {
    label: 'Normal Jeans',
    category: 'normal-jeans',
    url: '/src/assets/images/cat_normal_jeans_1792387125484.jpg',
  },
  {
    label: 'Synthetic Saree',
    category: 'synthetic-sarees',
    url: '/src/assets/images/cat_synthetic_sarees_1792387126135.jpg',
  },
  {
    label: 'Showroom Counter',
    url: '/src/assets/images/vastralay_interior_counter_1792470623612.jpg',
  },
  {
    label: 'Showroom Grand Hall',
    url: '/src/assets/images/hero_vastralay_showroom_1792387121760.jpg',
  },
];

type AdminTab =
  | 'products'
  | 'add'
  | 'categories'
  | 'hero'
  | 'featured'
  | 'gallery'
  | 'about'
  | 'store'
  | 'security';

export const AdminPortalPage: React.FC = () => {
  const {
    adminAccount,
    adminSession,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    updateAdminPassword,
    setCurrentView,
    products,
    categories,
    storeInfo,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStoreInfo,
    updateCategory,
    galleryImages,
    addGalleryImage,
    deleteGalleryImage,
    resetGalleryImages,
    resetToDefaults,
    resetAdminCredentials,
  } = useStore();

  // Login Form State
  const [emailInput, setEmailInput] = useState('pramitvastralaya@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [resetCredentialsMsg, setResetCredentialsMsg] = useState<string | null>(null);

  // In-App Confirmation Modal State (bypasses iframe blocked window.confirm)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    isDestructive?: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: 'Confirm',
    onConfirm: () => {},
  });

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('products');

  // Global Notification Banner State
  const [saveBannerMsg, setSaveBannerMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const showNotification = (text: string, isError = false) => {
    setSaveBannerMsg({ text, error: isError });
    setTimeout(() => setSaveBannerMsg(null), 5000);
  };

  // Inventory Search & Filter State
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState<string>('all');

  // Product Inline Edit State
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editPricePerMeter, setEditPricePerMeter] = useState<boolean>(false);
  const [editAvailability, setEditAvailability] = useState<AvailabilityStatus>('In Stock');
  const [editDesc, setEditDesc] = useState<string>('');

  // Add Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<CategoryId>('cotton-sarees');
  const [newProdPrice, setNewProdPrice] = useState<number>(1450);
  const [newProdPerMeter, setNewProdPerMeter] = useState(false);
  const [newProdFabric, setNewProdFabric] = useState('100% Pure Handloom Cotton');
  const [newProdMaterial, setNewProdMaterial] = useState('80s count mercerized combed yarn');
  const [newProdColors, setNewProdColors] = useState('Maroon, Gold, Peacock Blue');
  const [newProdSizes, setNewProdSizes] = useState('5.5m Saree + 0.8m Blouse');
  const [newProdImage, setNewProdImage] = useState('/src/assets/images/cat_cotton_sarees_1792387123642.jpg');
  const [newProdDesc, setNewProdDesc] = useState('Traditional handloom textile woven with premium threads.');
  const [newProdAvailability, setNewProdAvailability] = useState<AvailabilityStatus>('In Stock');
  const [newProdFeatured, setNewProdFeatured] = useState(true);

  // Category Edit State
  const [editingCategoryId, setEditingCategoryId] = useState<CategoryId | null>(null);
  const [catNameInput, setCatNameInput] = useState('');
  const [catHindiInput, setCatHindiInput] = useState('');
  const [catTaglineInput, setCatTaglineInput] = useState('');
  const [catDescInput, setCatDescInput] = useState('');
  const [catImageInput, setCatImageInput] = useState('');
  const [catHighlightsInput, setCatHighlightsInput] = useState('');

  // Full Website Store Content State (Hero, About, Why Us, Featured, Store Info)
  const [siteContent, setSiteContent] = useState<StoreInfo>(storeInfo);

  // Sync siteContent when storeInfo changes externally
  React.useEffect(() => {
    setSiteContent(storeInfo);
  }, [storeInfo]);

  // Gallery Form State
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryHindiTitle, setNewGalleryHindiTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<'interior' | 'sarees' | 'shirting-suiting' | 'menswear' | 'festive'>('interior');
  const [newGalleryUrl, setNewGalleryUrl] = useState('/src/assets/images/vastralay_interior_counter_1792470623612.jpg');
  const [newGalleryCaption, setNewGalleryCaption] = useState('Showroom display of traditional handloom fabrics.');
  const [newGalleryHighlight, setNewGalleryHighlight] = useState('New Showroom Display');

  // Password Change State
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const result = loginAdmin(emailInput, passwordInput);
    if (!result.success) {
      setLoginError(result.error || 'Failed to authenticate');
    } else {
      setPasswordInput('');
    }
  };

  // 1-Click Quick Fill & Sign In for Store Owner
  const handleQuickSignIn = () => {
    setLoginError(null);
    const emailToUse = adminAccount.email || 'pramitvastralaya@gmail.com';
    const passToUse = adminAccount.password || 'Pramit@2026';
    setEmailInput(emailToUse);
    setPasswordInput(passToUse);
    const result = loginAdmin(emailToUse, passToUse);
    if (!result.success) {
      setLoginError(result.error || 'Failed to authenticate');
    }
  };

  // Reset to Factory Default Credentials
  const handleResetToFactoryCredentials = () => {
    resetAdminCredentials();
    setEmailInput('pramitvastralaya@gmail.com');
    setPasswordInput('Pramit@2026');
    setLoginError(null);
    setResetCredentialsMsg('Password reset to default (Pramit@2026). You can now sign in.');
    setTimeout(() => setResetCredentialsMsg(null), 5000);
  };

  // Handle Inline Product Save
  const handleSaveProductEdit = (id: string) => {
    updateProduct(id, {
      price: Number(editPrice),
      pricePerMeter: editPricePerMeter,
      availability: editAvailability,
      description: editDesc,
    });
    setEditingProductId(null);
    showNotification('Product details updated successfully.');
  };

  // Handle New Product Submission
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    addProduct({
      name: newProdName.trim(),
      category: newProdCategory,
      price: Number(newProdPrice),
      pricePerMeter: newProdPerMeter,
      unit: newProdPerMeter ? 'meter' : 'piece',
      fabric: newProdFabric.trim(),
      materialDetails: newProdMaterial.trim(),
      colors: newProdColors.split(',').map((c) => c.trim()).filter(Boolean),
      sizes: newProdSizes.split(',').map((s) => s.trim()).filter(Boolean),
      images: [newProdImage.trim()],
      description: newProdDesc.trim(),
      availability: newProdAvailability,
      featured: newProdFeatured,
      newArrival: true,
      popular: true,
    });

    const addedName = newProdName.trim();
    setNewProdName('');
    setActiveTab('products');
    showNotification(`Product "${addedName}" published to showroom successfully!`);
  };

  // Handle Category Edit Save
  const handleSaveCategory = (catId: CategoryId) => {
    updateCategory(catId, {
      name: catNameInput.trim(),
      hindiName: catHindiInput.trim() || undefined,
      tagline: catTaglineInput.trim(),
      description: catDescInput.trim(),
      image: catImageInput.trim(),
      highlights: catHighlightsInput.split(',').map((h) => h.trim()).filter(Boolean),
    });
    setEditingCategoryId(null);
    showNotification(`Category "${catNameInput.trim()}" updated successfully!`);
  };

  // Save Website Content Sections (Hero, Featured, About, Why Us, Store)
  const handleSaveWebsiteSection = (sectionName: string) => {
    updateStoreInfo(siteContent);
    showNotification(`${sectionName} saved and published to live showroom!`);
  };

  // Handle Create Gallery Image
  const handleCreateGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryTitle.trim()) {
      showNotification('Please enter a title for the photo.', true);
      return;
    }
    if (!newGalleryUrl.trim()) {
      showNotification('Please enter a valid image URL.', true);
      return;
    }

    const categoryLabels: Record<string, string> = {
      interior: 'Showroom Interior',
      sarees: 'Sarees & Handloom',
      'shirting-suiting': 'Shirting & Suiting',
      menswear: 'Readymade & Denim',
      festive: 'Festive & Bridal',
    };

    addGalleryImage({
      title: newGalleryTitle.trim(),
      hindiTitle: newGalleryHindiTitle.trim() || undefined,
      category: newGalleryCategory,
      categoryLabel: categoryLabels[newGalleryCategory] || 'Showroom Display',
      imageUrl: newGalleryUrl.trim(),
      caption: newGalleryCaption.trim() || 'Authentic photograph from Pramit Vastralay.',
      highlight: newGalleryHighlight.trim() || undefined,
      featured: true,
    });

    showNotification('Photograph added to Showroom Gallery successfully!');
    setNewGalleryTitle('');
    setNewGalleryHindiTitle('');
  };

  // Handle Password Change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentPassInput !== adminAccount.password && currentPassInput !== 'Pramit@2026') {
      showNotification('Current password is incorrect.', true);
      return;
    }
    if (newPassInput !== confirmPassInput) {
      showNotification('New passwords do not match.', true);
      return;
    }
    const updateResult = updateAdminPassword(newPassInput);
    if (!updateResult.success) {
      showNotification(updateResult.error || 'Error updating password', true);
      return;
    }

    showNotification('Admin password updated successfully!');
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
  };

  // Filtered inventory products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      inventorySearch === '' ||
      p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.fabric.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.category.toLowerCase().includes(inventorySearch.toLowerCase());
    const matchesCategory =
      inventoryCategoryFilter === 'all' || p.category === inventoryCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  /* =======================================================================
     VIEW 1: UNAUTHENTICATED ADMIN LOGIN SCREEN
     ======================================================================= */
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-between p-4 sm:p-6 selection:bg-[#7E1C28] selection:text-white">
        {/* Top Return Header */}
        <div className="max-w-md mx-auto w-full pt-4">
          <button
            onClick={() => setCurrentView('showroom')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B141E] hover:text-[#7E1C28] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Showroom</span>
          </button>
        </div>

        {/* Center Login Box */}
        <div className="max-w-md mx-auto w-full bg-white rounded-2xl shadow-xl border border-[#E5DAC8] p-6 sm:p-8 space-y-6 my-auto">
          {/* Logo & Lock Badge */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7E1C28] to-[#4B0E16] text-[#DEB65E] flex items-center justify-center mx-auto shadow-md border border-[#AD8124]/40">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#5B141E]">
              Pramit Vastralay
            </h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6518]">
              Full Website Management Console
            </p>
            <p className="text-xs text-[#6F5B52] leading-relaxed">
              Store Owner portal to control showroom products, categories, hero banner, featured collections, gallery, about story, and contact details.
            </p>
          </div>

          {/* Quick Sign-In Button */}
          <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C89D42]/40 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#5B141E] flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#AD8124]" />
                <span>Authorized Owner Access</span>
              </span>
              <p className="text-[11px] text-[#6F5B52] truncate">
                {adminAccount.email}
              </p>
            </div>
            <button
              type="button"
              onClick={handleQuickSignIn}
              className="py-1.5 px-3 bg-[#7E1C28] hover:bg-[#64131E] active:bg-[#4B0E16] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              1-Click Sign In
            </button>
          </div>

          {/* Notification Messages */}
          {resetCredentialsMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{resetCredentialsMsg}</span>
            </div>
          )}

          {loginError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#5B141E] block mb-1">
                Admin Gmail Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C7A70] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="pramitvastralaya@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-lg text-[#2C201C] focus:outline-none focus:ring-2 focus:ring-[#7E1C28]/20 focus:border-[#7E1C28]"
                  autoComplete="username"
                />
              </div>
              <p className="text-[10px] text-[#8C7A70] mt-1">
                Accepted: <span className="font-mono text-[#5B141E]">pramitvastralaya@gmail.com</span> or <span className="font-mono text-[#5B141E]">pramitvastralay@gmail.com</span>
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-[#5B141E] block mb-1">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8C7A70] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter your admin password"
                  className="w-full pl-9 pr-10 py-2.5 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-lg text-[#2C201C] focus:outline-none focus:ring-2 focus:ring-[#7E1C28]/20 focus:border-[#7E1C28]"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A70] hover:text-[#5B141E]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] active:bg-[#4B0E16] rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Sign In to Management Portal
            </button>
          </form>

          {/* Credentials Info & Reset Card */}
          <div className="bg-[#FAF7F2] p-3.5 rounded-lg border border-[#E5DAC8] text-xs text-[#6F5B52] space-y-1.5">
            <span className="font-bold text-[#5B141E] block">
              Default Credentials:
            </span>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#3A2922]">Email: <strong>{adminAccount.email}</strong></span>
              <span className="text-[#3A2922]">Password: <strong className="font-mono">Pramit@2026</strong></span>
            </div>
            <div className="pt-2 border-t border-[#E5DAC8]/60 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setEmailInput('pramitvastralaya@gmail.com');
                  setPasswordInput(adminAccount.password || 'Pramit@2026');
                }}
                className="text-[11px] font-semibold text-[#8C6518] hover:text-[#5B141E] hover:underline cursor-pointer"
              >
                Autofill Credentials
              </button>
              <button
                type="button"
                onClick={handleResetToFactoryCredentials}
                className="text-[11px] font-semibold text-red-700 hover:text-red-900 hover:underline cursor-pointer"
              >
                Reset Password to Pramit@2026
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-[#8C7A70] pb-4">
          Pramit Vastralay Showroom Security System • Protected Admin Session
        </div>
      </div>
    );
  }

  /* =======================================================================
     VIEW 2: AUTHENTICATED ADMIN DASHBOARD (FULL WEBSITE MANAGEMENT)
     ======================================================================= */
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C201C] flex flex-col selection:bg-[#7E1C28] selection:text-white">
      {/* Universal In-App Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5DAC8] space-y-4">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  confirmModal.isDestructive
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-[#FAF7F2] text-[#8C6518] border border-[#DEB65E]/40'
                }`}
              >
                {confirmModal.isDestructive ? (
                  <Trash2 className="w-5 h-5" />
                ) : (
                  <RotateCcw className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-base font-bold text-[#5B141E]">
                  {confirmModal.title}
                </h3>
                <p className="text-xs text-[#6F5B52] mt-1 leading-relaxed">
                  {confirmModal.message}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 text-xs font-semibold text-[#6F5B52] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  confirmModal.onConfirm();
                  setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                }}
                className={`px-4 py-2 text-xs font-bold text-white rounded-lg transition-colors shadow-xs cursor-pointer ${
                  confirmModal.isDestructive
                    ? 'bg-red-700 hover:bg-red-800'
                    : 'bg-[#7E1C28] hover:bg-[#64131E]'
                }`}
              >
                {confirmModal.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Admin Bar */}
      <header className="bg-[#5B141E] text-white px-4 sm:px-6 lg:px-8 py-3.5 border-b border-[#8C6518]/40 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FAF6EF]/10 flex items-center justify-center text-[#DEB65E] border border-[#DEB65E]/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold">
                  {storeInfo.storeName} Full Management Portal
                </span>
                <span className="text-[10px] bg-emerald-600/80 text-white px-2 py-0.5 rounded font-semibold">
                  Administrator
                </span>
              </div>
              <span className="text-xs text-[#DEB65E] font-medium block">
                Signed in as: {adminSession?.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setCurrentView('showroom')}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-[#FAF6EF] bg-white/10 hover:bg-white/20 rounded-md border border-white/20 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Live Showroom</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-white bg-red-800/80 hover:bg-red-900 rounded-md transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Navigation Tabs Bar covering the entire website */}
        <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-1.5 flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            Products ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeTab === 'add'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeTab === 'hero'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Hero &amp; Badges</span>
          </button>

          <button
            onClick={() => setActiveTab('featured')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeTab === 'featured'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Highlights</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Gallery ({galleryImages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeTab === 'about'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>About &amp; Why Us</span>
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeTab === 'store'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Store &amp; Contact</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Security</span>
          </button>
        </div>

        {/* Global Save / Alert Banner */}
        {saveBannerMsg && (
          <div
            className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
              saveBannerMsg.error
                ? 'bg-red-50 text-red-800 border-red-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            {saveBannerMsg.error ? (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            ) : (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <span>{saveBannerMsg.text}</span>
          </div>
        )}

        {/* =======================================================================
            TAB 1: PRODUCTS INVENTORY LIST
            ======================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#E5DAC8] p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8C7A70] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder="Search inventory by title, fabric, or category..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-lg text-[#2C201C] focus:outline-none focus:ring-1 focus:ring-[#7E1C28]"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={inventoryCategoryFilter}
                  onChange={(e) => setInventoryCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-lg text-[#2C201C] font-medium"
                >
                  <option value="all">All Categories ({products.length})</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setActiveTab('add')}
                  className="inline-flex items-center gap-1 py-2 px-3.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs overflow-hidden divide-y divide-[#E5DAC8]">
              {filteredProducts.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#6F5B52]">
                  No items matched your search query.
                </div>
              ) : (
                filteredProducts.map((p) => {
                  const isEditing = editingProductId === p.id;
                  return (
                    <div
                      key={p.id}
                      className="p-4 hover:bg-[#FAF7F2]/60 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <img
                          src={p.images[0] || '/src/assets/images/hero_vastralay_showroom_1792387121760.jpg'}
                          alt={p.name}
                          className="w-14 h-14 rounded-lg object-cover bg-[#F4ECE0] shrink-0 border border-[#E5DAC8]"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6518] block">
                            {categories.find((c) => c.id === p.category)?.name || p.category}
                          </span>
                          <h3 className="text-sm font-bold text-[#5B141E] truncate">
                            {p.name}
                          </h3>
                          <p className="text-xs text-[#6F5B52] truncate">
                            {p.fabric}
                          </p>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="w-full md:w-auto flex flex-wrap items-center gap-2 bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E5DAC8]">
                          <div>
                            <label className="text-[10px] text-[#6F5B52] block font-semibold">Price (₹):</label>
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(Number(e.target.value))}
                              className="w-24 px-2 py-1 text-xs bg-white border border-[#E5DAC8] rounded text-[#2C201C]"
                            />
                          </div>

                          <div className="flex items-center gap-1.5 pt-3">
                            <input
                              type="checkbox"
                              id={`edit-pm-${p.id}`}
                              checked={editPricePerMeter}
                              onChange={(e) => setEditPricePerMeter(e.target.checked)}
                              className="rounded text-[#7E1C28]"
                            />
                            <label htmlFor={`edit-pm-${p.id}`} className="text-xs text-[#5B141E] font-medium">
                              / meter
                            </label>
                          </div>

                          <div>
                            <label className="text-[10px] text-[#6F5B52] block font-semibold">Stock Status:</label>
                            <select
                              value={editAvailability}
                              onChange={(e) => setEditAvailability(e.target.value as AvailabilityStatus)}
                              className="px-2 py-1 text-xs bg-white border border-[#E5DAC8] rounded text-[#2C201C]"
                            >
                              <option value="In Stock">In Stock</option>
                              <option value="Limited Stock">Limited Stock</option>
                              <option value="Out of Stock">Out of Stock</option>
                              <option value="Sample on Display">Sample on Display</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-1 pt-3">
                            <button
                              onClick={() => handleSaveProductEdit(p.id)}
                              className="p-1.5 bg-emerald-700 text-white rounded hover:bg-emerald-800 cursor-pointer"
                              title="Save changes"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingProductId(null)}
                              className="p-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="text-right">
                            <span className="text-sm font-bold text-[#5B141E] tabular-nums block">
                              ₹{p.price} {p.pricePerMeter ? '/ meter' : ''}
                            </span>
                            <span className="text-[11px] font-medium text-emerald-700 block">
                              {p.availability}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingProductId(p.id);
                                setEditPrice(p.price);
                                setEditPricePerMeter(!!p.pricePerMeter);
                                setEditAvailability(p.availability);
                                setEditDesc(p.description);
                              }}
                              className="p-2 text-[#8C6518] hover:text-[#5B141E] hover:bg-[#F4ECE0] rounded-md transition-colors cursor-pointer"
                              title="Edit product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => {
                                setConfirmModal({
                                  isOpen: true,
                                  title: 'Delete Showroom Product',
                                  message: `Are you sure you want to permanently remove "${p.name}" from the digital showroom catalog?`,
                                  confirmLabel: 'Delete Product',
                                  isDestructive: true,
                                  onConfirm: () => {
                                    deleteProduct(p.id);
                                    showNotification(`Product "${p.name}" deleted from inventory.`);
                                  },
                                });
                              }}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB 2: ADD NEW PRODUCT
            ======================================================================= */}
        {activeTab === 'add' && (
          <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-6 max-w-3xl mx-auto space-y-4">
            <div className="border-b border-[#E5DAC8] pb-3">
              <h2 className="font-serif text-lg font-bold text-[#5B141E]">
                Add New Showroom Item
              </h2>
              <p className="text-xs text-[#6F5B52]">
                Fill in the fabric and pricing details below to publish directly to the customer showroom.
              </p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Royal Chanderi Handloom Cotton Saree"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Clothing Category *
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => {
                      const cat = e.target.value as CategoryId;
                      setNewProdCategory(cat);
                      const preset = ALL_SHOWROOM_IMAGE_PRESETS.find((p) => p.category === cat);
                      if (preset) setNewProdImage(preset.url);
                    }}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Price in Indian Rupees (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="new-per-meter-toggle"
                    checked={newProdPerMeter}
                    onChange={(e) => setNewProdPerMeter(e.target.checked)}
                    className="rounded text-[#7E1C28]"
                  />
                  <label htmlFor="new-per-meter-toggle" className="text-xs font-semibold text-[#5B141E]">
                    Sold By The Meter (for Cotton Shirt &amp; Pant Cloth)
                  </label>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Fabric Composition *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdFabric}
                    onChange={(e) => setNewProdFabric(e.target.value)}
                    placeholder="e.g. 100% Giza Egyptian Long-Staple Cotton"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Material Details &amp; Weave
                  </label>
                  <input
                    type="text"
                    value={newProdMaterial}
                    onChange={(e) => setNewProdMaterial(e.target.value)}
                    placeholder="e.g. 60s two-ply compact spun yarn"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Available Colors (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newProdColors}
                    onChange={(e) => setNewProdColors(e.target.value)}
                    placeholder="Deep Maroon, Antique Gold, Navy"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Sizes / Length Details
                  </label>
                  <input
                    type="text"
                    value={newProdSizes}
                    onChange={(e) => setNewProdSizes(e.target.value)}
                    placeholder="5.5m Saree + 0.8m Blouse OR Width 58in"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                {/* Photo Presets & Live Preview */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-[#5B141E] block">
                    Product Photograph
                  </label>
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <img
                      src={newProdImage}
                      alt="Preview"
                      className="w-20 h-20 rounded-lg object-cover border border-[#E5DAC8] bg-[#FAF7F2] shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/src/assets/images/cat_cotton_sarees_1792387123642.jpg';
                      }}
                    />
                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="text"
                        value={newProdImage}
                        onChange={(e) => setNewProdImage(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C] font-mono text-[11px]"
                      />
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-[#8C7A70] font-medium mr-1">Quick Presets:</span>
                        {ALL_SHOWROOM_IMAGE_PRESETS.map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => {
                              setNewProdImage(preset.url);
                              if (preset.category) setNewProdCategory(preset.category);
                            }}
                            className="text-[10px] px-2 py-0.5 bg-[#FAF6EF] hover:bg-[#F0E6D8] border border-[#DEB65E]/40 rounded text-[#5B141E] cursor-pointer"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Showroom Availability
                  </label>
                  <select
                    value={newProdAvailability}
                    onChange={(e) => setNewProdAvailability(e.target.value as AvailabilityStatus)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Limited Stock">Limited Stock</option>
                    <option value="Sample on Display">Sample on Display</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#5B141E] block mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className="px-4 py-2 text-xs font-medium text-[#6F5B52] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm cursor-pointer"
                >
                  Publish to Showroom
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =======================================================================
            TAB 3: CATEGORIES DEPARTMENTS MANAGEMENT
            ======================================================================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#8C6518]" />
                  <h2 className="font-serif text-lg font-bold text-[#5B141E]">
                    Showroom Departments &amp; Categories ({categories.length})
                  </h2>
                </div>
                <p className="text-xs text-[#6F5B52] mt-1">
                  Manage the 6 core showroom departments shown on the homepage grid. Edit titles, Hindi translations, taglines, and featured department photos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat) => {
                const isEditing = editingCategoryId === cat.id;

                if (isEditing) {
                  return (
                    <div
                      key={cat.id}
                      className="bg-white rounded-xl border-2 border-[#7E1C28] p-5 shadow-md space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-[#E5DAC8] pb-2">
                        <span className="font-serif text-sm font-bold text-[#5B141E]">
                          Editing {cat.name}
                        </span>
                        <span className="text-[10px] font-mono text-[#8C7A70]">{cat.id}</span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="text-[11px] font-bold text-[#5B141E] block">Name (English)</label>
                          <input
                            type="text"
                            value={catNameInput}
                            onChange={(e) => setCatNameInput(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded text-[#2C201C]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-[#5B141E] block">Hindi Name</label>
                          <input
                            type="text"
                            value={catHindiInput}
                            onChange={(e) => setCatHindiInput(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded text-[#2C201C]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-[#5B141E] block">Tagline</label>
                          <input
                            type="text"
                            value={catTaglineInput}
                            onChange={(e) => setCatTaglineInput(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded text-[#2C201C]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-[#5B141E] block">Department Photo URL</label>
                          <div className="flex items-center gap-2">
                            <img
                              src={catImageInput}
                              alt="Category Preview"
                              className="w-12 h-12 rounded object-cover border border-[#E5DAC8]"
                            />
                            <input
                              type="text"
                              value={catImageInput}
                              onChange={(e) => setCatImageInput(e.target.value)}
                              className="flex-1 px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded text-[#2C201C] font-mono text-[11px]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-[#5B141E] block">Description</label>
                          <textarea
                            rows={2}
                            value={catDescInput}
                            onChange={(e) => setCatDescInput(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded text-[#2C201C]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-[#5B141E] block">Highlights (comma separated)</label>
                          <input
                            type="text"
                            value={catHighlightsInput}
                            onChange={(e) => setCatHighlightsInput(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded text-[#2C201C]"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end gap-2 border-t border-[#E5DAC8]">
                        <button
                          type="button"
                          onClick={() => setEditingCategoryId(null)}
                          className="px-3 py-1.5 text-xs text-[#6F5B52] hover:bg-[#FAF7F2] rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveCategory(cat.id)}
                          className="px-4 py-1.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded cursor-pointer"
                        >
                          Save Department
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={cat.id}
                    className="bg-white rounded-xl border border-[#E5DAC8] overflow-hidden shadow-2xs hover:shadow-sm transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-16/9 bg-[#F4ECE0] overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="font-serif text-base font-bold">{cat.name}</h3>
                          {cat.hindiName && (
                            <span className="text-xs text-[#DEB65E]">{cat.hindiName}</span>
                          )}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <p className="text-xs font-semibold text-[#8C6518]">{cat.tagline}</p>
                        <p className="text-xs text-[#6F5B52] leading-relaxed">{cat.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {cat.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-[#FAF7F2] text-[#5B141E] px-2 py-0.5 rounded border border-[#E5DAC8]"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-2 border-t border-[#E5DAC8] flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCategoryId(cat.id);
                          setCatNameInput(cat.name);
                          setCatHindiInput(cat.hindiName || '');
                          setCatTaglineInput(cat.tagline);
                          setCatDescInput(cat.description);
                          setCatImageInput(cat.image);
                          setCatHighlightsInput(cat.highlights.join(', '));
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-[#7E1C28] hover:bg-[#F4ECE0] rounded-md border border-[#C89D42]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Department</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB 4: HERO & HOMEPAGE BANNER MANAGEMENT
            ======================================================================= */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-6 max-w-4xl mx-auto space-y-6">
            <div className="border-b border-[#E5DAC8] pb-3">
              <h2 className="font-serif text-lg font-bold text-[#5B141E] flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-[#8C6518]" />
                <span>Hero Headline, Banner &amp; Trust Badges</span>
              </h2>
              <p className="text-xs text-[#6F5B52]">
                Customize the top homepage visual area, primary calls-to-action, floating showroom badge, and 4 trust indicators.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveWebsiteSection('Hero section');
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Top Kicker Badge Text
                  </label>
                  <input
                    type="text"
                    value={siteContent.heroKicker || ''}
                    onChange={(e) => setSiteContent({ ...siteContent, heroKicker: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Main Hero Headline (H1)
                  </label>
                  <input
                    type="text"
                    value={siteContent.heroHeadline || ''}
                    onChange={(e) => setSiteContent({ ...siteContent, heroHeadline: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C] font-serif text-sm font-bold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Hero Description Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={siteContent.heroDescription || ''}
                    onChange={(e) => setSiteContent({ ...siteContent, heroDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={siteContent.heroPrimaryCta || ''}
                    onChange={(e) => setSiteContent({ ...siteContent, heroPrimaryCta: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Secondary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={siteContent.heroSecondaryCta || ''}
                    onChange={(e) => setSiteContent({ ...siteContent, heroSecondaryCta: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                {/* Hero Showcase Image */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-[#5B141E] block">
                    Hero Main Photograph
                  </label>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <img
                      src={siteContent.heroImage || '/src/assets/images/hero_vastralay_showroom_1792387121760.jpg'}
                      alt="Hero preview"
                      className="w-32 h-20 rounded-lg object-cover border border-[#E5DAC8]"
                    />
                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="text"
                        value={siteContent.heroImage || ''}
                        onChange={(e) => setSiteContent({ ...siteContent, heroImage: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C] font-mono text-[11px]"
                      />
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-[#8C7A70] font-medium mr-1">Presets:</span>
                        <button
                          type="button"
                          onClick={() =>
                            setSiteContent({
                              ...siteContent,
                              heroImage: '/src/assets/images/hero_vastralay_showroom_1792387121760.jpg',
                            })
                          }
                          className="text-[10px] px-2 py-0.5 bg-[#FAF6EF] hover:bg-[#F0E6D8] border border-[#DEB65E]/40 rounded text-[#5B141E] cursor-pointer"
                        >
                          Showroom Grand Hall
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSiteContent({
                              ...siteContent,
                              heroImage: '/src/assets/images/vastralay_interior_counter_1792470623612.jpg',
                            })
                          }
                          className="text-[10px] px-2 py-0.5 bg-[#FAF6EF] hover:bg-[#F0E6D8] border border-[#DEB65E]/40 rounded text-[#5B141E] cursor-pointer"
                        >
                          Wooden Display Counter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Floating Card Title
                  </label>
                  <input
                    type="text"
                    value={siteContent.heroFloatingTitle || ''}
                    onChange={(e) => setSiteContent({ ...siteContent, heroFloatingTitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Floating Card Subtitle / Hours
                  </label>
                  <input
                    type="text"
                    value={siteContent.heroFloatingSubtitle || ''}
                    onChange={(e) => setSiteContent({ ...siteContent, heroFloatingSubtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>
              </div>

              {/* 4 Trust Badges */}
              <div className="border-t border-[#E5DAC8] pt-4 space-y-3">
                <h3 className="font-serif text-sm font-bold text-[#5B141E]">
                  4 Trust Strip Badges
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E5DAC8] space-y-1">
                    <label className="text-[10px] font-bold text-[#5B141E] block">Badge 1</label>
                    <input
                      type="text"
                      value={siteContent.heroBadge1Title || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, heroBadge1Title: e.target.value })}
                      placeholder="100% Genuine"
                      className="w-full px-2 py-1 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                    <input
                      type="text"
                      value={siteContent.heroBadge1Sub || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, heroBadge1Sub: e.target.value })}
                      placeholder="Subtext"
                      className="w-full px-2 py-1 text-[11px] bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E5DAC8] space-y-1">
                    <label className="text-[10px] font-bold text-[#5B141E] block">Badge 2</label>
                    <input
                      type="text"
                      value={siteContent.heroBadge2Title || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, heroBadge2Title: e.target.value })}
                      placeholder="Meter Cuts"
                      className="w-full px-2 py-1 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                    <input
                      type="text"
                      value={siteContent.heroBadge2Sub || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, heroBadge2Sub: e.target.value })}
                      placeholder="Subtext"
                      className="w-full px-2 py-1 text-[11px] bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E5DAC8] space-y-1">
                    <label className="text-[10px] font-bold text-[#5B141E] block">Badge 3</label>
                    <input
                      type="text"
                      value={siteContent.heroBadge3Title || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, heroBadge3Title: e.target.value })}
                      placeholder="Fair Rates"
                      className="w-full px-2 py-1 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                    <input
                      type="text"
                      value={siteContent.heroBadge3Sub || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, heroBadge3Sub: e.target.value })}
                      placeholder="Subtext"
                      className="w-full px-2 py-1 text-[11px] bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E5DAC8] space-y-1">
                    <label className="text-[10px] font-bold text-[#5B141E] block">Badge 4</label>
                    <input
                      type="text"
                      value={siteContent.heroBadge4Title || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, heroBadge4Title: e.target.value })}
                      placeholder="In-Store Touch"
                      className="w-full px-2 py-1 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                    <input
                      type="text"
                      value={siteContent.heroBadge4Sub || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, heroBadge4Sub: e.target.value })}
                      placeholder="Subtext"
                      className="w-full px-2 py-1 text-[11px] bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Hero &amp; Banner Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =======================================================================
            TAB 5: FEATURED COLLECTIONS CARDS MANAGEMENT
            ======================================================================= */}
        {activeTab === 'featured' && (
          <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-6 max-w-4xl mx-auto space-y-6">
            <div className="border-b border-[#E5DAC8] pb-3">
              <h2 className="font-serif text-lg font-bold text-[#5B141E] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8C6518]" />
                <span>Featured Collections Showcases (3 Cards)</span>
              </h2>
              <p className="text-xs text-[#6F5B52]">
                Control the 3 prominent promotional cards featured on the homepage. Edit titles, descriptions, linked departments, and photos.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveWebsiteSection('Featured Collections');
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Section Kicker
                  </label>
                  <input
                    type="text"
                    value={siteContent.featuredKicker || ''}
                    onChange={(e) => setSiteContent({ ...siteContent, featuredKicker: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Section Headline
                  </label>
                  <input
                    type="text"
                    value={siteContent.featuredHeadline || ''}
                    onChange={(e) => setSiteContent({ ...siteContent, featuredHeadline: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md"
                  />
                </div>
              </div>

              {/* Card 1 */}
              <div className="p-4 rounded-xl border border-[#E5DAC8] bg-[#FAF7F2] space-y-3">
                <span className="font-bold text-xs text-[#7E1C28] uppercase tracking-wide block">
                  Featured Card 1
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Tag / Badge</label>
                    <input
                      type="text"
                      value={siteContent.featuredCard1Tag || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, featuredCard1Tag: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Card Title</label>
                    <input
                      type="text"
                      value={siteContent.featuredCard1Title || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, featuredCard1Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Target Category</label>
                    <select
                      value={siteContent.featuredCard1Cat || 'cotton-sarees'}
                      onChange={(e) =>
                        setSiteContent({ ...siteContent, featuredCard1Cat: e.target.value as CategoryId })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Description</label>
                    <input
                      type="text"
                      value={siteContent.featuredCard1Desc || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, featuredCard1Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Image URL</label>
                    <input
                      type="text"
                      value={siteContent.featuredCard1Image || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, featuredCard1Image: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl border border-[#E5DAC8] bg-[#FAF7F2] space-y-3">
                <span className="font-bold text-xs text-[#7E1C28] uppercase tracking-wide block">
                  Featured Card 2
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Tag / Badge</label>
                    <input
                      type="text"
                      value={siteContent.featuredCard2Tag || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, featuredCard2Tag: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Card Title</label>
                    <input
                      type="text"
                      value={siteContent.featuredCard2Title || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, featuredCard2Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Target Category</label>
                    <select
                      value={siteContent.featuredCard2Cat || 'cotton-shirt-cloth'}
                      onChange={(e) =>
                        setSiteContent({ ...siteContent, featuredCard2Cat: e.target.value as CategoryId })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Description</label>
                    <input
                      type="text"
                      value={siteContent.featuredCard2Desc || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, featuredCard2Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Image URL</label>
                    <input
                      type="text"
                      value={siteContent.featuredCard2Image || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, featuredCard2Image: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-xl border border-[#E5DAC8] bg-[#FAF7F2] space-y-3">
                <span className="font-bold text-xs text-[#7E1C28] uppercase tracking-wide block">
                  Featured Card 3
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Tag / Badge</label>
                    <input
                      type="text"
                      value={siteContent.featuredCard3Tag || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, featuredCard3Tag: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Card Title</label>
                    <input
                      type="text"
                      value={siteContent.featuredCard3Title || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, featuredCard3Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Target Category</label>
                    <select
                      value={siteContent.featuredCard3Cat || 'readymade-shirts'}
                      onChange={(e) =>
                        setSiteContent({ ...siteContent, featuredCard3Cat: e.target.value as CategoryId })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Description</label>
                    <input
                      type="text"
                      value={siteContent.featuredCard3Desc || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, featuredCard3Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#5B141E] block">Image URL</label>
                    <input
                      type="text"
                      value={siteContent.featuredCard3Image || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, featuredCard3Image: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Featured Collections</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =======================================================================
            TAB 6: SHOWCASE GALLERY MANAGEMENT
            ======================================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#8C6518]" />
                  <h2 className="font-serif text-lg font-bold text-[#5B141E]">
                    Showroom Image Showcase &amp; Lookbook ({galleryImages.length} Photos)
                  </h2>
                </div>
                <p className="text-xs text-[#6F5B52] mt-1">
                  Add, curate, and showcase authentic showroom interior photos, fabric roll displays, and handloom close-ups.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setConfirmModal({
                      isOpen: true,
                      title: 'Restore Original Showroom Photos',
                      message: 'Reset the showroom lookbook gallery back to the curated set of high-resolution handloom and interior photographs?',
                      confirmLabel: 'Restore Original Photos',
                      isDestructive: false,
                      onConfirm: () => {
                        resetGalleryImages();
                        showNotification('Showroom gallery restored to original photographs.');
                      },
                    });
                  }}
                  className="px-3 py-2 text-xs font-medium text-[#7E1C28] bg-[#FAF6EF] hover:bg-[#F0E6D8] border border-[#DEB65E]/40 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#AD8124]" />
                  <span>Restore Original Photos</span>
                </button>
              </div>
            </div>

            {/* Add New Photograph Form */}
            <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-6">
              <h3 className="font-serif text-base font-bold text-[#5B141E] mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#8C6518]" />
                <span>Add New Showcase Photograph</span>
              </h3>

              <form onSubmit={handleCreateGalleryImage} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">
                      Photo Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pure Banarasi Zari Saree Display"
                      value={newGalleryTitle}
                      onChange={(e) => setNewGalleryTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C] focus:ring-1 focus:ring-[#7E1C28]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">
                      Hindi Title / Subtitle (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. बनारसी सिल्क साड़ी"
                      value={newGalleryHindiTitle}
                      onChange={(e) => setNewGalleryHindiTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C] focus:ring-1 focus:ring-[#7E1C28]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">
                      Showcase Category *
                    </label>
                    <select
                      value={newGalleryCategory}
                      onChange={(e) =>
                        setNewGalleryCategory(
                          e.target.value as 'interior' | 'sarees' | 'shirting-suiting' | 'menswear' | 'festive'
                        )
                      }
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    >
                      <option value="interior">Showroom Interior (शोरूम का दृश्य)</option>
                      <option value="sarees">Sarees &amp; Handloom (सूती साड़ियाँ)</option>
                      <option value="shirting-suiting">Shirting &amp; Suiting (शर्ट-पैंट कपड़ा)</option>
                      <option value="menswear">Readymade &amp; Denim (रेडीमेड व जींस)</option>
                      <option value="festive">Festive &amp; Bridal (विवाह व उत्सव)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">
                      Highlight Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Master Artisan Weave, 100% Combed Cotton"
                      value={newGalleryHighlight}
                      onChange={(e) => setNewGalleryHighlight(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#5B141E] block">
                    Image URL or Asset Path *
                  </label>
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <img
                      src={newGalleryUrl}
                      alt="Preview"
                      className="w-24 h-16 rounded-lg object-cover border border-[#E5DAC8] bg-[#FAF7F2] shrink-0"
                    />
                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="text"
                        required
                        value={newGalleryUrl}
                        onChange={(e) => setNewGalleryUrl(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C] font-mono text-[11px]"
                      />
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-[#8C7A70] font-medium mr-1">Quick Presets:</span>
                        {ALL_SHOWROOM_IMAGE_PRESETS.map((p) => (
                          <button
                            key={p.label}
                            type="button"
                            onClick={() => setNewGalleryUrl(p.url)}
                            className="text-[10px] px-2 py-0.5 bg-[#FAF6EF] hover:bg-[#F0E6D8] border border-[#DEB65E]/40 rounded text-[#5B141E] cursor-pointer"
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Photo Description / Caption *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={newGalleryCaption}
                    onChange={(e) => setNewGalleryCaption(e.target.value)}
                    placeholder="Describe the fabric count, texture, weaving method or display details..."
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Showcase Gallery</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Current Photos Grid */}
            <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-6 space-y-4">
              <h3 className="font-serif text-base font-bold text-[#5B141E]">
                Current Showcase Photographs ({galleryImages.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="border border-[#E5DAC8] rounded-xl overflow-hidden bg-[#FAF7F2] flex flex-col justify-between"
                  >
                    <div className="relative aspect-16/10 bg-black/10 overflow-hidden">
                      <img
                        src={img.imageUrl}
                        alt={img.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-xs">
                        {img.categoryLabel}
                      </span>
                      {img.highlight && (
                        <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#DEB65E] text-[#5B141E]">
                          {img.highlight}
                        </span>
                      )}
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h4 className="text-xs font-bold text-[#5B141E] line-clamp-1">{img.title}</h4>
                        {img.hindiTitle && (
                          <p className="text-[10px] text-[#8C6518] font-medium">{img.hindiTitle}</p>
                        )}
                        <p className="text-[11px] text-[#6F5B52] mt-1 line-clamp-2">{img.caption}</p>
                      </div>

                      <div className="pt-2 border-t border-[#E5DAC8]/60 flex items-center justify-between">
                        <span className="text-[10px] text-[#8C7A70] font-mono">
                          ID: {img.id.slice(0, 14)}...
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              title: 'Delete Showcase Photo',
                              message: `Remove photo "${img.title}" from the customer showroom lookbook?`,
                              confirmLabel: 'Delete Photo',
                              isDestructive: true,
                              onConfirm: () => {
                                deleteGalleryImage(img.id);
                                showNotification(`Photograph "${img.title}" deleted.`);
                              },
                            });
                          }}
                          className="px-2 py-1 text-[11px] font-semibold text-red-700 hover:bg-red-50 rounded flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB 7: ABOUT US & WHY CHOOSE US PILLARS
            ======================================================================= */}
        {activeTab === 'about' && (
          <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-6 max-w-4xl mx-auto space-y-6">
            <div className="border-b border-[#E5DAC8] pb-3">
              <h2 className="font-serif text-lg font-bold text-[#5B141E] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#8C6518]" />
                <span>About Us Story &amp; 4 Customer Commitments</span>
              </h2>
              <p className="text-xs text-[#6F5B52]">
                Edit your store's heritage story paragraphs, image, values card, and the 4 "Why Choose Us" promise pillars.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveWebsiteSection('About & Why Choose Us');
              }}
              className="space-y-6"
            >
              {/* About Section Block */}
              <div className="space-y-4">
                <h3 className="font-serif text-sm font-bold text-[#5B141E] uppercase tracking-wide border-b border-[#E5DAC8] pb-1">
                  About Us Story Section
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">
                      Kicker Text
                    </label>
                    <input
                      type="text"
                      value={siteContent.aboutKicker || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, aboutKicker: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={siteContent.aboutHeadline || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, aboutHeadline: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md font-bold"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">
                      Story Paragraph 1 (Lead Intro)
                    </label>
                    <textarea
                      rows={3}
                      value={siteContent.aboutParagraph1 || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, aboutParagraph1: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">
                      Story Paragraph 2 (Fabrics &amp; Pricing)
                    </label>
                    <textarea
                      rows={3}
                      value={siteContent.aboutParagraph2 || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, aboutParagraph2: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">
                      About Section Image URL
                    </label>
                    <input
                      type="text"
                      value={siteContent.aboutImage || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, aboutImage: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">
                      Accent Card Title
                    </label>
                    <input
                      type="text"
                      value={siteContent.aboutCardTitle || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, aboutCardTitle: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Why Choose Us Block */}
              <div className="space-y-4 pt-4 border-t border-[#E5DAC8]">
                <h3 className="font-serif text-sm font-bold text-[#5B141E] uppercase tracking-wide border-b border-[#E5DAC8] pb-1">
                  Why Choose Us (4 Value Pillars)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">
                      Section Headline
                    </label>
                    <input
                      type="text"
                      value={siteContent.whyUsHeadline || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, whyUsHeadline: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={siteContent.whyUsSubtitle || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, whyUsSubtitle: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5DAC8] space-y-2">
                    <span className="font-bold text-xs text-[#7E1C28]">Pillar 1</span>
                    <input
                      type="text"
                      value={siteContent.whyUsReason1Title || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, whyUsReason1Title: e.target.value })}
                      placeholder="Title"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded font-semibold"
                    />
                    <textarea
                      rows={2}
                      value={siteContent.whyUsReason1Desc || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, whyUsReason1Desc: e.target.value })}
                      placeholder="Description"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>

                  <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5DAC8] space-y-2">
                    <span className="font-bold text-xs text-[#7E1C28]">Pillar 2</span>
                    <input
                      type="text"
                      value={siteContent.whyUsReason2Title || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, whyUsReason2Title: e.target.value })}
                      placeholder="Title"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded font-semibold"
                    />
                    <textarea
                      rows={2}
                      value={siteContent.whyUsReason2Desc || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, whyUsReason2Desc: e.target.value })}
                      placeholder="Description"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>

                  <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5DAC8] space-y-2">
                    <span className="font-bold text-xs text-[#7E1C28]">Pillar 3</span>
                    <input
                      type="text"
                      value={siteContent.whyUsReason3Title || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, whyUsReason3Title: e.target.value })}
                      placeholder="Title"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded font-semibold"
                    />
                    <textarea
                      rows={2}
                      value={siteContent.whyUsReason3Desc || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, whyUsReason3Desc: e.target.value })}
                      placeholder="Description"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>

                  <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5DAC8] space-y-2">
                    <span className="font-bold text-xs text-[#7E1C28]">Pillar 4</span>
                    <input
                      type="text"
                      value={siteContent.whyUsReason4Title || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, whyUsReason4Title: e.target.value })}
                      placeholder="Title"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded font-semibold"
                    />
                    <textarea
                      rows={2}
                      value={siteContent.whyUsReason4Desc || ''}
                      onChange={(e) => setSiteContent({ ...siteContent, whyUsReason4Desc: e.target.value })}
                      placeholder="Description"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5DAC8] rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save About &amp; Why Us Sections</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =======================================================================
            TAB 8: STORE INFO, CONTACT, HOURS & FOOTER
            ======================================================================= */}
        {activeTab === 'store' && (
          <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-6 max-w-4xl mx-auto space-y-4">
            <div className="border-b border-[#E5DAC8] pb-3">
              <h2 className="font-serif text-lg font-bold text-[#5B141E] flex items-center gap-2">
                <Store className="w-5 h-5 text-[#8C6518]" />
                <span>Showroom Location, Timings &amp; Announcement Bar</span>
              </h2>
              <p className="text-xs text-[#6F5B52]">
                Update contact numbers, physical showroom address, Google Maps routing link, opening hours, and footer disclaimer.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveWebsiteSection('Store details');
              }}
              className="space-y-4"
            >
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Store Brand Name
                  </label>
                  <input
                    type="text"
                    value={siteContent.storeName}
                    onChange={(e) => setSiteContent({ ...siteContent, storeName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C] font-serif font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Announcement Banner (Top Gold Strip on Every Page)
                  </label>
                  <input
                    type="text"
                    value={siteContent.announcement}
                    onChange={(e) => setSiteContent({ ...siteContent, announcement: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">Phone Number (Call Now)</label>
                    <input
                      type="text"
                      value={siteContent.phone}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          phone: e.target.value,
                          phoneDisplay: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={siteContent.whatsapp}
                      onChange={(e) => setSiteContent({ ...siteContent, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">Showroom Street Address</label>
                  <input
                    type="text"
                    value={siteContent.address}
                    onChange={(e) => setSiteContent({ ...siteContent, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">Landmark</label>
                    <input
                      type="text"
                      value={siteContent.landmark}
                      onChange={(e) => setSiteContent({ ...siteContent, landmark: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">City &amp; State</label>
                    <input
                      type="text"
                      value={siteContent.cityState}
                      onChange={(e) => setSiteContent({ ...siteContent, cityState: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={siteContent.pincode}
                      onChange={(e) => setSiteContent({ ...siteContent, pincode: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">Weekday &amp; Saturday Hours</label>
                    <input
                      type="text"
                      value={siteContent.hoursWeekday}
                      onChange={(e) => setSiteContent({ ...siteContent, hoursWeekday: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">Sunday Hours</label>
                    <input
                      type="text"
                      value={siteContent.hoursWeekend}
                      onChange={(e) => setSiteContent({ ...siteContent, hoursWeekend: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">Google Maps Navigation Link</label>
                  <input
                    type="text"
                    value={siteContent.googleMapsUrl}
                    onChange={(e) => setSiteContent({ ...siteContent, googleMapsUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">Instagram Profile Link</label>
                    <input
                      type="text"
                      value={siteContent.socialInstagram}
                      onChange={(e) => setSiteContent({ ...siteContent, socialInstagram: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">Facebook Page Link</label>
                    <input
                      type="text"
                      value={siteContent.socialFacebook}
                      onChange={(e) => setSiteContent({ ...siteContent, socialFacebook: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                </div>

                {/* Footer Description */}
                <div className="pt-2 border-t border-[#E5DAC8]">
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Footer Brand Description
                  </label>
                  <textarea
                    rows={2}
                    value={siteContent.footerDescription || ''}
                    onChange={(e) => setSiteContent({ ...siteContent, footerDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Showroom &amp; Contact Details</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =======================================================================
            TAB 9: ACCOUNT SECURITY & PASSWORD
            ======================================================================= */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-6 max-w-xl mx-auto space-y-4">
            <div className="border-b border-[#E5DAC8] pb-3">
              <h2 className="font-serif text-lg font-bold text-[#5B141E] flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#8C6518]" />
                <span>Owner Account &amp; Password Settings</span>
              </h2>
              <p className="text-xs text-[#6F5B52]">
                Your admin account is tied to your authorized Gmail address.
              </p>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E5DAC8] text-xs space-y-1">
              <span className="font-bold text-[#5B141E] block">Registered Admin Gmail:</span>
              <p className="font-mono text-sm font-semibold text-[#7E1C28]">{adminAccount.email}</p>
              <p className="text-[11px] text-[#8C7A70] pt-1">
                * Aliases accepted: <span className="font-mono">pramitvastralaya@gmail.com</span>, <span className="font-mono">pramitvastralay@gmail.com</span>
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-[#5B141E] block mb-1">
                  Current Password *
                </label>
                <input
                  type="password"
                  required
                  value={currentPassInput}
                  onChange={(e) => setCurrentPassInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#5B141E] block mb-1">
                  New Password (min 6 characters) *
                </label>
                <input
                  type="password"
                  required
                  value={newPassInput}
                  onChange={(e) => setNewPassInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#5B141E] block mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassInput}
                  onChange={(e) => setConfirmPassInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm cursor-pointer"
                >
                  Update Admin Password
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-[#E5DAC8] flex justify-between items-center text-xs">
              <span className="text-[#8C7A70]">Factory Restore:</span>
              <button
                type="button"
                onClick={() => {
                  setConfirmModal({
                    isOpen: true,
                    title: 'Reset All Website Data to Defaults',
                    message:
                      'Are you sure you want to reset all inventory products, category modifications, website banners, and account credentials back to original showroom defaults? Custom edits will be cleared.',
                    confirmLabel: 'Reset All Demo Data',
                    isDestructive: true,
                    onConfirm: () => {
                      resetToDefaults();
                      showNotification('All website data restored to showroom factory defaults.');
                    },
                  });
                }}
                className="text-red-700 hover:text-red-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Demo Data</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
