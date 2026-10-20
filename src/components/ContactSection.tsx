import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  MessageCircle,
  ExternalLink,
  Edit3,
  Share2,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const ContactSection: React.FC = () => {
  const { storeInfo, isAdminLoggedIn, setCurrentView } = useStore();

  return (
    <section id="contact" className="py-16 bg-[#FAF7F2] border-b border-[#E5DAC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8C6518] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C89D42]" />
            <span>Store Location &amp; Inquiries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5B141E] tracking-tight">
            Visit Our Showroom
          </h2>
          <p className="mt-2 text-sm text-[#68534A] leading-relaxed">
            We welcome you to experience our fabrics, sarees, and readymade apparel in person. Find our location and contact details below.
          </p>
        </div>

        {/* Contact & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Quick Action Buttons */}
          <div className="lg:col-span-6 space-y-6">
            {/* Showroom Address Card */}
            <div className="bg-white rounded-xl p-6 border border-[#E5DAC8] shadow-2xs space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#C89D42]/30 flex items-center justify-center text-[#7E1C28]">
                    <MapPin className="w-5 h-5 text-[#8C6518]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#5B141E]">Showroom Address</h3>
                    <span className="text-[11px] text-[#8C6518] font-medium">Physical Store Location</span>
                  </div>
                </div>

                {isAdminLoggedIn && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8C6518] hover:text-[#5B141E] hover:underline"
                    title="Owner: Edit Address in Admin"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit in Admin</span>
                  </button>
                )}
              </div>

              <div className="text-sm text-[#3A2922] pl-13 space-y-1">
                <p className="font-semibold text-base text-[#5B141E]">{storeInfo.storeName}</p>
                <p>{storeInfo.address}</p>
                <p className="text-xs text-[#6F5B52]">Landmark: {storeInfo.landmark}</p>
                <p className="font-medium text-xs text-[#8C6518]">{storeInfo.cityState} - {storeInfo.pincode}</p>
              </div>

              {/* Call Now and Get Directions Action Buttons */}
              <div className="pt-3 border-t border-[#F0E6D8] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${storeInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-[#FAF6EF] bg-[#7E1C28] hover:bg-[#64131E] rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now ({storeInfo.phoneDisplay})</span>
                </a>

                <a
                  href={storeInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-[#5B141E] bg-[#FAF7F2] hover:bg-[#F4ECE0] rounded-lg border border-[#C89D42]/40 transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#8C6518]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Opening Hours & Phone Numbers Card */}
            <div className="bg-white rounded-xl p-6 border border-[#E5DAC8] shadow-2xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#C89D42]/30 flex items-center justify-center text-[#7E1C28]">
                  <Clock className="w-5 h-5 text-[#8C6518]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#5B141E]">Showroom Timings &amp; Contact</h3>
                  <span className="text-[11px] text-[#8C6518] font-medium">Open 7 Days a Week</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#523E37] pt-2">
                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E5DAC8]">
                  <span className="font-bold text-[#5B141E] block mb-1">Weekdays &amp; Saturdays:</span>
                  <p>{storeInfo.hoursWeekday}</p>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E5DAC8]">
                  <span className="font-bold text-[#5B141E] block mb-1">Sundays:</span>
                  <p>{storeInfo.hoursWeekend}</p>
                </div>
              </div>

              {/* Direct WhatsApp & Phone Links */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/${storeInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-white bg-[#128C7E] hover:bg-[#075E54] rounded-lg transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>

                <div className="w-full sm:w-1/2 flex items-center justify-center gap-4 text-xs text-[#6F5B52] border border-[#E5DAC8] py-2.5 px-3 rounded-lg bg-[#FAF7F2]">
                  <Share2 className="w-3.5 h-3.5 text-[#8C6518]" />
                  <a
                    href={storeInfo.socialInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#5B141E] font-medium"
                  >
                    Instagram
                  </a>
                  <span>·</span>
                  <a
                    href={storeInfo.socialFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#5B141E] font-medium"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Preview */}
          <div className="lg:col-span-6 bg-white rounded-xl p-6 border border-[#E5DAC8] shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#5B141E]">Interactive Location Map</h3>
                <p className="text-xs text-[#6F5B52]">Easily navigate via Google Maps</p>
              </div>

              <a
                href={storeInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#7E1C28] hover:text-[#5B141E] hover:underline"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Styled Map Graphic Representation */}
            <div className="relative rounded-lg overflow-hidden border border-[#E5DAC8] aspect-[16/10] bg-[#FAF6EF] flex flex-col items-center justify-center text-center p-6">
              {/* Map background illustration / simulation */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'radial-gradient(#5B141E 1px, transparent 1px), radial-gradient(#C89D42 1px, #FAF6EF 1px)',
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px',
                }}
              />

              <div className="relative z-10 space-y-3 max-w-sm">
                <div className="w-14 h-14 rounded-full bg-[#7E1C28] text-white flex items-center justify-center mx-auto shadow-md border-2 border-white animate-bounce duration-1000">
                  <MapPin className="w-7 h-7 text-[#DEB65E]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#5B141E]">
                  {storeInfo.storeName}
                </h4>
                <p className="text-xs text-[#6F5B52] leading-snug">
                  {storeInfo.address}, {storeInfo.cityState}
                </p>
                <div className="pt-2">
                  <a
                    href={storeInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#7E1C28] hover:bg-[#64131E] rounded-md shadow-sm transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open Navigation Route</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-[#8C7A70] italic text-center">
              * Showroom address and map links can be updated anytime by the shop owner in the Owner Portal.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
