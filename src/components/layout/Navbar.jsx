import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Leaf, ShoppingCart, Heart, Bell, Search, Menu, X, ChevronDown,
  User, LogOut, LayoutDashboard, Package, Wallet, Settings, Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

const NAV_LINKS = [
  { label: 'Browse', to: '/browse' },
  { label: 'Market Prices', to: '/market-prices' },
  { label: 'For Farmers', to: '/for-farmers' },
  { label: 'About', to: '/about' },
];

export default function Navbar() {
  const { cartCount, unreadCount, isAuthenticated, user, role, logout, searchQuery, dispatch } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  const isTransparent = location.pathname === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setProfileOpen(false);
    setNotifOpen(false);
  }, [location]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handle = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH', payload: localSearch });
    navigate(`/browse?q=${encodeURIComponent(localSearch)}`);
    setSearchOpen(false);
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  const dashboardLink = role === 'farmer' ? '/farmer' : role === 'buyer' ? '/buyer' : '/admin';

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md shadow-kd border-b border-kd-green-100'
        )}
      >
        <div className="container-kd">
          <div className="flex items-center h-16 md:h-18 gap-4">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className={clsx(
                'w-9 h-9 rounded-xl flex items-center justify-center transition-all',
                isTransparent ? 'bg-white/20' : 'bg-kd-green-700'
              )}>
                <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="leading-none">
                <span className={clsx(
                  'font-display font-bold text-xl block',
                  isTransparent ? 'text-white' : 'text-kd-green-700'
                )}>
                  Kisan Direct
                </span>
                <span className={clsx(
                  'text-[10px] font-medium',
                  isTransparent ? 'text-white/70' : 'text-kd-amber-500'
                )}>
                  Farm to Family
                </span>
              </div>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden lg:flex items-center gap-1 ml-6">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={clsx(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    location.pathname === link.to
                      ? (isTransparent ? 'bg-white/20 text-white' : 'bg-kd-green-100 text-kd-green-700')
                      : (isTransparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-kd-green-700 hover:bg-kd-green-100')
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── Search bar (desktop) ── */}
            <div className="hidden md:flex flex-1 max-w-md mx-auto">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className={clsx('absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4', isTransparent ? 'text-white/60' : 'text-gray-400')} />
                <input
                  type="text"
                  placeholder="Search tomatoes, onions, rice..."
                  value={localSearch}
                  onChange={e => setLocalSearch(e.target.value)}
                  className={clsx(
                    'w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-200 outline-none',
                    isTransparent
                      ? 'bg-white/15 text-white placeholder-white/50 border border-white/20 focus:bg-white/25 focus:border-white/40'
                      : 'bg-gray-100 text-kd-earth placeholder-gray-400 border border-transparent focus:border-kd-green-700 focus:ring-2 focus:ring-kd-green-700/20 focus:bg-white'
                  )}
                />
              </form>
            </div>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-1 ml-auto">

              {/* Mobile search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={clsx(
                  'md:hidden p-2 rounded-lg transition-all',
                  isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
                )}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Language */}
              <button
                className={clsx(
                  'hidden lg:flex items-center gap-1 p-2 rounded-lg text-xs font-medium transition-all',
                  isTransparent ? 'text-white/80 hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100'
                )}
                title="Language"
              >
                <Globe className="w-4 h-4" />
                EN
              </button>

              {isAuthenticated ? (
                <>
                  {/* Cart */}
                  <Link to="/cart" className="relative p-2 rounded-lg transition-all hover:bg-gray-100">
                    <ShoppingCart className={clsx('w-5 h-5', isTransparent ? 'text-white' : 'text-gray-600')} />
                    {cartCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-kd-amber-500 text-kd-earth text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                        {cartCount > 9 ? '9+' : cartCount}
                      </span>
                    )}
                  </Link>

                  {/* Wishlist */}
                  <Link to="/buyer/wishlist" className="hidden sm:block relative p-2 rounded-lg transition-all hover:bg-gray-100">
                    <Heart className={clsx('w-5 h-5', isTransparent ? 'text-white' : 'text-gray-600')} />
                  </Link>

                  {/* Notifications */}
                  <div className="relative">
                    <button
                      onClick={() => setNotifOpen(!notifOpen)}
                      className="relative p-2 rounded-lg transition-all hover:bg-gray-100"
                    >
                      <Bell className={clsx('w-5 h-5', isTransparent ? 'text-white' : 'text-gray-600')} />
                      {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {notifOpen && (
                      <div className="absolute right-0 top-12 w-80 card shadow-kd-xl animate-slide-down z-50">
                        <div className="p-4 border-b border-kd-green-100 flex items-center justify-between">
                          <span className="font-semibold text-sm text-kd-earth">Notifications</span>
                          <button
                            onClick={() => dispatch({ type: 'MARK_ALL_READ' })}
                            className="text-xs text-kd-green-700 font-medium hover:underline"
                          >
                            Mark all read
                          </button>
                        </div>
                        <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                          {/* Notification items rendered from context */}
                          {[
                            { id: 'n1', title: 'New order received!', body: 'Order #ORD2026001 from Priya Sharma', time: '2 min ago', read: false, color: 'bg-green-500' },
                            { id: 'n2', title: 'Payment credited',    body: '₹1,800 added to your wallet',        time: '1 hr ago',  read: false, color: 'bg-blue-500' },
                            { id: 'n3', title: 'Tomato prices rising', body: 'Expected +15% increase this week', time: '3 hr ago',  read: true,  color: 'bg-amber-500' },
                            { id: 'n4', title: 'Rain alert tomorrow',  body: 'Heavy rain forecast for your area', time: '5 hr ago',  read: true,  color: 'bg-red-500' },
                          ].map(n => (
                            <div key={n.id} className={clsx('p-3 flex gap-3 hover:bg-gray-50 transition-colors', !n.read && 'bg-kd-green-100/30')}>
                              <span className={clsx('w-2 h-2 rounded-full mt-2 flex-shrink-0', n.color)} />
                              <div>
                                <p className="text-xs font-semibold text-kd-earth">{n.title}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{n.body}</p>
                                <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Profile dropdown */}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-kd-green-700 flex items-center justify-center text-white text-sm font-bold">
                        {user?.name?.[0] || 'U'}
                      </div>
                      <span className={clsx('hidden sm:block text-sm font-medium', isTransparent ? 'text-white' : 'text-kd-earth')}>
                        {user?.name?.split(' ')[0] || 'Account'}
                      </span>
                      <ChevronDown className={clsx('w-4 h-4', isTransparent ? 'text-white/70' : 'text-gray-400')} />
                    </button>

                    {profileOpen && (
                      <div className="absolute right-0 top-12 w-56 card shadow-kd-xl animate-slide-down z-50 overflow-visible">
                        <div className="p-3 border-b border-kd-green-100">
                          <p className="font-semibold text-sm text-kd-earth">{user?.name || 'User'}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{user?.email || user?.phone}</p>
                          <span className="badge-green mt-1 capitalize">{role}</span>
                        </div>
                        <div className="p-1">
                          <Link to={dashboardLink} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-kd-green-100 text-sm text-kd-earth transition-colors">
                            <LayoutDashboard className="w-4 h-4 text-kd-green-700" /> Dashboard
                          </Link>
                          <Link to="/buyer/orders" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-kd-green-100 text-sm text-kd-earth transition-colors">
                            <Package className="w-4 h-4 text-kd-green-700" /> My Orders
                          </Link>
                          <Link to="/buyer/wishlist" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-kd-green-100 text-sm text-kd-earth transition-colors">
                            <Heart className="w-4 h-4 text-kd-green-700" /> Wishlist
                          </Link>
                          <Link to="/farmer/wallet" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-kd-green-100 text-sm text-kd-earth transition-colors">
                            <Wallet className="w-4 h-4 text-kd-green-700" /> Wallet
                          </Link>
                        </div>
                        <div className="p-1 border-t border-kd-green-100">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-red-50 text-sm text-red-600 transition-colors"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className={clsx(
                    'hidden sm:block px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    isTransparent
                      ? 'text-white hover:bg-white/10'
                      : 'text-kd-green-700 hover:bg-kd-green-100'
                  )}>
                    Sign In
                  </Link>
                  <Link to="/login?mode=register" className={clsx(
                    'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                    isTransparent
                      ? 'bg-kd-amber-500 text-kd-earth hover:bg-kd-amber-400'
                      : 'bg-kd-green-700 text-white hover:bg-kd-green-900'
                  )}>
                    Get Started
                  </Link>
                </>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={clsx('lg:hidden p-2 rounded-lg transition-all', isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100')}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile search ── */}
        {searchOpen && (
          <div className="md:hidden border-t border-kd-green-100 bg-white px-4 py-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchRef}
                  autoFocus
                  type="text"
                  placeholder="Search crops, vegetables, fruits..."
                  value={localSearch}
                  onChange={e => setLocalSearch(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </form>
          </div>
        )}

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-kd-green-100 bg-white shadow-kd-xl animate-slide-down">
            <div className="container-kd py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={clsx(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    location.pathname === link.to
                      ? 'bg-kd-green-100 text-kd-green-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 pt-3 border-t border-kd-green-100 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Link to={dashboardLink} className="btn-outline justify-start">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button onClick={handleLogout} className="btn-danger justify-start">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-outline">Sign In</Link>
                    <Link to="/login?mode=register" className="btn-primary">Get Started Free</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for non-transparent navbars */}
      {!isTransparent && <div className="h-16 md:h-18" />}
    </>
  );
}
