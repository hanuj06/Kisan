import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, ArrowRight, Sparkles, ShieldCheck, TrendingUp } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

const QUICK_SEARCHES = ['Organic Tomatoes', 'Basmati Rice', 'Fresh Garlic', 'Guntur Chilli', 'Alphonso Mango'];

const HERO_STATS = [
  { value: '48K+', label: 'Farmers' },
  { value: '680+', label: 'Cities' },
  { value: '38%',  label: 'Avg Savings' },
];

export default function Hero() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/browse?q=${encodeURIComponent(query.trim())}`);
    else navigate('/browse');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-bg">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-kd-green-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-kd-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-kd-green-900/40 rounded-full blur-2xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <div className="container-kd relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Content */}
          <div className="text-white space-y-8">

            {/* Announcement badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm animate-in">
              <Sparkles className="w-4 h-4 text-kd-amber-400" />
              <span className="text-white/90">Now in 680+ cities across India</span>
              <ArrowRight className="w-3 h-3 text-white/60" />
            </div>

            {/* Headline */}
            <div className="animate-in animate-in-delay-1">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
                From{' '}
                <span className="gradient-text">Farm</span>
                {' '}to{' '}
                <br className="hidden md:block" />
                <span className="gradient-text">Family</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/75 max-w-xl leading-relaxed">
                India's most trusted marketplace connecting
                <span className="text-kd-amber-400 font-semibold"> verified farmers </span>
                directly with consumers. No middlemen. Fresher produce. Fairer prices.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 animate-in animate-in-delay-2">
              {HERO_STATS.map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="animate-in animate-in-delay-3">
              <div className="relative flex items-center bg-white rounded-2xl shadow-kd-xl overflow-hidden">
                <Search className="absolute left-4 w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search tomatoes, rice, organic spices..."
                  className="flex-1 pl-12 pr-4 py-4 text-kd-earth placeholder-gray-400 text-sm outline-none bg-transparent"
                />
                <button
                  type="button"
                  className="p-4 text-gray-400 hover:text-kd-green-700 transition-colors border-r border-gray-100"
                  title="Voice search"
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  className="m-1.5 px-5 py-3 bg-kd-green-700 hover:bg-kd-green-900 text-white rounded-xl font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  Search <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick search tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-white/50 text-xs mt-1">Popular:</span>
                {QUICK_SEARCHES.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setQuery(s); navigate(`/browse?q=${encodeURIComponent(s)}`); }}
                    className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs transition-all border border-white/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </form>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 animate-in animate-in-delay-4">
              <div className="flex items-center gap-2 text-white/70 text-xs">
                <ShieldCheck className="w-4 h-4 text-kd-green-400" />
                Farmer KYC Verified
              </div>
              <div className="flex items-center gap-2 text-white/70 text-xs">
                <TrendingUp className="w-4 h-4 text-kd-amber-400" />
                AI-Powered Pricing
              </div>
            </div>
          </div>

          {/* Right: Visual illustration */}
          <div className="hidden lg:flex items-center justify-center animate-in animate-in-delay-2">
            <div className="relative w-full max-w-md">
              {/* Chain breaking animation */}
              <ChainBreaker />
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-14 animate-in animate-in-delay-5">
          <p className="text-white/50 text-xs mb-4 uppercase tracking-widest">Browse by Category</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => navigate(`/browse?category=${cat.id}`)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white/80 hover:text-white text-sm font-medium transition-all duration-200"
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="text-white/40 text-xs">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 36.7C1200 33.3 1320 26.7 1380 23.3L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#F6F2E7"/>
        </svg>
      </div>
    </section>
  );
}

// ── Chain Breaker Animation ──
function ChainBreaker() {
  const [broken, setBroken] = useState(false);

  const chain = [
    { label: 'Farmer',        emoji: '👨‍🌾', color: '#2F5233', note: 'Gets ₹15' },
    { label: 'Local Trader',  emoji: '🏪', color: '#5a6e5f', note: '+₹8' },
    { label: 'Agent',         emoji: '🤝', color: '#7a8e7f', note: '+₹10' },
    { label: 'Wholesaler',    emoji: '🏭', color: '#9aae9f', note: '+₹12' },
    { label: 'Retailer',      emoji: '🛒', color: '#baccbf', note: '+₹18' },
    { label: 'Customer',      emoji: '🏠', color: '#2F5233', note: 'Pays ₹63' },
  ];

  return (
    <div className="text-center">
      {/* Before state — middleman chain */}
      <div
        className={`transition-all duration-700 ${broken ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100'}`}
        onClick={() => setBroken(true)}
      >
        <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 cursor-pointer hover:bg-white/15 transition-all">
          <p className="text-white/60 text-xs mb-4 uppercase tracking-wider">Traditional Supply Chain</p>
          {chain.map((item, i) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="flex items-center gap-3 py-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                  {item.emoji}
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-medium">{item.label}</p>
                  <p className={`text-xs ${i === 0 ? 'text-kd-green-400' : i === chain.length - 1 ? 'text-red-400' : 'text-white/50'}`}>
                    {item.note}
                  </p>
                </div>
              </div>
              {i < chain.length - 1 && (
                <div className="w-px h-4 bg-red-400/50" />
              )}
            </div>
          ))}
          <p className="mt-4 text-kd-amber-400 text-xs font-semibold animate-bounce">👆 Tap to break the chain!</p>
        </div>
      </div>

      {/* After state — direct connection */}
      {broken && (
        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-kd-amber-500/30 animate-scale-in">
          <p className="text-kd-amber-400 text-xs mb-6 uppercase tracking-wider font-bold">✨ Kisan Direct Way</p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 p-4 bg-kd-green-700/30 rounded-2xl w-full">
              <div className="text-3xl">👨‍🌾</div>
              <div className="text-left">
                <p className="text-white font-bold">Farmer</p>
                <p className="text-kd-green-400 text-sm font-semibold">Gets ₹28 (+87% more!)</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-kd-amber-400">
              <div className="flex-1 h-px bg-kd-amber-500/30" />
              <span className="text-xs font-bold px-2">Direct</span>
              <div className="flex-1 h-px bg-kd-amber-500/30" />
            </div>

            <div className="flex items-center gap-3 p-4 bg-kd-amber-500/10 rounded-2xl w-full">
              <div className="text-3xl">🏠</div>
              <div className="text-left">
                <p className="text-white font-bold">Customer</p>
                <p className="text-kd-amber-400 text-sm font-semibold">Pays ₹32 (saves 49%!)</p>
              </div>
            </div>
          </div>
          <p className="mt-5 text-white/60 text-xs">0 middlemen • 100% transparent • Fair for all</p>
        </div>
      )}
    </div>
  );
}
