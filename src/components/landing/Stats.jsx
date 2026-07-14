import { useEffect, useRef, useState } from 'react';
import { STATS } from '../../data/mockData';
import { Users, Building2, Package, TrendingUp, PiggyBank, Truck } from 'lucide-react';

const ICONS = [Users, Building2, Package, TrendingUp, PiggyBank, Truck];

function CountUp({ end, decimal = false, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(decimal ? Math.round(current * 10) / 10 : Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, decimal]);

  return (
    <span ref={ref}>
      {prefix}{decimal ? count.toFixed(1) : count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="section-sm bg-white">
      <div className="container-kd">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-kd-green-100 text-kd-green-700 text-sm font-semibold mb-4">
            📊 Platform Impact
          </div>
          <h2 className="section-title">Numbers That Tell the Story</h2>
          <p className="section-subtitle mx-auto">
            Every metric represents a real farmer who earned more, a family that ate fresher, and a supply chain that got fairer.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={stat.label}
                className="card p-5 text-center group hover:shadow-kd-lg hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-kd-green-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-kd-green-700 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-kd-green-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="stat-number">
                  <CountUp
                    end={stat.value}
                    decimal={stat.decimal}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>
                <div className="stat-label mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Impact banner */}
        <div className="mt-10 p-6 rounded-3xl bg-hero-gradient text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold">₹1,280 Crore+</h3>
            <p className="text-white/70 text-sm mt-1">Additional income generated for Indian farmers since 2022</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-xl font-bold text-kd-amber-400">92%</div>
              <div className="text-xs text-white/60 mt-1">Farmer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-kd-amber-400">4.8★</div>
              <div className="text-xs text-white/60 mt-1">Avg App Rating</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-kd-amber-400">24hr</div>
              <div className="text-xs text-white/60 mt-1">Payment Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
