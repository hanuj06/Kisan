import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/mockData';
import clsx from 'clsx';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section bg-kd-cream">
      <div className="container-kd">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-kd-amber-100 text-kd-amber-600 text-sm font-semibold mb-4">
            💬 FAQ
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle mx-auto">
            Everything you need to know about Kisan Direct. Can't find what you're looking for?{' '}
            <a href="mailto:support@kisandirect.in" className="text-kd-green-700 font-semibold hover:underline">
              Contact our support team.
            </a>
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={clsx(
                'faq-item cursor-pointer',
                open === i ? 'shadow-kd border-kd-green-700' : 'border-kd-green-100'
              )}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                aria-expanded={open === i}
              >
                <span className={clsx(
                  'font-semibold text-sm leading-snug transition-colors',
                  open === i ? 'text-kd-green-700' : 'text-kd-earth'
                )}>
                  {item.q}
                </span>
                <ChevronDown
                  className={clsx(
                    'w-5 h-5 flex-shrink-0 transition-transform duration-300',
                    open === i ? 'rotate-180 text-kd-green-700' : 'text-gray-400'
                  )}
                />
              </button>

              {open === i && (
                <div className="px-5 pb-5 animate-slide-down">
                  <div className="divider mb-4" />
                  <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA after FAQ */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:support@kisandirect.in" className="btn-outline">
              📧 Email Support
            </a>
            <a href="tel:+918001234567" className="btn-primary">
              📞 Call Us: 800-123-4567
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
