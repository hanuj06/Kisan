import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin, CreditCard, Smartphone, Building2, Truck,
  CheckCircle, ChevronRight, Lock, Leaf, Tag, Edit2,
  Phone, User, Home, Plus, ShieldCheck, Zap
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Toast from '../components/ui/Toast';
import { useApp } from '../context/AppContext';

// ── Step indicators ──────────────────────────────────────────
const STEPS = ['Address', 'Payment', 'Review'];

function StepBar({ current }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((step, idx) => {
        const done    = idx < current;
        const active  = idx === current;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${done   ? 'bg-kd-green-700 text-white'
                : active ? 'bg-kd-earth text-white ring-4 ring-kd-earth/20'
                         : 'bg-gray-200 text-gray-400'}`}>
                {done ? <CheckCircle className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={`text-xs mt-1 font-medium ${active ? 'text-kd-earth' : done ? 'text-kd-green-700' : 'text-gray-400'}`}>
                {step}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 rounded ${idx < current ? 'bg-kd-green-700' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Address Step ─────────────────────────────────────────────
const SAVED_ADDRESSES = [
  {
    id: 'a1',
    label: 'Home',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    line1: '12, Saket Colony',
    line2: 'Near City Park, Baner',
    city: 'Pune',
    state: 'Maharashtra',
    pin: '411045',
  },
  {
    id: 'a2',
    label: 'Office',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    line1: '5th Floor, Tech Park Tower',
    line2: 'Hinjawadi Phase 1',
    city: 'Pune',
    state: 'Maharashtra',
    pin: '411057',
  },
];

function AddressStep({ selected, onSelect, onNew, newAddr, setNewAddr, showNew, setShowNew }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-kd-earth">Delivery Address</h2>

      {/* Saved addresses */}
      <div className="space-y-3">
        {SAVED_ADDRESSES.map(addr => (
          <label
            key={addr.id}
            className={`flex items-start gap-4 card p-4 cursor-pointer transition-all border-2
              ${selected === addr.id ? 'border-kd-green-700 bg-kd-green-50' : 'border-transparent hover:border-kd-green-200'}`}
          >
            <input
              type="radio"
              name="address"
              value={addr.id}
              checked={selected === addr.id}
              onChange={() => { onSelect(addr.id); setShowNew(false); }}
              className="mt-1 accent-kd-green-700"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold bg-kd-earth text-white px-2 py-0.5 rounded-full">
                  {addr.label}
                </span>
                <span className="font-semibold text-sm text-kd-earth">{addr.name}</span>
              </div>
              <p className="text-sm text-gray-600">{addr.line1}, {addr.line2}</p>
              <p className="text-sm text-gray-600">{addr.city}, {addr.state} — {addr.pin}</p>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <Phone className="w-3 h-3" /> {addr.phone}
              </p>
            </div>
            {selected === addr.id && <CheckCircle className="w-5 h-5 text-kd-green-700 flex-shrink-0" />}
          </label>
        ))}
      </div>

      {/* Add new address toggle */}
      <button
        onClick={() => { setShowNew(!showNew); onSelect(null); }}
        className={`flex items-center gap-2 w-full p-4 rounded-2xl border-2 border-dashed text-sm font-medium transition-all
          ${showNew ? 'border-kd-green-700 bg-kd-green-50 text-kd-green-700' : 'border-gray-300 text-gray-500 hover:border-kd-green-400 hover:text-kd-green-700'}`}
      >
        <Plus className="w-4 h-4" />
        Add a new address
      </button>

      {showNew && (
        <div className="card p-5 border-2 border-kd-green-200 space-y-3">
          <h3 className="font-semibold text-kd-earth text-sm">New Delivery Address</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input className="input pl-9 w-full" placeholder="Your name"
                  value={newAddr.name} onChange={e => setNewAddr(p => ({...p, name: e.target.value}))} />
              </div>
            </div>
            <div>
              <label className="label">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input className="input pl-9 w-full" placeholder="+91 XXXXX XXXXX"
                  value={newAddr.phone} onChange={e => setNewAddr(p => ({...p, phone: e.target.value}))} />
              </div>
            </div>
          </div>
          <div>
            <label className="label">Address Line 1</label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input className="input pl-9 w-full" placeholder="House/Flat/Block No., Street Name"
                value={newAddr.line1} onChange={e => setNewAddr(p => ({...p, line1: e.target.value}))} />
            </div>
          </div>
          <div>
            <label className="label">Address Line 2</label>
            <input className="input w-full" placeholder="Locality, Landmark (optional)"
              value={newAddr.line2} onChange={e => setNewAddr(p => ({...p, line2: e.target.value}))} />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="label">City</label>
              <input className="input w-full" placeholder="City"
                value={newAddr.city} onChange={e => setNewAddr(p => ({...p, city: e.target.value}))} />
            </div>
            <div>
              <label className="label">State</label>
              <input className="input w-full" placeholder="State"
                value={newAddr.state} onChange={e => setNewAddr(p => ({...p, state: e.target.value}))} />
            </div>
            <div>
              <label className="label">PIN Code</label>
              <input className="input w-full" placeholder="6-digit PIN"
                value={newAddr.pin} onChange={e => setNewAddr(p => ({...p, pin: e.target.value}))} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Payment Step ─────────────────────────────────────────────
const PAYMENT_METHODS = [
  { id: 'upi',  label: 'UPI',             icon: Smartphone,  desc: 'PhonePe, GPay, Paytm, BHIM' },
  { id: 'card', label: 'Credit/Debit Card',icon: CreditCard, desc: 'Visa, Mastercard, RuPay'      },
  { id: 'nb',   label: 'Net Banking',      icon: Building2,  desc: 'All major banks supported'    },
  { id: 'cod',  label: 'Cash on Delivery', icon: Truck,      desc: 'Pay at your doorstep'         },
];

function PaymentStep({ selected, onSelect, upiId, setUpiId }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-kd-earth">Payment Method</h2>

      <div className="space-y-3">
        {PAYMENT_METHODS.map(m => {
          const Icon = m.icon;
          const active = selected === m.id;
          return (
            <div key={m.id}>
              <label
                className={`flex items-center gap-4 card p-4 cursor-pointer transition-all border-2
                  ${active ? 'border-kd-green-700 bg-kd-green-50' : 'border-transparent hover:border-kd-green-200'}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={m.id}
                  checked={active}
                  onChange={() => onSelect(m.id)}
                  className="accent-kd-green-700"
                />
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                  ${active ? 'bg-kd-green-700 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-kd-earth">{m.label}</p>
                  <p className="text-xs text-gray-500">{m.desc}</p>
                </div>
                {active && <CheckCircle className="w-5 h-5 text-kd-green-700 flex-shrink-0" />}
              </label>

              {/* UPI ID input */}
              {active && m.id === 'upi' && (
                <div className="mt-2 ml-4">
                  <label className="label">Enter UPI ID</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      className="input pl-9 w-full"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Card fields */}
              {active && m.id === 'card' && (
                <div className="mt-2 ml-4 space-y-3">
                  <div>
                    <label className="label">Card Number</label>
                    <input className="input w-full font-mono" placeholder="XXXX XXXX XXXX XXXX" maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label">Expiry (MM/YY)</label>
                      <input className="input w-full font-mono" placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div>
                      <label className="label">CVV</label>
                      <input className="input w-full font-mono" placeholder="• • •" maxLength={3} type="password" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Name on Card</label>
                    <input className="input w-full" placeholder="As shown on card" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-xl p-3">
        <Lock className="w-4 h-4 text-kd-green-700 flex-shrink-0" />
        Your payment info is encrypted and secure. We never store card details.
      </div>
    </div>
  );
}

// ── Review Step ──────────────────────────────────────────────
function ReviewStep({ cart, cartTotal, selectedAddressId, paymentMethod, coupon, couponDiscount }) {
  const address = SAVED_ADDRESSES.find(a => a.id === selectedAddressId);
  const delivery = cartTotal >= 500 ? 0 : 49;
  const discount = couponDiscount;
  const finalTotal = cartTotal - discount + delivery;

  const pmLabel = PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label || '';

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-kd-earth">Review Your Order</h2>

      {/* Items */}
      <div className="card p-4">
        <h3 className="font-semibold text-sm text-kd-earth mb-3 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-kd-green-700" /> Order Items ({cart.length})
        </h3>
        <div className="space-y-3">
          {cart.map(item => (
            <div key={item.productId} className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-kd-earth line-clamp-1">{item.name}</p>
                <p className="text-xs text-gray-500">by {item.farmer}</p>
                <p className="text-xs text-gray-400">{item.qty} {item.unit} × ₹{item.price}</p>
              </div>
              <span className="font-mono font-semibold text-sm text-kd-earth">
                ₹{(item.qty * item.price).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Address & Payment summary */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Delivery To</p>
          {address ? (
            <>
              <p className="font-semibold text-sm text-kd-earth">{address.name}</p>
              <p className="text-xs text-gray-500 mt-1">{address.line1}</p>
              {address.line2 && <p className="text-xs text-gray-500">{address.line2}</p>}
              <p className="text-xs text-gray-500">{address.city}, {address.state} — {address.pin}</p>
            </>
          ) : (
            <p className="text-xs text-gray-400">No address selected</p>
          )}
        </div>

        <div className="card p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Payment</p>
          <p className="font-semibold text-sm text-kd-earth">{pmLabel || '—'}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <ShieldCheck className="w-4 h-4 text-kd-green-700" />
            <p className="text-xs text-gray-500">Secure payment protected by SSL</p>
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="card p-5 space-y-3">
        <h3 className="font-semibold text-sm text-kd-earth">Price Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({cart.length} items)</span>
            <span className="font-mono font-semibold text-kd-earth">₹{cartTotal.toLocaleString()}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-kd-green-700 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Coupon ({coupon?.toUpperCase()})
              </span>
              <span className="font-mono font-semibold text-kd-green-700">−₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Delivery
            </span>
            <span className={`font-mono font-semibold ${delivery === 0 ? 'text-kd-green-700' : 'text-kd-earth'}`}>
              {delivery === 0 ? 'FREE' : `₹${delivery}`}
            </span>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex justify-between items-center">
            <span className="font-bold text-kd-earth">Total to Pay</span>
            <span className="font-mono text-2xl font-bold text-kd-earth">₹{finalTotal.toLocaleString()}</span>
          </div>
          {discount > 0 && (
            <p className="text-xs text-kd-green-700 text-center font-medium bg-kd-green-50 rounded-lg py-1.5">
              🎉 You're saving ₹{discount} on this order!
            </p>
          )}
        </div>
      </div>

      {/* Farmer pledge */}
      <div className="flex items-start gap-3 bg-gradient-to-r from-kd-green-50 to-emerald-50 rounded-2xl p-4">
        <Zap className="w-5 h-5 text-kd-green-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-kd-earth">Farm-to-Door Freshness Guarantee</p>
          <p className="text-xs text-gray-500 mt-0.5">
            75%+ of your payment goes directly to the farmer. 100% freshness guaranteed or full refund within 4 hours.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Success Screen ───────────────────────────────────────────
function SuccessScreen() {
  const orderId = `KD${Date.now().toString().slice(-8)}`;
  return (
    <div className="min-h-screen bg-kd-paper flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-kd-green-100 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <CheckCircle className="w-12 h-12 text-kd-green-700" />
        </div>
        <h1 className="text-3xl font-bold text-kd-earth mb-2">Order Placed! 🎉</h1>
        <p className="text-gray-500 text-sm mb-1">
          Order <span className="font-mono font-semibold text-kd-earth">#{orderId}</span> confirmed
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Thank you for supporting Indian farmers! Your fresh produce is on its way.
        </p>
        <p className="text-sm font-semibold text-kd-green-700 bg-kd-green-50 rounded-xl px-4 py-2 mb-8">
          🌿 75% of your payment goes directly to the farmer
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/buyer/orders" className="btn-primary">
            Track My Order
          </Link>
          <Link to="/browse" className="btn-outline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main Checkout ─────────────────────────────────────────────
export default function Checkout() {
  const { cart, cartTotal, clearCart, coupon: ctxCoupon } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState('a1');
  const [showNewAddr, setShowNewAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: '', phone: '', line1: '', line2: '', city: '', state: '', pin: '' });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [success, setSuccess] = useState(false);

  // If cart is empty, redirect to browse
  if (cart.length === 0 && !success) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-kd-paper flex items-center justify-center p-6">
          <div className="text-center">
            <ShieldCheck className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-kd-earth mb-2">Your cart is empty</h2>
            <p className="text-gray-500 text-sm mb-6">Add some items before checking out.</p>
            <Link to="/browse" className="btn-primary">Browse Products</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (success) return <SuccessScreen />;

  const delivery = cartTotal >= 500 ? 0 : 49;
  const finalTotal = cartTotal + delivery;

  const canProceed = () => {
    if (step === 0) return selectedAddressId || (showNewAddr && newAddr.name && newAddr.line1 && newAddr.city && newAddr.pin);
    if (step === 1) return paymentMethod;
    return true;
  };

  const handleNext = () => {
    if (step < 2) setStep(s => s + 1);
    else {
      // Place order
      clearCart();
      setSuccess(true);
    }
  };

  return (
    <>
      <Navbar />
      <Toast />
      <main className="min-h-screen bg-kd-paper py-8">
        <div className="container-kd max-w-5xl">

          {/* Page title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-kd-earth">Checkout</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {cart.length} item{cart.length !== 1 ? 's' : ''} · ₹{finalTotal.toLocaleString()} total
            </p>
          </div>

          <StepBar current={step} />

          <div className="grid lg:grid-cols-3 gap-6">

            {/* ── Left: step content ── */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                {step === 0 && (
                  <AddressStep
                    selected={selectedAddressId}
                    onSelect={setSelectedAddressId}
                    showNew={showNewAddr}
                    setShowNew={setShowNewAddr}
                    newAddr={newAddr}
                    setNewAddr={setNewAddr}
                  />
                )}
                {step === 1 && (
                  <PaymentStep
                    selected={paymentMethod}
                    onSelect={setPaymentMethod}
                    upiId={upiId}
                    setUpiId={setUpiId}
                  />
                )}
                {step === 2 && (
                  <ReviewStep
                    cart={cart}
                    cartTotal={cartTotal}
                    selectedAddressId={selectedAddressId}
                    paymentMethod={paymentMethod}
                    coupon={null}
                    couponDiscount={0}
                  />
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
                  <button
                    onClick={() => step === 0 ? navigate('/cart') : setStep(s => s - 1)}
                    className="btn-outline btn-sm"
                  >
                    {step === 0 ? 'Back to Cart' : '← Previous'}
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {step === 2 ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Place Order · ₹{finalTotal.toLocaleString()}
                      </>
                    ) : (
                      <>
                        Continue <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ── Right: order summary ── */}
            <div className="space-y-4">
              <div className="card p-5 sticky top-24">
                <h3 className="font-bold text-kd-earth mb-4">Order Summary</h3>

                {/* Mini cart items */}
                <div className="space-y-3 mb-4">
                  {cart.slice(0, 3).map(item => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-kd-earth line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.qty} {item.unit}</p>
                      </div>
                      <span className="text-xs font-mono font-semibold text-kd-earth">₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                  {cart.length > 3 && (
                    <p className="text-xs text-gray-400 text-center">+{cart.length - 3} more items</p>
                  )}
                </div>

                <div className="space-y-2 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-mono font-semibold text-kd-earth">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery</span>
                    <span className={`font-mono font-semibold ${delivery === 0 ? 'text-kd-green-700' : 'text-kd-earth'}`}>
                      {delivery === 0 ? 'FREE' : `₹${delivery}`}
                    </span>
                  </div>
                  <div className="h-px bg-gray-100 my-1" />
                  <div className="flex justify-between">
                    <span className="font-bold text-kd-earth">Total</span>
                    <span className="font-mono font-bold text-xl text-kd-earth">₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="mt-4 space-y-2">
                  {[
                    { icon: ShieldCheck, text: '100% secure checkout'           },
                    { icon: Leaf,        text: 'Farm-fresh quality guaranteed'   },
                    { icon: Truck,       text: 'Free delivery above ₹500'        },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                      <Icon className="w-3.5 h-3.5 text-kd-green-700 flex-shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
