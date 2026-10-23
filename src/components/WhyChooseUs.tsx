import React from 'react';
import { Award, Scissors, CheckCheck, MapPin, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const WhyChooseUs: React.FC = () => {
  const { storeInfo } = useStore();

  const reasons = [
    {
      icon: Award,
      title: storeInfo.whyUsReason1Title || 'Handpicked Handloom & Mill Fabrics',
      description:
        storeInfo.whyUsReason1Desc ||
        'Every saree, shirting bolt, and denim roll is inspected for fiber purity, thread count, and colorfastness before reaching our showroom shelves.',
    },
    {
      icon: Scissors,
      title: storeInfo.whyUsReason2Title || 'Cut-to-Order Precise Meterage',
      description:
        storeInfo.whyUsReason2Desc ||
        'Need 1.6 meters for a full-sleeve shirt or 1.25 meters for a tailored trouser? We cut fabrics to your exact bespoke tailoring requirements without waste.',
    },
    {
      icon: CheckCheck,
      title: storeInfo.whyUsReason3Title || 'Direct, Transparent Fair Pricing',
      description:
        storeInfo.whyUsReason3Desc ||
        'Clear prices displayed with zero hidden charges. We offer wholesale-tier value directly to retail customers in our neighborhood.',
    },
    {
      icon: MapPin,
      title: storeInfo.whyUsReason4Title || 'Warm In-Store Hospitality & Guidance',
      description:
        storeInfo.whyUsReason4Desc ||
        'Feel the fabric weight, test the drape in natural light, and receive experienced tailoring advice from our dedicated showroom staff.',
    },
  ];

  return (
    <section id="why-us" className="py-16 bg-[#FAF6EF]/60 border-b border-[#E5DAC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8C6518] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C89D42]" />
            <span>{storeInfo.whyUsKicker || 'The Pramit Vastralay Standard'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5B141E] tracking-tight">
            {storeInfo.whyUsHeadline || 'Why Choose Us'}
          </h2>
          <p className="mt-2 text-sm text-[#68534A] leading-relaxed">
            {storeInfo.whyUsSubtitle ||
              `Four key commitments that have made ${storeInfo.storeName} the trusted clothing and fabric showroom for families and professionals alike.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="bg-white rounded-xl p-6 border border-[#E5DAC8] shadow-2xs hover:shadow-sm hover:border-[#AD8124]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#FAF7F2] border border-[#C89D42]/30 flex items-center justify-center text-[#7E1C28] mb-5">
                    <Icon className="w-6 h-6 text-[#8C6518]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#AD8124] block mb-1">
                    0{idx + 1}.
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#5B141E] leading-snug">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-[#6F5B52] mt-2.5 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
