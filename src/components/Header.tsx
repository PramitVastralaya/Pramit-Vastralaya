import React, { useState } from 'react';
import { Phone, MapPin, Clock, Menu, X, ShieldCheck, Sparkles, Navigation, ChevronRight, Camera } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const Header: React.FC = () => {
  const { storeInfo, categories, setCategoryFilter, setCurrentView, isAdminLoggedIn } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (catId?: string, targetId?: string) => {
    setMobileMenuOpen(false);
    if (catId) {
      setCategoryFilter(catId);
    }
    const el = document.getElementById(targetId || 'catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <aside aria-label="Store Announcement" className="bg-[#5B141E] text-[#FAF6EF] text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#8C6518]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-left truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#DEB65E] shrink-0" />
            <span className="font-medium tracking-wide truncate text-[11px] sm:text-xs">
              {storeInfo.announcement}
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-xs text-[#FAF6EF]/80 shrink-0">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#DEB65E]" />
              {storeInfo.hoursWeekday}
            </span>
            <span aria-hidden="true" className="text-[#DEB65E]/50">|</span>
            <a
              href={`tel:${storeInfo.phone}`}
              className="flex items-center gap-1 text-[#DEB65E] hover:underline font-semibold"
            >
              <Phone className="w-3 h-3" />
              {storeInfo.phoneDisplay}
            </a>
          </div>
        </div>
      </aside>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DAC8] transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-8">
          {/* Zone 1: Brand Wordmark & Indian Motif */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group whitespace-nowrap shrink-0 text-left min-w-0"
          >
            {/* Elegant Traditional Textile Loom Monogram */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-[#7E1C28] to-[#4B0E16] flex items-center justify-center text-[#DEB65E] shadow-sm border border-[#AD8124]/40 shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-5 h-5 sm:w-6 sm:h-6"
                aria-hidden="true"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="font-display text-lg sm:text-2xl font-bold tracking-tight text-[#5B141E] block truncate">
                {storeInfo.storeName}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-medium text-[#8C6518] block -mt-0.5 sm:-mt-1">
                Indian Textile Showroom
              </span>
            </div>
          </a>

          {/* Zone 2: Desktop 4-5 Clean Single-Line Nav Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5B141E]/90">
            <a
              href="#categories"
              className="hover:text-[#9B2433] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Categories
            </a>
            <a
              href="#catalog"
              className="hover:text-[#9B2433] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Showroom Catalog
            </a>
            <a
              href="#gallery"
              className="hover:text-[#9B2433] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Image Gallery
            </a>
            <a
              href="#about"
              className="hover:text-[#9B2433] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              About Us
            </a>
            <a
              href="#why-us"
              className="hover:text-[#9B2433] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Why Choose Us
            </a>
            <a
              href="#contact"
              className="hover:text-[#9B2433] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Store Location
            </a>
          </nav>

          {/* Zone 3: Actions (Desktop & Mobile) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Owner Portal */}
            <button
              onClick={() => setCurrentView('admin')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#7E1C28] bg-[#F4ECE0] hover:bg-[#E9DCC8] rounded-md border border-[#C89D42]/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Shop Owner Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#AD8124]" />
              <span>{isAdminLoggedIn ? 'Owner Dashboard' : 'Owner Portal'}</span>
            </button>

            {/* Desktop Visit Showroom CTA */}
            <a
              href="#contact"
              className="hidden sm:inline-flex px-4 py-2 text-xs sm:text-sm font-semibold text-[#FAF6EF] bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm transition-all whitespace-nowrap shrink-0 border border-[#AD8124]/30"
            >
              Visit Showroom
            </a>

            {/* Mobile Call Shortcut */}
            <a
              href={`tel:${storeInfo.phone}`}
              className="sm:hidden p-2 rounded-md bg-[#FAF7F2] text-[#7E1C28] border border-[#E5DAC8] active:bg-[#F4ECE0]"
              aria-label={`Call Showroom at ${storeInfo.phoneDisplay}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Mobile & Tablet Owner Portal Shortcut */}
            <button
              onClick={() => setCurrentView('admin')}
              className="lg:hidden p-2 rounded-md bg-[#F4ECE0] text-[#7E1C28] border border-[#C89D42]/40 hover:bg-[#E9DCC8] active:bg-[#DFD0BA] transition-colors"
              aria-label="Owner Admin Portal"
              title="Owner Admin Portal"
            >
              <ShieldCheck className="w-4 h-4 text-[#AD8124]" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#5B141E] hover:bg-[#F4ECE0] active:bg-[#E9DCC8] rounded-md transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-b border-[#E5DAC8] shadow-lg animate-in slide-in-from-top duration-200">
            <div className="px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Quick Jump Buttons */}
              <div className="grid grid-cols-2 gap-2 pb-2">
                <a
                  href="#catalog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-lg bg-white border border-[#E5DAC8] text-xs font-bold text-[#5B141E] text-center shadow-2xs"
                >
                  Browse Catalog
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-lg bg-[#7E1C28] text-white text-xs font-bold text-center shadow-2xs"
                >
                  Store Directions
                </a>
              </div>

              {/* Category Quick Links */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6518] block mb-2">
                  Showroom Categories
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleMobileNav(c.id, 'catalog')}
                      className="text-left py-2 px-2.5 rounded bg-white border border-[#E5DAC8] text-xs font-medium text-[#3A2922] truncate active:bg-[#FAF7F2]"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="border-t border-[#E5DAC8] pt-3 space-y-1">
                <a
                  href="#gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-xs font-semibold text-[#5B141E] border-b border-[#E5DAC8]/50"
                >
                  <span className="flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-[#8C6518]" />
                    <span>Showroom Image Gallery</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8C6518]" />
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-xs font-semibold text-[#5B141E] border-b border-[#E5DAC8]/50"
                >
                  <span>About Pramit Vastralay</span>
                  <ChevronRight className="w-4 h-4 text-[#8C6518]" />
                </a>
                <a
                  href="#why-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-xs font-semibold text-[#5B141E] border-b border-[#E5DAC8]/50"
                >
                  <span>Why Choose Us</span>
                  <ChevronRight className="w-4 h-4 text-[#8C6518]" />
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-xs font-semibold text-[#5B141E] border-b border-[#E5DAC8]/50"
                >
                  <span>Contact &amp; Timings</span>
                  <ChevronRight className="w-4 h-4 text-[#8C6518]" />
                </a>
              </div>

              {/* Owner Portal Link */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView('admin');
                  }}
                  className="w-full py-2.5 text-xs font-semibold text-[#7E1C28] bg-[#F4ECE0] hover:bg-[#E9DCC8] rounded-lg border border-[#C89D42]/40 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#8C6518]" />
                  <span>{isAdminLoggedIn ? 'Owner Dashboard' : 'Owner Portal (Restricted)'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
