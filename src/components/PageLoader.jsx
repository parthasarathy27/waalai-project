import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const PageLoader = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only show for non-initial loads (Preloader handles initial)
    const hasLoaded = sessionStorage.getItem('waalai_loaded');
    if (!hasLoaded) return;

    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 800); // Quick transition

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#ffffff', // Solid white screen
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10001,
      animation: 'fadeInOut 0.8s ease-in-out forwards',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse-center 0.8s infinite'
        }}>
          <Leaf size={48} color="var(--color-primary-green)" />
        </div>
      </div>

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes pulse-center {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
