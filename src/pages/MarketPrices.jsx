import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, ArrowUpDown, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Toast from '../components/ui/Toast';
import { MANDI_PRICES, PRODUCTS } from '../data/mockData';
import clsx from 'clsx';

const MARKETS = ['All India', 'Azadpur, Delhi', 'Lasalgaon, MH', 'Karnal, HR', 'Guntur, AP', 'Rajkot, GJ'];

export default function MarketPrices() {
  const [search, setSearch] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('All India');
  const [selectedCrop, setSelectedCrop] = useState(MANDI_PRICES[0]);
  const [sortBy, setSortBy] = useState('crop');

  const filtered = MANDI_PRICES
    .filter(m => m.crop.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'change') return b.change - a.change;
      return a.crop.localeCompare(b.crop);
    });

  // Generate chart data for selected crop
  const chartData = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const noise = (Math.random() - 0.5) * 0.15 * selectedCrop.price;
    return {
      date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      price: Math.round(Math.max(selectedCrop.minPrice, Math.min(selectedCrop.maxPrice, selectedCrop.price + noise)) * 10) / 10,
    };
  });
  chartData[chartData.length - 1].price = selectedCrop.price;

  return (
    <>
      <Navbar />
      <Toast />
      <main className="min-h-screen bg-kd-paper">

        {/* Header */}
        <div className="hero-bg py-12">
          <div className="container-kd text-white text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-kd-amber-400 text-sm font-semibold mb-4 border border-white/20">
              📊 Live Market Data
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Mandi Price Dashboard</h1>
            <p className="text-white/70 text-lg">
              Real-time agricultural commodity prices from major mandis across India.
              Updated every 30 minutes.
            </p>
          </div>
        </div>

        <div className="container-kd py-8">
          <div className="grid lg:grid-cols-3 gap-6">

            {/* ── Left: Price table ── */}
            <div className="lg:col-span-1">
              <div className="card overflow-hidden">
                {/* Search & filter */}
                <div className="p-4 border-b border-kd-green-100 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search crop..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="input pl-10 py-2"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 outline-none focus:border-kd-green-700"
                    >
                      <option value="crop">Alphabetical</option>
                      <option value="price-asc">Price ↑</option>
                      <option value="price-desc">Price ↓</option>
                      <option value="change">% Change</option>
                    </select>
                  </div>
                </div>

                {/* Table header */}
                <div className="grid grid-cols-4 px-4 py-2 bg-kd-green-100 text-xs font-bold text-kd-green-700 uppercase tracking-wide">
                  <span className="col-span-2">Crop</span>
                  <span className="text-right">Price</span>
                  <span className="text-right">Change</span>
                </div>

                {/* Rows */}
                <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
                  {filtered.map(m => (
                    <button
                      key={m.crop}
                      onClick={() => setSelectedCrop(m)}
                      className={clsx(
                        'w-full grid grid-cols-4 items-center px-4 py-3 text-left hover:bg-kd-green-100/50 transition-colors',
                        selectedCrop.crop === m.crop && 'bg-kd-green-100 border-r-2 border-kd-green-700'
                      )}
                    >
                      <span className="col-span-2 text-sm font-medium text-kd-earth">{m.crop}</span>
                      <span className="text-right font-mono text-sm font-semibold text-kd-earth">
                        ₹{m.price}<span className="text-[10px] text-gray-400">/{m.unit}</span>
                      </span>
                      <span className={clsx('text-right text-xs font-bold flex items-center justify-end gap-0.5',
                        m.change > 0 ? 'text-kd-green-700' : 'text-red-500')}>
                        {m.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(m.change)}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Chart & detail ── */}
            <div className="lg:col-span-2 space-y-4">

              {/* Selected crop detail */}
              <div className="card p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-kd-earth">{selectedCrop.crop}</h2>
                    <p className="text-sm text-gray-500">📍 {selectedCrop.market}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-kd-earth font-mono">
                      ₹{selectedCrop.price}
                      <span className="text-base text-gray-400 font-mono">/{selectedCrop.unit}</span>
                    </div>
                    <div className={clsx('flex items-center gap-1 justify-end text-sm font-bold mt-1',
                      selectedCrop.change > 0 ? 'text-kd-green-700' : 'text-red-500')}>
                      {selectedCrop.change > 0
                        ? <TrendingUp className="w-4 h-4" />
                        : <TrendingDown className="w-4 h-4" />}
                      {selectedCrop.change > 0 ? '+' : ''}{selectedCrop.change}% today
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { label: 'Min Price', value: `₹${selectedCrop.minPrice}` },
                    { label: 'Max Price', value: `₹${selectedCrop.maxPrice}` },
                    { label: 'Avg Price', value: `₹${Math.round((selectedCrop.minPrice + selectedCrop.maxPrice) / 2)}` },
                  ].map(s => (
                    <div key={s.label} className="bg-kd-paper rounded-xl p-3 text-center">
                      <div className="font-mono font-bold text-kd-earth">{s.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-kd-earth">30-Day Price Trend</h3>
                    <span className="badge-green text-[10px]">Live</span>
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2F5233" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#2F5233" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={4} />
                      <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${v}`} width={50} />
                      <Tooltip
                        formatter={(v) => [`₹${v}/${selectedCrop.unit}`, 'Price']}
                        contentStyle={{ borderRadius: 12, border: '1px solid #e8f5e9', fontSize: 12 }}
                      />
                      <Area type="monotone" dataKey="price" stroke="#2F5233" strokeWidth={2.5} fill="url(#priceGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Compare: Mandi vs Kisan Direct */}
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-kd-blue-700" />
                  <h3 className="font-bold text-kd-earth text-sm">Mandi Price vs. Kisan Direct</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 rounded-2xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Mandi (Wholesale)</p>
                    <p className="text-2xl font-bold text-orange-600 font-mono">₹{selectedCrop.price}</p>
                    <p className="text-xs text-gray-400 mt-1">+ Middleman markup: ~35%</p>
                    <p className="text-xs font-bold text-orange-700 mt-1">Retail: ~₹{Math.round(selectedCrop.price * 1.35)}</p>
                  </div>
                  <div className="bg-kd-green-100 rounded-2xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Kisan Direct Price</p>
                    <p className="text-2xl font-bold text-kd-green-700 font-mono">₹{Math.round(selectedCrop.price * 0.85)}</p>
                    <p className="text-xs text-gray-400 mt-1">Farmer gets 75%+</p>
                    <p className="text-xs font-bold text-kd-green-700 mt-1">You save: ~{Math.round((1 - 0.85 / 1.35) * 100)}%</p>
                  </div>
                </div>
              </div>

              {/* Available products */}
              <div className="card p-5">
                <h3 className="font-bold text-kd-earth mb-4 text-sm">Buy {selectedCrop.crop} on Kisan Direct</h3>
                <div className="space-y-2">
                  {PRODUCTS
                    .filter(p => p.name.toLowerCase().includes(selectedCrop.crop.toLowerCase()) || p.tags?.some(t => t.includes(selectedCrop.crop.toLowerCase())))
                    .slice(0, 2)
                    .map(p => (
                      <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-kd-paper hover:bg-kd-green-100/50 transition-colors cursor-pointer">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-kd-earth">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.farmer} • {p.farmerLocation}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-kd-green-700">₹{p.price}/{p.unit}</p>
                          <span className="badge-green text-[10px]">In Stock</span>
                        </div>
                      </div>
                    ))}
                  {PRODUCTS.filter(p => p.name.toLowerCase().includes(selectedCrop.crop.toLowerCase())).length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No direct listing for {selectedCrop.crop} right now. <a href="/browse" className="text-kd-green-700 font-semibold">Browse all →</a></p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
