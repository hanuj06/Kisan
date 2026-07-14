import { ArrowRight, TrendingUp } from 'lucide-react';
import { MANDI_PRICES } from '../../data/mockData';

export default function MarketTicker() {
  const doubled = [...MANDI_PRICES, ...MANDI_PRICES];

  return (
    <div className="bg-kd-earth border-y border-kd-green-900 overflow-hidden">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex items-center gap-2 px-5 py-3 bg-kd-green-700 flex-shrink-0 z-10">
          <TrendingUp className="w-4 h-4 text-kd-amber-400" />
          <span className="text-white text-xs font-bold uppercase tracking-wide whitespace-nowrap">
            Live Mandi Prices
          </span>
        </div>

        {/* Ticker */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex animate-ticker whitespace-nowrap gap-0">
            {doubled.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-3 border-r border-white/10 flex-shrink-0">
                <span className="text-white/70 text-xs font-medium">{item.crop}</span>
                <span className="font-mono font-bold text-white text-sm">
                  ₹{item.price}/{item.unit}
                </span>
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${item.change > 0 ? 'text-kd-green-400' : 'text-red-400'}`}>
                  {item.change > 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* View all */}
        <a
          href="/market-prices"
          className="flex items-center gap-1 px-4 py-3 bg-kd-amber-500 text-kd-earth text-xs font-bold hover:bg-kd-amber-400 transition-colors flex-shrink-0"
        >
          All Prices <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
