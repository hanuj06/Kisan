import { useState } from 'react';
import { Wallet as WalletIcon, ArrowDownLeft, ArrowUpRight, IndianRupee, CreditCard, Banknote, Clock } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FARMER_ANALYTICS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const WALLET_BALANCE = 14820;
const TOTAL_EARNED = 284500;
const PENDING = 8200;

export default function FarmerWallet() {
  const { showToast } = useApp();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawStep, setWithdrawStep] = useState(1);

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!withdrawAmount || parseInt(withdrawAmount) < 100) {
      showToast('Minimum withdrawal is ₹100', 'error');
      return;
    }
    if (parseInt(withdrawAmount) > WALLET_BALANCE) {
      showToast('Insufficient wallet balance', 'error');
      return;
    }
    showToast(`₹${withdrawAmount} withdrawal initiated! Will credit to your bank in 2-4 hours.`, 'success');
    setWithdrawAmount('');
    setWithdrawStep(1);
  };

  return (
    <DashboardLayout type="farmer">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-kd-earth">Wallet & Payments</h2>

        {/* Balance cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="hero-bg rounded-2xl p-5 text-white col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <WalletIcon className="w-5 h-5 text-kd-amber-400" />
              <p className="text-sm text-white/70">Available Balance</p>
            </div>
            <p className="text-4xl font-bold font-mono">₹{WALLET_BALANCE.toLocaleString('en-IN')}</p>
            <p className="text-xs text-white/50 mt-1">Withdrawable anytime</p>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <ArrowDownLeft className="w-5 h-5 text-kd-green-700" />
              <p className="text-sm text-gray-500">Total Earned</p>
            </div>
            <p className="text-2xl font-bold text-kd-earth font-mono">₹{TOTAL_EARNED.toLocaleString('en-IN')}</p>
            <p className="text-xs text-kd-green-700 mt-1">↑ 18.2% this month</p>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-kd-amber-500" />
              <p className="text-sm text-gray-500">Pending Release</p>
            </div>
            <p className="text-2xl font-bold text-kd-earth font-mono">₹{PENDING.toLocaleString('en-IN')}</p>
            <p className="text-xs text-kd-amber-600 mt-1">Released after delivery</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Withdraw form */}
          <div className="card p-6">
            <h3 className="font-bold text-kd-earth mb-4 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-kd-green-700" /> Withdraw Money
            </h3>

            <form onSubmit={handleWithdraw} className="space-y-4">
              {/* Quick amounts */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Quick select</p>
                <div className="flex gap-2 flex-wrap">
                  {[500, 1000, 2000, 5000, WALLET_BALANCE].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setWithdrawAmount(amt.toString())}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                        withdrawAmount === amt.toString()
                          ? 'bg-kd-green-700 text-white border-kd-green-700'
                          : 'border-gray-200 text-gray-600 hover:border-kd-green-700 hover:text-kd-green-700'
                      }`}
                    >
                      {amt === WALLET_BALANCE ? 'Full amount' : `₹${amt.toLocaleString()}`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="input-label">Amount (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-gray-400">₹</span>
                  <input
                    type="number"
                    className="input pl-8"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    min={100}
                    max={WALLET_BALANCE}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Min: ₹100 · Available: ₹{WALLET_BALANCE.toLocaleString()}</p>
              </div>

              {/* Bank account */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-kd-paper border border-kd-green-100">
                <Banknote className="w-5 h-5 text-kd-green-700 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-kd-earth">SBI Savings — ****4521</p>
                  <p className="text-xs text-gray-500">Ramesh Patel · Anand Branch</p>
                </div>
                <span className="ml-auto badge-green text-[10px]">Primary</span>
              </div>

              <button type="submit" className="btn-primary w-full">
                <ArrowUpRight className="w-4 h-4" /> Withdraw to Bank
              </button>
              <p className="text-xs text-center text-gray-400">Credits within 2-4 hours · No fees</p>
            </form>
          </div>

          {/* Transaction history */}
          <div className="card p-6">
            <h3 className="font-bold text-kd-earth mb-4">Transaction History</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {[
                ...FARMER_ANALYTICS.recentTransactions,
                { id: 'TXN006', buyer: 'Withdrawal to SBI', item: 'Bank transfer', amount: -5000, date: '2026-07-08', status: 'debited' },
                { id: 'TXN007', buyer: 'City Market Store', item: 'Tomatoes 50kg + Onions 30kg', amount: 2060, date: '2026-07-07', status: 'credited' },
                { id: 'TXN008', buyer: 'Withdrawal to SBI', item: 'Bank transfer', amount: -3000, date: '2026-07-05', status: 'debited' },
              ].map(txn => (
                <div key={txn.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-kd-paper transition-colors">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    txn.status === 'credited' ? 'bg-kd-green-100' : 'bg-red-50'
                  }`}>
                    {txn.status === 'credited'
                      ? <ArrowDownLeft className="w-4 h-4 text-kd-green-700" />
                      : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-kd-earth truncate">{txn.buyer}</p>
                    <p className="text-xs text-gray-400">{txn.item} · {txn.date}</p>
                  </div>
                  <span className={`font-mono font-bold text-sm flex-shrink-0 ${txn.amount > 0 ? 'text-kd-green-700' : 'text-red-500'}`}>
                    {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
