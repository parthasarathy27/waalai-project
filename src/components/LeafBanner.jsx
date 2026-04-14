import React from 'react';
import leafImg from '../assets/banners/waalai_leaf.png';

const LeafBanner = () => {
  return (
    <div style={{ 
      width: '100%', 
      backgroundColor: 'var(--color-warm-sand)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '40px 0',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <img 
          src={leafImg} 
          alt="Waalai Traditional Leaf" 
          style={{ 
            maxWidth: '100%', 
            height: 'auto', 
            maxHeight: '400px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
          }} 
        />
      </div>
    </div>
  );
};

export default LeafBanner;
