import { useState } from 'react';
import {
  TrendingUp, ShoppingBag, Users, Star, ArrowUpRight, ArrowDownRight,
  Plus, Eye, Edit, Trash2, Sparkles, Cloud, Sun, Zap, AlertTriangle,
  IndianRupee, Package, BarChart2, Calendar, Bell
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FARMER_ANALYTICS, PRODUCTS, FARMER_ORDERS, AI_INSIGHTS, WEATHER_DATA, GOVERNMENT_SCHEMES, CHART_COLORS } from '../../data/mockData';

const STAT_CARDS = [
  {
    label: 'Total Revenue',
    value: '₹2,84,500',
    change: '+18.2%',
    up: true,
    icon: IndianRupee,
    bg: 'bg-kd-green-100',
    text: 'text-kd-green-700',
  },
  {
    label: 'Total Orders',
    value: '1,247',
    change: '+12.5%',
    up: true,
    icon: ShoppingBag,
    bg: 'bg-blue-50',
    text: 'text-kd-blue-700',
  },
  {
    label: 'Active Listings',
    value: '8',
    change: '+2',
    up: true,
    icon: Package,
    bg: 'bg-purple-50',
    text: 'text-purple-700',
  },
  {
    label: 'Avg Rating',
    value: '4.9 ★',
    change: '+0.1',
    up: true,
    icon: Star,
    bg: 'bg-kd-amber-100',
    text: 'text-kd-amber-600',
  },
];

