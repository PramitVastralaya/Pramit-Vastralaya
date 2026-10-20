import React from 'react';
import { Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Product } from '../types/store.ts';
import { formatProductPrice } from '../utils/catalogLogic.ts';
import { useStore } from '../context/StoreContext.tsx';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { setSelectedProduct, categories } = useStore();

  const categoryName =
    categories.find((c) => c.id === product.category)?.name || product.category;

  const formattedPrice = formatProductPrice({
    price: product.price,
    pricePerMeter: product.pricePerMeter,
    unit: product.unit,
  });

  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-[#E5DAC8] hover:border-[#AD8124]/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Product Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4ECE0]">
          <img
            src={product.images[0] || '/src/assets/images/hero_vastralay_showroom_1792387121760.jpg'}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
            {product.pricePerMeter && (
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase px-1.5 sm:px-2 py-0.5 bg-[#5B141E] text-white rounded">
                Per Meter
              </span>
            )}
            {product.newArrival && (
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase px-1.5 sm:px-2 py-0.5 bg-[#8C6518] text-white rounded">
                New
              </span>
            )}
          </div>

          {/* Availability Status */}
          <div className="absolute top-2 right-2">
            <span
              className={`text-[9px] sm:text-[11px] font-medium px-1.5 sm:px-2 py-0.5 rounded shadow-2xs flex items-center gap-1 ${
                product.availability === 'In Stock'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {product.availability === 'In Stock' ? (
                <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" />
              ) : (
                <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600" />
              )}
              <span className="hidden sm:inline">{product.availability}</span>
              <span className="sm:hidden">{product.availability === 'In Stock' ? 'Stock' : 'Limited'}</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3 sm:p-5 space-y-2">
          {/* Category as quiet text */}
          <div className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8C6518] truncate">
            {categoryName}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-xs sm:text-base font-bold text-[#5B141E] leading-snug line-clamp-2 group-hover:text-[#9B2433] transition-colors">
            {product.name}
          </h3>

          {/* Fabric details */}
          <p className="text-[11px] sm:text-xs text-[#6F5B52] line-clamp-1 font-medium">
            <span className="text-[#3A2922] font-semibold">Fabric:</span> {product.fabric}
          </p>

          {/* Colors and Sizes - hidden on small 2-col cards, visible on desktop */}
          <div className="hidden sm:block pt-2 border-t border-[#F0E6D8] space-y-1.5 text-xs">
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#7A6960] font-medium shrink-0">Colors:</span>
                <div className="flex items-center gap-1 flex-wrap">
                  {product.colorHexes && product.colorHexes.length > 0
                    ? product.colorHexes.slice(0, 3).map((hex, i) => (
                        <span
                          key={hex + i}
                          className="w-3 h-3 rounded-full border border-black/20 shrink-0 inline-block"
                          style={{ backgroundColor: hex }}
                          title={product.colors[i] || hex}
                        />
                      ))
                    : product.colors.slice(0, 2).map((col, i) => (
                        <span key={col} className="text-[#5B141E] text-[11px]">
                          {i > 0 && ', '}
                          {col}
                        </span>
                      ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Price & View Details Action */}
      <div className="p-3 sm:px-5 sm:pb-5 pt-0 border-t border-[#F0E6D8] mt-2 flex items-center justify-between gap-2">
        <div>
          <span className="text-[9px] text-[#8C7A70] uppercase font-semibold block leading-none">
            Price
          </span>
          <span className="font-sans text-xs sm:text-base font-bold text-[#5B141E] tabular-nums">
            {formattedPrice}
          </span>
        </div>

        <button
          onClick={() => setSelectedProduct(product)}
          className="inline-flex items-center gap-1 py-1.5 px-2.5 sm:py-2 sm:px-3 text-[10px] sm:text-xs font-bold text-[#FAF6EF] bg-[#7E1C28] hover:bg-[#64131E] active:bg-[#4B0E16] rounded-md transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
          aria-label={`View details for ${product.name}`}
        >
          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Details</span>
        </button>
      </div>
    </article>
  );
};
