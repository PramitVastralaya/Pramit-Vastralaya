import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Clock, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const AboutSection: React.FC = () => {
  const { storeInfo } = useStore();

  return (
    <section id="about" className="py-16 bg-[#FAF7F2] border-b border-[#E5DAC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Collage & Heritage Vibe */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border-2 border-[#C89D42]/30 shadow-lg bg-[#FAF6EF]">
              <img
                src="/src/assets/images/hero_vastralay_showroom_1792387121760.jpg"
                alt="Pramit Vastralay Heritage Interior"
                className="w-full h-[400px] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Overlay Accent Card */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-5 rounded-xl border border-[#C89D42]/50 shadow-md max-w-xs hidden sm:block">
              <span className="font-serif text-lg font-bold text-[#5B141E] block">
                Pramit Vastralay
              </span>
              <span className="text-xs text-[#8C6518] font-medium block mt-0.5">
                Authentic Textile Heritage
              </span>
              <p className="text-[11px] text-[#6F5B52] mt-1.5 leading-snug">
                Dedicated to honest trade, genuine handlooms, and personalized retail hospitality.
              </p>
            </div>
          </div>

          {/* Right Column: Story & Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8C6518]">
              <Sparkles className="w-3.5 h-3.5 text-[#C89D42]" />
              <span>Our Heritage &amp; Tradition</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5B141E] tracking-tight">
              About Pramit Vastralay
            </h2>

            <p className="text-base text-[#523E37] leading-relaxed">
              At <strong>{storeInfo.storeName}</strong>, we believe every piece of clothing tells a story of craftsmanship, dignity, and cultural pride. Our showroom was established to bring customers authentic, high-grade fabrics directly from India’s finest looms and trusted spinning mills.
            </p>

            <p className="text-sm text-[#68534A] leading-relaxed">
              Whether you are shopping for graceful pure cotton sarees for festivals and pujas, selecting custom shirt and pant cloth by the meter for bespoke tailoring, or choosing everyday comfortable readymade shirts and jeans, we take pride in offering genuine materials with honest, transparent pricing.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E5DAC8] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#FAF7F2] text-[#7E1C28] shrink-0 border border-[#C89D42]/30">
                  <ShieldCheck className="w-5 h-5 text-[#8C6518]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#5B141E]">Authentic Fibers</h4>
                  <p className="text-xs text-[#6F5B52] mt-1">100% genuine cottons, reliable dyes, and durable weave integrity.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E5DAC8] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#FAF7F2] text-[#7E1C28] shrink-0 border border-[#C89D42]/30">
                  <HeartHandshake className="w-5 h-5 text-[#8C6518]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#5B141E]">Personal Touch</h4>
                  <p className="text-xs text-[#6F5B52] mt-1">Attentive showroom staff who help you select the exact cut and drape.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
