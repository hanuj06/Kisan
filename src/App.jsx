import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Eager load
import Landing       from './pages/Landing';
import Login         from './pages/Login';
import Cart          from './pages/Cart';
import Checkout      from './pages/Checkout';

// Lazy load heavier pages
const Browse          = lazy(() => import('./pages/Browse'));
const ProductDetail   = lazy(() => import('./pages/ProductDetail'));
const MarketPrices    = lazy(() => import('./pages/MarketPrices'));

// Farmer pages
const FarmerDashboard = lazy(() => import('./pages/farmer/Dashboard'));
const FarmerProducts  = lazy(() => import('./pages/farmer/Products'));
const FarmerOrders    = lazy(() => import('./pages/farmer/Orders'));
const FarmerAnalytics = lazy(() => import('./pages/farmer/Analytics'));
const FarmerWallet    = lazy(() => import('./pages/farmer/Wallet'));

// Buyer pages
const BuyerDashboard  = lazy(() => import('./pages/buyer/Dashboard'));
const BuyerOrders     = lazy(() => import('./pages/buyer/Orders'));
const BuyerWishlist   = lazy(() => import('./pages/buyer/Wishlist'));

// Loading spinner
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-kd-paper">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-kd-green-700 flex items-center justify-center animate-pulse">
          <span className="text-2xl">🌿</span>
        </div>
        <div className="space-y-2 text-center">
          <div className="h-1 w-32 bg-kd-green-200 rounded-full overflow-hidden">
            <div className="h-full bg-kd-green-700 rounded-full animate-bounce-slide" />
          </div>
          <p className="text-xs text-gray-400 font-medium">Kisan Direct</p>
        </div>
      </div>
    </div>
  );
}

// Protected route
function ProtectedFarmer({ children }) {
  const { isAuthenticated, user } = useApp();
  if (!isAuthenticated) return <Navigate to="/login?mode=login&role=farmer" replace />;
  return children;
}

function ProtectedBuyer({ children }) {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public */}
        <Route path="/"              element={<Landing />} />
        <Route path="/login"         element={<Login />} />
        <Route path="/browse"        element={<Browse />} />
        <Route path="/product/:id"   element={<ProductDetail />} />
        <Route path="/market-prices" element={<MarketPrices />} />
        <Route path="/cart"          element={<Cart />} />
        <Route path="/checkout"      element={<Checkout />} />

        {/* Farmer dashboard */}
        <Route path="/farmer" element={<ProtectedFarmer><FarmerDashboard /></ProtectedFarmer>} />
        <Route path="/farmer/products" element={<ProtectedFarmer><FarmerProducts /></ProtectedFarmer>} />
        <Route path="/farmer/orders"   element={<ProtectedFarmer><FarmerOrders /></ProtectedFarmer>} />
        <Route path="/farmer/analytics" element={<ProtectedFarmer><FarmerAnalytics /></ProtectedFarmer>} />
        <Route path="/farmer/wallet"   element={<ProtectedFarmer><FarmerWallet /></ProtectedFarmer>} />

        {/* Buyer dashboard */}
        <Route path="/buyer"          element={<ProtectedBuyer><BuyerDashboard /></ProtectedBuyer>} />
        <Route path="/buyer/orders"   element={<ProtectedBuyer><BuyerOrders /></ProtectedBuyer>} />
        <Route path="/buyer/wishlist" element={<ProtectedBuyer><BuyerWishlist /></ProtectedBuyer>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
