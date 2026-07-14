import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Leaf, Phone, Mail, ArrowRight, Eye, EyeOff, CheckCircle, Loader } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Toast from '../components/ui/Toast';
import clsx from 'clsx';

const ROLES = [
  { id: 'farmer', emoji: '👨‍🌾', label: 'Farmer', desc: 'Sell your produce directly' },
  { id: 'buyer',  emoji: '🛒',   label: 'Buyer',  desc: 'Buy fresh from farmers' },
  { id: 'business', emoji: '🏪', label: 'Business', desc: 'Restaurants, hotels, retailers' },
];

export default function Login() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login, showToast } = useApp();

  const [mode, setMode] = useState(params.get('mode') === 'register' ? 'register' : 'login');
  const [method, setMethod] = useState('phone'); // 'phone' | 'email'
  const [role, setRole] = useState(params.get('role') || 'buyer');
  const [step, setStep] = useState(1); // 1: enter phone, 2: enter OTP, 3: done
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // Countdown timer after OTP sent
  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      showToast('Please enter a valid 10-digit number', 'error');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setOtpSent(true);
    setStep(2);
    setTimer(30);
    showToast('OTP sent to +91 ' + phone, 'success');
  };

  const handleOTPInput = (val, idx) => {
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);
    if (val && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      showToast('Enter all 6 digits', 'error');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);

    // Accept any 6-digit OTP for demo
    const user = {
      name: role === 'farmer' ? 'Ramesh Patel' : 'Priya Sharma',
      phone: '+91 ' + phone,
      verified: true,
    };
    login(user, role === 'business' ? 'buyer' : role);
    showToast(`Welcome to Kisan Direct, ${user.name}!`, 'success');
    setTimeout(() => navigate(role === 'farmer' ? '/farmer' : '/buyer'), 500);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill all fields', 'error');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);

    const user = {
      name: role === 'farmer' ? 'Ramesh Patel' : 'Priya Sharma',
      email,
      verified: true,
    };
    login(user, role === 'business' ? 'buyer' : role);
    showToast('Login successful!', 'success');
    setTimeout(() => navigate(role === 'farmer' ? '/farmer' : '/buyer'), 500);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    const user = { name: 'Demo User', email: 'demo@gmail.com', verified: true };
    login(user, role === 'business' ? 'buyer' : role);
    showToast('Signed in with Google!', 'success');
    setTimeout(() => navigate(role === 'farmer' ? '/farmer' : '/buyer'), 500);
  };

  return (
    <>
      <Toast />
      <div className="min-h-screen bg-kd-paper flex">

        {/* Left: decorative panel */}
        <div className="hidden lg:flex lg:w-1/2 hero-bg flex-col justify-between p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
          />

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-2xl text-white">Kisan Direct</span>
          </Link>

          {/* Content */}
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Join India's Fastest Growing AgriTech Platform
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              48,000+ verified farmers. 680+ cities. Billions in fair value created.
            </p>

            {/* Social proof */}
            <div className="space-y-3">
              {[
                { name: 'Ramesh Patel', loc: 'Anand, Gujarat', text: 'Income tripled in 12 months!' },
                { name: 'Priya Sharma', loc: 'Pune, MH',       text: 'Save ₹2,800/month on groceries' },
              ].map(p => (
                <div key={p.name} className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-kd-amber-500 flex items-center justify-center text-kd-earth font-bold text-sm flex-shrink-0">
                    {p.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{p.name} • {p.loc}</p>
                    <p className="text-white/70 text-xs">{p.text}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-kd-green-400 ml-auto flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/40 text-xs relative z-10">© 2026 Kisan Direct · Supported by Ministry of Agriculture, GoI</p>
        </div>

        {/* Right: Auth form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-kd-green-700 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-xl text-kd-green-700">Kisan Direct</span>
            </Link>

            {/* Toggle login/register */}
            <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-2xl">
              <button
                onClick={() => { setMode('login'); setStep(1); }}
                className={clsx('flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all', mode === 'login' ? 'bg-white text-kd-earth shadow-kd-sm' : 'text-gray-500')}
              >
                Sign In
              </button>
              <button
                onClick={() => { setMode('register'); setStep(1); }}
                className={clsx('flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all', mode === 'register' ? 'bg-white text-kd-earth shadow-kd-sm' : 'text-gray-500')}
              >
                Register
              </button>
            </div>

            <h1 className="text-2xl font-bold text-kd-earth mb-1">
              {mode === 'login' ? 'Welcome back!' : 'Create your account'}
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              {mode === 'login' ? 'Sign in to your Kisan Direct account' : 'Join 48,000+ farmers and buyers'}
            </p>

            {/* Role selector (register) */}
            {mode === 'register' && (
              <div className="mb-5">
                <p className="input-label">I am a...</p>
                <div className="grid grid-cols-3 gap-2">
                  {ROLES.map(r => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={clsx(
                        'p-3 rounded-2xl border-2 text-center transition-all',
                        role === r.id ? 'border-kd-green-700 bg-kd-green-100' : 'border-gray-200 bg-white hover:border-gray-300'
                      )}
                    >
                      <span className="text-2xl block mb-1">{r.emoji}</span>
                      <span className={clsx('text-xs font-bold', role === r.id ? 'text-kd-green-700' : 'text-gray-600')}>
                        {r.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Method toggle */}
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setMethod('phone')}
                className={clsx('flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-all',
                  method === 'phone' ? 'border-kd-green-700 bg-kd-green-100 text-kd-green-700' : 'border-gray-200 text-gray-500 hover:border-gray-300')}
              >
                <Phone className="w-4 h-4" /> Phone / OTP
              </button>
              <button
                onClick={() => setMethod('email')}
                className={clsx('flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-all',
                  method === 'email' ? 'border-kd-green-700 bg-kd-green-100 text-kd-green-700' : 'border-gray-200 text-gray-500 hover:border-gray-300')}
              >
                <Mail className="w-4 h-4" /> Email
              </button>
            </div>

            {/* Phone / OTP flow */}
            {method === 'phone' && (
              <>
                {step === 1 && (
                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div>
                      <label className="input-label">Mobile Number</label>
                      <div className="flex gap-2">
                        <div className="px-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-500 flex-shrink-0">
                          🇮🇳 +91
                        </div>
                        <input
                          type="tel"
                          maxLength={10}
                          value={phone}
                          onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="98765 43210"
                          className="input"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
                      {loading ? <Loader className="w-4 h-4 animate-spin" /> : null}
                      {loading ? 'Sending OTP...' : 'Send OTP'} <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleVerifyOTP} className="space-y-5">
                    <div>
                      <p className="text-sm text-gray-600 mb-4">
                        OTP sent to <strong>+91 {phone}</strong>.{' '}
                        <button type="button" onClick={() => setStep(1)} className="text-kd-green-700 font-semibold hover:underline">
                          Change
                        </button>
                      </p>
                      <label className="input-label">Enter 6-digit OTP</label>
                      <div className="flex gap-2 justify-between">
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            id={`otp-${i}`}
                            type="tel"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleOTPInput(e.target.value, i)}
                            onKeyDown={e => {
                              if (e.key === 'Backspace' && !digit && i > 0) document.getElementById(`otp-${i - 1}`)?.focus();
                            }}
                            className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-xl outline-none focus:border-kd-green-700 transition-colors"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        {timer > 0 ? `Resend in ${timer}s` : (
                          <button type="button" onClick={() => { setTimer(30); showToast('OTP resent!', 'info'); }} className="text-kd-green-700 font-semibold hover:underline">
                            Resend OTP
                          </button>
                        )}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 bg-kd-amber-50 border border-kd-amber-200 rounded-xl p-3">
                      💡 <strong>Demo:</strong> Enter any 6 digits to log in as a {role}.
                    </p>
                    <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
                      {loading ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                      {loading ? 'Verifying...' : 'Verify & Continue'}
                    </button>
                  </form>
                )}
              </>
            )}

            {/* Email flow */}
            {method === 'email' && (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="input-label">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="input-label">Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input pr-12"
                      required
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {mode === 'login' && (
                    <div className="text-right mt-1">
                      <a href="#" className="text-xs text-kd-green-700 font-medium hover:underline">Forgot password?</a>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 bg-kd-amber-50 border border-kd-amber-200 rounded-xl p-3">
                  💡 <strong>Demo:</strong> Any email + any password works. Select role above.
                </p>
                <button type="submit" disabled={loading} className="btn-primary btn-lg w-full">
                  {loading ? <Loader className="w-4 h-4 animate-spin" /> : null}
                  {loading ? 'Signing in...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google login */}
            <button onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-3 px-5 py-3.5 border-2 border-gray-200 rounded-2xl text-sm font-semibold text-kd-earth hover:border-kd-green-700 hover:bg-kd-green-100/30 transition-all">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.38c-.23 1.21-.93 2.24-1.98 2.93v2.44h3.2c1.87-1.72 2.96-4.26 2.96-7.16z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.96-.9 6.62-2.43l-3.2-2.44c-.9.6-2.04.96-3.42.96-2.63 0-4.86-1.77-5.66-4.15H1.06v2.51A10 10 0 0010 20z" fill="#34A853"/>
                <path d="M4.34 11.94A5.98 5.98 0 014 10c0-.67.12-1.32.34-1.94V5.55H1.06A10 10 0 000 10c0 1.61.38 3.14 1.06 4.45l3.28-2.51z" fill="#FBBC05"/>
                <path d="M10 3.96c1.47 0 2.8.5 3.84 1.5l2.88-2.88C14.95 1 12.68 0 10 0A10 10 0 001.06 5.55l3.28 2.51C5.14 5.73 7.37 3.96 10 3.96z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Terms */}
            <p className="text-xs text-gray-400 text-center mt-5">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-kd-green-700 hover:underline">Terms</Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-kd-green-700 hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
