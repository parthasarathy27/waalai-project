import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ pageName }) => {
  const location = useLocation();
  
  if (location.pathname === '/') return null;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      backgroundColor: 'var(--color-bg-light)',
      padding: '24px 0',
      borderBottom: '1px solid var(--color-border)',
      marginBottom: '40px'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h2 style={{ 
          color: 'var(--color-dark-green)', 
          fontSize: '1.8rem',
          margin: 0,
          fontWeight: 700
        }}>
          {pageName}
        </h2>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.95rem',
          fontWeight: 500
        }}>
          <Link to="/" style={{ color: 'var(--color-secondary-green)', textDecoration: 'none' }}>
            Home
          </Link>
          <ChevronRight size={16} color="var(--color-text-light)" />
          <span style={{ color: 'var(--color-earth-brown)' }}>{pageName}</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
