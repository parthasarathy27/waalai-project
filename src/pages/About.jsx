import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Breadcrumbs from '../components/Breadcrumbs';
import WaalaiText from '../components/WaalaiText';

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fade-up', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="page-padding">
      <div className="container">
        <Breadcrumbs pageName="About Our Heritage" />
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ color: 'var(--color-dark-green)', fontSize: '3rem' }}>The <WaalaiText /> Heritage</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '16px auto 0', color: 'var(--color-earth-brown)' }}>
            A tradition of authentic flavors, bringing you the pure essence of traditional Tamil dining and catering.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div className="fade-up" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '-15px', width: '100%', height: '100%', border: '4px solid var(--color-primary-green)', borderRadius: '16px', zIndex: -1 }}></div>
            <img 
              src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop" 
              alt="Restaurant kitchen" 
              style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            />
          </div>
          <div className="fade-up">
            <h2 style={{ color: 'var(--color-secondary-green)', marginBottom: '24px', fontSize: '2rem' }}>Rooted in Tradition. Dedicated to Health.</h2>
            <p style={{ marginBottom: '20px', fontSize: '1.1rem', color: 'var(--color-earth-brown)', lineHeight: 1.8 }}>
              Founded on the ancient Tamil principle of "Unave Marundhu" (Food is Medicine), <WaalaiText /> Mess & Caterers was established to bring authentic heritage flavors to every table. We refuse to take shortcuts in our cooking. We source farm-fresh country ingredients, hand-grind our own masala spices, and cook slowly in traditional vessels.
            </p>
            <p style={{ marginBottom: '24px', fontSize: '1.1rem', color: 'var(--color-earth-brown)', lineHeight: 1.8 }}>
              Our chefs are masters of their craft. When you order our famous 1KG Biryani Bucket or sit down for a Veg Meal, you are guaranteed completely natural food—free from MSG, chemical preservatives, and artificial food coloring. Just pure, wholesome, incredible taste.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '32px' }}>
              <div style={{ backgroundColor: 'var(--color-warm-sand)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--color-primary-green)' }}>
                <h3 style={{ color: 'var(--color-dark-green)', fontSize: '2rem', marginBottom: '8px' }}>100%</h3>
                <p style={{ fontSize: '1rem', color: 'var(--color-earth-brown)', fontWeight: 600 }}>Traditional & Natural</p>
              </div>
              <div style={{ backgroundColor: 'var(--color-warm-sand)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--color-gold-accent)' }}>
                <h3 style={{ color: 'var(--color-dark-green)', fontSize: '2rem', marginBottom: '8px' }}>500+</h3>
                <p style={{ fontSize: '1rem', color: 'var(--color-earth-brown)', fontWeight: 600 }}>Events Catered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