export default function FarmerDashboard() {
  const [period, setPeriod] = useState('7d');

  return (
    <DashboardLayout type="farmer">
      <div className="space-y-6">

        {/* Welcome banner */}
        <div className="hero-bg rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold">Good Evening, Ramesh! 👨‍🌾</h1>
              <p className="text-white/70 mt-1 text-sm">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl text-sm">
                  <Sun className="w-4 h-4 text-kd-amber-400" />
                  {WEATHER_DATA.current.temp}°C • {WEATHER_DATA.current.condition}
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl text-sm">
                  <Bell className="w-4 h-4 text-red-300" />
                  3 new orders today
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 text-center">
              <p className="text-white/60 text-xs">Wallet Balance</p>
              <p className="text-3xl font-bold font-mono mt-1">₹14,820</p>
              <button className="mt-2 px-4 py-1.5 bg-kd-amber-500 text-kd-earth text-xs font-bold rounded-xl hover:bg-kd-amber-400 transition-colors">
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARDS.map(card => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="card p-5">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${card.text}`} />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-bold ${card.up ? 'text-kd-green-700' : 'text-red-500'}`}>
                    {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {card.change}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold text-kd-earth">{card.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{card.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Revenue chart */}
          <div className="lg:col-span-2 card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-kd-earth">Monthly Revenue</h3>
                <p className="text-xs text-gray-500 mt-0.5">Total earnings by month</p>
              </div>
              <div className="flex gap-1">
                {['7d', '30d', '3m', '6m', '1y'].map(p => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      period === p ? 'bg-kd-green-700 text-white' : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={FARMER_ANALYTICS.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e8f5e9', fontSize: 12 }}
                />
                <Bar dataKey="revenue" fill="#2F5233" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sales by crop (pie) */}
          <div className="card p-5">
            <h3 className="font-bold text-kd-earth mb-1">Sales by Crop</h3>
            <p className="text-xs text-gray-500 mb-4">Revenue distribution</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={FARMER_ANALYTICS.salesByCrop}
                  cx="50%" cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="value"
                  nameKey="crop"
                  paddingAngle={3}
                >
                  {FARMER_ANALYTICS.salesByCrop.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, n, props) => [`${v}%`, props.payload.crop]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {FARMER_ANALYTICS.salesByCrop.map((s, i) => (
                <div key={s.crop} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                    <span className="text-gray-600">{s.crop}</span>
                  </div>
                  <span className="font-semibold text-kd-earth">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent orders */}
          <div className="lg:col-span-2 card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-kd-earth">Recent Orders</h3>
              <a href="/farmer/orders" className="text-xs text-kd-green-700 font-semibold hover:underline">View all</a>
            </div>
            <div className="space-y-3">
              {FARMER_ORDERS.slice(0, 4).map(order => (
                <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-kd-paper transition-colors">
                  <img src={order.buyer.avatar} alt={order.buyer.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-kd-earth truncate">{order.buyer.name}</p>
                    <p className="text-xs text-gray-500">{order.items.map(i => `${i.qty}${i.unit} ${i.product}`).join(', ')}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono font-bold text-kd-earth text-sm">₹{order.total.toLocaleString('en-IN')}</p>
                    <span className={`status-${order.status} text-[10px]`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-kd-green-700 to-kd-amber-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-kd-earth text-sm">AI Assistant</h3>
                <p className="text-[10px] text-gray-400">Powered by Kisan AI</p>
              </div>
            </div>
            <div className="space-y-3">
              {AI_INSIGHTS.slice(0, 3).map(insight => (
                <div key={insight.id} className="ai-card rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-kd-amber-500 mt-1.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-kd-earth">{insight.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{insight.detail}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1 bg-gray-100 rounded-full">
                          <div className="h-full bg-kd-amber-500 rounded-full" style={{ width: `${insight.confidence}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-400">{insight.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full text-xs text-kd-green-700 font-semibold py-2 hover:bg-kd-green-100 rounded-xl transition-colors">
                Ask AI Assistant →
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Weather */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Cloud className="w-5 h-5 text-kd-blue-700" />
              <h3 className="font-bold text-kd-earth">Weather Forecast</h3>
            </div>
            {/* Current */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-kd-earth">{WEATHER_DATA.current.temp}°C</p>
                <p className="text-sm text-gray-500">{WEATHER_DATA.current.condition}</p>
                <p className="text-xs text-gray-400 mt-0.5">📍 {WEATHER_DATA.current.location}</p>
              </div>
              <span className="text-5xl">{WEATHER_DATA.current.icon}</span>
            </div>
            {/* Forecast */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {WEATHER_DATA.forecast.map(d => (
                <div key={d.day} className="flex flex-col items-center gap-1 flex-shrink-0 p-2 rounded-xl hover:bg-kd-paper transition-colors">
                  <span className="text-[10px] text-gray-400 font-medium">{d.day}</span>
                  <span className="text-lg">{d.condition}</span>
                  <span className="text-[10px] font-bold text-kd-earth">{d.high}°</span>
                  <span className="text-[10px] text-gray-400">{d.low}°</span>
                  {d.rain > 40 && <span className="text-[9px] text-blue-500">{d.rain}%</span>}
                </div>
              ))}
            </div>

            {/* Advisory */}
            <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 flex gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-700">{WEATHER_DATA.advisory.title}</p>
                <p className="text-[11px] text-amber-600 mt-0.5 leading-relaxed">{WEATHER_DATA.advisory.message}</p>
              </div>
            </div>
          </div>

          {/* Govt schemes */}
          <div className="lg:col-span-2 card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-kd-earth">Government Schemes</h3>
              <span className="badge-green text-[10px]">3 eligible</span>
            </div>
            <div className="space-y-3">
              {GOVERNMENT_SCHEMES.slice(0, 3).map(scheme => (
                <div key={scheme.id} className={`flex items-start gap-3 p-3 rounded-xl border ${scheme.eligible ? 'border-kd-green-200 bg-kd-green-100/30' : 'border-gray-200 bg-gray-50'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${scheme.eligible ? 'bg-kd-green-700 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {scheme.eligible ? '✓' : '○'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-kd-earth">{scheme.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{scheme.description}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="badge-amber text-[10px]">{scheme.amount}</span>
                      {scheme.deadline && <span className="text-[10px] text-gray-400">Deadline: {scheme.deadline}</span>}
                    </div>
                  </div>
                  <button className="text-xs text-kd-green-700 font-semibold hover:underline flex-shrink-0">Apply →</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Add New Listing', icon: Plus, to: '/farmer/products', color: 'btn-primary' },
            { label: 'View All Orders', icon: ShoppingBag, to: '/farmer/orders', color: 'btn-outline' },
            { label: 'Withdraw Money', icon: IndianRupee, to: '/farmer/wallet', color: 'btn-outline' },
            { label: 'View Analytics', icon: BarChart2, to: '/farmer/analytics', color: 'btn-outline' },
          ].map(action => {
            const Icon = action.icon;
            return (
              <a key={action.label} href={action.to} className={`${action.color} justify-center`}>
                <Icon className="w-4 h-4" />
                <span className="text-xs">{action.label}</span>
              </a>
            );
          })}
        </div>

      </div>
    </DashboardLayout>
  );
}
