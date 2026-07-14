import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, Users, Repeat, Star } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FARMER_ANALYTICS, CHART_COLORS } from '../../data/mockData';

const METRICS = [
  { label: 'Total Revenue', value: '₹2,84,500', change: '+18.2%', up: true },
  { label: 'Total Customers', value: '342', change: '+24 this month', up: true },
  { label: 'Repeat Buyers', value: '68%', change: '+5%', up: true },
  { label: 'Avg Order Value', value: '₹2,282', change: '+8.1%', up: true },
];

// Customer growth data
const CUSTOMER_GROWTH = [
  { month: 'Jan', new: 28, returning: 44 },
  { month: 'Feb', new: 35, returning: 51 },
  { month: 'Mar', new: 30, returning: 48 },
  { month: 'Apr', new: 42, returning: 58 },
  { month: 'May', new: 38, returning: 55 },
  { month: 'Jun', new: 52, returning: 72 },
  { month: 'Jul', new: 60, returning: 82 },
];

export default function FarmerAnalytics() {
  return (
    <DashboardLayout type="farmer">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-kd-earth">Analytics</h2>
          <p className="text-sm text-gray-500 mt-0.5">Performance overview for your farm</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map(m => (
            <div key={m.label} className="card p-5">
              <p className="text-xs text-gray-500 font-medium">{m.label}</p>
              <p className="text-2xl font-bold text-kd-earth mt-1">{m.value}</p>
              <p className={`text-xs font-semibold mt-1 ${m.up ? 'text-kd-green-700' : 'text-red-500'}`}>
                {m.up ? '↑' : '↓'} {m.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue trend */}
          <div className="card p-5">
            <h3 className="font-bold text-kd-earth mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={FARMER_ANALYTICS.monthlyRevenue}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F5233" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2F5233" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${v / 1000}k`} />
                <Tooltip formatter={v => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="#2F5233" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Customer growth */}
          <div className="card p-5">
            <h3 className="font-bold text-kd-earth mb-4">Customer Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={CUSTOMER_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="new" name="New Buyers" fill="#3B5B7A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="returning" name="Repeat Buyers" fill="#2F5233" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sales by crop */}
          <div className="card p-5">
            <h3 className="font-bold text-kd-earth mb-4">Revenue by Crop</h3>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={FARMER_ANALYTICS.salesByCrop} cx="50%" cy="50%" outerRadius={80} dataKey="value" nameKey="crop" paddingAngle={3}>
                    {FARMER_ANALYTICS.salesByCrop.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v, n, props) => [`₹${props.payload.revenue.toLocaleString()}`, props.payload.crop]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {FARMER_ANALYTICS.salesByCrop.map((s, i) => (
                  <div key={s.crop} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i] }} />
                      <span className="text-gray-600">{s.crop}</span>
                    </div>
                    <span className="font-semibold text-kd-earth">₹{(s.revenue / 1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent transactions */}
          <div className="card p-5">
            <h3 className="font-bold text-kd-earth mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {FARMER_ANALYTICS.recentTransactions.map(txn => (
                <div key={txn.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-kd-green-100 flex items-center justify-center text-kd-green-700 font-bold text-xs flex-shrink-0">
                    {txn.buyer[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-kd-earth truncate">{txn.buyer}</p>
                    <p className="text-xs text-gray-500">{txn.item} • {txn.date}</p>
                  </div>
                  <span className="font-mono font-bold text-kd-green-700 text-sm">+₹{txn.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
