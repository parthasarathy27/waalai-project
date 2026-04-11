import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CheckCircle2 } from 'lucide-react';

const SuccessOverlay = ({ isOpen, onClose, title = "Order Completed!", message = "Your healthy meal is being prepared with care." }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const checkRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        // Fade in overlay
        gsap.fromTo(overlayRef.current, 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.4, ease: 'power2.out' }
        );

        // Scale in content
        gsap.fromTo(contentRef.current, 
          { scale: 0.8, opacity: 0, y: 30 }, 
          { scale: 1, opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'back.out(1.7)' }
        );

        // Rotate and scale checkmark
        gsap.fromTo(checkRef.current, 
          { scale: 0, rotation: -45 }, 
          { scale: 1, rotation: 0, duration: 0.5, delay: 0.5, ease: 'back.out(2)' }
        );
      });

      return () => ctx.revert();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(27, 94, 32, 0.95)', // Waalai dark green with high opacity
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, backdropFilter: 'blur(10px)'
      }}
    >
      <div 
        ref={contentRef}
        style={{
          backgroundColor: 'white', padding: '60px 40px', borderRadius: '32px',
          textAlign: 'center', maxWidth: '450px', width: '90%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '4px solid var(--color-gold-accent)'
        }}
      >
        <div ref={checkRef} style={{ display: 'inline-block', marginBottom: '24px' }}>
          <CheckCircle2 size={100} color="var(--color-primary-green)" strokeWidth={3} />
        </div>
        
        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-dark-green)', marginBottom: '16px', fontFamily: "'Outfit', sans-serif" }}>
          {title}
        </h2>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--color-earth-brown)', marginBottom: '40px', lineHeight: 1.6 }}>
          {message}
        </p>
        
        <button 
          className="btn btn-primary" 
          onClick={onClose}
          style={{ padding: '16px 48px', fontSize: '1.2rem', minWidth: '200px' }}
        >
          Got it!
        </button>
      </div>

      {/* Decorative Floating Leaves or Confetti could be added here */}
    </div>
  );
};

export default SuccessOverlay;
