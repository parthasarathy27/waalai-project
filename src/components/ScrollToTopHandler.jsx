import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's no hash, scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
    } 
    // If there is a hash, let the browser handle it or scroll to element
    else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTopHandler;
