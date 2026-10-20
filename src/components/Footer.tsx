import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const Footer: React.FC = () => {
  const { storeInfo, categories, setCategoryFilter, setCurrentView, isAdminLoggedIn } = useStore();

  const handleCategoryClick = (catId: string) => {
    setCategoryFilter(catId);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#4B0E16] text-[#FAF6EF] border-t-2 border-[#AD8124]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FAF6EF]/10">
          {/* Brand & Showroom Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF6EF]/10 flex items-center justify-center text-[#DEB65E] border border-[#AD8124]/40">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-5 h-5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-tight text-white block">
                  {storeInfo.storeName}
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-[#DEB65E] block">
                  Indian Clothing &amp; Textile Showroom
                </span>
              </div>
            </div>

            <p className="text-xs text-[#FAF6EF]/80 leading-relaxed font-sans">
              Discover quality fabrics, pure cotton sarees, bespoke shirting and pant cloth by the meter, readymade shirts, and durable denim. A trusted neighborhood destination for generations.
            </p>

            <div className="pt-2 text-xs text-[#FAF6EF]/70 space-y-1.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DEB65E] shrink-0 mt-0.5" />
                <span>{storeInfo.address}, {storeInfo.cityState}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DEB65E] shrink-0" />
                <a href={`tel:${storeInfo.phone}`} className="hover:text-white underline">
                  {storeInfo.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#DEB65E] shrink-0" />
                <span>{storeInfo.hoursWeekday}</span>
              </p>
            </div>
          </div>

          {/* Quick Categories Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DEB65E]">
              Clothing Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF6EF]/80">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => handleCategoryClick(c.id)}
                    className="hover:text-[#DEB65E] transition-colors text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DEB65E]">
              Showroom Links
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF6EF]/80">
              <li>
                <a href="#categories" className="hover:text-[#DEB65E] transition-colors">
                  All Categories
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#DEB65E] transition-colors">
                  Product Catalogue
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#DEB65E] transition-colors">
                  Showcase Image Gallery
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#DEB65E] transition-colors">
                  About Our Store
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#DEB65E] transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#DEB65E] transition-colors">
                  Store Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Showroom Notice & Admin Access */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DEB65E]">
              Showroom Notice
            </h4>
            <div className="p-3.5 rounded-lg bg-[#330A0F]/80 border border-[#8C6518]/40 text-xs text-[#FAF6EF]/80 leading-relaxed">
              <strong className="text-white block mb-1">Online Showroom Only:</strong>
              This website serves as our digital catalog. We do not provide online ordering or deliveries. Visit our physical store to feel fabrics and make purchases.
            </div>

            <button
              onClick={() => setCurrentView('admin')}
              className="inline-flex items-center gap-1.5 text-xs text-[#DEB65E] hover:text-white font-medium hover:underline cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAdminLoggedIn ? 'Open Owner Management Dashboard' : 'Authorized Store Owner Login'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6EF]/60 gap-4">
          <p>© {new Date().getFullYear()} {storeInfo.storeName}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Handcrafted Indian Textiles</span>
            <span aria-hidden="true">·</span>
            <span>Pure Handloom Cottons</span>
            <span aria-hidden="true">·</span>
            <span>Bespoke Meterage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
