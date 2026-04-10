import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import OnlineOrder from './pages/OnlineOrder';
import HotelBooking from './pages/HotelBooking';
import CateringBooking from './pages/CateringBooking';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, customization: '' }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartItem = (id, updates) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleRemoveCartItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
        <Navbar 
          cartItemCount={cartItemCount} 
          onOpenCart={() => setIsCartOpen(true)} 
        />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/order" element={<OnlineOrder onAddToCart={handleAddToCart} />} />
            <Route path="/booking" element={<HotelBooking />} />
            <Route path="/catering" element={<CateringBooking />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        <Cart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateCartItem={handleUpdateCartItem}
          onRemoveCartItem={handleRemoveCartItem}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
