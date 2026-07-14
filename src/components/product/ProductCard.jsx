import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, MapPin, Leaf, Zap, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

export default function ProductCard({ product, compact = false }) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const [imgLoaded, setImgLoaded] = useState(false);
  const inWishlist = wishlist.includes(product.id);

  const discount = product.discount || Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const freshDaysLeft = product.freshnessDays;
  const isFresh = freshDaysLeft <= 3;

  return (
    <div className="product-card group relative flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square rounded-t-2xl bg-gray-100">
        {!imgLoaded && <div className="skeleton absolute inset-0" />}
        <img
          src={product.images[0]}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className={clsx(
            'w-full h-full object-cover transition-all duration-500 group-hover:scale-105',
            imgLoaded ? 'opacity-100' : 'opacity-0'
          )}
          loading="lazy"
        />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.organic && (
            <span className="badge-organic text-[10px] shadow-sm">
              <Leaf className="w-3 h-3" /> Organic
            </span>
          )}
          {discount >= 20 && (
            <span className="badge bg-red-500 text-white text-[10px] shadow-sm">
              {discount}% OFF
            </span>
          )}
          {isFresh && (
            <span className="badge bg-blue-100 text-blue-700 text-[10px] shadow-sm">
              <Zap className="w-3 h-3" /> Ultra Fresh
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className={clsx(
            'absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-kd transition-all duration-200',
            inWishlist
              ? 'bg-red-500 text-white'
              : 'bg-white/90 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100'
          )}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Quick add to cart */}
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product.id, product.minOrder || 1); }}
            className="w-full btn-primary btn-sm py-2.5 shadow-green"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <Link to={`/product/${product.id}`} className="flex flex-col flex-1 p-4 gap-2">
        {/* Farmer */}
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <span className="text-[11px] text-gray-500 truncate">{product.farmerLocation}</span>
          {product.certified && (
            <span className="verified-badge text-[10px] ml-auto flex-shrink-0">✓ Verified</span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-kd-earth text-sm leading-snug line-clamp-2 font-body">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 text-kd-amber-500 fill-current" />
            <span className="text-xs font-semibold text-kd-earth">{product.rating}</span>
          </div>
          <span className="text-[11px] text-gray-400">({product.reviewCount})</span>
          <div className="flex items-center gap-1 ml-auto">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-[11px] text-gray-400">
              {freshDaysLeft <= 7 ? `${freshDaysLeft}d fresh` : 'Fresh'}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mt-auto pt-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-kd-earth font-mono">
                ₹{product.price}
              </span>
              <span className="text-xs text-gray-400 font-mono">/{product.unit}</span>
            </div>
            {product.mrp > product.price && (
              <span className="text-[11px] text-gray-400 line-through font-mono">₹{product.mrp}</span>
            )}
          </div>
          <div className="text-right">
            <p className="text-[11px] text-gray-500">Min: {product.minOrder} {product.unit}</p>
            <p className="text-[10px] text-kd-green-700 font-medium">{product.stock} in stock</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
