import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

const Preloader = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('waalai_loaded');
    if (!hasLoaded) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('waalai_loaded', 'true');
      }, 800); // Reduced from 1200ms to 800ms
      return () => clearTimeout(timer);
    }
  }, []);



  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      transition: 'opacity 0.6s ease, visibility 0.6s ease',
      opacity: loading ? 1 : 0,
      visibility: loading ? 'visible' : 'hidden'
    }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Pulsing circles */}
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '2px solid var(--color-primary-green)',
          opacity: 0.2,
          animation: 'pulse-loader 2s infinite ease-out'
        }} />
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '2px solid var(--color-primary-green)',
          opacity: 0.1,
          animation: 'pulse-loader 2s infinite ease-out 1s'
        }} />
        
        {/* Main Icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'bounce-loader 2s infinite ease-in-out'
        }}>
          <Leaf size={64} color="var(--color-primary-green)" />
        </div>
      </div>
      
      <h2 style={{ 
        marginTop: '32px', 
        color: 'var(--color-dark-green)', 
        letterSpacing: '3px',
        fontWeight: 800,
        fontSize: '1.2rem',
        textTransform: 'uppercase'
      }}>
        Waalai Mess
      </h2>
      <p style={{ 
        marginTop: '8px', 
        color: 'var(--color-earth-brown)', 
        opacity: 0.6,
        fontSize: '0.9rem'
      }}>
        Preparing your traditional feast...
      </p>

      <style>{`
        @keyframes pulse-loader {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes bounce-loader {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
