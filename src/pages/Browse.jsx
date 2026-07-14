import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown, Leaf, Grid, List, ArrowUpDown } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/product/ProductCard';
import Toast from '../components/ui/Toast';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import clsx from 'clsx';

const SORT_OPTIONS = [
  { value: 'relevant',    label: 'Most Relevant'  },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Highest Rated'   },
  { value: 'newest',     label: 'Newest First'    },
  { value: 'discount',   label: 'Best Discount'   },
];

const PRICE_RANGES = [
  { label: 'Under ₹50',       min: 0,   max: 50  },
  { label: '₹50 - ₹150',      min: 50,  max: 150 },
  { label: '₹150 - ₹300',     min: 150, max: 300 },
  { label: 'Above ₹300',      min: 300, max: 9999 },
];

export default function Browse() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get('q') || '');
  const [category, setCategory] = useState(params.get('category') || '');
  const [organic, setOrganic] = useState(false);
  const [priceRange, setPriceRange] = useState(null);
  const [sort, setSort] = useState('relevant');
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [search, category, organic, priceRange]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        p.farmer.toLowerCase().includes(q) ||
        p.farmerLocation.toLowerCase().includes(q) ||
        p.tags?.some(t => t.includes(q))
      );
    }

    if (category) list = list.filter(p => p.category === category);
    if (organic) list = list.filter(p => p.organic);
    if (priceRange) list = list.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      case 'discount':   list.sort((a, b) => (b.discount || 0) - (a.discount || 0)); break;
      case 'newest':     list.sort((a, b) => new Date(b.harvestDate) - new Date(a.harvestDate)); break;
      default:           list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [search, category, organic, priceRange, sort]);

  const activeFiltersCount = [category, organic, priceRange].filter(Boolean).length;

  const clearFilters = () => {
    setCategory('');
    setOrganic(false);
    setPriceRange(null);
    setSearch('');
  };

  return (
    <>
      <Navbar />
      <Toast />
      <main className="min-h-screen bg-kd-paper">

        {/* Page header */}
        <div className="bg-white border-b border-kd-green-100 py-6">
          <div className="container-kd">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-kd-earth">
                  {search ? `Results for "${search}"` : category ? CATEGORIES.find(c => c.id === category)?.label || 'Products' : 'All Products'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {loading ? 'Searching...' : `${filtered.length} products from verified farmers`}
                </p>
              </div>

              {/* Search bar */}
              <div className="relative md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search products, farmers, locations..."
                  className="input pl-10"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container-kd py-6">
          <div className="flex gap-6">

            {/* ── Desktop sidebar filters ── */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="card p-5 sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-kd-earth">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button onClick={clearFilters} className="text-xs text-red-500 font-medium hover:underline">
                      Clear all ({activeFiltersCount})
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Category</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setCategory('')}
                      className={clsx('w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors',
                        !category ? 'bg-kd-green-100 text-kd-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50')}
                    >
                      <span>All Categories</span>
                      <span className="text-xs text-gray-400">{PRODUCTS.length}</span>
                    </button>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id === category ? '' : cat.id)}
                        className={clsx('w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors',
                          category === cat.id ? 'bg-kd-green-100 text-kd-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50')}
                      >
                        <span className="flex items-center gap-2">{cat.icon} {cat.label}</span>
                        <span className="text-xs text-gray-400">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divider" />

                {/* Price range */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Price Range</h4>
                  <div className="space-y-1.5">
                    {PRICE_RANGES.map(range => (
                      <button
                        key={range.label}
                        onClick={() => setPriceRange(priceRange?.label === range.label ? null : range)}
                        className={clsx('w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors',
                          priceRange?.label === range.label ? 'bg-kd-green-100 text-kd-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50')}
                      >
                        <span className={clsx('w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                          priceRange?.label === range.label ? 'border-kd-green-700 bg-kd-green-700' : 'border-gray-300')}>
                          {priceRange?.label === range.label && <span className="text-white text-[8px]">✓</span>}
                        </span>
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divider" />

                {/* Quality filters */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quality</h4>
                  <button
                    onClick={() => setOrganic(!organic)}
                    className={clsx('w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors border',
                      organic ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold' : 'text-gray-600 border-gray-200 hover:bg-gray-50')}
                  >
                    <Leaf className="w-4 h-4" />
                    Organic Only
                  </button>
                </div>
              </div>
            </aside>

            {/* ── Main content ── */}
            <div className="flex-1 min-w-0">

              {/* Toolbar */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {/* Mobile filter */}
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={clsx('lg:hidden flex items-center gap-2 btn-outline btn-sm', activeFiltersCount > 0 && 'border-kd-green-700 text-kd-green-700')}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>

                {/* Active filter chips */}
                <div className="flex flex-wrap gap-2 flex-1">
                  {category && (
                    <span className="filter-chip-active" onClick={() => setCategory('')}>
                      {CATEGORIES.find(c => c.id === category)?.label} <X className="w-3 h-3" />
                    </span>
                  )}
                  {organic && (
                    <span className="filter-chip-active" onClick={() => setOrganic(false)}>
                      Organic <X className="w-3 h-3" />
                    </span>
                  )}
                  {priceRange && (
                    <span className="filter-chip-active" onClick={() => setPriceRange(null)}>
                      {priceRange.label} <X className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* View mode */}
                <div className="flex items-center gap-1 border border-gray-200 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={clsx('p-1.5 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-kd-green-700 text-white' : 'text-gray-400 hover:text-gray-600')}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={clsx('p-1.5 rounded-lg transition-colors', viewMode === 'list' ? 'bg-kd-green-700 text-white' : 'text-gray-400 hover:text-gray-600')}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:border-kd-green-700 hover:text-kd-green-700 transition-colors bg-white"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    {SORT_OPTIONS.find(o => o.value === sort)?.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-10 z-20 card shadow-kd-xl w-48 py-1 animate-slide-down">
                      {SORT_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => { setSort(opt.value); setSortOpen(false); }}
                          className={clsx('w-full px-4 py-2.5 text-left text-sm transition-colors',
                            sort === opt.value ? 'bg-kd-green-100 text-kd-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50')}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Products grid / list */}
              {loading ? (
                <div className={clsx('grid gap-4', viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1')}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="card overflow-hidden">
                      <div className="skeleton aspect-square" />
                      <div className="p-4 space-y-2">
                        <div className="skeleton h-3 w-2/3 rounded" />
                        <div className="skeleton h-4 w-full rounded" />
                        <div className="skeleton h-3 w-1/2 rounded" />
                        <div className="skeleton h-5 w-1/3 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🌾</div>
                  <h3 className="font-bold text-kd-earth text-xl mb-2">No products found</h3>
                  <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search term</p>
                  <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
                </div>
              ) : (
                <div className={clsx('grid gap-4',
                  viewMode === 'grid'
                    ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                )}>
                  {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Load more */}
              {!loading && filtered.length > 0 && (
                <div className="mt-10 text-center">
                  <button className="btn-outline">Load More Products</button>
                  <p className="text-xs text-gray-400 mt-2">Showing {filtered.length} of {PRODUCTS.length} products</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
