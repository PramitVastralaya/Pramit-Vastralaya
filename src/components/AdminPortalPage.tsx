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
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import type { Product, CategoryId, AvailabilityStatus } from '../types/store.ts';

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
    galleryImages,
    addGalleryImage,
    deleteGalleryImage,
    resetGalleryImages,
    resetToDefaults,
  } = useStore();

  // Login Form State
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<'products' | 'add' | 'gallery' | 'store' | 'security'>('products');

  // Gallery Form State
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryHindiTitle, setNewGalleryHindiTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<'interior' | 'sarees' | 'shirting-suiting' | 'menswear' | 'festive'>('interior');
  const [newGalleryUrl, setNewGalleryUrl] = useState('/src/assets/images/vastralay_interior_counter_1792470623612.jpg');
  const [newGalleryCaption, setNewGalleryCaption] = useState('Showroom display of traditional handloom fabrics.');
  const [newGalleryHighlight, setNewGalleryHighlight] = useState('New Showroom Display');
  const [galleryMsg, setGalleryMsg] = useState<{ text: string; error: boolean } | null>(null);

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

  // Store Info Edit State
  const [tempStoreInfo, setTempStoreInfo] = useState(storeInfo);
  const [storeSaveSuccess, setStoreSaveSuccess] = useState(false);

  // Password Change State
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState<{ text: string; error: boolean } | null>(null);

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const result = loginAdmin(emailInput, passwordInput);
    if (!result.success) {
      setLoginError(result.error || 'Failed to authenticate');
    } else {
      setEmailInput('');
      setPasswordInput('');
    }
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

    setNewProdName('');
    setActiveTab('products');
  };

  // Handle Store Info Save
  const handleStoreInfoSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreInfo(tempStoreInfo);
    setStoreSaveSuccess(true);
    setTimeout(() => setStoreSaveSuccess(false), 3000);
  };

  // Handle Create Gallery Image
  const handleCreateGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    setGalleryMsg(null);
    if (!newGalleryTitle.trim()) {
      setGalleryMsg({ text: 'Please enter a title for the photo.', error: true });
      return;
    }
    if (!newGalleryUrl.trim()) {
      setGalleryMsg({ text: 'Please enter a valid image URL.', error: true });
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

    setGalleryMsg({ text: 'Photograph added to Showroom Gallery successfully!', error: false });
    setNewGalleryTitle('');
    setNewGalleryHindiTitle('');
  };

  // Handle Password Change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeMsg(null);

    if (currentPassInput !== adminAccount.password) {
      setPasswordChangeMsg({ text: 'Current password is incorrect.', error: true });
      return;
    }
    if (newPassInput !== confirmPassInput) {
      setPasswordChangeMsg({ text: 'New passwords do not match.', error: true });
      return;
    }
    const updateResult = updateAdminPassword(newPassInput);
    if (!updateResult.success) {
      setPasswordChangeMsg({ text: updateResult.error || 'Error updating password', error: true });
      return;
    }

    setPasswordChangeMsg({ text: 'Admin password changed successfully!', error: false });
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
  };

  /* =======================================================================
     VIEW 1: UNAUTHENTICATED ADMIN LOGIN SCREEN (Strictly blocks public users)
     ======================================================================= */
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-between p-4 sm:p-6 selection:bg-[#7E1C28] selection:text-white">
        {/* Top Return Header */}
        <div className="max-w-md mx-auto w-full pt-4">
          <button
            onClick={() => setCurrentView('showroom')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B141E] hover:text-[#7E1C28] transition-colors"
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
              Owner Administration Portal
            </p>
            <p className="text-xs text-[#6F5B52] leading-relaxed">
              This area is restricted to the shop owner. Public visitors cannot view or edit showroom inventory.
            </p>
          </div>

          {/* Error Message */}
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

          {/* Initial Credentials Guidance Card */}
          <div className="bg-[#FAF7F2] p-3.5 rounded-lg border border-[#E5DAC8] text-xs text-[#6F5B52] space-y-1">
            <span className="font-bold text-[#5B141E] block">
              Default Owner Access Information:
            </span>
            <p>
              <strong className="text-[#3A2922]">Authorized Gmail:</strong> {adminAccount.email}
            </p>
            <p>
              <strong className="text-[#3A2922]">Initial Password:</strong> {adminAccount.password}
            </p>
            <p className="text-[11px] text-[#8C6518] italic pt-1">
              * You can change this password anytime in the Security tab after signing in.
            </p>
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
     VIEW 2: AUTHENTICATED ADMIN DASHBOARD
     ======================================================================= */
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C201C] flex flex-col selection:bg-[#7E1C28] selection:text-white">
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
                  {storeInfo.storeName} Owner Portal
                </span>
                <span className="text-[10px] bg-emerald-600/80 text-white px-2 py-0.5 rounded font-semibold">
                  Authenticated
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
              className="inline-flex items-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-[#FAF6EF] bg-white/10 hover:bg-white/20 rounded-md border border-white/20 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Showroom</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-white bg-red-800/80 hover:bg-red-900 rounded-md transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-1.5 flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-4 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            Showroom Inventory ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`py-2 px-4 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeTab === 'add'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Item</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-2 px-4 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Showcase Gallery ({galleryImages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`py-2 px-4 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeTab === 'store'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Showroom Details &amp; Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-2 px-4 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#7E1C28] text-white shadow-2xs'
                : 'text-[#6F5B52] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Account Security</span>
          </button>
        </div>

        {/* TAB 1: PRODUCT INVENTORY LIST */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#6F5B52]">
              <span>
                Edit prices, availability, and per-meter flags in real time. Changes update the public showroom immediately.
              </span>
              <button
                onClick={() => setActiveTab('add')}
                className="inline-flex items-center gap-1 py-1.5 px-3 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs overflow-hidden divide-y divide-[#E5DAC8]">
              {products.map((p) => {
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
                            className="p-1.5 bg-emerald-700 text-white rounded hover:bg-emerald-800"
                            title="Save changes"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingProductId(null)}
                            className="p-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
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
                            className="p-2 text-[#8C6518] hover:text-[#5B141E] hover:bg-[#F4ECE0] rounded-md transition-colors"
                            title="Edit product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ADD NEW PRODUCT */}
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
                    onChange={(e) => setNewProdCategory(e.target.value as CategoryId)}
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

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
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
                  className="px-4 py-2 text-xs font-medium text-[#6F5B52]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm"
                >
                  Publish to Showroom
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: SHOWCASE GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Top Bar with Add and Reset */}
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
                    if (window.confirm('Reset gallery to the original curated showroom photographs?')) {
                      resetGalleryImages();
                      setGalleryMsg({ text: 'Showroom gallery restored to original photographs.', error: false });
                    }
                  }}
                  className="px-3 py-2 text-xs font-medium text-[#7E1C28] bg-[#FAF6EF] hover:bg-[#F0E6D8] border border-[#DEB65E]/40 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#AD8124]" />
                  <span>Restore Original Photos</span>
                </button>
              </div>
            </div>

            {/* Notification message */}
            {galleryMsg && (
              <div
                className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                  galleryMsg.error
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {galleryMsg.error ? (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                ) : (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                <span>{galleryMsg.text}</span>
              </div>
            )}

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

                {/* Image URL & Quick Presets */}
                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Image URL or Asset Path *
                  </label>
                  <input
                    type="text"
                    required
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C] font-mono text-[11px]"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[10px] text-[#8C7A70] font-medium mr-1">Quick Presets:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setNewGalleryUrl('/src/assets/images/vastralay_interior_counter_1792470623612.jpg')
                      }
                      className="text-[10px] px-2 py-0.5 bg-[#FAF6EF] hover:bg-[#F0E6D8] border border-[#DEB65E]/40 rounded text-[#5B141E]"
                    >
                      Showroom Counter
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNewGalleryUrl('/src/assets/images/handloom_zari_closeup_1792470711502.jpg')
                      }
                      className="text-[10px] px-2 py-0.5 bg-[#FAF6EF] hover:bg-[#F0E6D8] border border-[#DEB65E]/40 rounded text-[#5B141E]"
                    >
                      Handloom Zari Weave
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNewGalleryUrl('/src/assets/images/shirting_suiting_rolls_1792470726002.jpg')
                      }
                      className="text-[10px] px-2 py-0.5 bg-[#FAF6EF] hover:bg-[#F0E6D8] border border-[#DEB65E]/40 rounded text-[#5B141E]"
                    >
                      Shirting Fabric Bolts
                    </button>
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
                            if (window.confirm(`Delete photo "${img.title}" from showroom showcase?`)) {
                              deleteGalleryImage(img.id);
                              setGalleryMsg({ text: `Deleted "${img.title}".`, error: false });
                            }
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

        {/* TAB 4: STORE INFO & TIMINGS */}
        {activeTab === 'store' && (
          <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-6 max-w-3xl mx-auto space-y-4">
            <div className="border-b border-[#E5DAC8] pb-3">
              <h2 className="font-serif text-lg font-bold text-[#5B141E]">
                Showroom Details &amp; Banners
              </h2>
              <p className="text-xs text-[#6F5B52]">
                Update contact numbers, address, and the announcement bar shown on the homepage.
              </p>
            </div>

            {storeSaveSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Store information saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleStoreInfoSave} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">
                    Announcement Banner (Top of Website)
                  </label>
                  <input
                    type="text"
                    value={tempStoreInfo.announcement}
                    onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, announcement: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">Phone Number (Call Now)</label>
                    <input
                      type="text"
                      value={tempStoreInfo.phone}
                      onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, phone: e.target.value, phoneDisplay: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={tempStoreInfo.whatsapp}
                      onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">Showroom Address</label>
                  <input
                    type="text"
                    value={tempStoreInfo.address}
                    onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">Landmark</label>
                    <input
                      type="text"
                      value={tempStoreInfo.landmark}
                      onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, landmark: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">City &amp; State</label>
                    <input
                      type="text"
                      value={tempStoreInfo.cityState}
                      onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, cityState: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">Weekday Hours</label>
                    <input
                      type="text"
                      value={tempStoreInfo.hoursWeekday}
                      onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, hoursWeekday: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#5B141E] block mb-1">Sunday Hours</label>
                    <input
                      type="text"
                      value={tempStoreInfo.hoursWeekend}
                      onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, hoursWeekend: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5B141E] block mb-1">Google Maps Navigation Link</label>
                  <input
                    type="text"
                    value={tempStoreInfo.googleMapsUrl}
                    onChange={(e) => setTempStoreInfo({ ...tempStoreInfo, googleMapsUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DAC8] rounded-md text-[#2C201C]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm"
                >
                  Save Showroom Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: ACCOUNT SECURITY & PASSWORD */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-xl border border-[#E5DAC8] shadow-2xs p-6 max-w-xl mx-auto space-y-4">
            <div className="border-b border-[#E5DAC8] pb-3">
              <h2 className="font-serif text-lg font-bold text-[#5B141E]">
                Owner Account &amp; Password Settings
              </h2>
              <p className="text-xs text-[#6F5B52]">
                Your admin account is tied exclusively to your registered Gmail address.
              </p>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E5DAC8] text-xs space-y-1">
              <span className="font-bold text-[#5B141E] block">Registered Admin Gmail:</span>
              <p className="font-mono text-sm font-semibold text-[#7E1C28]">{adminAccount.email}</p>
              <p className="text-[11px] text-[#8C7A70] pt-1">
                * No public user can sign in with any other email address.
              </p>
            </div>

            {passwordChangeMsg && (
              <div
                className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                  passwordChangeMsg.error
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {passwordChangeMsg.error ? (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                ) : (
                  <Check className="w-4 h-4 text-emerald-600" />
                )}
                <span>{passwordChangeMsg.text}</span>
              </div>
            )}

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
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm"
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
                  if (confirm('Are you sure you want to reset all inventory and credentials to factory defaults?')) {
                    resetToDefaults();
                  }
                }}
                className="text-red-700 hover:text-red-900 font-semibold flex items-center gap-1"
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
