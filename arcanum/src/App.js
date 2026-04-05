import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import Footer from './components/Footer';
import Home from './pages/Home';
import './index.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [added, setAdded] = useState({});
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [installEvent, setInstallEvent] = useState(null);

  // ✅ NEW: Offline state
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  /* Custom cursor */
  useEffect(() => {
    const cur = document.getElementById('cursor');
    if (!cur) return;
    const move = (e) => {
      cur.style.left = e.clientX + 'px';
      cur.style.top  = e.clientY + 'px';
    };
    const over = () => cur.classList.add('hovering');
    const out  = () => cur.classList.remove('hovering');
    document.addEventListener('mousemove', move);
    const els = document.querySelectorAll('button, a');
    els.forEach((el) => {
      el.addEventListener('mouseenter', over);
      el.addEventListener('mouseleave', out);
    });
    return () => document.removeEventListener('mousemove', move);
  });

  /* PWA install prompt */
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallEvent(e); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // ✅ NEW: Listen for online/offline changes
  useEffect(() => {
    const goOffline = () => setIsOffline(true);
    const goOnline = () => setIsOffline(false);

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2600);
  }, []);

  // ✅ UPDATED: Block adding when offline
  const addToCart = useCallback((product) => {
    if (!navigator.onLine) {
      showToast("You are offline. Cannot add items.");
      return;
    }

    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      return ex
        ? prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
    });

    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1200);

    showToast(`"${product.title}" added to your collection`);
  }, [showToast]);

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const handleInstall = () => {
    if (!installEvent) return;
    installEvent.prompt();
    installEvent.userChoice.then(() => setInstallEvent(null));
  };

  return (
    <>
      {/* Cursor */}
      <div className="cursor" id="cursor" />

      {/* ✅ OFFLINE MODE */}
      {isOffline ? (
        <>
          <Navbar
            cartCount={cartCount}
            onCartOpen={() => setCartOpen(true)}
            onMenuOpen={() => setMenuOpen(true)}
          />

          <h2 style={{ textAlign: "center", marginTop: "20px" }}>
            You are offline
          </h2>

          {/* ONLY CART visible */}
          <CartDrawer
            open={true}
            cart={cart}
            onRemove={removeFromCart}
            onClose={() => {}}
            onToast={showToast}
          />

          <Toast message={toast} visible={toastVisible} />
        </>
      ) : (
        <>
          {/* Mobile menu */}
          <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

          {/* Navbar */}
          <Navbar
            cartCount={cartCount}
            onCartOpen={() => setCartOpen(true)}
            installEvent={installEvent}
            onInstall={handleInstall}
            onMenuOpen={() => setMenuOpen(true)}
          />

          {/* Main page */}
          <Home
            onAddToCart={addToCart}
            addedMap={added}
            filter={filter}
            setFilter={setFilter}
            onToast={showToast}
          />

          {/* Cart drawer */}
          <CartDrawer
            open={cartOpen}
            cart={cart}
            onRemove={removeFromCart}
            onClose={() => setCartOpen(false)}
            onToast={showToast}
          />

          <Toast message={toast} visible={toastVisible} />

          <Footer />
        </>
      )}
    </>
  );
};

export default App;