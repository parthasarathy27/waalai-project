import React from 'react';
import textLogoDarkUrl from '../assets/waalai_text.png';
import textLogoWhiteUrl from '../assets/waalai-white.png';

const WaalaiText = ({ style = {}, className = "", white = false, scale = 1.4 }) => {
  const imgSrc = white ? textLogoWhiteUrl : textLogoDarkUrl;
  
  return (
    <img 
      src={imgSrc} 
      alt="Waalai" 
      className={className}
      style={{ 
        height: `${1.2 * scale}em`, // Scale relative to surrounding text size
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

