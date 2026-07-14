import Hero from '../components/landing/Hero';
import MarketTicker from '../components/landing/MarketTicker';
import Stats from '../components/landing/Stats';
import FeaturedProducts from '../components/landing/FeaturedProducts';
import HowItWorks from '../components/landing/HowItWorks';
import TestimonialCarousel from '../components/landing/TestimonialCarousel';
import AppDownload from '../components/landing/AppDownload';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import Toast from '../components/ui/Toast';
import { ShieldCheck, Zap, Leaf, HeartHandshake } from 'lucide-react';

const WHY_US = [
  {
    icon: ShieldCheck,
    title: 'Verified Farmers Only',
    desc: 'Every farmer on our platform undergoes KYC verification with Aadhaar, land records, and farm location validation. Zero fake sellers.',
    color: 'text-kd-green-700',
    bg: 'bg-kd-green-100',
  },
  {
    icon: Zap,
    title: 'AI-Powered Fair Pricing',
    desc: "Our AI analyzes real-time mandi data, demand patterns, and seasonal trends to suggest fair prices — ensuring both farmers and buyers get the best deal.",
    color: 'text-kd-blue-700',
    bg: 'bg-blue-50',
  },
  {
    icon: Leaf,
    title: 'Farm-to-Doorstep Fresh',
    desc: 'Direct sourcing means produce travels 2-3 fewer stops. Average freshness is 3-5 days better than supermarket alternatives.',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
  },
  {
    icon: HeartHandshake,
    title: 'Community & Trust',
    desc: 'Build lasting relationships with your favorite farmers. Subscription options for regular buyers. Reviews and ratings ensure accountability.',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
  },
];

export default function Landing() {
  return (
    <>
      <Navbar />
      <Toast />

      {/* Hero */}
      <Hero />

      {/* Market Price Ticker */}
      <MarketTicker />

      {/* Stats */}
      <Stats />

      {/* Why Choose Us */}
      <section className="section bg-kd-cream">
        <div className="container-kd">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-kd-green-100 text-kd-green-700 text-sm font-semibold mb-4">
              💡 Why Kisan Direct
            </div>
            <h2 className="section-title">Built for Both Sides of the Chain</h2>
            <p className="section-subtitle mx-auto">
              We're not just an app — we're a movement to make Indian agriculture fairer, more transparent, and more profitable for everyone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="card p-6 group hover:shadow-kd-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="font-bold text-kd-earth mb-2 text-base">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="mt-12 card overflow-hidden">
            <div className="grid grid-cols-3 bg-kd-green-700 text-white">
              <div className="p-4 text-sm font-semibold">Feature</div>
              <div className="p-4 text-sm font-semibold text-center border-l border-white/10">Traditional Market</div>
              <div className="p-4 text-sm font-semibold text-center border-l border-white/10 text-kd-amber-400">Kisan Direct ✓</div>
            </div>
            {[
              { feature: 'Farmer income share', old: '20-30%', new: '75-85%' },
              { feature: 'Produce freshness', old: '5-8 days old', new: '0-2 days old' },
              { feature: 'Price transparency', old: '❌ None', new: '✅ Full' },
              { feature: 'Middlemen involved', old: '4-6 layers', new: '0 layers' },
              { feature: 'Buyer savings vs retail', old: '0%', new: '25-45%' },
              { feature: 'Direct farmer contact', old: '❌ Impossible', new: '✅ Always' },
            ].map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="p-4 text-sm font-medium text-kd-earth">{row.feature}</div>
                <div className="p-4 text-sm text-center text-gray-500 border-l border-kd-green-100">{row.old}</div>
                <div className="p-4 text-sm text-center font-semibold text-kd-green-700 border-l border-kd-green-100">{row.new}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* App Download */}
      <AppDownload />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </>
  );
}
