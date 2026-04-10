import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const HotelBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    guests: '',
    date: '',
    time: '',
    specialRequest: '',
    preOrderItems: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const WHATSAPP_NUMBER = "918489822822"; 

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    let message = `*🏨 New Table Booking Request - Waalai Mess 🏨*\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Number of Guests:* ${formData.guests}\n`;
    message += `*Date:* ${formData.date}\n`;
    message += `*Time:* ${formData.time}\n`;
    
    if (formData.preOrderItems) {
      message += `*Pre-ordered Items:* ${formData.preOrderItems}\n`;
    }
    
    if (formData.specialRequest) {
      message += `*Special Request:* ${formData.specialRequest}\n`;
    }

    message += `\n*⚠️ Note:* I understand that table bookings and pre-orders must be made at least *one day* in advance.\n`;
    message += `\nPlease confirm my organic dining booking!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="page-padding">
      <div className="container" style={{ maxWidth: '800px' }}>
        <Breadcrumbs pageName="Book a Table" />
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'var(--color-dark-green)', marginBottom: '16px' }}>Book Your Table</h1>
          <p style={{ color: 'var(--color-earth-brown)', fontSize: '1.2rem', marginBottom: '16px' }}>
            Reserve your spot at Waalai Mess and enjoy our authentic dining experience without any wait.
          </p>
          <div style={{ 
            backgroundColor: 'rgba(255,193,7,0.1)', 
            padding: '16px', 
            borderRadius: '12px', 
            border: '1px solid rgba(255,193,7,0.3)',
            color: '#856404',
            maxWidth: '600px',
            margin: '0 auto 24px auto',
            fontWeight: 600,
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>📅</span>
              <span>Important Booking Details:</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '24px', fontSize: '0.95rem' }}>
              <li>Table bookings and pre-ordered items must be booked at least <strong>one day (24 hours)</strong> before your visit.</li>
              <li>This ensures we source and prepare the freshest organic ingredients for your meal.</li>
            </ul>
          </div>
          <p style={{ color: 'var(--color-secondary-green)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
            When you dine with us, you are guaranteed a meal completely free from artificial colors and preservatives. We serve all our food on fresh Waalai Elai (Banana leaves) strictly adhering to traditional Tamil health practices.
          </p>
        </div>

        <form onSubmit={handleBooking} style={{ 
          padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px',
          backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          borderTop: '6px solid var(--color-primary-green)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>Full Name</label>
              <input type="text" name="name" className="input-field" required value={formData.name} onChange={handleChange} placeholder="Muthu Kumar" style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>Number of Guests</label>
              <input type="number" name="guests" className="input-field" required min="1" max="20" value={formData.guests} onChange={handleChange} placeholder="Eg. 4" style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }} />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>Date</label>
              <input type="date" name="date" className="input-field" required value={formData.date} onChange={handleChange} style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>Time</label>
              <input type="time" name="time" className="input-field" required value={formData.time} onChange={handleChange} style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>Pre-order Items (Optional)</label>
            <textarea name="preOrderItems" className="input-field" rows="3" value={formData.preOrderItems} onChange={handleChange} placeholder="E.g. 2 Mutton Biryani, 1 Chicken 65 Bucket..." style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }}></textarea>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary-green)', marginTop: '4px' }}>
              <strong>Note:</strong> Items must be pre-ordered at least one day before your visit for fresh preparation.
            </p>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>Special Requests / Dietary Requirements</label>
            <textarea name="specialRequest" className="input-field" rows="2" value={formData.specialRequest} onChange={handleChange} placeholder="E.g. No spicy, strictly organic..." style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }}></textarea>
          </div>

          <button type="submit" className="btn btn-primary" disabled={isProcessing} style={{ marginTop: '8px', fontSize: '1.2rem', padding: '16px', backgroundColor: 'var(--color-secondary-green)' }}>
            {isProcessing ? <Loader2 className="animate-spin" /> : "Confirm Over WhatsApp"}
          </button>
        </form>
      </div>

    </div>
  );
};

export default HotelBooking;
