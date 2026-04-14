import React, { useState } from 'react';
import { Loader2, MapPin, UtensilsCrossed } from 'lucide-react';
import SuccessOverlay from './SuccessOverlay';
import LocationPicker from './LocationPicker';
import WaalaiText from './WaalaiText';

const Cart = ({ isOpen, onClose, cartItems, onUpdateCartItem, onRemoveCartItem, onClearCart }) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState(1);
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'dinein'
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [guests, setGuests] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  const [orderNotes, setOrderNotes] = useState('');
  
  // User provided phone
  const DELIVERY_RATE_PER_KM = 10;
  const WHATSAPP_NUMBER = "918489822822"; 

  const itemSubtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.isWeightBased ? Math.round(item.price * item.weight) : item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);
  
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
      message = `*🌿 New Authentic Order from Waalai Mess (Delivery) 🌿*\n`;
      message += `_புதிய உணவு ஆர்டர் - ஹோம் டெலிவரி_\n\n`;
      message += `*Customer:* ${customerName}\n`;
      message += `*Address:* ${address}\n`;
      message += `*Distance:* ${distance} km\n\n`;
    } else {
      message = `*🍛 New Magil Virundhu Booking - Waalai Mess 🍛*\n`;
      message += `_மகிழ் விருந்து - Traditional Feast Reservation_\n\n`;
      message += `*Customer:* ${customerName}\n`;
      message += `*Number of Guests:* ${guests}\n`;
      message += `*Date:* ${bookingDate}\n`;
      message += `*Time:* ${bookingTime}\n\n`;
    }
    
    message += `*--- Waalai Elai Details (உணவு விவரங்கள்) ---*\n`;
    cartItems.forEach((item, index) => {
      const portionStr = item.isWeightBased ? `${item.quantity} KG` : `${item.quantity} Plt`;
      const itemPriceTotal = item.price * item.quantity;
      const priceDisplay = item.price > 0 ? `₹${itemPriceTotal}` : '(Price on Confirmation)';
      
      const itemTitle = portionStr ? `${item.name} [${portionStr}]` : item.name;
      message += `${index + 1}. *${itemTitle}* - ${priceDisplay}\n`;
      if (item.customization) {
        message += `   _Choice: ${item.customization}_\n`;
      }
    });

    if (orderNotes) {
      message += `\n*--- Special Instructions (குறிப்புகள்) ---*\n`;
      message += `_Notes: ${orderNotes}_\n`;
    }

    message += `\n*-------------------*\n`;
    message += `*Subtotal:* ₹${itemSubtotal}\n`;
    if (orderType === 'delivery') {
      message += `*Delivery Fee:* ₹${deliveryCharge} (₹${DELIVERY_RATE_PER_KM}/km)\n`;
    }
    message += `*Total Amount (மொத்தம்):* *₹${totalCost}*\n`;
    message += `*-------------------*\n\n`;

    message += `*📌 Important Check:*\n`;
    message += `- 1 KG scale means full weight meat/rice as specified.\n`;
    message += `- Minimum order starts from 1 KG per dish.\n\n`;

    if (orderType === 'dinein') {
      message += `*⚠️ Note:* I understand that Magil Virundhu (மகிழ் விருந்து) bookings must be made at least *one day* in advance.\n\n`;
    }

    message += `Please confirm my healthy order! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Clear data immediately so it's not visible behind success
      onClearCart();
      setCustomerName('');
      setAddress('');
      setDistance(1);
      setOrderNotes('');
      setBookingDate('');
      setBookingTime('');
      setGuests('');
      
      // Auto-refresh after 4 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }, 500);
  };

  const handleCloseAll = () => {
    setShowSuccess(false);
    onClose();
    // Refresh to clear state and reset the experience
    window.location.href = '/'; 
  };

  const handleLocationSelect = (data) => {
    setAddress(data.address);
    setDistance(data.distance);
    setIsMapOpen(false);
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
            <h2 style={{ fontSize: '1.8rem', color: 'white', fontFamily: "'Outfit', cursive" }}>Your <WaalaiText /> Elai</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Freshly prepared without preservatives</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', fontSize: '1.5rem', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&times;</button>
        </div>

        <div style={{ padding: '30px', flex: 1, paddingBottom: 0 }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'white', marginTop: '40px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '40px', borderRadius: '16px' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Your leaf is empty.</p>
              <button className="btn" style={{ backgroundColor: 'white', color: 'var(--color-secondary-green)' }} onClick={onClose}>Add Authentic Food</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.customization}`} style={{ 
                  backgroundColor: 'rgba(255,255,255,0.95)', 
                  padding: '16px 20px', 
                  borderRadius: '16px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '8px', alignItems: 'center' }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover', border: '2px solid rgba(76, 171, 76, 0.3)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                           <h4 style={{ fontSize: '1rem', color: 'var(--color-earth-brown)', margin: 0 }}>{item.name}</h4>
                           <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                              {item.customization && (
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-primary-green)', backgroundColor: 'rgba(76, 171, 76, 0.1)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                                  {item.customization}
                                </span>
                              )}
                           </div>
                        </div>
                        <span style={{ fontWeight: 'bold', color: 'var(--color-secondary-green)', fontSize: '1rem' }}>
                          {item.price > 0 ? `₹${item.price * item.quantity}` : 'TBD'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button 
                        style={{ width: '28px', height: '28px', borderRadius: '8px', border: 'none', backgroundColor: '#e2e8f0', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => onUpdateCartItem(item.id, item.customization, { quantity: Math.max(1, item.quantity - 1) })}
                      >-</button>
                      <span style={{ fontSize: '1rem', fontWeight: 800 }}>
                        {item.quantity} {item.isWeightBased ? 'KG' : 'Plt'}
                      </span>
                      <button 
                        style={{ width: '28px', height: '28px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-primary-green)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => onUpdateCartItem(item.id, item.customization, { quantity: item.quantity + 1 })}
                      >+</button>
                    </div>
                    <button 
                      style={{ background: 'none', border: 'none', color: 'var(--color-accent-red)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'underline' }}
                      onClick={() => onRemoveCartItem(item.id, item.customization)}
                    >Remove</button>
                  </div>
                </div>
              ))}
              
              {/* Special Instructions / Customization Box */}
              <div style={{ 
                marginTop: '10px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.1)', 
                borderRadius: '20px', border: '1px solid rgba(255,255,255,0.3)', color: 'white',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                   <h4 style={{ margin: 0, fontSize: '1.1rem', fontFamily: "'Outfit', cursive" }}>📝 Special Instructions</h4>
                   <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>Optional</span>
                </div>
                
                <p style={{ fontSize: '0.8rem', opacity: 0.9, marginBottom: '12px' }}>
                  Mention requests like "Salt Reduction", "Extra Spicy", etc.
                </p>

                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Example: Reduce salt in my mutton gravy..."
                  style={{
                    width: '100%',
                    height: '90px',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '2px solid rgba(255,255,255,0.8)',
                    backgroundColor: '#FFFFFF', // Solid White
                    color: '#1B5E20', // Dark Green Text
                    fontSize: '1rem',
                    fontWeight: '600',
                    resize: 'none',
                    fontFamily: 'inherit',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    outline: 'none'
                  }}
                />

                <div style={{ marginTop: '12px', fontSize: '0.7rem', opacity: 0.8, fontStyle: 'italic', textAlign: 'center' }}>
                  All orders start from 1 KG minimum as per the traditional "1 KG Format".
                </div>
              </div>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={{ padding: '30px', backgroundColor: 'rgba(255,255,255,0.95)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', marginTop: '30px' }}>
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
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <UtensilsCrossed size={18} /> Magil Virundhu
                </span>
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
                  <button 
                    type="button"
                    onClick={() => setIsMapOpen(true)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px', padding: '12px',
                      backgroundColor: 'var(--color-bg-light)', border: '2px dashed var(--color-primary-green)',
                      borderRadius: '12px', color: 'var(--color-secondary-green)', fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.3s'
                    }}
                  >
                    <MapPin size={20} />
                    {address ? "Change Location on Map" : "Select Location from Map"}
                  </button>

                  <textarea 
                    className="input-field" placeholder="Full Delivery Address" rows="3"
                    value={address} onChange={e => setAddress(e.target.value)}
                    style={{ resize: 'none', border: '1px solid var(--color-primary-green)' }} required
                  />
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-earth-brown)', fontWeight: 600 }}>
                      Distance from <WaalaiText /> Mess (in km)
                    </label>
                    <input 
                      type="number" className="input-field" min="1"
                      value={distance} onChange={e => setDistance(parseInt(e.target.value) || 0)}
                      style={{ border: '1px solid var(--color-primary-green)', backgroundColor: '#f0f0f0' }} 
                      readOnly required
                    />
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-secondary-green)', marginTop: '4px' }}>
                      Calculated automatically from your selected map location.
                    </p>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#856404', backgroundColor: 'rgba(255,193,7,0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,193,7,0.3)', margin: 0 }}>
                    🕐 <strong>Note:</strong> Please place your delivery order at least <strong>45 minutes before</strong> your expected delivery time for fresh preparation.
                  </p>
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
                    <UtensilsCrossed size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> <strong>Magil Virundhu (மகிழ் விருந்து):</strong> This traditional feast booking must be placed at least <strong>one day in advance</strong> for authentic fresh preparation on banana leaves. Rooted in the ancient Tamil wisdom of "Unave Marundhu", we serve authentic, 100% natural, and traditional food on traditional banana leaves.
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

      <SuccessOverlay 
        isOpen={showSuccess} 
        onClose={handleCloseAll} 
        title={orderType === 'delivery' ? "Order Placed!" : "Magil Virundhu Booked!"}
        message={orderType === 'delivery' 
          ? <>Your healthy <WaalaiText /> meal is being prepared with care. Check WhatsApp for confirmation!</>
          : "Your Magil Virundhu (மகிழ் விருந்து) feast is reserved! We will confirm your booking shortly via WhatsApp."}
      />

      <LocationPicker 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        onLocationSelect={handleLocationSelect} 
      />
    </>
  );
};

export default Cart;
