import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Leaf, LayoutDashboard, Package, ShoppingBag, BarChart2, Wallet,
  Bot, Sprout, Cloud, BookOpen, Bell, Settings, LogOut, ChevronLeft,
  ChevronRight, Heart, Users, Star, Home, TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

const FARMER_NAV = [
  { icon: LayoutDashboard, label: 'Dashboard',          to: '/farmer'           },
  { icon: Package,         label: 'My Products',        to: '/farmer/products'  },
  { icon: ShoppingBag,     label: 'Orders',             to: '/farmer/orders'    },
  { icon: BarChart2,       label: 'Analytics',          to: '/farmer/analytics' },
  { icon: Wallet,          label: 'Wallet',             to: '/farmer/wallet'    },
  { icon: Bot,             label: 'AI Assistant',       to: '/farmer/ai'        },
  { icon: Cloud,           label: 'Weather',            to: '/farmer/weather'   },
  { icon: BookOpen,        label: 'Govt Schemes',       to: '/farmer/schemes'   },
];

const BUYER_NAV = [
  { icon: Home,            label: 'Dashboard',          to: '/buyer'            },
  { icon: ShoppingBag,     label: 'My Orders',          to: '/buyer/orders'     },
  { icon: Heart,           label: 'Wishlist',           to: '/buyer/wishlist'   },
  { icon: Users,           label: 'Saved Farmers',      to: '/buyer/farmers'    },
  { icon: TrendingUp,      label: 'Recommendations',    to: '/buyer/reco'       },
  { icon: Star,            label: 'My Reviews',         to: '/buyer/reviews'    },
];

export default function DashboardLayout({ children, type = 'farmer' }) {
  const { user, role, logout, cartCount, unreadCount } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = type === 'farmer' ? FARMER_NAV : BUYER_NAV;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ── Sidebar ── */}
      <aside
        className={clsx(
          'fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300 ease-smooth',
          'bg-white border-r border-kd-green-100 shadow-kd-sm',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-kd-green-100 flex-shrink-0">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 rounded-lg bg-kd-green-700 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div className="leading-none">
                <span className="font-display font-bold text-base text-kd-green-700 block">Kisan Direct</span>
                <span className="text-[10px] text-kd-amber-500 font-medium capitalize">{type} Portal</span>
              </div>
            </Link>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-kd-green-700 flex items-center justify-center mx-auto">
              <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={clsx(
              'p-1.5 rounded-lg hover:bg-kd-green-100 text-gray-400 transition-all flex-shrink-0',
              collapsed && 'mx-auto'
            )}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* User info */}
        {!collapsed && (
          <div className="px-4 py-4 border-b border-kd-green-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-kd-green-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {user?.name?.[0] || (type === 'farmer' ? 'R' : 'P')}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-kd-earth truncate">
                  {user?.name || (type === 'farmer' ? 'Ramesh Patel' : 'Priya Sharma')}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="badge-green text-[10px]">{type === 'farmer' ? '✓ Verified' : 'Buyer'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {navItems.map(({ icon: Icon, label, to }) => {
            const active = location.pathname === to || (to !== '/farmer' && to !== '/buyer' && location.pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                title={collapsed ? label : undefined}
                className={clsx(
                  'sidebar-link mb-1',
                  active ? 'sidebar-link-active' : 'sidebar-link-inactive',
                  collapsed && 'justify-center px-2'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-kd-green-100 p-2 space-y-1">
          <Link
            to="/farmer/settings"
            className={clsx('sidebar-link sidebar-link-inactive', collapsed && 'justify-center px-2')}
            title={collapsed ? 'Settings' : undefined}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">Settings</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={clsx(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all',
              collapsed && 'justify-center px-2'
            )}
            title={collapsed ? 'Sign Out' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className={clsx('flex-1 flex flex-col transition-all duration-300', collapsed ? 'ml-16' : 'ml-64')}>

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-kd-green-100 h-16 flex items-center px-6 gap-4">
          <div className="flex-1">
            <h1 className="text-base font-semibold text-kd-earth">
              {navItems.find(n => n.to === location.pathname)?.label || 'Dashboard'}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Cart */}
            {type === 'buyer' && (
              <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-kd-amber-500 text-kd-earth text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Browse */}
            <Link to="/browse" className="hidden sm:flex btn-outline btn-sm">
              Browse Market
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
