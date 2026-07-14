import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, Search, Filter, ChevronDown, Star, Package,
  Truck, CheckCircle, Clock, XCircle, RotateCcw, MessageSquare,
  ChevronRight, ArrowRight
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { BUYER_ORDERS } from '../../data/mockData';

const STATUS_CONFIG = {
  pending:   { color: 'bg-amber-100 text-amber-700',  icon: Clock,        label: 'Pending'   },
  confirmed: { color: 'bg-blue-100 text-blue-700',    icon: Package,      label: 'Confirmed' },
  packed:    { color: 'bg-purple-100 text-purple-700',icon: Package,      label: 'Packed'    },
  shipped:   { color: 'bg-indigo-100 text-indigo-700',icon: Truck,        label: 'Shipped'   },
  delivered: { color: 'bg-kd-green-100 text-kd-green-700', icon: CheckCircle, label: 'Delivered' },
  cancelled: { color: 'bg-red-100 text-red-600',      icon: XCircle,      label: 'Cancelled' },
};

const TRACKING_LABELS = ['Ordered', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];

function TrackingBar({ steps, currentStep }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, idx) => {
        const done = idx <= currentStep;
        const active = idx === currentStep;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all
                ${done ? 'bg-kd-green-700 text-white' : 'bg-gray-200 text-gray-400'} 
                ${active ? 'ring-2 ring-kd-green-300 ring-offset-1' : ''}`}>
                {done ? '✓' : idx + 1}
              </div>
              <span className={`text-[9px] mt-1 font-medium whitespace-nowrap ${done ? 'text-kd-green-700' : 'text-gray-400'}`}>
                {TRACKING_LABELS[idx]}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mb-4 mx-1 rounded ${idx < currentStep ? 'bg-kd-green-700' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StarRating({ value, onChange, readonly = false }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`transition-transform ${!readonly ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
        >
          <Star
            className={`w-4 h-4 ${star <= value ? 'fill-kd-amber-500 text-kd-amber-500' : 'text-gray-300'}`}
          />
        </button>
      ))}
    </div>
  );
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(order.rating || 0);
  const [review, setReview] = useState(order.review || '');
  const [submitted, setSubmitted] = useState(!!order.rating);

  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
  const StatusIcon = cfg.icon;

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <img
          src={order.farmer.avatar}
          alt={order.farmer.name}
          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-kd-earth text-sm">{order.farmer.name}</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-500">{order.farmer.location}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
            {order.items.map(i => `${i.product} (${i.qty}${i.unit})`).join(', ')}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Order #{order.id} · {order.date}</p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <p className="font-mono font-bold text-kd-earth">₹{order.total.toLocaleString()}</p>
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.color}`}>
              <StatusIcon className="w-3 h-3" />
              {cfg.label}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50/50 p-5 space-y-5">

          {/* Tracking */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Order Tracking</p>
            <TrackingBar steps={order.trackingSteps} currentStep={order.currentStep} />
          </div>

          {/* Items */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Items Ordered</p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-kd-earth">{item.product}</p>
                    <p className="text-xs text-gray-500">{item.qty} {item.unit} × ₹{item.price}</p>
                  </div>
                  <span className="font-mono font-semibold text-sm text-kd-earth">
                    ₹{(item.qty * item.price).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center px-4 py-2">
                <span className="text-sm text-gray-500">Delivery</span>
                <span className="text-sm font-medium text-kd-green-700">FREE</span>
              </div>
              <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200">
                <span className="font-semibold text-kd-earth">Total</span>
                <span className="font-mono font-bold text-kd-earth">₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Delivery info */}
          <div className="flex items-center gap-3 bg-kd-green-50 rounded-xl px-4 py-3">
            <Truck className="w-4 h-4 text-kd-green-700 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-kd-green-800">
                {order.status === 'delivered'
                  ? `Delivered on ${order.deliveryDate}`
                  : `Expected by ${order.deliveryDate}`}
              </p>
              <p className="text-xs text-kd-green-600 mt-0.5">Farm-to-door fresh delivery</p>
            </div>
          </div>

          {/* Rating / Review */}
          {order.status === 'delivered' && (
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              {submitted ? (
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-kd-earth">Your Review</p>
                      <StarRating value={rating} readonly />
                    </div>
                    {review && <p className="text-sm text-gray-600 italic">"{review}"</p>}
                  </div>
                </div>
              ) : (
                <div>
                  {!showReview ? (
                    <button
                      onClick={() => setShowReview(true)}
                      className="flex items-center gap-2 text-sm text-kd-green-700 font-semibold hover:underline"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Rate & Review this order
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-kd-earth">How was your order?</p>
                      <StarRating value={rating} onChange={setRating} />
                      <textarea
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        placeholder="Share your experience with the farmer's produce..."
                        className="input w-full h-20 text-sm resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setSubmitted(true); setShowReview(false); }}
                          disabled={rating === 0}
                          className="btn-primary btn-sm disabled:opacity-50"
                        >
                          Submit Review
                        </button>
                        <button onClick={() => setShowReview(false)} className="btn-outline btn-sm">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            {order.status === 'delivered' && (
              <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors">
                <RotateCcw className="w-3.5 h-3.5" /> Reorder
              </button>
            )}
            <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" /> Contact Farmer
            </button>
            {(order.status === 'pending') && (
              <button className="flex items-center gap-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-lg px-3 py-2 hover:bg-red-50 transition-colors">
                <XCircle className="w-3.5 h-3.5" /> Cancel Order
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const FILTERS = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

export default function BuyerOrders() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = BUYER_ORDERS.filter(o => {
    const matchSearch = o.farmer.name.toLowerCase().includes(search.toLowerCase())
      || o.items.some(i => i.product.toLowerCase().includes(search.toLowerCase()))
      || o.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || o.status === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const totalSpent = BUYER_ORDERS.reduce((s, o) => s + o.total, 0);
  const delivered  = BUYER_ORDERS.filter(o => o.status === 'delivered').length;

  return (
    <DashboardLayout type="buyer">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-kd-earth">My Orders</h1>
            <p className="text-sm text-gray-500 mt-0.5">{BUYER_ORDERS.length} orders total</p>
          </div>
          <Link to="/browse" className="btn-primary btn-sm flex items-center gap-1.5">
            Shop Again <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Orders',  value: BUYER_ORDERS.length, color: 'text-kd-earth', bg: 'bg-kd-paper' },
            { label: 'Delivered',     value: delivered,            color: 'text-kd-green-700', bg: 'bg-kd-green-50' },
            { label: 'Total Spent',   value: `₹${totalSpent.toLocaleString()}`, color: 'text-kd-earth', bg: 'bg-amber-50' },
          ].map(s => (
            <div key={s.label} className={`card p-4 text-center ${s.bg}`}>
              <p className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders, products, farmers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input pl-9 py-2.5 text-sm w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filter === f
                    ? 'bg-kd-green-700 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-kd-green-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Orders list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No orders found</p>
            <Link to="/browse" className="btn-primary btn-sm mt-4 inline-flex">Browse Products</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
