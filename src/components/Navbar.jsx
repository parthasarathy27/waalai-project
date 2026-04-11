import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import logoUrl from '../assets/waalai_logo.png';

const Navbar = ({ cartItemCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Order Online', path: '/order' },
    { name: 'Table Booking', path: '/booking' },
    { name: 'Catering', path: '/catering' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: '12px',
      left: '12px',
      right: '12px',
      zIndex: 1000,
      padding: '8px 0',
      borderRadius: '16px',
      border: '1px solid rgba(46, 125, 50, 0.2)', // Organic green border
      backgroundColor: 'rgba(253, 250, 246, 0.98)', // Slightly more opaque warm sand
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Real Logo integration */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src={logoUrl} alt="Waalai Mess & Caterers" style={{ height: '65px', objectFit: 'contain' }} />
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'none', gap: '28px', alignItems: 'center' }} className="desktop-menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => isActive ? 'nav-active' : ''}
              style={({ isActive }) => ({
                textDecoration: 'none',
                fontWeight: 600,
                color: isActive ? 'var(--color-secondary-green)' : 'var(--color-earth-brown)',
                borderBottom: isActive ? '3px solid var(--color-primary-green)' : '3px solid transparent',
                paddingBottom: '4px',
                transition: 'all 0.3s ease',
                fontSize: '1rem'
              })}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile menu logic & Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={onOpenCart}
            style={{
              position: 'relative',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-secondary-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ShoppingBag size={28} />
            {cartItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'var(--color-gold-accent)', // Changed from red to gold for better harmony
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translate(25%, -25%)'
              }}>
                {cartItemCount}
              </span>
            )}
          </button>
          
          <button 
            className="mobile-btn"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', color: 'var(--color-earth-brown)' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px', 
          padding: '12px 20px 24px 20px',
          borderTop: '1px solid rgba(46, 125, 50, 0.1)', 
          marginTop: '8px',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => isActive ? 'nav-active' : ''}
              style={({ isActive }) => ({
                textDecoration: 'none', 
                fontWeight: 600, 
                fontSize: '1.1rem',
                color: isActive ? 'var(--color-secondary-green)' : 'var(--color-earth-brown)',
                padding: '10px 0',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
              })}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}

      {/* Internal CSS for Mobile Visibility */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: flex !important; }
        }
        @media (max-width: 767px) {
          .mobile-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
