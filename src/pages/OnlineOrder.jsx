import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import { products } from '../data/products';
import Breadcrumbs from '../components/Breadcrumbs';
import WaalaiText from '../components/WaalaiText';
import homecarekitchen from '../assets/homecarekitchen.jpg';

const OnlineOrder = ({ onAddToCart }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasProcessedParam = useRef(false);

  useEffect(() => {
    // Only process once per mount
    if (hasProcessedParam.current) return;

    const requestedItemName = searchParams.get('item');
    if (requestedItemName) {
      const product = products.find(p => p.name === requestedItemName);
      if (product) {
        hasProcessedParam.current = true;
        // Auto add to cart and open cart based on the passed intent from Home
        onAddToCart(product);
        // Clear param from URL so refresh doesn't add it again
        navigate('/order', { replace: true });
      }
    }
  }, [searchParams, navigate, onAddToCart]);

  return (
    <div className="page-padding">
      <Breadcrumbs pageName="Order Food Online" />
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'var(--color-dark-green)', marginBottom: '16px' }}>Online Food Delivery</h1>
          <p style={{ color: 'var(--color-earth-brown)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Freshly prepared without artificial flavors. Get your traditional <WaalaiText /> dishes delivered hot and fresh directly to your door.
          </p>
        </div>

        {/* Home Care Kitchen Banner */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          backgroundColor: 'white',
          borderRadius: '30px',
          overflow: 'hidden',
          boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
          marginBottom: '60px',
          border: '2px solid var(--color-gold-accent)'
        }}>
          <div style={{ flex: '1 1 40%', minHeight: '300px' }}>
            <img src={homecarekitchen} alt="Home Care Kitchen" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ padding: '40px', flex: '1 1 60%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ color: 'var(--color-primary-green)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Pure Quality</span>
            <h2 style={{ color: 'var(--color-dark-green)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '16px', lineHeight: 1.1 }}>Home Care Kitchen</h2>
            <p style={{ color: 'var(--color-earth-brown)', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Our kitchen strictly operates on the "Home Care" principle. Every dish is cooked using pristine ingredients, just like it's made for family. Nothing artificial, just pure culinary heritage.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <span style={{ backgroundColor: 'var(--color-warm-sand)', padding: '10px 20px', borderRadius: '50px', fontWeight: 600, color: 'var(--color-dark-green)', fontSize: '0.9rem' }}>No Ajinomoto</span>
              <span style={{ backgroundColor: 'var(--color-warm-sand)', padding: '10px 20px', borderRadius: '50px', fontWeight: 600, color: 'var(--color-dark-green)', fontSize: '0.9rem' }}>Wood-Pressed Oils</span>
              <span style={{ backgroundColor: 'var(--color-warm-sand)', padding: '10px 20px', borderRadius: '50px', fontWeight: 600, color: 'var(--color-dark-green)', fontSize: '0.9rem' }}>Fresh Daily</span>
            </div>
          </div>
        </div>
      </div>
      <Menu onAddToCart={onAddToCart} typeFilter={searchParams.get('type')} />
    </div>
  );
};

export default OnlineOrder;
