import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Tag, Truck, ArrowRight, Leaf } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Toast from '../components/ui/Toast';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cart, removeFromCart, updateCartQty, clearCart, cartTotal, showToast, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const delivery = cartTotal >= 500 ? 0 : 49;
  const discount = couponApplied ? couponDiscount : 0;
  const finalTotal = cartTotal - discount + delivery;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'KISAN50') {
      setCouponDiscount(Math.round(cartTotal * 0.1));
      setCouponApplied(true);
      showToast('Coupon applied! 10% off.', 'success');
    } else if (coupon.toUpperCase() === 'FARMER') {
      setCouponDiscount(50);
      setCouponApplied(true);
      showToast('Coupon applied! ₹50 off.', 'success');
    } else {
      showToast('Invalid coupon code', 'error');
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      showToast('Please login to checkout', 'warning');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <>
      <Navbar />
      <Toast />
      <main className="min-h-screen bg-kd-paper py-8">
        <div className="container-kd">
          <h1 className="text-2xl font-bold text-kd-earth mb-6">
            Shopping Cart {cart.length > 0 && <span className="text-lg text-gray-400">({cart.length} items)</span>}
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-20 h-20 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-kd-earth mb-2">Your cart is empty</h2>
              <p className="text-gray-500 text-sm mb-6">Add some fresh produce from our verified farmers!</p>
              <Link to="/browse" className="btn-primary">Browse Products</Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">

              {/* Cart items */}
              <div className="lg:col-span-2 space-y-3">
                {/* Clear all */}
                <div className="flex justify-end">
                  <button onClick={clearCart} className="text-xs text-red-500 font-medium hover:underline flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Clear all
                  </button>
                </div>

                {cart.map(item => (
                  <div key={item.productId} className="card p-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-kd-earth text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">by {item.farmer}</p>
                      <p className="font-mono font-bold text-kd-green-700 mt-1">₹{item.price}/{item.unit}</p>
                    </div>

                    {/* Qty */}
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                      <button
                        onClick={() => item.qty === 1 ? removeFromCart(item.productId) : updateCartQty(item.productId, item.qty - 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors text-kd-earth"
                      >
                        {item.qty === 1 ? <Trash2 className="w-4 h-4 text-red-400" /> : <Minus className="w-4 h-4" />}
                      </button>
                      <span className="px-3 py-2 font-mono font-semibold text-sm min-w-[50px] text-center">
                        {item.qty} {item.unit}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.productId, item.qty + 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors text-kd-earth"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right flex-shrink-0 w-20">
                      <p className="font-mono font-bold text-kd-earth">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Farmer info */}
                <div className="card p-4 flex items-start gap-3 border-kd-green-200">
                  <Leaf className="w-5 h-5 text-kd-green-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-kd-earth">Supporting Verified Farmers</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Your purchase goes directly to the farmer. No middlemen take a cut.
                      75%+ of your payment reaches the farmer's wallet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div>
                <div className="card p-6 sticky top-24 space-y-4">
                  <h2 className="font-bold text-kd-earth text-lg">Order Summary</h2>

                  {/* Coupon */}
                  <div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Coupon code"
                          value={coupon}
                          onChange={e => setCoupon(e.target.value)}
                          disabled={couponApplied}
                          className="input pl-10 py-2.5 text-sm"
                        />
                      </div>
                      <button
                        onClick={applyCoupon}
                        disabled={couponApplied}
                        className="px-4 py-2.5 bg-kd-earth text-white rounded-xl text-sm font-semibold hover:bg-kd-green-900 transition-colors disabled:opacity-60"
                      >
                        {couponApplied ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                    {!couponApplied && (
                      <p className="text-[11px] text-gray-400 mt-1.5">Try: KISAN50 for 10% off or FARMER for ₹50 off</p>
                    )}
                  </div>

                  <div className="divider" />

                  {/* Breakdown */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                      <span className="font-mono font-semibold text-kd-earth">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-sm">
                        <span className="text-kd-green-700">Coupon ({coupon.toUpperCase()})</span>
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
                    {delivery > 0 && (
                      <p className="text-[11px] text-kd-green-700 bg-kd-green-100 rounded-lg px-2 py-1">
                        Add ₹{500 - cartTotal} more for free delivery!
                      </p>
                    )}
                  </div>

                  <div className="divider" />

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-kd-earth">Total</span>
                    <span className="font-mono text-2xl font-bold text-kd-earth">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>

                  {couponApplied && (
                    <p className="text-xs text-kd-green-700 text-center font-medium">
                      🎉 You saved ₹{discount} with coupon!
                    </p>
                  )}

                  <button onClick={handleCheckout} className="btn-primary btn-lg w-full">
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Payment icons */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    {['UPI', 'CARD', 'NET', 'COD'].map(p => (
                      <span key={p} className="text-[10px] px-2 py-1 border border-gray-200 rounded text-gray-400 font-mono">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
