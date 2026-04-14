import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { Loader2, Users, CalendarDays, Clock4, UtensilsCrossed, MessageSquare, ChefHat, Leaf, Star, Beef, Soup, Drumstick, Fish, Utensils, Calendar, PartyPopper, Sparkles } from 'lucide-react';
import SuccessOverlay from '../components/SuccessOverlay';
import WaalaiText from '../components/WaalaiText';

const WHATSAPP_NUMBER = "918489822822";

const menuHighlights = [
  { name: "Mutton Kuzhambu", icon: <Beef size={24} />, desc: "Slow-cooked in tamarind & whole spices" },
  { name: "Nei Soru", icon: <Soup size={24} />, desc: "Ghee rice on fresh banana leaf" },
  { name: "Chicken Roast", icon: <Drumstick size={24} />, desc: "Authentic heritage dry masala" },
  { name: "Rasam & Kootu", icon: <Soup size={24} />, desc: "Traditional lentil & vegetable sides" },
  { name: "Fish Curry", icon: <Fish size={24} />, desc: "Fresh catch in tangy traditional gravy" },
  { name: "Payasam", icon: <Utensils size={24} />, desc: "Sweet jaggery dessert to finish" },
];

const MagilVirundhu = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '',
    date: '',
    time: '',
    occasion: '',
    preOrderItems: '',
    specialRequest: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    let message = `*🍛 New Magil Virundhu Booking - Waalai Mess 🍛*\n`;
    message += `_மகிழ் விருந்து - Traditional Feast Reservation_\n\n`;
    message += `*👤 Guest Name:* ${formData.name}\n`;
    message += `*📞 Phone:* ${formData.phone}\n`;
    message += `*👥 Number of Guests:* ${formData.guests}\n`;
    message += `*📅 Date:* ${formData.date}\n`;
    message += `*🕐 Time:* ${formData.time}\n`;
    if (formData.occasion) {
      message += `*🎉 Occasion:* ${formData.occasion}\n`;
    }
    if (formData.preOrderItems) {
      message += `\n*🍽️ Pre-ordered Dishes:*\n${formData.preOrderItems}\n`;
    }
    if (formData.specialRequest) {
      message += `\n*💬 Special Requests:* ${formData.specialRequest}\n`;
    }
    message += `\n*⚠️ I understand:* Magil Virundhu bookings must be made at least *one day (24 hours)* in advance for authentic fresh preparation on banana leaves.\n`;
    message += `\nPlease confirm my Magil Virundhu feast! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsProcessing(false);
      setShowSuccess(true);
      setFormData({
        name: '', phone: '', guests: '', date: '', time: '',
        occasion: '', preOrderItems: '', specialRequest: '',
      });
      setTimeout(() => { window.location.href = '/'; }, 4000);
    }, 500);
  };

  return (
    <div className="page-padding" style={{ overflowX: 'hidden', backgroundColor: 'var(--color-warm-sand)' }}>
      {/* ── BREADCRUMBS ── */}
      <Breadcrumbs pageName="Magil Virundhu" />

      {/* ── PAGE HEADER ── */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--color-dark-green)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <UtensilsCrossed size={36} /> மகிழ் விருந்து — Magil Virundhu
        </h1>
        <p style={{ color: 'var(--color-earth-brown)', fontSize: '1.2rem', marginBottom: '16px', maxWidth: '700px', margin: '0 auto 16px' }}>
          Experience the grandeur of an authentic traditional banana-leaf feast. Pre-book your table and let us prepare every dish fresh — cooked the traditional way, plated the traditional way.
        </p>
        {/* feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          {[
            { tag: 'Banana Leaf Service', icon: <Leaf size={14} /> },
            { tag: 'Zero Artificial Colors', icon: <Sparkles size={14} /> },
            { tag: '1-Day Advance Booking', icon: <Calendar size={14} /> },
            { tag: 'WhatsApp Confirmation', icon: <MessageSquare size={14} /> }
          ].map(item => (
            <span key={item.tag} style={{
              backgroundColor: 'rgba(46,125,50,0.08)',
              border: '1px solid rgba(46,125,50,0.2)',
              color: 'var(--color-dark-green)', borderRadius: '50px',
              padding: '6px 16px', fontSize: '0.85rem', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              {item.icon} {item.tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── MENU HIGHLIGHTS ── */}
      <div style={{ backgroundColor: 'white', padding: '0 20px 70px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: 'var(--color-primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>What's on the Leaf</span>
            <h2 style={{ color: 'var(--color-dark-green)', fontSize: '2.2rem', marginTop: '10px' }}>A Glimpse of the Feast</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {menuHighlights.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                backgroundColor: 'var(--color-warm-sand)', padding: '20px 24px',
                borderRadius: '16px', border: '1px solid rgba(46,125,50,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(46,125,50,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ 
                  width: '56px', height: '56px', borderRadius: '14px',
                  backgroundColor: 'white', border: '1px solid rgba(46,125,50,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-primary-green)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--color-dark-green)', fontSize: '1rem' }}>{item.name}</h4>
                  <p style={{ margin: 0, color: 'var(--color-earth-brown)', fontSize: '0.85rem', marginTop: '4px' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOOKING FORM ── */}
      <div style={{ padding: '70px 20px 100px' }}>
        <div className="container" style={{ maxWidth: '860px' }}>

          {/* Alert banner */}
          <div style={{
            backgroundColor: 'rgba(255,193,7,0.12)',
            border: '1px solid rgba(255,193,7,0.45)',
            borderRadius: '16px', padding: '20px 28px',
            display: 'flex', gap: '16px', alignItems: 'flex-start',
            marginBottom: '40px',
          }}>
            <Calendar size={32} color="#7a5c00" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontWeight: 700, color: '#7a5c00', fontSize: '1rem' }}>Important — Book One Day in Advance</p>
              <p style={{ margin: '6px 0 0', color: '#856404', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Magil Virundhu requires at least <strong>24 hours advance booking</strong> so we can source the freshest local ingredients and slow-cook every dish the authentic way on banana leaves.
              </p>
            </div>
          </div>

          {/* Form card */}
          <form onSubmit={handleBooking} style={{
            backgroundColor: 'white',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          }}>
            {/* Form header */}
            <div style={{
              background: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
              padding: '32px 40px',
              display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ChefHat size={28} color="white" />
              </div>
              <div>
                <h3 style={{ margin: 0, color: 'white', fontSize: '1.5rem', fontWeight: 800 }}>Reserve Your Virundhu</h3>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', marginTop: '4px' }}>Fill in the details below — we'll confirm via WhatsApp</p>
              </div>
            </div>

            {/* Form body */}
            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Row 1: Name + Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid">
                <div>
                  <label style={labelStyle}>
                    <Users size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Full Name *
                  </label>
                  <input
                    type="text" name="name" className="input-field" required
                    value={formData.name} onChange={handleChange}
                    placeholder="Eg. Muthu Kumar"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>📞 Phone Number *</label>
                  <input
                    type="tel" name="phone" className="input-field" required
                    value={formData.phone} onChange={handleChange}
                    placeholder="Eg. 9876543210"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Row 2: Guests + Occasion */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid">
                <div>
                  <label style={labelStyle}>
                    <Users size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Number of Guests *
                  </label>
                  <input
                    type="number" name="guests" className="input-field" required min="1" max="50"
                    value={formData.guests} onChange={handleChange}
                    placeholder="Eg. 6"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>🎉 Occasion (Optional)</label>
                  <select name="occasion" className="input-field" value={formData.occasion} onChange={handleChange} style={inputStyle}>
                    <option value="">Select an occasion...</option>
                    <option value="Birthday Celebration">🎂 Birthday Celebration</option>
                    <option value="Wedding Anniversary">💒 Wedding Anniversary</option>
                    <option value="Family Gathering">👨‍👩‍👧‍👦 Family Gathering</option>
                    <option value="Business Lunch">💼 Business Lunch</option>
                    <option value="Festival Feast">🪔 Festival Feast</option>
                    <option value="Just a Treat!">😊 Just a Treat!</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Date + Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid">
                <div>
                  <label style={labelStyle}>
                    <CalendarDays size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Preferred Date *
                  </label>
                  <input
                    type="date" name="date" className="input-field" required
                    value={formData.date} onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    <Clock4 size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Preferred Time *
                  </label>
                  <input
                    type="time" name="time" className="input-field" required
                    value={formData.time} onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Pre-order dishes */}
              <div>
                <label style={labelStyle}>
                  <UtensilsCrossed size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Pre-order Specific Dishes (Optional)
                </label>
                <textarea
                  name="preOrderItems" className="input-field" rows="3"
                  value={formData.preOrderItems} onChange={handleChange}
                  placeholder="Eg. 4 Mutton Kuzhambu, 2 Fish Curry, 1 extra Nei Soru..."
                  style={{ ...inputStyle, resize: 'none' }}
                />
                <p style={{ fontSize: '0.82rem', color: 'var(--color-secondary-green)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Leaf size={12} /> Special dishes are prepared fresh — must be requested 1 day in advance.
                </p>
              </div>

              {/* Special requests */}
              <div>
                <label style={labelStyle}>
                  <MessageSquare size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Special Requests / Dietary Notes (Optional)
                </label>
                <textarea
                  name="specialRequest" className="input-field" rows="2"
                  value={formData.specialRequest} onChange={handleChange}
                  placeholder="Eg. Less spicy, no onion, separate seating for elders..."
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px dashed rgba(46,125,50,0.2)', paddingTop: '24px' }}>
                {/* Summary preview */}
                <div style={{
                  backgroundColor: 'var(--color-warm-sand)',
                  borderRadius: '16px', padding: '20px 24px',
                  display: 'flex', flexWrap: 'wrap', gap: '16px',
                  marginBottom: '24px',
                }}>
                  {[
                    { label: 'Guest', value: formData.name || '—' },
                    { label: 'Guests', value: formData.guests ? `${formData.guests} people` : '—' },
                    { label: 'Date', value: formData.date || '—' },
                    { label: 'Time', value: formData.time || '—' },
                  ].map(item => (
                    <div key={item.label} style={{ minWidth: '120px' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '0.95rem', color: 'var(--color-dark-green)', fontWeight: 600 }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isProcessing}
                  style={{
                    width: '100%', padding: '18px', fontSize: '1.15rem', fontWeight: 800,
                    backgroundColor: '#25D366', color: 'white', border: 'none',
                    borderRadius: '14px', cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {isProcessing
                    ? <Loader2 size={24} className="animate-spin" />
                    : <><UtensilsCrossed size={18} /> Confirm Magil Virundhu via WhatsApp</>
                  }
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--color-earth-brown)', marginTop: '12px', opacity: 0.7 }}>
                  You'll be redirected to WhatsApp. Our team confirms within a few hours.
                </p>
              </div>
            </div>
          </form>

          {/* Trust indicators */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
            {[
              { icon: <Star size={18} fill="var(--color-gold-accent)" color="var(--color-gold-accent)" />, text: '4.9 ★ Rated Feast Experience' },
              { icon: <Leaf size={18} color="var(--color-primary-green)" />, text: '100% Natural Ingredients' },
              { icon: <ChefHat size={18} color="var(--color-secondary-green)" />, text: 'Authentic Traditional Recipes' },
            ].map((trust, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-earth-brown)', fontSize: '0.9rem', fontWeight: 600 }}>
                {trust.icon} {trust.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive grid */}
      <style>{`
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <SuccessOverlay
        isOpen={showSuccess}
        onClose={() => { setShowSuccess(false); window.location.href = '/'; }}
        title="Magil Virundhu Booked! 🍛"
        message="Your traditional feast is reserved! Our team will confirm your Magil Virundhu booking shortly via WhatsApp. Get ready for an authentic experience on banana leaves!"
      />
    </div>
  );
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 600,
  color: 'var(--color-earth-brown)',
  fontSize: '0.92rem',
};

const inputStyle = {
  border: '1.5px solid rgba(46,125,50,0.25)',
  backgroundColor: 'var(--color-warm-sand)',
  borderRadius: '12px',
  width: '100%',
  fontSize: '0.95rem',
};

export default MagilVirundhu;
