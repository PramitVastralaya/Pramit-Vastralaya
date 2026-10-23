import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import type { CategoryId } from '../types/store.ts';

export const FeaturedCollections: React.FC = () => {
  const { storeInfo, setCategoryFilter } = useStore();

  const handleSelectCollection = (catId: CategoryId) => {
    setCategoryFilter(catId);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#FAF7F2] border-b border-[#E5DAC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8C6518] mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C89D42]" />
              <span>{storeInfo.featuredKicker || 'Curated Showroom Highlights'}</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#5B141E] tracking-tight">
              {storeInfo.featuredHeadline || 'Featured Collections'}
            </h2>
            <p className="mt-1.5 text-sm text-[#68534A]">
              {storeInfo.featuredSubtitle ||
                'Specially selected textiles and garments for upcoming weddings, festivals, and daily style.'}
            </p>
          </div>

          <a
            href="#catalog"
            className="text-xs font-bold text-[#7E1C28] hover:text-[#5B141E] flex items-center gap-1 hover:underline underline-offset-4 shrink-0"
          >
            <span>View Full Showroom Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Featured Collection Showcases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm group bg-[#F4ECE0] border border-[#E5DAC8] flex flex-col justify-end min-h-[360px]">
            <img
              src={storeInfo.featuredCard1Image || '/src/assets/images/cat_cotton_sarees_1792387123642.jpg'}
              alt={storeInfo.featuredCard1Title || 'Handloom Sarees'}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="relative p-6 text-white space-y-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#DEB65E]">
                {storeInfo.featuredCard1Tag || 'Traditional Weaves'}
              </span>
              <h3 className="font-serif text-2xl font-bold">
                {storeInfo.featuredCard1Title || 'Festive & Bridal Sarees'}
              </h3>
              <p className="text-xs text-white/85 leading-relaxed">
                {storeInfo.featuredCard1Desc ||
                  'Chanderi, Sambalpuri Ikat, and pure cotton drapes with fine zari borders.'}
              </p>
              <button
                onClick={() => handleSelectCollection(storeInfo.featuredCard1Cat || 'cotton-sarees')}
                className="pt-2 text-xs font-bold text-[#DEB65E] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Explore Saree Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm group bg-[#F4ECE0] border border-[#E5DAC8] flex flex-col justify-end min-h-[360px]">
            <img
              src={storeInfo.featuredCard2Image || '/src/assets/images/cat_cotton_shirting_1792387123731.jpg'}
              alt={storeInfo.featuredCard2Title || 'Bespoke Shirting'}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="relative p-6 text-white space-y-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#DEB65E]">
                {storeInfo.featuredCard2Tag || 'Bespoke Tailoring'}
              </span>
              <h3 className="font-serif text-2xl font-bold">
                {storeInfo.featuredCard2Title || 'Luxury Unstitched Fabrics'}
              </h3>
              <p className="text-xs text-white/85 leading-relaxed">
                {storeInfo.featuredCard2Desc ||
                  '60s & 80s count Giza cotton shirt cloth and heavy twill trouser cloth sold by the meter.'}
              </p>
              <button
                onClick={() => handleSelectCollection(storeInfo.featuredCard2Cat || 'cotton-shirt-cloth')}
                className="pt-2 text-xs font-bold text-[#DEB65E] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Explore Shirting Fabrics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm group bg-[#F4ECE0] border border-[#E5DAC8] flex flex-col justify-end min-h-[360px]">
            <img
              src={storeInfo.featuredCard3Image || '/src/assets/images/cat_readymade_shirts_1792387124762.jpg'}
              alt={storeInfo.featuredCard3Title || 'Menswear & Jeans'}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="relative p-6 text-white space-y-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#DEB65E]">
                {storeInfo.featuredCard3Tag || 'Ready-to-Wear'}
              </span>
              <h3 className="font-serif text-2xl font-bold">
                {storeInfo.featuredCard3Title || 'Shirts & Rugged Denim'}
              </h3>
              <p className="text-xs text-white/85 leading-relaxed">
                {storeInfo.featuredCard3Desc ||
                  'Festive cotton kurtas, office formals, and 12.5oz regular fit denim jeans.'}
              </p>
              <button
                onClick={() => handleSelectCollection(storeInfo.featuredCard3Cat || 'readymade-shirts')}
                className="pt-2 text-xs font-bold text-[#DEB65E] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Explore Ready Shirts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
