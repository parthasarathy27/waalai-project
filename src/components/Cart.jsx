import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const Cart = ({ isOpen, onClose, cartItems, onUpdateCartItem, onRemoveCartItem }) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState(1);
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'dinein'
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [guests, setGuests] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // User provided phone
  const DELIVERY_RATE_PER_KM = 10;
  const WHATSAPP_NUMBER = "918489822822"; 

  const itemSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = orderType === 'delivery' && distance > 0 ? distance * DELIVERY_RATE_PER_KM : 0;
  const totalCost = itemSubtotal + deliveryCharge;

  const handleCheckout = () => {
    if (!customerName) {
      alert("Please fill in your name.");
      return;
    }

    if (orderType === 'delivery' && !address) {
      alert("Please fill in your delivery address.");
      return;
    }

    if (orderType === 'dinein' && (!bookingDate || !bookingTime || !guests)) {
      alert("Please fill in all table booking details.");
      return;
    }
    
    setIsProcessing(true);

    let message = "";
    if (orderType === 'delivery') {
      message = `*🌿 New Organic Order from Waalai Mess (Delivery) 🌿*\n\n`;
      message += `*Customer:* ${customerName}\n`;
      message += `*Address:* ${address}\n`;
      message += `*Distance:* ${distance} km\n\n`;
    } else {
      message = `*🏨 New Table Pre-booking + Order - Waalai Mess 🏨*\n\n`;
      message += `*Customer:* ${customerName}\n`;
      message += `*Number of Guests:* ${guests}\n`;
      message += `*Date:* ${bookingDate}\n`;
      message += `*Time:* ${bookingTime}\n\n`;
    }
    
    message += `*--- Waalai Elai Details ---*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (x${item.quantity}) - ₹${item.price * item.quantity}\n`;
      if (item.customization) {
        message += `   _Note: ${item.customization}_\n`;
      }
    });

    message += `\n*-------------------*\n`;
    message += `*Items Subtotal:* ₹${itemSubtotal}\n`;
    if (orderType === 'delivery') {
      message += `*Delivery Fee:* ₹${deliveryCharge} (₹${DELIVERY_RATE_PER_KM}/km)\n`;
    }
    message += `*Total Amount:* *₹${totalCost}*\n`;
    message += `*-------------------*\n\n`;

    if (orderType === 'dinein') {
      message += `*⚠️ Note:* I understand that table bookings and pre-orders must be made at least *one day* in advance.\n\n`;
    }

    message += `Please confirm my healthy order!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsProcessing(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, backdropFilter: 'blur(8px)'
        }}
        onClick={onClose}
      />
      
      <div style={{
        position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '500px', height: '100vh', zIndex: 1001,
        backgroundImage: 'url(/banana-leaf.png)', backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)', overflowY: 'auto'
      }}>
        
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(46, 125, 50, 0.85)', zIndex: -1 }}></div>

        <div style={{
          padding: '30px', borderBottom: '2px solid rgba(255,255,255,0.2)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'white', fontFamily: "'Outfit', cursive" }}>Your Waalai Elai</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Freshly prepared without preservatives</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', fontSize: '1.5rem', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&times;</button>
        </div>

        <div style={{ padding: '30px', flex: 1 }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'white', marginTop: '40px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '40px', borderRadius: '16px' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Your leaf is empty.</p>
              <button className="btn" style={{ backgroundColor: 'white', color: 'var(--color-secondary-green)' }} onClick={onClose}>Add Authentic Food</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ 
                  backgroundColor: 'rgba(255,255,255,0.95)', 
                  padding: '20px', 
                  borderRadius: '16px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', alignItems: 'center' }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '2px solid rgba(76, 171, 76, 0.3)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '1.1rem', color: 'var(--color-earth-brown)', margin: 0, paddingRight: '8px' }}>{item.name}</h4>
                        <span style={{ fontWeight: 'bold', color: 'var(--color-secondary-green)', fontSize: '1.1rem' }}>₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Add customization (e.g. less spice, no ghee)" 
                      value={item.customization || ''}
                      onChange={(e) => onUpdateCartItem(item.id, { customization: e.target.value })}
                      style={{ fontSize: '0.95rem', padding: '10px', backgroundColor: '#fdfaf6', border: '1px solid var(--color-primary-green)' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <button 
                        style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--color-earth-brown)', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                        onClick={() => onUpdateCartItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                      >-</button>
                      <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button 
                        style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--color-primary-green)', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                        onClick={() => onUpdateCartItem(item.id, { quantity: item.quantity + 1 })}
                      >+</button>
                    </div>
                    <button 
                      style={{ background: 'none', border: 'none', color: 'var(--color-accent-red)', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'underline' }}
                      onClick={() => onRemoveCartItem(item.id)}
                    >Remove Item</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={{ padding: '30px', backgroundColor: 'rgba(255,255,255,0.95)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.3rem', color: 'var(--color-secondary-green)' }}>Checkout Details</h3>
            
            <div style={{ 
              display: 'flex', gap: '10px', marginBottom: '24px', backgroundColor: '#f0f0f0', 
              padding: '6px', borderRadius: '12px', boxSizing: 'border-box' 
            }}>
              <button 
                onClick={() => setOrderType('delivery')}
                style={{ 
                  flex: 1, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  backgroundColor: orderType === 'delivery' ? 'var(--color-secondary-green)' : 'transparent',
                  color: orderType === 'delivery' ? 'white' : 'var(--color-earth-brown)',
                  fontWeight: 600, transition: 'all 0.3s'
                }}
              >
                🛵 Delivery
              </button>
              <button 
                onClick={() => setOrderType('dinein')}
                style={{ 
                  flex: 1, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  backgroundColor: orderType === 'dinein' ? 'var(--color-secondary-green)' : 'transparent',
                  color: orderType === 'dinein' ? 'white' : 'var(--color-earth-brown)',
                  fontWeight: 600, transition: 'all 0.3s'
                }}
              >
                🍽️ Table Pre-book
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <input 
                className="input-field" placeholder="Your Full Name" value={customerName}
                onChange={e => setCustomerName(e.target.value)} required
                style={{ border: '1px solid var(--color-primary-green)' }}
              />

              {orderType === 'delivery' ? (
                <>
                  <textarea 
                    className="input-field" placeholder="Full Delivery Address" rows="3"
                    value={address} onChange={e => setAddress(e.target.value)}
                    style={{ resize: 'none', border: '1px solid var(--color-primary-green)' }} required
                  />
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-earth-brown)', fontWeight: 600 }}>
                      Distance from Waalai Mess (in km)
                    </label>
                    <input 
                      type="number" className="input-field" min="1"
                      value={distance} onChange={e => setDistance(parseInt(e.target.value) || 0)}
                      style={{ border: '1px solid var(--color-primary-green)' }} required
                    />
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Date</label>
                      <input type="date" className="input-field" value={bookingDate} onChange={e => setBookingDate(e.target.value)} style={{ border: '1px solid var(--color-primary-green)' }} required />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Time</label>
                      <input type="time" className="input-field" value={bookingTime} onChange={e => setBookingTime(e.target.value)} style={{ border: '1px solid var(--color-primary-green)' }} required />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Number of Guests</label>
                    <input type="number" className="input-field" placeholder="Eg. 4" value={guests} onChange={e => setGuests(e.target.value)} min="1" style={{ border: '1px solid var(--color-primary-green)' }} required />
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#856404', backgroundColor: 'rgba(255,193,7,0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,193,7,0.3)' }}>
                    📅 <strong>Note:</strong> Items must be booked at least one day in advance for fresh preparation.
                  </p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', padding: '16px', backgroundColor: '#fdfaf6', borderRadius: '12px', border: '1px dashed var(--color-secondary-green)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-earth-brown)' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600 }}>₹{itemSubtotal}</span>
              </div>
              {orderType === 'delivery' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-earth-brown)' }}>
                  <span>Delivery Charge</span>
                  <span style={{ fontWeight: 600 }}>₹{deliveryCharge}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.4rem', marginTop: '12px', paddingTop: '12px', borderTop: '2px solid rgba(46, 125, 50, 0.2)' }}>
                <span style={{ color: 'var(--color-secondary-green)' }}>Total Cost</span>
                <span style={{ color: 'var(--color-secondary-green)' }}>₹{totalCost}</span>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', backgroundColor: '#25D366', color: 'white', padding: '16px', fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)' }}
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? <Loader2 className="animate-spin" /> : "Confirm Over WhatsApp"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
