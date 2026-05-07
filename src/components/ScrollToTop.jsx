import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div 
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 1000,
        cursor: 'pointer',
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? '0' : '20px'}) scale(${isVisible ? '1' : '0.8'})`,
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div style={{
        position: 'relative',
        width: '65px',
        height: '65px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 8px 15px rgba(0,0,0,0.2))',
      }}>
        {/* The Banana Leaf SVG Background */}
        <svg 
          viewBox="0 0 100 100" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            transform: 'rotate(-15deg)', // Natural traditional tilt
          }}
        >
          <path 
            d="M50 95 C 40 85, 15 70, 10 45 C 5 20, 25 5, 50 15 C 75 5, 95 20, 90 45 C 85 70, 60 85, 50 95" 
            fill="var(--color-primary-green)"
          />
          {/* Leaf Vein Detail */}
          <path 
            d="M50 15 L 50 95" 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="2" 
            fill="none" 
          />
          <path 
            d="M50 30 Q 30 25, 15 35" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="1.5" 
            fill="none" 
          />
          <path 
            d="M50 50 Q 35 45, 20 60" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="1.5" 
            fill="none" 
          />
          <path 
            d="M50 30 Q 70 25, 85 35" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="1.5" 
            fill="none" 
          />
          <path 
            d="M50 50 Q 65 45, 80 60" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="1.5" 
            fill="none" 
          />
        </svg>

        {/* The Up Icon */}
        <ChevronUp 
          size={30} 
          color="white" 
          style={{ position: 'relative', zIndex: 1, marginTop: '-5px' }} 
        />
      </div>
    </div>
  );
};

export default ScrollToTop;
