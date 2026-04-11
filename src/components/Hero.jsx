import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo('.hero-title', 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 }
      );
      
      gsap.fromTo('.hero-subtitle',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );
      
      gsap.fromTo('.hero-btn',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 1 }
      );

      // Scroll parallax
      gsap.to('.hero-bg', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingTop: '100px', // clearing the fixed navbar
      paddingBottom: '40px'
    }}>
      {/* Background Image */}
      <div className="hero-bg" style={{
        position: 'absolute',
        top: '-10%',
        left: 0,
        width: '100%',
        height: '120%',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1920&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1
      }} />

      <div ref={textRef} className="container" style={{ textAlign: 'center', color: 'white', zIndex: 1 }}>
        <h1 className="hero-title hero-responsive-title" style={{ 
          color: 'white', 
          marginBottom: '24px', 
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          lineHeight: 1.1
        }}>
          Authentic Taste of <br/>
          <span style={{ color: 'var(--color-primary-green)' }}>Waalai</span> Mess
        </h1>
        <p className="hero-subtitle hero-responsive-subtitle" style={{ 
          color: '#f8fafc', 
          fontSize: '1.25rem', 
          maxWidth: '600px', 
          margin: '0 auto 40px', 
          textShadow: '0 2px 10px rgba(0,0,0,0.5)' 
        }}>
          Experience the finest Veg & Non-Veg catering services. From our signature biryanis to authentic 1KG buckets, delivered fresh to your door.
        </p>
        <button 
          className="btn btn-primary hero-btn" 
          style={{ padding: '16px 40px', fontSize: '1.2rem' }}
          onClick={() => {
            const menuSection = document.getElementById('menu-section');
            if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore Menu
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-responsive-title {
            font-size: 2.2rem !important;
            margin-bottom: 16px !important;
          }
          .hero-responsive-subtitle {
            font-size: 1rem !important;
            margin-bottom: 30px !important;
          }
          .hero-btn {
            padding: 12px 32px !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
