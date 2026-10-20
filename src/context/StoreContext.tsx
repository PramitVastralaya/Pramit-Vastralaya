import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Product,
  CategoryInfo,
  StoreInfo,
  FilterState,
  SortOption,
  AdminAccount,
  AdminSession,
  ShowcaseImage,
} from '../types/store.ts';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_STORE_INFO,
  INITIAL_GALLERY_IMAGES,
} from '../data/initialData.ts';
import {
  INITIAL_ADMIN_ACCOUNT,
  validateAdminLogin,
  validateNewPassword,
  createAdminSession,
} from '../utils/authLogic.ts';

interface StoreContextType {
  products: Product[];
  categories: CategoryInfo[];
  storeInfo: StoreInfo;
  filters: FilterState;
  setCategoryFilter: (categoryId: string) => void;
  setSearchQuery: (query: string) => void;
  setAvailabilityFilter: (status: string) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  // View Router ('showroom' | 'admin')
  currentView: 'showroom' | 'admin';
  setCurrentView: (view: 'showroom' | 'admin') => void;
  // Admin Account & Authentication
  adminAccount: AdminAccount;
  adminSession: AdminSession | null;
  isAdminLoggedIn: boolean;
  loginAdmin: (email: string, pass: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;
  updateAdminPassword: (newPass: string) => { success: boolean; error?: string };
  // CRUD Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStoreInfo: (updates: Partial<StoreInfo>) => void;
  // Showcase Gallery State & CRUD
  galleryImages: ShowcaseImage[];
  addGalleryImage: (image: Omit<ShowcaseImage, 'id'>) => void;
  updateGalleryImage: (id: string, updates: Partial<ShowcaseImage>) => void;
  deleteGalleryImage: (id: string) => void;
  resetGalleryImages: () => void;
  resetToDefaults: () => void;
}

const STORAGE_KEYS = {
  PRODUCTS: 'pramit_vastralay_products_v1',
  STORE_INFO: 'pramit_vastralay_store_info_v1',
  CATEGORIES: 'pramit_vastralay_categories_v1',
  ADMIN_ACCOUNT: 'pramit_vastralay_admin_account_v1',
  ADMIN_SESSION: 'pramit_vastralay_admin_session_v1',
  GALLERY: 'pramit_vastralay_gallery_v1',
};

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<CategoryInfo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CATEGORIES;
  });

  const [storeInfo, setStoreInfo] = useState<StoreInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORE_INFO);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_STORE_INFO;
  });

  // Dedicated admin account persistence
  const [adminAccount, setAdminAccount] = useState<AdminAccount>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_ACCOUNT);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ADMIN_ACCOUNT;
  });

  // Active admin session persistence
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  // View state: 'showroom' or 'admin' (can also check URL query ?view=admin)
  const [currentView, setCurrentView] = useState<'showroom' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'admin' || window.location.pathname === '/admin') {
        return 'admin';
      }
    }
    return 'showroom';
  });

  // Gallery images persistence
  const [galleryImages, setGalleryImages] = useState<ShowcaseImage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_GALLERY_IMAGES;
  });

  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    search: '',
    availability: 'all',
    sortBy: 'featured',
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Sync storeInfo to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORE_INFO, JSON.stringify(storeInfo));
    } catch {
      // ignore
    }
  }, [storeInfo]);

  // Sync adminAccount to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_ACCOUNT, JSON.stringify(adminAccount));
    } catch {
      // ignore
    }
  }, [adminAccount]);

  // Sync galleryImages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(galleryImages));
    } catch {
      // ignore
    }
  }, [galleryImages]);

  // Sync adminSession to localStorage
  useEffect(() => {
    try {
      if (adminSession) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(adminSession));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      }
    } catch {
      // ignore
    }
  }, [adminSession]);

  const loginAdmin = (inputEmail: string, inputPass: string) => {
    const validation = validateAdminLogin(inputEmail, inputPass, adminAccount);
    if (!validation.success) {
      return validation;
    }
    const session = createAdminSession(adminAccount);
    setAdminSession(session);
    return { success: true };
  };

  const logoutAdmin = () => {
    setAdminSession(null);
    setCurrentView('showroom');
  };

  const updateAdminPassword = (newPass: string) => {
    const validation = validateNewPassword(newPass);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    setAdminAccount((prev) => ({
      ...prev,
      password: newPass.trim(),
      updatedAt: new Date().toISOString(),
    }));
    return { success: true };
  };

  const setCategoryFilter = (categoryId: string) => {
    setFilters((prev) => ({ ...prev, category: categoryId }));
  };

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query }));
  };

  const setAvailabilityFilter = (status: string) => {
    setFilters((prev) => ({ ...prev, availability: status }));
  };

  const setSortBy = (sort: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy: sort }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      search: '',
      availability: 'all',
      sortBy: 'featured',
    });
  };

  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(null);
    }
  };

  const updateStoreInfo = (updates: Partial<StoreInfo>) => {
    setStoreInfo((prev) => ({ ...prev, ...updates }));
  };

  // Gallery CRUD Operations
  const addGalleryImage = (newImageData: Omit<ShowcaseImage, 'id'>) => {
    const newImage: ShowcaseImage = {
      ...newImageData,
      id: `gallery-${Date.now()}`,
    };
    setGalleryImages((prev) => [newImage, ...prev]);
  };

  const updateGalleryImage = (id: string, updates: Partial<ShowcaseImage>) => {
    setGalleryImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...updates } : img))
    );
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };

  const resetGalleryImages = () => {
    setGalleryImages(INITIAL_GALLERY_IMAGES);
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setStoreInfo(INITIAL_STORE_INFO);
    setGalleryImages(INITIAL_GALLERY_IMAGES);
    setAdminAccount(INITIAL_ADMIN_ACCOUNT);
    setAdminSession(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.STORE_INFO);
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.GALLERY);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_ACCOUNT);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    } catch {
      // ignore
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        storeInfo,
        filters,
        setCategoryFilter,
        setSearchQuery,
        setAvailabilityFilter,
        setSortBy,
        resetFilters,
        selectedProduct,
        setSelectedProduct,
        currentView,
        setCurrentView,
        adminAccount,
        adminSession,
        isAdminLoggedIn: !!adminSession,
        loginAdmin,
        logoutAdmin,
        updateAdminPassword,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStoreInfo,
        galleryImages,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        resetGalleryImages,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
