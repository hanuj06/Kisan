import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, ShoppingCart, Star, Trash2, SlidersHorizontal, Leaf, ArrowRight } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PRODUCTS, FARMERS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

function ProductCard({ product, onRemove }) {
  const { addToCart, showToast } = useApp();

  const farmer = FARMERS.find(f => f.id === product.farmer);

  const handleAddToCart = () => {
    addToCart(product.id, 1);
  };

  return (
    <div className="card overflow-hidden group hover:shadow-kd-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.organic && (
            <span className="badge-green text-[10px] flex items-center gap-0.5">
              <Leaf className="w-2.5 h-2.5" /> Organic
            </span>
          )}
          {product.badge && (
            <span className="bg-kd-amber-500 text-kd-earth text-[10px] font-bold px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
        </div>
        {/* Remove button */}
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center
            shadow-sm hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
          title="Remove from wishlist"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        {/* Heart overlay */}
        <div className="absolute bottom-2 right-2">
          <Heart className="w-5 h-5 fill-red-500 text-red-500 drop-shadow" />
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-kd-earth text-sm line-clamp-1 hover:text-kd-green-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {farmer && (
          <div className="flex items-center gap-1.5 mt-1">
            <img src={farmer.avatar} alt={farmer.name} className="w-4 h-4 rounded-full object-cover" />
            <span className="text-xs text-gray-500">{farmer.name}</span>
            {farmer.verified && <span className="text-kd-green-700 text-[10px]">✓</span>}
          </div>
        )}

        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3.5 h-3.5 fill-kd-amber-500 text-kd-amber-500" />
          <span className="text-xs font-medium text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-mono font-bold text-kd-earth">₹{product.price}</span>
            <span className="text-xs text-gray-400">/{product.unit}</span>
            {product.mrp && (
              <span className="text-xs text-gray-400 line-through ml-1.5">₹{product.mrp}</span>
            )}
          </div>
          {product.mrp && (
            <span className="text-[10px] font-semibold text-kd-green-700 bg-kd-green-100 px-1.5 py-0.5 rounded-md">
              {Math.round((1 - product.price / product.mrp) * 100)}% off
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-3 flex items-center justify-center gap-2 bg-kd-green-700 text-white
            rounded-xl py-2 text-sm font-semibold hover:bg-kd-green-800 transition-colors active:scale-95"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

const SORT_OPTIONS = [
  { value: 'saved',   label: 'Recently Saved'  },
  { value: 'price_l', label: 'Price: Low to High' },
  { value: 'price_h', label: 'Price: High to Low' },
  { value: 'rating',  label: 'Best Rated'      },
];

export default function BuyerWishlist() {
  const { wishlist, toggleWishlist } = useApp();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('saved');

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const filtered = wishlistProducts
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (FARMERS.find(f => f.id === p.farmer)?.name || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'price_l') return a.price - b.price;
      if (sort === 'price_h') return b.price - a.price;
      if (sort === 'rating')  return b.rating - a.rating;
      return 0;
    });

  const totalValue = wishlistProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <DashboardLayout type="buyer">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-kd-earth flex items-center gap-2">
              <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              Wishlist
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">{wishlistProducts.length} saved items</p>
          </div>
          <Link to="/browse" className="btn-primary btn-sm flex items-center gap-1.5">
            Discover More <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {wishlistProducts.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-red-300" />
            </div>
            <h2 className="text-lg font-bold text-kd-earth mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-gray-500 mb-6">
              Browse our fresh produce and save your favorites!
            </p>
            <Link to="/browse" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <>
            {/* Summary bar */}
            <div className="card p-4 bg-gradient-to-r from-kd-green-50 to-amber-50 flex items-center gap-4 flex-wrap">
              <div className="flex-1">
                <p className="text-sm font-semibold text-kd-earth">
                  {wishlistProducts.length} items saved · Total value ₹{totalValue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Save up to 35% vs retail on all items</p>
              </div>
              <button
                onClick={() => {
                  wishlistProducts.forEach(p => toggleWishlist(p.id));
                }}
                className="text-xs text-red-500 font-medium hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Wishlist
              </button>
            </div>

            {/* Search & sort */}
            <div className="flex gap-3 flex-wrap items-center">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search wishlist..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input pl-9 py-2.5 text-sm w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="input py-2.5 text-sm pr-8"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No items match your search</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onRemove={() => toggleWishlist(product.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
