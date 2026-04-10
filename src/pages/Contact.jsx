import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const Contact = () => {
  return (
    <div className="page-padding">
      <div className="container" style={{ maxWidth: '1000px' }}>
        <Breadcrumbs pageName="Contact Us" />
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ color: 'var(--color-dark-green)', marginBottom: '16px', fontSize: '2.5rem' }}>Get in Touch</h1>
          <p style={{ color: 'var(--color-earth-brown)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            We'd love to hear from you. Find us at our organic restaurant in Madurai or reach out via WhatsApp for immediate assistance.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass" style={{ padding: '32px', display: 'flex', alignItems: 'flex-start', gap: '16px', borderRadius: '16px', backgroundColor: 'white', borderLeft: '4px solid var(--color-primary-green)' }}>
              <MapPin size={32} color="var(--color-primary-green)" style={{ flexShrink: 0 }} />
              <div>
                <h3 style={{ marginBottom: '8px', color: 'var(--color-dark-green)' }}>Our Branches</h3>
                <p style={{ color: 'var(--color-earth-brown)', marginBottom: '12px' }}>
                  <strong>Anna Nagar:</strong> Sathamangalam (Near Ambiga Cinemas), Madurai.
                </p>
                <p style={{ color: 'var(--color-earth-brown)' }}>
                  <strong>KK Nagar:</strong> KK Nagar Area, Madurai.
                </p>
              </div>
            </div>

            <div className="glass" style={{ padding: '32px', display: 'flex', alignItems: 'flex-start', gap: '16px', borderRadius: '16px', backgroundColor: 'white', borderLeft: '4px solid var(--color-gold-accent)' }}>
              <Phone size={32} color="var(--color-gold-accent)" style={{ flexShrink: 0 }} />
              <div>
                <h3 style={{ marginBottom: '8px', color: 'var(--color-dark-green)' }}>Phone Number</h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-earth-brown)' }}>084898 22822</p>
                <p style={{ fontSize: '0.9rem', marginTop: '4px', color: 'var(--color-secondary-green)' }}>Call us or message on WhatsApp instantly.</p>
              </div>
            </div>

            <div className="glass" style={{ padding: '32px', display: 'flex', alignItems: 'flex-start', gap: '16px', borderRadius: '16px', backgroundColor: 'white', borderLeft: '4px solid var(--color-earth-brown)' }}>
              <Clock size={32} color="var(--color-earth-brown)" style={{ flexShrink: 0 }} />
              <div>
                <h3 style={{ marginBottom: '8px', color: 'var(--color-dark-green)' }}>Timing</h3>
                <p style={{ color: 'var(--color-earth-brown)' }}>Monday - Sunday<br/>11:30 AM - 10:30 PM</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="glass" style={{ padding: '8px', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', backgroundColor: 'white' }}>
            <iframe 
              src="https://maps.google.com/maps?q=12+Lady+Doak+College+Rd+Chinna+Chokikulam+Madurai&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '8px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Waalai Mess Location"
            ></iframe>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
