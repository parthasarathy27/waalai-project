import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, categories } from '../data/products';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Menu = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const menuRef = useRef(null);
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  useEffect(() => {
    // Re-run animation when category changes
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-item', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: menuRef.current,
            start: 'top 80%',
          }
        }
      );
    }, menuRef);
    
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section id="menu-section" ref={menuRef} style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-light)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ color: 'var(--color-dark-green)', marginBottom: '16px', fontSize: '2.5rem' }}>Authentic Menu</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-earth-brown)' }}>Explore our authentically prepared traditional and contemporary recipes.</p>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {categories.map(category => (
            <button
              key={category}
              className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '32px' 
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} className="menu-item glass" style={{ 
              borderRadius: 'var(--border-radius)', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  <span className={`badge ${product.isVeg ? 'badge-veg' : 'badge-non-veg'}`}>
                    {product.isVeg ? 'VEG' : 'NON-VEG'}
                  </span>
                </div>
              </div>
              
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{product.name}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '16px', flex: 1 }}>{product.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-green)' }}>
                    ₹{product.price}
                  </span>
                  <button 
                    style={{ 
                      padding: '8px 20px', 
                      fontSize: '0.95rem', 
                      backgroundColor: 'var(--color-primary-green)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 600,
                      boxShadow: '0 4px 10px rgba(76, 171, 76, 0.3)'
                    }}
                    onClick={() => onAddToCart(product)}
                  >
                    <Plus size={16} /> Add to Leaf
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
