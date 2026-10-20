import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Tag,
  Scissors,
  Sparkles,
  Info,
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { formatProductPrice } from '../utils/catalogLogic.ts';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, storeInfo, categories } = useStore();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedProduct) return null;

  const categoryName =
    categories.find((c) => c.id === selectedProduct.category)?.name ||
    selectedProduct.category;

  const formattedPrice = formatProductPrice({
    price: selectedProduct.price,
    pricePerMeter: selectedProduct.pricePerMeter,
    unit: selectedProduct.unit,
  });

  const whatsappMessage = encodeURIComponent(
    `Hello Pramit Vastralay! I am viewing your online showroom and would like to know more about "${selectedProduct.name}" (Price: ${formattedPrice}). Is this currently available to view at the showroom?`
  );

  const images = selectedProduct.images.length > 0
    ? selectedProduct.images
    : ['/src/assets/images/hero_vastralay_showroom_1792387121760.jpg'];

  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#E5DAC8] overflow-hidden sm:my-6 max-h-[95vh] sm:max-h-[92vh] flex flex-col">
        {/* Mobile Pull Indicator */}
        <div className="sm:hidden w-12 h-1 bg-[#E5DAC8] rounded-full mx-auto mt-2" />

        {/* Modal Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-[#E5DAC8] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate mr-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#8C6518] truncate">
              {categoryName}
            </span>
            <span aria-hidden="true" className="text-[#8C6518]/50">·</span>
            <span className="text-[10px] sm:text-xs text-[#6F5B52] font-medium truncate">
              ID: {selectedProduct.id}
            </span>
          </div>

          <button
            onClick={() => setSelectedProduct(null)}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-[#6F5B52] hover:text-[#5B141E] hover:bg-[#F4ECE0] transition-colors shrink-0 cursor-pointer"
            aria-label="Close product details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Left: Product Photo & Thumbnail Gallery */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E5DAC8]">
                <img
                  src={currentImage}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* Per meter badge */}
                {selectedProduct.pricePerMeter && (
                  <div className="absolute top-3 left-3 bg-[#5B141E] text-white text-xs font-semibold px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Sold By The Meter</span>
                  </div>
                )}
              </div>

              {/* Photo Thumbnails Gallery if multiple images */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={img + idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-[#7E1C28] shadow-sm'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Quality & Showroom Promise Note */}
              <div className="bg-[#FAF7F2] p-3.5 rounded-lg border border-[#E5DAC8] text-xs text-[#6F5B52] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#5B141E]">
                  <Sparkles className="w-3.5 h-3.5 text-[#AD8124]" />
                  <span>Showroom Guarantee</span>
                </div>
                <p>
                  All our fabrics undergo strict quality inspection for thread strength, fast colors, and genuine mill composition. Visit Pramit Vastralay to inspect the cloth in person.
                </p>
              </div>
            </div>

            {/* Right: Full Specifications & Actions */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <h2 id="product-modal-title" className="font-serif text-2xl font-bold text-[#5B141E] leading-snug">
                  {selectedProduct.name}
                </h2>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#7E1C28] font-sans tabular-nums">
                    {formattedPrice}
                  </span>
                  {selectedProduct.pricePerMeter && (
                    <span className="text-xs text-[#8C6518] font-medium">
                      (Bespoke tailoring cut available in any length)
                    </span>
                  )}
                </div>

                {/* Availability Tag */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Showroom Status: {selectedProduct.availability}</span>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="border-t border-[#F0E6D8] pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B141E] mb-1.5">
                  Description
                </h3>
                <p className="text-sm text-[#523E37] leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Fabric & Material Specifications Table */}
              <div className="border-t border-[#F0E6D8] pt-4 space-y-2.5 text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B141E]">
                  Fabric &amp; Material Specifications
                </h3>
                <div className="bg-[#FAF7F2] rounded-lg p-3.5 border border-[#E5DAC8] space-y-2">
                  <div className="flex justify-between py-1 border-b border-[#E5DAC8]/60">
                    <span className="text-[#7A6960] font-medium">Fabric Type:</span>
                    <span className="text-[#3A2922] font-semibold text-right">{selectedProduct.fabric}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E5DAC8]/60">
                    <span className="text-[#7A6960] font-medium">Weave / Finish:</span>
                    <span className="text-[#3A2922] font-semibold text-right">{selectedProduct.weaveType || 'Standard Fine Weave'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E5DAC8]/60">
                    <span className="text-[#7A6960] font-medium">Material Details:</span>
                    <span className="text-[#3A2922] font-semibold text-right max-w-xs">{selectedProduct.materialDetails}</span>
                  </div>
                  {selectedProduct.sizes && (
                    <div className="flex justify-between py-1">
                      <span className="text-[#7A6960] font-medium">Sizes / Lengths:</span>
                      <span className="text-[#3A2922] font-semibold text-right">{selectedProduct.sizes.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Available Colors with Swatches */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div className="border-t border-[#F0E6D8] pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B141E] mb-2">
                    Available Colors &amp; Patterns
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.colors.map((color, idx) => (
                      <span
                        key={color}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FAF7F2] border border-[#E5DAC8] text-xs font-medium text-[#3A2922]"
                      >
                        {selectedProduct.colorHexes && selectedProduct.colorHexes[idx] && (
                          <span
                            className="w-3 h-3 rounded-full border border-black/20"
                            style={{ backgroundColor: selectedProduct.colorHexes[idx] }}
                          />
                        )}
                        <span>{color}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Care Instructions */}
              {selectedProduct.careInstructions && (
                <div className="border-t border-[#F0E6D8] pt-4 text-xs text-[#6F5B52]">
                  <span className="font-bold text-[#5B141E] block mb-1">Care &amp; Washing:</span>
                  <p>{selectedProduct.careInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Modal Action Footer */}
        <div className="sticky bottom-0 bg-[#FAF7F2] border-t border-[#E5DAC8] px-4 py-3 sm:px-6 sm:py-4 z-10 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
            <div className="hidden sm:block text-xs">
              <span className="text-[#8C6518] font-bold block">Inquire with Pramit Vastralay:</span>
              <span className="text-[#6F5B52]">Have questions about fabric cut, sizes, or matching blouses?</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`https://wa.me/${storeInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-11 px-4 text-xs font-bold text-white bg-[#128C7E] hover:bg-[#075E54] active:bg-[#054c44] rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${storeInfo.phone}`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-11 px-4 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] active:bg-[#4B0E16] rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store</span>
              </a>

              <a
                href="#contact"
                onClick={() => setSelectedProduct(null)}
                className="hidden md:inline-flex items-center justify-center gap-1.5 h-11 px-3.5 text-xs font-semibold text-[#5B141E] bg-white hover:bg-[#F4ECE0] rounded-lg border border-[#C89D42]/40 transition-colors whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-[#8C6518]" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
