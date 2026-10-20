import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import type { CategoryId } from '../types/store.ts';

export const CategoriesSection: React.FC = () => {
  const { categories, setCategoryFilter } = useStore();

  const handleExplore = (categoryId: CategoryId) => {
    setCategoryFilter(categoryId);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-10 sm:py-16 bg-[#FAF7F2] border-b border-[#E5DAC8]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#8C6518] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C89D42]" />
            <span>Showroom Departments</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#5B141E] tracking-tight">
            Shop by Category
          </h2>
          <p className="mt-2 text-xs sm:text-base text-[#68534A] leading-relaxed max-w-xl mx-auto">
            Explore authentic handlooms, custom shirting &amp; suiting meterage, and everyday essentials.
          </p>
        </div>

        {/* 6 Prominent Categories Grid - 2 cols on mobile, 3 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className="group bg-[#FFFFFF] rounded-xl overflow-hidden border border-[#E5DAC8] hover:border-[#AD8124]/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4ECE0]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75" />

                  {/* Number index + Section identifier */}
                  <div className="absolute top-2 left-2 text-[10px] sm:text-xs font-semibold tracking-wider text-white/95 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                    <span>0{idx + 1}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3 sm:p-5">
                  <h3 className="font-serif text-sm sm:text-xl font-bold text-[#5B141E] group-hover:text-[#7E1C28] transition-colors leading-tight line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-medium text-[#8C6518] mt-0.5 sm:mt-1 tracking-wide line-clamp-1">
                    {cat.tagline}
                  </p>
                  
                  {/* Hidden on small mobile to keep cards compact, visible on sm screens */}
                  <p className="hidden sm:block text-xs text-[#5C4B44] mt-2 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>

                  {/* Highlights list on larger screens */}
                  <div className="hidden md:flex mt-3 pt-2.5 border-t border-[#F0E6D8] text-[11px] text-[#705E56] flex-wrap items-center gap-1">
                    {cat.highlights.slice(0, 2).map((h, i) => (
                      <React.Fragment key={h}>
                        {i > 0 && <span aria-hidden="true" className="text-[#C89D42]">·</span>}
                        <span>{h}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Explore Button */}
              <div className="px-3 pb-3 sm:px-5 sm:pb-5 pt-0">
                <button
                  onClick={() => handleExplore(cat.id)}
                  className="w-full inline-flex items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:px-4 text-[11px] sm:text-xs font-bold text-[#5B141E] bg-[#FAF7F2] hover:bg-[#7E1C28] hover:text-[#FAF6EF] active:bg-[#64131E] active:text-white rounded-md border border-[#C89D42]/40 transition-colors cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
