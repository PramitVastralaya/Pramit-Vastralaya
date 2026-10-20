import React, { useState, useEffect } from 'react';
import {
  Camera,
  Search,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  MessageCircle,
  Phone,
  Tag,
  Info,
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import type { ShowcaseCategory, ShowcaseImage } from '../types/store.ts';
import {
  SHOWCASE_CATEGORIES,
  filterGalleryImages,
  getNextPrevIndex,
  buildWhatsAppInquiryLink,
} from '../utils/galleryLogic.ts';

export const ShowcaseGallery: React.FC = () => {
  const { galleryImages, storeInfo } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<ShowcaseCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Filtered images based on category and query
  const filteredImages = filterGalleryImages(galleryImages, selectedCategory, searchQuery);

  // Active image in lightbox
  const activeImage: ShowcaseImage | null =
    activeLightboxIndex !== null && filteredImages[activeLightboxIndex]
      ? filteredImages[activeLightboxIndex]
      : null;

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        const { next } = getNextPrevIndex(activeLightboxIndex, filteredImages.length);
        setActiveLightboxIndex(next);
      } else if (e.key === 'ArrowLeft') {
        const { prev } = getNextPrevIndex(activeLightboxIndex, filteredImages.length);
        setActiveLightboxIndex(prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredImages.length]);

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    const { prev } = getNextPrevIndex(activeLightboxIndex, filteredImages.length);
    setActiveLightboxIndex(prev);
  };

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    const { next } = getNextPrevIndex(activeLightboxIndex, filteredImages.length);
    setActiveLightboxIndex(next);
  };

  return (
    <section id="gallery" className="py-16 bg-[#F4ECE0]/60 border-b border-[#E5DAC8] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#7E1C28] bg-[#FAF6EF] border border-[#DEB65E]/40 mb-2 shadow-2xs">
              <Camera className="w-3.5 h-3.5 text-[#C89D42]" />
              <span>Showroom Lookbook &amp; Visuals • वस्त्रालय छवि दीर्घा</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5B141E] tracking-tight">
              Showcase Gallery
            </h2>
            <p className="mt-1.5 text-sm text-[#68534A] max-w-2xl">
              Glimpse our authentic showroom counters, handloom zari borders, rolls of Egyptian cotton shirting, and festive drapes. Tap any photograph for high-resolution details and direct inquiries.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-[#8C6518] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photos by fabric or style..."
              className="w-full pl-9 pr-4 py-2 bg-white text-xs text-[#2C201C] rounded-lg border border-[#D5C2AC] focus:outline-none focus:ring-2 focus:ring-[#7E1C28] shadow-2xs placeholder-[#9C8276]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8C6518] hover:text-[#5B141E]"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
          {SHOWCASE_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? galleryImages.length
                : galleryImages.filter((img) => img.category === cat.id).length;

            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border shadow-2xs ${
                  isActive
                    ? 'bg-[#7E1C28] text-white border-[#7E1C28]'
                    : 'bg-white text-[#6F5B52] border-[#E5DAC8] hover:bg-[#FAF7F2] hover:text-[#5B141E]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#FAF6EF] text-[#8C6518]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        {filteredImages.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E5DAC8] shadow-2xs">
            <Camera className="w-10 h-10 text-[#C89D42] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-lg font-bold text-[#5B141E]">No Showcase Photos Found</h3>
            <p className="text-xs text-[#6F5B52] mt-1">
              Try choosing another category or clearing your search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#7E1C28] text-white text-xs font-semibold rounded-lg hover:bg-[#5B141E] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => {
              const whatsappUrl = buildWhatsAppInquiryLink(
                storeInfo.whatsapp,
                image.title,
                image.categoryLabel
              );

              return (
                <div
                  key={image.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E5DAC8] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  {/* Photo Container */}
                  <div
                    onClick={() => setActiveLightboxIndex(index)}
                    className="relative aspect-4/3 overflow-hidden cursor-pointer bg-[#FAF6EF]"
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#5B141E]/90 text-white backdrop-blur-xs border border-white/20">
                        {image.categoryLabel}
                      </span>
                      {image.highlight && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#DEB65E] text-[#5B141E] shadow-2xs">
                          {image.highlight}
                        </span>
                      )}
                    </div>

                    {/* Zoom icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-medium backdrop-blur-xs shadow-md">
                        <Maximize2 className="w-3.5 h-3.5 text-[#DEB65E]" />
                        <span>Tap to View</span>
                      </span>
                    </div>

                    {/* Title & Hindi Subtitle on Photo */}
                    <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                      <h3 className="font-serif text-base font-bold drop-shadow-xs line-clamp-1">
                        {image.title}
                      </h3>
                      {image.hindiTitle && (
                        <p className="text-[11px] text-[#DEB65E] font-medium drop-shadow-xs">
                          {image.hindiTitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Body & Actions */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <p className="text-xs text-[#6F5B52] line-clamp-2 leading-relaxed">
                      {image.caption}
                    </p>

                    <div className="pt-2 border-t border-[#F0E6D8] flex items-center gap-2">
                      {/* Zoom Button */}
                      <button
                        onClick={() => setActiveLightboxIndex(index)}
                        className="flex-1 py-1.5 px-2 text-xs font-semibold text-[#5B141E] bg-[#FAF6EF] hover:bg-[#F0E6D8] rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-[#DEB65E]/40"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-[#8C6518]" />
                        <span>View Details</span>
                      </button>

                      {/* WhatsApp Inquiry Button */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Inquire</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Showroom Visit Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#5B141E] via-[#7E1C28] to-[#5B141E] rounded-2xl p-6 md:p-8 text-white shadow-md border border-[#8C6518]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#DEB65E] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Experience The Fabrics in Person</span>
            </div>
            <h3 className="font-serif text-2xl font-bold">
              Visit Pramit Vastralay Showroom
            </h3>
            <p className="text-xs text-white/85 max-w-xl">
              Feel the handloom weave counts, compare border lusters, and have unstitched fabrics cut to your exact measurements at our Gandhi Chowk showroom.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${storeInfo.phone}`}
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors flex items-center gap-2 border border-white/20"
            >
              <Phone className="w-3.5 h-3.5 text-[#DEB65E]" />
              <span>Call Showroom</span>
            </a>
            <a
              href={`https://wa.me/${storeInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Namaste! I would like to visit Pramit Vastralay showroom and inquire about current fabric stock.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      {activeImage && activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Lightbox Container */}
          <div
            className="relative bg-[#1A120F] text-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Lightbox Controls */}
            <div className="px-4 py-3 bg-black/40 border-b border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#DEB65E] font-medium">
                <Tag className="w-3.5 h-3.5" />
                <span>{activeImage.categoryLabel}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/70">
                  {activeLightboxIndex + 1} of {filteredImages.length}
                </span>
              </div>

              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Image Area with Left/Right Navigation */}
            <div className="relative flex-1 bg-black/60 flex items-center justify-center min-h-[260px] sm:min-h-[420px] overflow-hidden">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title}
                className="max-h-[60vh] w-auto max-w-full object-contain mx-auto"
              />

              {/* Prev Button */}
              {filteredImages.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Button */}
              {filteredImages.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Bottom Caption & Action Bar */}
            <div className="p-4 sm:p-5 bg-[#251A15] border-t border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                      {activeImage.title}
                    </h3>
                    {activeImage.highlight && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#DEB65E] text-[#5B141E]">
                        {activeImage.highlight}
                      </span>
                    )}
                  </div>
                  {activeImage.hindiTitle && (
                    <p className="text-xs text-[#DEB65E] font-medium mt-0.5">
                      {activeImage.hindiTitle}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${storeInfo.phone}`}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-1.5 transition-colors border border-white/15"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#DEB65E]" />
                    <span>Call Store</span>
                  </a>

                  <a
                    href={buildWhatsAppInquiryLink(
                      storeInfo.whatsapp,
                      activeImage.title,
                      activeImage.categoryLabel
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-white/80 bg-white/5 p-3 rounded-lg border border-white/5">
                <Info className="w-4 h-4 text-[#DEB65E] shrink-0 mt-0.5" />
                <p className="leading-relaxed">{activeImage.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
