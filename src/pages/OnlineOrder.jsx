import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import { products } from '../data/products';
import Breadcrumbs from '../components/Breadcrumbs';

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
      <div className="container">
        <Breadcrumbs pageName="Order Food Online" />
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'var(--color-dark-green)', marginBottom: '16px' }}>Organic Online Order</h1>
          <p style={{ color: 'var(--color-earth-brown)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Freshly prepared without artificial flavors. Get your authentic Waalai dishes delivered hot and fresh directly to your door.
          </p>
        </div>
      </div>
      <Menu onAddToCart={onAddToCart} typeFilter={searchParams.get('type')} />
    </div>
  );
};

export default OnlineOrder;
