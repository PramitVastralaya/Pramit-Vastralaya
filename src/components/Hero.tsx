import React from 'react';
import { ArrowRight, MapPin, Sparkles, Award, Scissors, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const Hero: React.FC = () => {
  const { storeInfo, setCategoryFilter } = useStore();

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#E5DAC8]">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DEB65E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#7E1C28]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Showroom Value Proposition */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Elegant Brand Kicker */}
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#8C6518]">
              <Sparkles className="w-3.5 h-3.5 text-[#C89D42]" />
              <span>Authentic Indian Heritage &amp; Modern Textiles</span>
            </div>

            {/* Required Headline */}
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#5B141E] leading-[1.2] sm:leading-[1.18] tracking-tight">
              Discover Quality Fabrics &amp; Timeless Style
            </h1>

            <p className="text-sm sm:text-lg text-[#523E37] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Welcome to <strong className="text-[#5B141E] font-semibold">{storeInfo.storeName}</strong>, your premier neighborhood destination for pure cotton sarees, premium unstitched shirt and pant cloth by the meter, crisp readymade shirts, and classic denim.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <a
                href="#catalog"
                onClick={() => setCategoryFilter('all')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-[#FAF6EF] bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm transition-all border border-[#AD8124]/40"
              >
                <span>Explore Showroom Collections</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-[#5B141E] bg-[#F4ECE0] hover:bg-[#E9DCC8] rounded-md transition-colors border border-[#C89D42]/40"
              >
                <MapPin className="w-4 h-4 text-[#8C6518]" />
                <span>Visit Showroom in Person</span>
              </a>
            </div>

            {/* Showroom Visiting Note */}
            <p className="text-[11px] sm:text-xs text-[#8C7A70] italic">
              * Dedicated online showroom &amp; digital catalogue. Fabrics available for touch and trial at our physical store.
            </p>
          </div>

          {/* Right Column: Hero Showroom Image with Gold Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-[#C89D42]/30 bg-[#F4ECE0]">
              <img
                src="/src/assets/images/hero_vastralay_showroom_1792387121760.jpg"
                alt="Pramit Vastralay Showroom Interior with traditional sarees and textile bolts"
                className="w-full h-[240px] sm:h-[400px] lg:h-[460px] object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Image Badge Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-md p-4 rounded-lg border border-[#C89D42]/40 shadow-md flex items-center justify-between">
                <div>
                  <span className="font-serif text-sm font-bold text-[#5B141E] block">
                    Pramit Vastralay Showroom
                  </span>
                  <span className="text-xs text-[#6F5B52] block">
                    Open Daily 10:00 AM – 9:00 PM • Station Road Area
                  </span>
                </div>
                <a
                  href="#contact"
                  className="px-3 py-1.5 text-xs font-semibold text-[#FAF6EF] bg-[#7E1C28] rounded hover:bg-[#64131E] transition-colors whitespace-nowrap"
                >
                  Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Pillar Trust Strip Below Split */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#E5DAC8] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-left">
          <div className="flex items-start gap-2 sm:gap-3 bg-white/60 sm:bg-transparent p-2.5 sm:p-0 rounded-lg border border-[#E5DAC8]/50 sm:border-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#F4ECE0] flex items-center justify-center text-[#7E1C28] shrink-0 border border-[#C89D42]/30">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#8C6518]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#5B141E] leading-snug">100% Genuine</h4>
              <p className="text-[10px] sm:text-xs text-[#705E56] mt-0.5 leading-tight">Handlooms &amp; mill cottons</p>
            </div>
          </div>

          <div className="flex items-start gap-2 sm:gap-3 bg-white/60 sm:bg-transparent p-2.5 sm:p-0 rounded-lg border border-[#E5DAC8]/50 sm:border-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#F4ECE0] flex items-center justify-center text-[#7E1C28] shrink-0 border border-[#C89D42]/30">
              <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-[#8C6518]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#5B141E] leading-snug">Meter Cuts</h4>
              <p className="text-[10px] sm:text-xs text-[#705E56] mt-0.5 leading-tight">Bespoke custom length</p>
            </div>
          </div>

          <div className="flex items-start gap-2 sm:gap-3 bg-white/60 sm:bg-transparent p-2.5 sm:p-0 rounded-lg border border-[#E5DAC8]/50 sm:border-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#F4ECE0] flex items-center justify-center text-[#7E1C28] shrink-0 border border-[#C89D42]/30">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#8C6518]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#5B141E] leading-snug">Fair Rates</h4>
              <p className="text-[10px] sm:text-xs text-[#705E56] mt-0.5 leading-tight">Transparent showroom prices</p>
            </div>
          </div>

          <div className="flex items-start gap-2 sm:gap-3 bg-white/60 sm:bg-transparent p-2.5 sm:p-0 rounded-lg border border-[#E5DAC8]/50 sm:border-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#F4ECE0] flex items-center justify-center text-[#7E1C28] shrink-0 border border-[#C89D42]/30">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#8C6518]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#5B141E] leading-snug">In-Store Touch</h4>
              <p className="text-[10px] sm:text-xs text-[#705E56] mt-0.5 leading-tight">Feel fabric before buying</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
