import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingCart, Heart, Share2, Star, ChevronLeft, ChevronRight,
  MapPin, Shield, Truck, Clock, Leaf, Package, Phone, MessageSquare,
  TrendingUp, TrendingDown, Info, Calendar, Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Toast from '../components/ui/Toast';
import ProductCard from '../components/product/ProductCard';
import { PRODUCTS, FARMERS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import clsx from 'clsx';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const farmer = FARMERS.find(f => f.id === product.farmerId) || FARMERS[0];
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(product.minOrder || 1);
  const [activeTab, setActiveTab] = useState('description');

  const inWishlist = wishlist.includes(product.id);
  const discount = product.discount || Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const priceHistory = product.priceHistory?.slice(-14) || [];
  const latestPrice = priceHistory[priceHistory.length - 1]?.price || product.price;
  const prevPrice = priceHistory[priceHistory.length - 2]?.price || product.price;
  const priceChange = ((latestPrice - prevPrice) / prevPrice * 100).toFixed(1);

  return (
    <>
      <Navbar />
      <Toast />
      <main className="min-h-screen bg-kd-paper">
        <div className="container-kd py-6">

          {/* Breadcrumb */}
          <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-kd-green-700">Home</Link>
            <span>/</span>
            <Link to="/browse" className="hover:text-kd-green-700">Browse</Link>
            <span>/</span>
            <Link to={`/browse?category=${product.category}`} className="hover:text-kd-green-700 capitalize">{product.category}</Link>
            <span>/</span>
            <span className="text-kd-earth font-medium truncate max-w-xs">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 mb-12">

            {/* ── Image gallery ── */}
            <div className="space-y-3">
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-gray-100 group">
                <img
                  src={product.images[selectedImg]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Nav arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImg(i => (i - 1 + product.images.length) % product.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/90 shadow-kd flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImg(i => (i + 1) % product.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/90 shadow-kd flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                {/* Freshness badge */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.organic && (
                    <span className="badge-organic shadow-kd">
                      <Leaf className="w-3 h-3" /> Certified Organic
                    </span>
                  )}
                  <span className="badge bg-white text-kd-earth shadow-kd">
                    <Zap className="w-3 h-3 text-kd-amber-500" />
                    Harvested {product.harvestDate}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImg(i)}
                      className={clsx('w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all',
                        selectedImg === i ? 'border-kd-green-700' : 'border-transparent hover:border-kd-green-300')}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product info ── */}
            <div className="space-y-5">

              {/* Name & badges */}
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="badge-green capitalize">{product.category}</span>
                  {product.certified && <span className="verified-badge">✓ Certified</span>}
                  {discount > 0 && <span className="badge bg-red-500 text-white">{discount}% OFF</span>}
                </div>
                <h1 className="text-3xl font-bold text-kd-earth leading-tight">{product.name}</h1>
                {product.nameHindi && (
                  <p className="text-gray-400 text-sm mt-1 font-devanagari">{product.nameHindi}</p>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={clsx('w-4 h-4', i < Math.floor(product.rating) ? 'text-kd-amber-500 fill-current' : 'text-gray-200')} />
                  ))}
                </div>
                <span className="font-bold text-kd-earth">{product.rating}</span>
                <span className="text-gray-400 text-sm">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="bg-kd-green-100/50 rounded-2xl p-4">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-kd-earth font-mono">₹{product.price}</span>
                  <div>
                    <span className="text-gray-400 text-sm font-mono">/{product.unit}</span>
                    {product.mrp > product.price && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm line-through font-mono">MRP ₹{product.mrp}</span>
                        <span className="text-red-500 text-sm font-semibold">Save {discount}%</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  {parseFloat(priceChange) > 0 ? (
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  )}
                  <span className={clsx('text-xs font-semibold', parseFloat(priceChange) > 0 ? 'text-red-500' : 'text-green-600')}>
                    {parseFloat(priceChange) > 0 ? '+' : ''}{priceChange}% from yesterday
                  </span>
                </div>
              </div>

              {/* Freshness indicator */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-kd-green-100">
                <div className="relative w-16 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-kd-green-700 to-kd-green-400 rounded-full"
                    style={{ width: `${Math.min(100, (product.freshnessDays / 30) * 100)}%` }}
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-kd-earth">Freshness: {product.freshnessDays} days shelf life</p>
                  <p className="text-[11px] text-gray-500">Harvested {product.harvestDate}</p>
                </div>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-kd-green-700 font-medium">
                  <Package className="w-4 h-4" />
                  {product.stock > 100 ? 'In Stock' : `Only ${product.stock} ${product.unit} left!`}
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">Min: {product.minOrder} {product.unit}</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">Max: {product.maxOrder} {product.unit}</span>
              </div>

              {/* Qty selector */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(product.minOrder || 1, q - 1))}
                    className="px-4 py-3 text-kd-earth hover:bg-kd-green-100 transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 font-mono font-bold text-kd-earth min-w-[60px] text-center">{qty} {product.unit}</span>
                  <button
                    onClick={() => setQty(q => Math.min(product.maxOrder || 100, q + 1))}
                    className="px-4 py-3 text-kd-earth hover:bg-kd-green-100 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="font-mono font-bold text-kd-green-700 text-lg">
                  = ₹{(product.price * qty).toLocaleString('en-IN')}
                </span>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(product.id, qty)}
                  className="flex-1 btn-primary btn-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={clsx('w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all',
                    inWishlist ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400')}
                >
                  <Heart className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
                <button className="w-14 h-14 rounded-2xl border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-kd-blue-600 hover:text-kd-blue-600 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Delivery */}
              <div className="space-y-2.5">
                {[
                  { icon: Truck,    text: `Delivery within ${product.deliveryRadius}km`, sub: 'Free delivery above ₹500' },
                  { icon: Shield,   text: '100% Freshness Guarantee', sub: 'Full refund if not satisfied' },
                  { icon: Clock,    text: 'Delivery in 24-48 hours', sub: 'After order confirmation' },
                ].map(({ icon: Icon, text, sub }) => (
                  <div key={text} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                    <Icon className="w-4 h-4 text-kd-green-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-kd-earth">{text}</p>
                      <p className="text-[11px] text-gray-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Farmer mini-profile */}
              <div className="card p-4 flex items-center gap-4">
                <img src={farmer.avatar} alt={farmer.name} className="w-14 h-14 rounded-2xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-kd-earth text-sm">{farmer.name}</p>
                    <span className="verified-badge text-[10px]">✓ Verified</span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {farmer.location}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-3 h-3 text-kd-amber-500 fill-current" />
                    <span className="text-xs font-semibold text-kd-earth">{farmer.rating}</span>
                    <span className="text-xs text-gray-400">({farmer.reviewCount})</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-kd-green-100 text-kd-green-700 text-xs font-semibold hover:bg-kd-green-200 transition-colors">
                    <Phone className="w-3 h-3" /> Call
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors">
                    <MessageSquare className="w-3 h-3" /> Chat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Tabs: Description / Nutrition / Price History / Reviews ── */}
          <div className="card overflow-hidden mb-12">
            <div className="flex border-b border-kd-green-100 overflow-x-auto">
              {[
                { id: 'description', label: 'Description' },
                { id: 'nutrition',   label: 'Nutrition'   },
                { id: 'priceHistory', label: 'Price History' },
                { id: 'reviews',     label: `Reviews (${product.reviewCount})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx('px-6 py-4 text-sm font-semibold transition-all whitespace-nowrap border-b-2 -mb-px',
                    activeTab === tab.id
                      ? 'border-kd-green-700 text-kd-green-700'
                      : 'border-transparent text-gray-500 hover:text-kd-earth')}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  <div>
                    <h4 className="font-bold text-kd-earth mb-2 text-sm">Storage Instructions</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{product.storage}</p>
                  </div>
                  {product.tags && (
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map(tag => (
                        <span key={tag} className="badge-green text-xs">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'nutrition' && product.nutritionPer100g && (
                <div>
                  <h4 className="font-bold text-kd-earth mb-4">Nutritional Information (per 100g)</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {Object.entries(product.nutritionPer100g).map(([key, val]) => (
                      <div key={key} className="text-center p-4 bg-kd-paper rounded-2xl">
                        <div className="text-2xl font-bold text-kd-green-700 font-mono">{val}</div>
                        <div className="text-xs text-gray-500 mt-1 capitalize font-medium">
                          {key === 'vitaminC' ? 'Vitamin C (mg)' : key === 'calories' ? 'Calories' : `${key} (g)`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'priceHistory' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-kd-earth">Price History (Last 14 Days)</h4>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-0.5 bg-kd-green-700 inline-block" /> Kisan Direct Price
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-0.5 bg-orange-400 inline-block border-dashed border-t" /> Mandi Price
                      </span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={d => d.slice(5)} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${v}`} />
                      <Tooltip
                        formatter={(value, name) => [`₹${value}/${product.unit}`, name === 'price' ? 'Kisan Direct' : 'Mandi Price']}
                        contentStyle={{ borderRadius: 12, border: '1px solid #e8f5e9', fontSize: 12 }}
                      />
                      <ReferenceLine y={product.price} stroke="#2F5233" strokeDasharray="4 4" label={{ value: 'Current', fill: '#2F5233', fontSize: 11 }} />
                      <Line type="monotone" dataKey="price" stroke="#2F5233" strokeWidth={2.5} dot={false} name="price" />
                      <Line type="monotone" dataKey="mandiPrice" stroke="#E8A93B" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="mandi" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {/* Summary */}
                  <div className="flex items-center gap-8 p-4 bg-kd-paper rounded-2xl">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-kd-earth">{product.rating}</div>
                      <div className="flex gap-0.5 justify-center mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={clsx('w-4 h-4', i < Math.floor(product.rating) ? 'text-kd-amber-500 fill-current' : 'text-gray-200')} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{product.reviewCount} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5,4,3,2,1].map(star => (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-3">{star}</span>
                          <Star className="w-3 h-3 text-kd-amber-400 fill-current" />
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-kd-amber-500 rounded-full"
                              style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8">
                            {star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '7%' : star === 2 ? '2%' : '1%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sample reviews */}
                  {[
                    { name: 'Priya S.', rating: 5, date: '2 days ago', text: 'Absolutely fresh! Way better than what I get at the local market. The tomatoes were perfectly ripe and lasted 8 days.' },
                    { name: 'Raj M.',   rating: 5, date: '1 week ago', text: 'Ordered 10kg for a party. Every piece was uniform and fresh. Delivery was on time. Highly recommend Ramesh ji!' },
                    { name: 'Anita K.', rating: 4, date: '2 weeks ago', text: 'Good quality, price is very fair. Packaging could be a bit better but produce quality is excellent.' },
                  ].map(r => (
                    <div key={r.name} className="border-b border-kd-green-100 pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-kd-green-700 text-white flex items-center justify-center text-xs font-bold">
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-kd-earth">{r.name}</p>
                          <p className="text-xs text-gray-400">{r.date}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-kd-amber-500 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-kd-earth mb-6">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
