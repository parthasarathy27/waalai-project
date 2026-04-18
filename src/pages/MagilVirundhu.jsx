import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { Loader2, Users, CalendarDays, Clock4, UtensilsCrossed, MessageSquare, ChefHat, Leaf, Star, Beef, Soup, Drumstick, Fish, Utensils, Calendar, PartyPopper, Sparkles, Phone } from 'lucide-react';
import SuccessOverlay from '../components/SuccessOverlay';
import WaalaiText from '../components/WaalaiText';

const WHATSAPP_NUMBER = "918489822822";
const PHONE_NUMBER = "9367757775";

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
    dishPreferences: '',
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

    let message = `*🍛 New Happy Feast Booking - Waalai Mess 🍛*\n`;
    message += `_மகிழ் விருந்து - Traditional Feast Reservation_\n\n`;
    message += `*👤 Guest Name:* ${formData.name}\n`;
    message += `*📞 Phone:* ${formData.phone}\n`;
    message += `*👥 Number of Guests:* ${formData.guests}\n`;
    message += `*📅 Date:* ${formData.date}\n`;
    message += `*🕐 Time:* ${formData.time}\n`;
    if (formData.occasion) {
      message += `*🎉 Occasion:* ${formData.occasion}\n`;
    }
    if (formData.dishPreferences) {
      message += `\n*🍽️ Dish Preferences:*\n${formData.dishPreferences}\n`;
    }
    if (formData.specialRequest) {
      message += `\n*💬 Special Requests:* ${formData.specialRequest}\n`;
    }
    message += `\n*⚠️ I understand:* Happy Feast bookings must be made at least *one day (24 hours)* in advance for authentic fresh preparation on banana leaves.\n`;
    message += `\nPlease confirm my Happy Feast! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsProcessing(false);
      setShowSuccess(true);
      setFormData({
        name: '', phone: '', guests: '', date: '', time: '',
        occasion: '', dishPreferences: '', specialRequest: '',
      });
      setTimeout(() => { window.location.href = '/'; }, 4000);
    }, 500);
  };

  return (
    <div className="page-padding" style={{ overflowX: 'hidden', backgroundColor: 'var(--color-warm-sand)' }}>
      {/* ── BREADCRUMBS ── */}
      <Breadcrumbs pageName="Happy Feast" />

      {/* ── PAGE HEADER ── */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--color-dark-green)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <UtensilsCrossed size={36} /> மகிழ் விருந்து — Happy Feast
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
            { tag: 'Team Calls to Confirm', icon: <Phone size={14} /> },
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


      {/* ── WHAT'S INCLUDED ── */}
      <div style={{ backgroundColor: 'var(--color-warm-sand)', padding: '70px 20px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: 'var(--color-primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Everything Included</span>
            <h2 style={{ color: 'var(--color-dark-green)', fontSize: '2.2rem', marginTop: '10px' }}>What's in Your Happy Feast</h2>
            <p style={{ color: 'var(--color-earth-brown)', fontSize: '1rem', maxWidth: '600px', margin: '10px auto 0' }}>
              One complete feast. Every dish freshly prepared on the day of your booking.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px', maxWidth: '960px', margin: '0 auto' }}>
            {[
              { emoji: '🍖', label: 'Any 3 Non-Veg Dishes', sub: 'Mutton, Chicken, Fish, Egg or Prawn' },
              { emoji: '🍗', label: '1 Non-Veg Curry', sub: 'Nalli Kuzhambu or Country Chicken' },
              { emoji: '🌿', label: '2 Veg Items', sub: 'Poriyal, Kootu, Sambar or Potato Fry' },
              { emoji: '🥣', label: '1 Soup', sub: 'Chicken Soup or Tomato Soup' },
              { emoji: '🫙', label: 'Rasam', sub: 'Traditional Pepper Rasam' },
              { emoji: '🍚', label: '2 Rice Varieties', sub: 'Biryani, Rice Pulav or Fried Rice' },
              { emoji: '🍮', label: '1 Payasam', sub: 'Semiya or Rice Payasam' },
              { emoji: '🍬', label: '1 Sweet', sub: 'Kesari / Halwa or Gulab Jamun' },
              { emoji: '🍦', label: 'Ice Cream', sub: 'Served chilled after the feast' },
              { emoji: '🧃', label: 'Fresh Juice', sub: 'Seasonal fresh juice — 1 glass' },
              { emoji: '🍓', label: 'Fruit Platter', sub: 'Freshly cut seasonal fruits' },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                border: '1px solid rgba(46,125,50,0.12)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(46,125,50,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; }}
              >
                <div style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>{item.emoji}</div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-dark-green)', fontSize: '0.95rem' }}>{item.label}</p>
                  <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: 'var(--color-earth-brown)' }}>{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Customize card — full width */}
            <div style={{
              gridColumn: '1 / -1',
              backgroundColor: 'var(--color-primary-green)',
              borderRadius: '16px',
              padding: '22px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              boxShadow: '0 8px 24px rgba(87,182,5,0.25)',
              flexWrap: 'wrap',
            }}>
              <div style={{ fontSize: '2.2rem', lineHeight: 1, flexShrink: 0 }}>✏️</div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{ margin: 0, fontWeight: 800, color: 'white', fontSize: '1.05rem' }}>Want Something More? Customize Your Feast!</p>
                <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.5 }}>
                  Just mention any extra dish or special request in the form below — our chief team will call you, confirm, and make it happen!
                </p>
              </div>
              <span style={{ backgroundColor: 'white', color: 'var(--color-primary-green)', fontWeight: 800, fontSize: '0.85rem', padding: '8px 20px', borderRadius: '50px', flexShrink: 0 }}>
                ↓ Fill the Form Below
              </span>
            </div>
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
                Happy Feast requires at least <strong>24 hours advance booking</strong> so we can source the freshest local ingredients and slow-cook every dish the authentic way on banana leaves.
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
                <h3 style={{ margin: 0, color: 'white', fontSize: '1.5rem', fontWeight: 800 }}>Reserve Your Happy Feast</h3>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', marginTop: '4px' }}>
                  Fill in the details — our team will <strong style={{ color: 'white' }}>call you</strong> to confirm
                </p>
              </div>
            </div>

            {/* Form body */}
            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Row 1: Name + Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,220px), 1fr))', gap: '20px' }}>
                <div>
                  <label style={labelStyle}><Users size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Full Name *</label>
                  <input type="text" name="name" className="input-field" required value={formData.name} onChange={handleChange} placeholder="Eg. Muthu Kumar" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>📞 Phone Number *</label>
                  <input type="tel" name="phone" className="input-field" required value={formData.phone} onChange={handleChange} placeholder="Eg. 9876543210" style={inputStyle} />
                </div>
              </div>

              {/* Row 2: Guests + Occasion */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,220px), 1fr))', gap: '20px' }}>
                <div>
                  <label style={labelStyle}><Users size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Number of Guests *</label>
                  <input type="number" name="guests" className="input-field" required min="1" max="100" value={formData.guests} onChange={handleChange} placeholder="Eg. 6" style={inputStyle} />
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,220px), 1fr))', gap: '20px' }}>
                <div>
                  <label style={labelStyle}><CalendarDays size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Preferred Date *</label>
                  <input type="date" name="date" className="input-field" required value={formData.date} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}><Clock4 size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Preferred Time *</label>
                  <input type="time" name="time" className="input-field" required value={formData.time} onChange={handleChange} style={inputStyle} />
                </div>
              </div>

              {/* Dish Preferences */}
              <div>
                <label style={labelStyle}>
                  <Utensils size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Dish Preferences (Optional)
                </label>
                <textarea
                  name="dishPreferences"
                  className="input-field"
                  rows="3"
                  value={formData.dishPreferences}
                  onChange={handleChange}
                  placeholder="Eg. Mutton Kuzhambu, Chicken Roast, Fish Curry, Chicken Biryani, Semiya Payasam..."
                  style={{ ...inputStyle, resize: 'none' }}
                />
                <p style={{ fontSize: '0.82rem', color: 'var(--color-secondary-green)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Leaf size={12} /> Write the dishes you prefer from our menu. Our team will confirm availability when they call.
                </p>
              </div>

              {/* Special requests */}
              <div>
                <label style={labelStyle}><MessageSquare size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Special Requests / Dietary Notes (Optional)</label>
                <textarea name="specialRequest" className="input-field" rows="2" value={formData.specialRequest} onChange={handleChange} placeholder="Eg. Less spicy, no onion, separate seating for elders..." style={{ ...inputStyle, resize: 'none' }} />
              </div>

              {/* Call-back notice */}
              <div style={{ backgroundColor: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '14px', padding: '16px 20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                <Phone size={26} color="var(--color-primary-green)" style={{ flexShrink: 0 }} />
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-dark-green)' }}>We will call you to confirm!</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: 'var(--color-earth-brown)', lineHeight: 1.5 }}>
                    Our chief team will call <strong>{formData.phone || 'your number'}</strong> to confirm the feast, finalize your dish choices, and answer any questions.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px dashed rgba(46,125,50,0.2)', paddingTop: '24px' }}>
                {/* Summary preview */}
                <div style={{ backgroundColor: 'var(--color-warm-sand)', borderRadius: '16px', padding: '20px 24px', display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
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
                  style={{ width: '100%', padding: '18px', fontSize: '1.15rem', fontWeight: 800, backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '14px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {isProcessing ? <Loader2 size={24} className="animate-spin" /> : <><UtensilsCrossed size={18} /> Confirm Happy Feast via WhatsApp</>}
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--color-earth-brown)', marginTop: '12px' }}>
                  Or call us directly: <a href={`tel:${PHONE_NUMBER}`} style={{ color: 'var(--color-primary-green)', fontWeight: 700 }}>{PHONE_NUMBER}</a>
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
        title="Happy Feast Booked! 🍛"
        message="Your traditional feast is reserved! Our team will call you shortly to confirm your Happy Feast booking and menu choices. Get ready for an authentic experience on banana leaves!"
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
