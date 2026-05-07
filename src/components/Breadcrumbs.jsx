import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ pageName }) => {
  const location = useLocation();
  
  if (location.pathname === '/') return null;

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#f8fdf8',
      borderBottom: '1px solid rgba(46, 125, 50, 0.12)',
      padding: '18px 0',
      marginBottom: '0',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        {/* Page title left */}
        <h2 style={{ 
          color: 'var(--color-dark-green)', 
          fontSize: '1.5rem',
          margin: 0,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          {pageName}
        </h2>

        {/* Breadcrumb trail right */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.9rem',
          fontWeight: 500,
        }}>
          <Link to="/" style={{ 
            color: 'var(--color-secondary-green)', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Home size={14} />
            Home
          </Link>
          <ChevronRight size={14} color="var(--color-text-light)" />
          <span style={{ 
            color: 'var(--color-earth-brown)',
            fontWeight: 600,
          }}>
            {pageName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
