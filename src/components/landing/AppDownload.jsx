import { Smartphone, Star, Download, Zap } from 'lucide-react';

export default function AppDownload() {
  return (
    <section className="section bg-hero-gradient overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-kd-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-kd relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-kd-amber-400 text-sm font-semibold mb-6 border border-white/20">
              📱 Mobile App
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Kisan Direct
              <br />
              <span className="gradient-text">In Your Pocket</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-md leading-relaxed">
              Manage your farm, browse fresh produce, and track orders — anytime, anywhere.
              Available on iOS and Android.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Zap,        text: 'Instant order notifications for farmers' },
                { icon: Star,       text: '4.8★ rating on App Store & Play Store' },
                { icon: Smartphone, text: 'Works offline for areas with poor connectivity' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-kd-amber-400" />
                  </div>
                  <span className="text-white/80 text-sm">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-3 px-5 py-3.5 bg-white text-kd-earth rounded-2xl font-semibold hover:bg-gray-100 transition-colors shadow-kd-lg">
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <div className="text-[10px] text-gray-500 leading-none">Download on the</div>
                  <div className="text-sm font-bold leading-tight">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 px-5 py-3.5 bg-white text-kd-earth rounded-2xl font-semibold hover:bg-gray-100 transition-colors shadow-kd-lg">
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <div className="text-[10px] text-gray-500 leading-none">Get it on</div>
                  <div className="text-sm font-bold leading-tight">Google Play</div>
                </div>
              </button>
            </div>

            <p className="text-white/40 text-xs mt-4">* App coming soon. Web version available now.</p>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center items-center">
            <div className="relative w-72 h-[500px]">
              {/* Phone frame */}
              <div className="w-full h-full bg-kd-earth/80 rounded-[3rem] border-4 border-white/20 shadow-kd-xl overflow-hidden backdrop-blur">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-4 pb-2">
                  <span className="text-white text-xs font-medium">9:41</span>
                  <div className="w-24 h-1 bg-white/20 rounded-full" />
                  <div className="flex gap-1">
                    <div className="w-3 h-2 bg-white/40 rounded-sm" />
                    <div className="w-1.5 h-2 bg-white/60 rounded-sm" />
                  </div>
                </div>

                {/* App content preview */}
                <div className="px-4 pb-6 h-full">
                  {/* Mini header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-lg bg-kd-green-700 flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">KD</span>
                    </div>
                    <span className="text-white text-xs font-bold">Kisan Direct</span>
                  </div>

                  {/* Search bar */}
                  <div className="bg-white/10 rounded-2xl px-4 py-2.5 mb-4 flex items-center gap-2">
                    <span className="text-white/40 text-xs">Search produce...</span>
                  </div>

                  {/* Category chips */}
                  <div className="flex gap-2 mb-4 overflow-hidden">
                    {['🥦', '🍎', '🌾', '🌶️'].map(e => (
                      <div key={e} className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                        {e}
                      </div>
                    ))}
                  </div>

                  {/* Product cards */}
                  {[
                    { name: 'Organic Tomatoes', price: '₹28/kg', img: '🍅', rating: '4.8' },
                    { name: 'Fresh Garlic',      price: '₹85/kg', img: '🧄', rating: '4.9' },
                  ].map(p => (
                    <div key={p.name} className="bg-white/10 rounded-2xl p-3 mb-3 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                        {p.img}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-xs font-semibold">{p.name}</p>
                        <p className="text-kd-amber-400 text-sm font-bold">{p.price}</p>
                      </div>
                      <div className="text-xs text-white/60">⭐ {p.rating}</div>
                    </div>
                  ))}

                  {/* Bottom nav */}
                  <div className="absolute bottom-6 left-4 right-4 bg-white/10 backdrop-blur rounded-2xl px-4 py-3 flex justify-around">
                    {['🏠', '🔍', '🛒', '👤'].map(e => (
                      <div key={e} className="text-xl">{e}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating notifications */}
              <div className="absolute -right-6 top-16 bg-white rounded-2xl shadow-kd-xl p-3 w-48 animate-float">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💰</span>
                  <div>
                    <p className="text-xs font-bold text-kd-earth">Payment received!</p>
                    <p className="text-[10px] text-kd-green-700">₹2,400 in wallet</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-8 bottom-24 bg-white rounded-2xl shadow-kd-xl p-3 w-44" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">📦</span>
                  <div>
                    <p className="text-xs font-bold text-kd-earth">Order confirmed</p>
                    <p className="text-[10px] text-gray-500">50kg Onions • Pune</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
