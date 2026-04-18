import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, UtensilsCrossed } from 'lucide-react';
import logoUrl from '../assets/waalai_logo.png';
import WaalaiText from '../components/WaalaiText';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-dark-green)',
      color: 'white',
      padding: '80px 0 20px 0',
      marginTop: '0'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '60px'
      }}>
        {/* Brand Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <img src={logoUrl} alt="Waalai Mess Logo" style={{ height: '70px', objectFit: 'contain', alignSelf: 'flex-start' }} />
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: '1.6' }}>
            Rooted in the ancient Tamil wisdom of "Unave Marundhu", we serve authentic, 100% natural, and traditional food on traditional banana leaves.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h4 style={{ color: 'var(--color-gold-accent)', fontSize: '1.25rem', fontWeight: 700 }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Home</Link>
            <Link to="/order" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Online Order</Link>
            <Link to="/order?type=pathiya" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Pathiya Sapadu (Dietary)</Link>
            <Link to="/magil-virundhu" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UtensilsCrossed size={16} /> Magil Virundhu
            </Link>
            <Link to="/catering" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Catering Services</Link>
            <a href="/#contact" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Contact Us</a>
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h4 style={{ color: 'var(--color-gold-accent)', fontSize: '1.25rem', fontWeight: 700 }}>Contact Details</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <MapPin size={20} color="var(--color-banana-leaf)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.9rem', marginBottom: '8px' }}>
                  <strong>Main Branch:</strong> 12, Lady Doak College Rd, Chinna Chokikulam, Madurai, Tamil Nadu 625002.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.9rem' }}>
                  <strong>Anna Nagar:</strong> No:187, 80 Feet Rd, opp. DD Designs, Near Ambiga Cinemas, Anna Nagar, Sathamangalam, Tamil Nadu 625020.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Phone size={20} color="var(--color-banana-leaf)" />
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                <a href="tel:9367757775" style={{ color: 'inherit', textDecoration: 'none' }}>93677 57775</a>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Mail size={20} color="var(--color-banana-leaf)" />
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                <a href="mailto:waalaifamilycaterers@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>waalaifamilycaterers@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Section */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '20px',
        textAlign: 'center',
        paddingBottom: '20px'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
            © {new Date().getFullYear()} <WaalaiText style={{filter: 'brightness(0.8)'}}/> Mess & Caterers. All Rights Reserved.
          </p>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em' }}>
            Proudly Developed & Designed by <a href="#" style={{ color: 'var(--color-gold-accent)', textDecoration: 'none', fontWeight: 800, borderBottom: '2px solid var(--color-gold-accent)', paddingBottom: '2px' }}>Jodtech Company</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
