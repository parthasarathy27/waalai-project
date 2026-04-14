import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import OnlineOrder from './pages/OnlineOrder';
import CateringBooking from './pages/CateringBooking';
import MagilVirundhu from './pages/MagilVirundhu';
import LeafBanner from './components/LeafBanner';
import Footer from './components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product, customization = '', addedQuantity = 1) => {
    setCartItems(prev => {
      // Find if same item with SAME customization exists
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
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
        <Navbar 
          cartItemCount={cartItemCount} 
          onOpenCart={() => setIsCartOpen(true)} 
        />
        
        <ScrollToTop />
        
        <main style={{ flex: 1 }}>
          <Routes>
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
    </BrowserRouter>
  );
}

export default App;
