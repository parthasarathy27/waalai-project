import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, categories } from '../data/products';
import { Plus, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Menu = ({ onAddToCart, typeFilter }) => {
  const getInitialCategory = () => {
    if (typeFilter === 'nonveg') return "1KG Non-Veg";
    if (typeFilter === 'veg') return "1KG Veg";
    if (typeFilter === 'pathiya') return "Pathiya Sapadu";
    return "All";
  };

  const [activeCategory, setActiveCategory] = useState(getInitialCategory());
  
  // Customization state
  const [selectedStyles, setSelectedStyles] = useState({}); // { id: 'Fry' | 'Semi-Gravy' }
  const [selectedWeights, setSelectedWeights] = useState({}); // { id: 1, 2, 3... }
  const [selectedTypes, setSelectedTypes] = useState({}); // { id: 'Chicken Biryani' }

  const handleStyleChange = (productId, style) => {
    setSelectedStyles(prev => ({ ...prev, [productId]: style }));
  };

  const handleWeightChange = (productId, weight) => {
    setSelectedWeights(prev => ({ ...prev, [productId]: Math.max(1, weight) })); // Enforce min 1KG
  };

  const handleTypeChange = (productId, type) => {
    setSelectedTypes(prev => ({ ...prev, [productId]: type }));
  };

  const menuRef = useRef(null);

  // Filter based on activeCategory
  const filteredProducts = products.filter(p => {
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  useEffect(() => {
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
          <h2 style={{ color: 'var(--color-dark-green)', marginBottom: '16px', fontSize: '2.5rem' }}>
            {typeFilter === 'veg' ? 'Pure Organic Veg Menu' : typeFilter === 'nonveg' ? 'Traditional Non-Veg Menu' : 'Authentic Menu'}
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-earth-brown)' }}>
            Exploring our completely authentic traditional recipes.
          </p>
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '32px' 
        }}>
          {filteredProducts.map(product => {
            const currentStyle = selectedStyles[product.id] || (product.canChooseStyle ? 'Semi-Gravy' : '');
            const currentType = selectedTypes[product.id] || (product.canChooseType ? product.typeOptions[0] : '');
            const currentWeight = selectedWeights[product.id] || (product.isWeightBased ? 1 : 1);
            
            // Calculate Type Price
            let basePrice = product.price;
            if (product.typePrices && currentType && product.typePrices[currentType]) {
              basePrice = product.typePrices[currentType];
            }

            // Apply Weight Multiplier
            let calculatedPrice = basePrice;
            if (product.isWeightBased) {
              calculatedPrice = Math.round(basePrice * currentWeight);
            }

            return (
              <div key={product.id} className="menu-item glass" style={{ 
                borderRadius: 'var(--border-radius)', 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                backgroundColor: 'white',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span className={`badge ${product.isVeg ? 'badge-veg' : 'badge-non-veg'}`}>
                      <div className="food-icon-box">
                        <div className="food-icon-dot"></div>
                      </div>
                      {product.isVeg ? 'VEG' : 'NON-VEG'}
                    </span>
                  </div>
                </div>
                
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', color: 'var(--color-text-dark)' }}>{product.name}</h3>
                  
                  {/* Tamil Name in Leaf Format */}
                  {product.tamilName && (
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        backgroundColor: 'var(--color-primary-green)', 
                        color: 'white', 
                        padding: '4px 12px', 
                        fontSize: '0.85rem', 
                        fontWeight: 700, 
                        borderRadius: '0 12px 0 12px', // Leaf shape
                        boxShadow: '0 2px 8px rgba(87, 182, 5, 0.2)'
                      }}>
                        <Leaf size={14} /> {product.tamilName}
                      </span>
                    </div>
                  )}

                  <p style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--color-text-light)', minHeight: '40px' }}>{product.description}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    
                    {/* Size Selector for Weight Based */}
                    {product.isWeightBased && (
                      <div style={{ padding: '12px', backgroundColor: 'var(--color-bg-light)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-earth-brown)', marginBottom: '8px', display: 'block', textTransform: 'uppercase' }}>
                          Select Quantity (Min 1 KG)
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <button onClick={() => handleWeightChange(product.id, currentWeight - 1)}
                                  style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', backgroundColor: '#e2e8f0', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                          <span style={{ fontSize: '1.2rem', fontWeight: 800, flex: 1, textAlign: 'center' }}>{currentWeight} KG</span>
                          <button onClick={() => handleWeightChange(product.id, currentWeight + 1)}
                                  style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-primary-green)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                        </div>
                      </div>
                    )}

                    {/* Quantity count for Non-Weight Based (like Parotta, Idly) */}
                    {!product.isWeightBased && product.price > 0 && (
                      <div style={{ padding: '12px', backgroundColor: 'var(--color-bg-light)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-earth-brown)', marginBottom: '8px', display: 'block', textTransform: 'uppercase' }}>
                          Select Pieces/Sets
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <button onClick={() => handleWeightChange(product.id, currentWeight - 1)}
                                  style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', backgroundColor: '#e2e8f0', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                          <span style={{ fontSize: '1.2rem', fontWeight: 800, flex: 1, textAlign: 'center' }}>{currentWeight} Plt</span>
                          <button onClick={() => handleWeightChange(product.id, currentWeight + 1)}
                                  style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-primary-green)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                        </div>
                      </div>
                    )}

                    {/* Variation Selector (Biryani/Fried Rice) */}
                    {product.canChooseType && (
                      <div style={{ padding: '12px', backgroundColor: 'rgba(255, 193, 7, 0.04)', borderRadius: '12px', border: '1px solid rgba(255, 193, 7, 0.15)' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-earth-brown)', marginBottom: '10px', display: 'block', textTransform: 'uppercase' }}>
                          Select Type
                        </label>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {product.typeOptions.map(type => (
                            <button
                              key={type}
                              onClick={() => handleTypeChange(product.id, type)}
                              style={{
                                flex: 1, padding: '8px 12px', fontSize: '0.8rem', fontWeight: 700, borderRadius: '8px',
                                border: `2px solid ${currentType === type ? '#fca311' : 'rgba(0,0,0,0.05)'}`,
                                backgroundColor: currentType === type ? 'white' : 'transparent',
                                color: currentType === type ? '#fca311' : '#666',
                                cursor: 'pointer', transition: 'all 0.2s',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Style Choice */}
                    {product.canChooseStyle && (
                      <div style={{ padding: '12px', backgroundColor: 'rgba(76, 171, 76, 0.04)', borderRadius: '12px', border: '1px solid rgba(76, 171, 76, 0.1)' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-earth-brown)', marginBottom: '10px', display: 'block', textTransform: 'uppercase' }}>
                          Preparation Style
                        </label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {['Semi-Gravy', 'Fry'].map(style => (
                            <button
                              key={style}
                              onClick={() => handleStyleChange(product.id, style)}
                              style={{
                                flex: 1, padding: '8px', fontSize: '0.8rem', fontWeight: 700, borderRadius: '8px',
                                border: `2px solid ${currentStyle === style ? 'var(--color-primary-green)' : 'rgba(0,0,0,0.05)'}`,
                                backgroundColor: currentStyle === style ? 'white' : 'transparent',
                                color: currentStyle === style ? 'var(--color-primary-green)' : '#666',
                                cursor: 'pointer', transition: 'all 0.2s'
                              }}
                            >
                              {style}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.8rem', color: '#999', fontWeight: 600 }}>Total Rate</span>
                      <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-dark-green)' }}>
                        ₹{calculatedPrice}
                      </span>
                    </div>
                    <button 
                      style={{ 
                        padding: '12px 24px', 
                        fontSize: '1rem', 
                        backgroundColor: 'var(--color-primary-green)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 800,
                        boxShadow: '0 6px 20px rgba(76, 171, 76, 0.3)'
                      }}
                      onClick={() => {
                        let finalCustomization = "";
                        if (product.canChooseType && currentType) {
                          finalCustomization += currentType;
                        }
                        if (product.canChooseStyle && currentStyle) {
                          finalCustomization += (finalCustomization ? ` | ${currentStyle}` : currentStyle);
                        }
                        onAddToCart({ ...product, price: basePrice }, finalCustomization, currentWeight);
                      }}
                    >
                      <Plus size={18} /> Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Menu;
