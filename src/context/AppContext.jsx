import { createContext, useContext, useReducer, useCallback } from 'react';
import { PRODUCTS } from '../data/mockData';

const AppContext = createContext(null);

const initialState = {
  // Auth
  user: null,
  isAuthenticated: false,
  role: null, // 'farmer' | 'buyer' | 'admin'

  // Cart
  cart: [],

  // Wishlist
  wishlist: [],

  // Notifications
  notifications: [
    { id: 'n1', type: 'order',   title: 'New order received!',   body: 'Order #ORD2026001 from Priya Sharma', read: false, time: '2 min ago' },
    { id: 'n2', type: 'payment', title: 'Payment credited',       body: '₹1,800 added to your wallet',         read: false, time: '1 hr ago'  },
    { id: 'n3', type: 'price',   title: 'Tomato prices rising',   body: 'Expected +15% increase this week',    read: true,  time: '3 hr ago'  },
    { id: 'n4', type: 'weather', title: 'Rain alert tomorrow',    body: 'Heavy rain forecast for Anand area',  read: true,  time: '5 hr ago'  },
  ],

  // UI
  toast: null,
  searchQuery: '',
  language: 'en',
};

function reducer(state, action) {
  switch (action.type) {

    // ── Auth ──
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        role: action.payload.role,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        role: null,
        cart: [],
        wishlist: [],
      };

    // ── Cart ──
    case 'ADD_TO_CART': {
      const existing = state.cart.find(i => i.productId === action.payload.productId);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(i =>
            i.productId === action.payload.productId
              ? { ...i, qty: Math.min(i.qty + action.payload.qty, 100) }
              : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    }

    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.productId !== action.payload) };

    case 'UPDATE_CART_QTY':
      return {
        ...state,
        cart: state.cart.map(i =>
          i.productId === action.payload.productId
            ? { ...i, qty: Math.max(1, action.payload.qty) }
            : i
        ),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    // ── Wishlist ──
    case 'TOGGLE_WISHLIST': {
      const inWishlist = state.wishlist.includes(action.payload);
      return {
        ...state,
        wishlist: inWishlist
          ? state.wishlist.filter(id => id !== action.payload)
          : [...state.wishlist, action.payload],
      };
    }

    // ── Toast ──
    case 'SHOW_TOAST':
      return { ...state, toast: action.payload };

    case 'HIDE_TOAST':
      return { ...state, toast: null };

    // ── Search ──
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };

    // ── Notifications ──
    case 'MARK_NOTIF_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };

    case 'MARK_ALL_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
      };

    // ── Language ──
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ── Auth actions ──
  const login = useCallback((user, role) => {
    dispatch({ type: 'LOGIN', payload: { user, role } });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  // ── Cart actions ──
  const addToCart = useCallback((productId, qty = 1) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId,
        name: product.name,
        price: product.price,
        unit: product.unit,
        farmer: product.farmer,
        image: product.images[0],
        qty,
      },
    });
    showToast('Added to cart!', 'success');
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  }, []);

  const updateCartQty = useCallback((productId, qty) => {
    dispatch({ type: 'UPDATE_CART_QTY', payload: { productId, qty } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  // ── Wishlist actions ──
  const toggleWishlist = useCallback((productId) => {
    const inWishlist = state.wishlist.includes(productId);
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
    showToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!', 'info');
  }, [state.wishlist]);

  // ── Toast actions ──
  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    dispatch({ type: 'SHOW_TOAST', payload: { id, message, type } });
    setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), duration);
  }, []);

  // ── Computed values ──
  const cartCount = state.cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const unreadCount = state.notifications.filter(n => !n.read).length;

  const value = {
    ...state,
    // Actions
    login,
    logout,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    toggleWishlist,
    showToast,
    dispatch,
    // Computed
    cartCount,
    cartTotal,
    unreadCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export default AppContext;
