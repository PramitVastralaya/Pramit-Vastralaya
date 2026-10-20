import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Sparkles, Grid, Square, Filter } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { ProductCard } from './ProductCard.tsx';
import {
  filterProducts,
  sortProducts,
  getCategoryCounts,
} from '../utils/catalogLogic.ts';
import type { SortOption } from '../types/store.ts';

export const ProductCatalog: React.FC = () => {
  const {
    products,
    categories,
    filters,
    setCategoryFilter,
    setSearchQuery,
    setAvailabilityFilter,
    setSortBy,
    resetFilters,
  } = useStore();

  const [mobileColumns, setMobileColumns] = useState<'2' | '1'>('2');

  // Category counts
  const categoryCounts = useMemo(() => getCategoryCounts(products), [products]);

  // Filtered and sorted products
  const displayedProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      category: filters.category,
      search: filters.search,
      availability: filters.availability,
    });
    return sortProducts(filtered, filters.sortBy);
  }, [products, filters]);

  return (
    <section id="catalog" className="py-10 sm:py-16 bg-[#FAF6EF]/60 border-b border-[#E5DAC8]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#8C6518] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C89D42]" />
            <span>Digital Showroom Catalogue</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#5B141E] tracking-tight">
            Explore All Collections &amp; Fabrics
          </h2>
          <p className="mt-1.5 text-xs sm:text-base text-[#68534A] leading-relaxed">
            Check prices, per-meter rates, and fiber specs before your showroom visit.
          </p>
        </div>

        {/* Filter and Search Bar Card */}
        <div className="bg-white rounded-xl p-3 sm:p-5 border border-[#E5DAC8] shadow-2xs mb-6 space-y-3 sm:space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A70]" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by fabric, saree, shirt cloth, jeans, color..."
              className="w-full pl-10 pr-12 py-2 sm:py-2.5 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E5DAC8] rounded-lg text-[#2C201C] placeholder-[#8C7A70] focus:outline-none focus:ring-1 focus:ring-[#7E1C28]"
            />
            {filters.search && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A70] hover:text-[#5B141E] font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Dropdowns & Mobile View Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            {/* Dropdowns in 2 columns on mobile */}
            <div className="grid grid-cols-2 gap-2 flex-1">
              {/* Availability Filter */}
              <div>
                <label htmlFor="avail-filter" className="sr-only">Availability</label>
                <select
                  id="avail-filter"
                  value={filters.availability}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="w-full py-2 px-2.5 text-xs font-medium bg-[#FAF7F2] border border-[#E5DAC8] rounded-lg text-[#5B141E] focus:outline-none"
                >
                  <option value="all">All Items</option>
                  <option value="In Stock">In Stock Only</option>
                  <option value="Limited Stock">Limited Stock</option>
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div>
                <label htmlFor="sort-select" className="sr-only">Sort by</label>
                <select
                  id="sort-select"
                  value={filters.sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full py-2 px-2.5 text-xs font-medium bg-[#FAF7F2] border border-[#E5DAC8] rounded-lg text-[#5B141E] focus:outline-none"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>
            </div>

            {/* Mobile View Toggle & Reset Button */}
            <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0">
              {/* Mobile Columns Selector */}
              <div className="flex items-center gap-1 sm:hidden bg-[#FAF7F2] p-1 rounded-lg border border-[#E5DAC8]">
                <button
                  onClick={() => setMobileColumns('2')}
                  className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                    mobileColumns === '2' ? 'bg-[#7E1C28] text-white shadow-2xs' : 'text-[#6F5B52]'
                  }`}
                  aria-label="2 Columns Grid"
                  title="2-Column Grid"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">2 Col</span>
                </button>
                <button
                  onClick={() => setMobileColumns('1')}
                  className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                    mobileColumns === '1' ? 'bg-[#7E1C28] text-white shadow-2xs' : 'text-[#6F5B52]'
                  }`}
                  aria-label="1 Column Expanded"
                  title="1-Column Card"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">1 Col</span>
                </button>
              </div>

              {/* Reset Filters */}
              {(filters.category !== 'all' ||
                filters.search !== '' ||
                filters.availability !== 'all' ||
                filters.sortBy !== 'featured') && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 py-1.5 px-2.5 text-xs font-semibold text-[#7E1C28] bg-[#F4ECE0] hover:bg-[#E9DCC8] rounded-lg border border-[#C89D42]/40 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs: Horizontal Scroll with Touch Drag */}
          <div className="pt-2 border-t border-[#F0E6D8] flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                filters.category === 'all'
                  ? 'bg-[#7E1C28] text-[#FAF6EF] shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#6F5B52] hover:text-[#5B141E] hover:bg-[#F4ECE0] border border-[#E5DAC8]'
              }`}
            >
              All ({categoryCounts['all'] || 0})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  filters.category === cat.id
                    ? 'bg-[#7E1C28] text-[#FAF6EF] shadow-2xs'
                    : 'bg-[#FAF7F2] text-[#6F5B52] hover:text-[#5B141E] hover:bg-[#F4ECE0] border border-[#E5DAC8]'
                }`}
              >
                {cat.name} ({categoryCounts[cat.id] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Counter and Active Filter Indicator */}
        <div className="flex items-center justify-between text-xs text-[#7A6960] mb-4 font-medium">
          <span>
            Showing <strong className="text-[#5B141E] font-bold">{displayedProducts.length}</strong> items
          </span>
          {filters.category !== 'all' && (
            <span className="text-[#8C6518] text-[11px] truncate max-w-[180px] sm:max-w-none">
              {categories.find((c) => c.id === filters.category)?.name}
            </span>
          )}
        </div>

        {/* Responsive Product Grid */}
        {displayedProducts.length > 0 ? (
          <div
            className={`grid ${
              mobileColumns === '2' ? 'grid-cols-2' : 'grid-cols-1'
            } sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6`}
          >
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={mobileColumns === '2' ? 'grid' : 'list'}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-12 bg-white rounded-xl border border-[#E5DAC8] p-6 max-w-md mx-auto">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#8C6518] flex items-center justify-center mx-auto mb-3 border border-[#E5DAC8]">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#5B141E]">
              No Matching Products Found
            </h3>
            <p className="text-xs text-[#6F5B52] mt-1">
              Try adjusting your search terms or selecting another category.
            </p>
            <button
              onClick={resetFilters}
              className="mt-3 px-3.5 py-1.5 text-xs font-semibold text-[#FAF6EF] bg-[#7E1C28] rounded-md"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
