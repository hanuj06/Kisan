import { UserCheck, PlusCircle, ShoppingBag, Banknote, Search, ShoppingCart, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const FARMER_STEPS = [
  {
    step: '01',
    icon: UserCheck,
    title: 'Register & Verify',
    desc: 'Sign up with mobile OTP. Complete KYC with Aadhaar and land documents. Verified in 24 hours.',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
  },
  {
    step: '02',
    icon: PlusCircle,
    title: 'List Your Produce',
    desc: 'Upload photos, set your price (AI suggests fair rates), add harvest details. Done in 5 minutes.',
    color: 'from-kd-green-700 to-kd-green-500',
    bg: 'bg-kd-green-100',
    text: 'text-kd-green-700',
  },
  {
    step: '03',
    icon: ShoppingBag,
    title: 'Receive Orders',
    desc: 'Get instant notifications when buyers order. Confirm, pack, schedule pickup — all from your phone.',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
  },
  {
    step: '04',
    icon: Banknote,
    title: 'Get Paid Instantly',
    desc: 'Payment hits your wallet as soon as order is confirmed. Transfer to bank anytime, zero fees.',
    color: 'from-kd-amber-500 to-kd-amber-400',
    bg: 'bg-kd-amber-100',
    text: 'text-kd-amber-600',
  },
];

const BUYER_STEPS = [
  { step: '01', icon: Search,       title: 'Search & Discover', desc: 'Find fresh produce from verified farmers in your area using smart search and AI recommendations.' },
  { step: '02', icon: ShoppingCart, title: 'Place Your Order',  desc: 'Add to cart, checkout in seconds. UPI, card, net banking or cash on delivery — your choice.' },
  { step: '03', icon: MapPin,       title: 'Track in Real-Time', desc: 'Live tracking from farm to doorstep. SMS and push notifications at every step.' },
  { step: '04', icon: Star,         title: 'Enjoy & Rate',       desc: 'Receive farm-fresh produce. Rate your experience to help other buyers and support farmers.' },
];

export default function HowItWorks() {
  return (
    <section className="section bg-white">
      <div className="container-kd">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-kd-blue-600/10 text-kd-blue-700 text-sm font-semibold mb-4">
            ⚡ How It Works
          </div>
          <h2 className="section-title">Simple. Fast. Fair.</h2>
          <p className="section-subtitle mx-auto">
            Whether you're a farmer or a buyer, getting started takes less than 5 minutes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* For Farmers */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-kd-green-700 flex items-center justify-center text-white text-lg">👨‍🌾</div>
              <div>
                <h3 className="text-xl font-bold text-kd-earth">For Farmers</h3>
                <p className="text-sm text-gray-500">Start selling in 4 steps</p>
              </div>
            </div>

            <div className="space-y-4">
              {FARMER_STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.step} className="flex gap-4 items-start group">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-kd-sm flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {i < FARMER_STEPS.length - 1 && (
                        <div className="w-px h-full min-h-[32px] bg-gradient-to-b from-gray-200 to-transparent mt-2" />
                      )}
                    </div>
                    <div className={`flex-1 p-4 rounded-2xl ${s.bg} mb-2`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold ${s.text}`}>STEP {s.step}</span>
                      </div>
                      <h4 className="font-bold text-kd-earth mb-1">{s.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link to="/login?mode=register&role=farmer" className="btn-primary mt-6 w-full justify-center">
              Register as Farmer — Free Forever
            </Link>
          </div>

          {/* For Buyers */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-kd-amber-500 flex items-center justify-center text-white text-lg">🛒</div>
              <div>
                <h3 className="text-xl font-bold text-kd-earth">For Buyers</h3>
                <p className="text-sm text-gray-500">Order fresh produce in 4 steps</p>
              </div>
            </div>

            <div className="space-y-4">
              {BUYER_STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.step} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-kd-earth flex items-center justify-center shadow-kd-sm flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {i < BUYER_STEPS.length - 1 && (
                        <div className="w-px h-full min-h-[32px] bg-gradient-to-b from-gray-200 to-transparent mt-2" />
                      )}
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-gray-50 mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-400">STEP {s.step}</span>
                      </div>
                      <h4 className="font-bold text-kd-earth mb-1">{s.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link to="/browse" className="btn-secondary mt-6 w-full justify-center">
              Browse Fresh Produce Now
            </Link>
          </div>
        </div>

        {/* Who is it for */}
        <div className="mt-16 p-8 rounded-3xl bg-kd-paper border border-kd-green-100">
          <h3 className="text-center font-bold text-kd-earth text-xl mb-6">Who Uses Kisan Direct?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { emoji: '🏠', label: 'Families' },
              { emoji: '🍽️', label: 'Restaurants' },
              { emoji: '🏨', label: 'Hotels' },
              { emoji: '🏪', label: 'Retailers' },
              { emoji: '🏥', label: 'Hospitals' },
              { emoji: '🏫', label: 'Schools' },
              { emoji: '🏭', label: 'Food Industry' },
              { emoji: '🤲', label: 'NGOs' },
              { emoji: '🏛️', label: 'Government' },
              { emoji: '🏋️', label: 'Bulk Buyers' },
            ].map(u => (
              <div key={u.label} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white transition-colors cursor-default">
                <span className="text-3xl">{u.emoji}</span>
                <span className="text-xs font-medium text-gray-600">{u.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
