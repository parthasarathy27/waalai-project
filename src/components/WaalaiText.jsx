import React from 'react';
import textLogoUrl from '../assets/waalai_text.png';

const WaalaiText = ({ style = {}, className = "" }) => {
  return (
    <img 
      src={textLogoUrl} 
      alt="Waalai" 
      className={className}
      style={{ 
        height: '1.2em', // Scale relative to surrounding text size
        verticalAlign: 'bottom', // Align with baseline
        transform: 'translateY(-0.1em)', // Fine-tune vertical positioning
        objectFit: 'contain',
        marginRight: '0.1em', // Small space after the word
        ...style 
      }} 
    />
  );
};

export default WaalaiText;
