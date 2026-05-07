import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopHandler from './components/ScrollToTopHandler';
import Preloader from './components/Preloader';
import PageLoader from './components/PageLoader';

// Pages
import Home from './pages/Home';
import OnlineOrder from './pages/OnlineOrder';
import CateringBooking from './pages/CateringBooking';
import MagilVirundhu from './pages/MagilVirundhu';
import LeafBanner from './components/LeafBanner';
import Footer from './components/Footer';

function AppContent({ 
  cartItemCount, onOpenCart, handleAddToCart, 
  isCartOpen, setIsCartOpen, cartItems, 
  handleUpdateCartItem, handleRemoveCartItem, handleClearCart 
}) {
  const location = useLocation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <Navbar 
        cartItemCount={cartItemCount} 
        onOpenCart={onOpenCart} 
      />
      
      <ScrollToTopHandler />
      <ScrollToTop />
      
      <main key={location.pathname} className="page-fade-in" style={{ flex: 1 }}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<OnlineOrder onAddToCart={handleAddToCart} />} />
          <Route path="/catering" element={<CateringBooking />} />
          <Route path="/magil-virundhu" element={<MagilVirundhu />} />
        </Routes>
      </main>

      <LeafBanner />
      <Footer />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateCartItem={handleUpdateCartItem}
        onRemoveCartItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product, customization = '', addedQuantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        item.customization === customization
      );
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.customization === customization)
            ? { ...item, quantity: item.quantity + addedQuantity }
            : item
        );
      }
      return [...prev, { ...product, quantity: addedQuantity, customization: customization }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartItem = (id, customization, updates) => {
    setCartItems(prev => prev.map(item => 
      (item.id === id && item.customization === customization) ? { ...item, ...updates } : item
    ));
  };

  const handleRemoveCartItem = (id, customization) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.customization === customization)));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <Preloader />
      <PageLoader />
      <AppContent 
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        handleAddToCart={handleAddToCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
        handleUpdateCartItem={handleUpdateCartItem}
        handleRemoveCartItem={handleRemoveCartItem}
        handleClearCart={handleClearCart}
      />
    </BrowserRouter>
  );
}

export default App;
