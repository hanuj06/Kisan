import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star, TrendingUp, ArrowRight, Package, Users } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { BUYER_ORDERS, PRODUCTS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function BuyerDashboard() {
  const { wishlist, cartTotal, cart } = useApp();
  const totalSpent = BUYER_ORDERS.reduce((sum, o) => sum + o.total, 0);
  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <DashboardLayout type="buyer">
      <div className="space-y-6">

        {/* Welcome */}
        <div className="bg-gradient-to-br from-kd-earth to-kd-green-900 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <h1 className="text-2xl font-bold">Hello, Priya! 👋</h1>
            <p className="text-white/70 text-sm mt-1">Here's your shopping summary</p>
            <div className="flex gap-4 mt-4 flex-wrap">
              <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
                <div className="text-xl font-bold">₹{totalSpent.toLocaleString()}</div>
                <div className="text-xs text-white/60">Total spent</div>
              </div>
              <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
                <div className="text-xl font-bold">{BUYER_ORDERS.length}</div>
                <div className="text-xs text-white/60">Total orders</div>
              </div>
              <div className="bg-kd-amber-500 rounded-xl px-4 py-2 text-center">
                <div className="text-xl font-bold text-kd-earth">₹{Math.round(totalSpent * 0.32).toLocaleString()}</div>
                <div className="text-xs text-kd-earth/70">Saved vs retail</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Orders', value: BUYER_ORDERS.length, icon: ShoppingBag, bg: 'bg-blue-50', text: 'text-blue-700' },
            { label: 'Wishlist',      value: wishlist.length,        icon: Heart,      bg: 'bg-red-50',  text: 'text-red-600'  },
            { label: 'Cart Items',    value: cart.length,            icon: Package,    bg: 'bg-purple-50', text: 'text-purple-700' },
            { label: 'Saved Farmers', value: 3,                      icon: Users,      bg: 'bg-kd-green-100', text: 'text-kd-green-700' },
          ].map(({ label, value, icon: Icon, bg, text }) => (
            <div key={label} className="card p-5">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${text}`} />
              </div>
              <div className="text-2xl font-bold text-kd-earth">{value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-kd-earth">Recent Orders</h3>
            <Link to="/buyer/orders" className="text-xs text-kd-green-700 font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {BUYER_ORDERS.map(order => (
              <div key={order.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-kd-paper transition-colors">
                <img src={order.farmer.avatar} alt={order.farmer.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-kd-earth text-sm">{order.farmer.name}</p>
                  <p className="text-xs text-gray-500">{order.items.map(i => i.product).join(', ')}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{order.id} · {order.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-mono font-bold text-kd-earth">₹{order.total}</p>
                  <span className={`status-${order.status} text-[10px]`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist preview */}
        {wishlistProducts.length > 0 && (
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-kd-earth">Wishlist</h3>
              <Link to="/buyer/wishlist" className="text-xs text-kd-green-700 font-semibold hover:underline">View all</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {wishlistProducts.slice(0, 4).map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-kd-earth/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-bold truncate">{p.name}</p>
                      <p className="text-kd-amber-400 text-xs font-mono">₹{p.price}/{p.unit}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-kd-green-700" />
            <h3 className="font-bold text-kd-earth">Recommended for You</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PRODUCTS.slice(0, 4).map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="card-hover p-3 block">
                <img src={p.images[0]} alt={p.name} className="w-full aspect-square rounded-xl object-cover mb-2" />
                <p className="text-xs font-semibold text-kd-earth line-clamp-1">{p.name}</p>
                <p className="text-xs font-mono text-kd-green-700 mt-0.5">₹{p.price}/{p.unit}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-kd-amber-500 fill-current" />
                  <span className="text-[10px] text-gray-500">{p.rating}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
