import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SuccessOverlay from '../components/SuccessOverlay';
import LocationPicker from '../components/LocationPicker';
import { MapPin } from 'lucide-react';

const CateringBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    eventType: 'Wedding',
    guests: '',
    date: '',
    location: '',
    requirements: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const WHATSAPP_NUMBER = "918489822822";

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    let message = `*🎉 New Catering Request - Waalai Mess 🎉*\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Event Type:* ${formData.eventType}\n`;
    message += `*Approx. Guests:* ${formData.guests}\n`;
    message += `*Event Date:* ${formData.date}\n`;
    message += `*Location:* ${formData.location}\n`;
    
    if (formData.requirements) {
      message += `*Specific Requirements:* ${formData.requirements}\n`;
    }
    
    message += `\nPlease provide me with a catering quote!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Clear data immediately
      setFormData({
        name: '',
        eventType: 'Wedding',
        guests: '',
        date: '',
        location: '',
        requirements: ''
      });
      
      // Auto-refresh after 4 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }, 500);
  };

  return (
    <div className="page-padding">
      <div className="container" style={{ maxWidth: '800px' }}>
        <Breadcrumbs pageName="Catering Services" />
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'var(--color-dark-green)', marginBottom: '16px' }}>Event Catering Services</h1>
          <p style={{ color: 'var(--color-earth-brown)', fontSize: '1.2rem', marginBottom: '16px' }}>
            From grand weddings to intimate gatherings, Waalai Mess provides premium customized catering solutions for your special day.
          </p>
          <p style={{ color: 'var(--color-secondary-green)', maxWidth: '650px', margin: '0 auto', fontSize: '1rem' }}>
            Hosting a major event? Do not sacrifice health for scale. We cater for thousands of guests while maintaining our strict adherence to traditional cooking methods and 100% natural ingredients, served flawlessly on real Banana Leaves.
          </p>
        </div>

        <form onSubmit={handleBooking} style={{ 
          padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px',
          backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          borderTop: '6px solid var(--color-gold-accent)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>Full Name</label>
              <input type="text" name="name" className="input-field" required value={formData.name} onChange={handleChange} placeholder="John Doe" style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>Event Type</label>
              <select name="eventType" className="input-field" value={formData.eventType} onChange={handleChange} style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }}>
                <option value="Wedding">Traditional Wedding</option>
                <option value="Birthday">Birthday Party</option>
                <option value="Corporate">Corporate Event</option>
                <option value="Ceremony">Family Ceremony</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>Expected Guest Count</label>
              <input type="number" name="guests" className="input-field" required min="10" value={formData.guests} onChange={handleChange} placeholder="Eg. 500" style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>Event Date</label>
              <input type="date" name="date" className="input-field" required value={formData.date} onChange={handleChange} style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }}/>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>Event Location / Venue</label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <button 
                type="button"
                onClick={() => setIsMapOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '12px',
                  backgroundColor: 'var(--color-bg-light)', border: '2px dashed var(--color-gold-accent)',
                  borderRadius: '12px', color: 'var(--color-earth-brown)', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.3s'
                }}
              >
                <MapPin size={20} />
                Select Venue on Map
              </button>
            </div>
            <input type="text" name="location" className="input-field" required value={formData.location} onChange={handleChange} placeholder="Eg. Mahal name in Madurai..." style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>Specific Menu Requirements</label>
            <textarea name="requirements" className="input-field" rows="4" value={formData.requirements} onChange={handleChange} placeholder="Eg. Need 200 Organic Veg meals on Banana leaves and 100 Chicken 65 buckets..." style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }}></textarea>
          </div>

          <button type="submit" className="btn btn-primary" disabled={isProcessing} style={{ marginTop: '16px', fontSize: '1.2rem', padding: '16px', backgroundColor: 'var(--color-primary-green)' }}>
            {isProcessing ? <Loader2 className="animate-spin" /> : "Request Fast Quote via WhatsApp"}
          </button>
        </form>
      </div>
      
      <SuccessOverlay 
        isOpen={showSuccess} 
        onClose={() => {
          setShowSuccess(false);
          window.location.reload();
        }} 
        title="Inquiry Sent!" 
        message="Thank you for choosing Waalai Mess for your grand event. We've received your inquiry and our event experts will contact you via WhatsApp soon."
      />

      <LocationPicker 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        onLocationSelect={(data) => {
          setFormData({ ...formData, location: data.address });
          setIsMapOpen(false);
        }} 
      />
    </div>
  );
};

export default CateringBooking;
