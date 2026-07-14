import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, TrendingUp } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockData';

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent(i => (i + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section className="section bg-white">
      <div className="container-kd">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-kd-green-100 text-kd-green-700 text-sm font-semibold mb-4">
            ⭐ Success Stories
          </div>
          <h2 className="section-title">Real People. Real Impact.</h2>
          <p className="section-subtitle mx-auto">
            From farmers who tripled their income to buyers who now eat fresher — hear from our community.
          </p>
        </div>

        {/* Main featured testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-kd-green-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-kd-amber-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* Avatar & info */}
                <div className="flex-shrink-0 text-center">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-kd ring-4 ring-kd-green-100 mx-auto">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-3">
                    <p className="font-bold text-kd-earth">{t.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                    <p className="text-xs text-gray-400 mt-0.5">📍 {t.location}</p>
                    <span className={`mt-2 inline-block badge ${t.type === 'farmer' ? 'badge-green' : 'badge-amber'}`}>
                      {t.type === 'farmer' ? '👨‍🌾 Farmer' : '🛒 Buyer'}
                    </span>
                  </div>

                  {/* Key metric */}
                  {(t.income_increase || t.monthly_savings) && (
                    <div className="mt-4 p-3 bg-kd-green-100 rounded-xl">
                      <TrendingUp className="w-5 h-5 text-kd-green-700 mx-auto mb-1" />
                      <div className="text-lg font-bold text-kd-green-700">
                        {t.income_increase || t.monthly_savings}
                      </div>
                      <div className="text-[10px] text-kd-green-600 font-medium">
                        {t.income_increase ? 'Income increase' : 'Monthly savings'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quote */}
                <div className="flex-1">
                  <Quote className="w-10 h-10 text-kd-green-200 mb-4" />
                  <blockquote className="text-gray-600 text-base md:text-lg leading-relaxed font-light">
                    "{t.content}"
                  </blockquote>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-kd-amber-500 fill-current" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">5.0 / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-kd-green-100">
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        i === current ? 'bg-kd-green-700 w-6' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-xl border border-kd-green-200 flex items-center justify-center text-kd-green-700 hover:bg-kd-green-100 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-xl bg-kd-green-700 text-white flex items-center justify-center hover:bg-kd-green-900 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-8 max-w-4xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setCurrent(i)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                i === current ? 'bg-kd-green-100 ring-2 ring-kd-green-700' : 'hover:bg-gray-50'
              }`}
            >
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
              <p className="text-[10px] text-center text-gray-600 line-clamp-1">{t.name.split(' ')[0]}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
