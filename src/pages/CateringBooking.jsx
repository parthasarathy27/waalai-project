import React, { useState } from 'react';
import { Loader2, MapPin, Scale, ShoppingBag, UtensilsCrossed, CalendarDays, Plus, Minus, Check } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SuccessOverlay from '../components/SuccessOverlay';
import LocationPicker from '../components/LocationPicker';
import WaalaiText from '../components/WaalaiText';
import { measureBasket, yourBasket, aLaCarte } from '../data/cateringMenu';

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
  const [activeTab, setActiveTab] = useState('measure'); // 'measure', 'basket', 'alacarte'
  const [selectedItems, setSelectedItems] = useState({});

  const WHATSAPP_NUMBER = "918489822822";

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleItemModify = (item, type, increment) => {
    setSelectedItems(prev => {
      const copy = { ...prev };
      const currentQty = copy[item.name]?.qty || 0;
      const newQty = increment ? currentQty + 1 : currentQty - 1;
      
      if (newQty <= 0) {
        delete copy[item.name];
      } else {
        copy[item.name] = { ...item, qty: newQty, type };
      }
      return copy;
    });
  };

  const handleComboToggle = (name, category) => {
    setSelectedItems(prev => {
      const copy = { ...prev };
      if (copy[name]) {
        delete copy[name];
      } else {
        copy[name] = { name, category, qty: 1, type: 'combo' };
      }
      return copy;
    });
  };

  const selectedCount = Object.keys(selectedItems).length;

  const handleBooking = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    let message = `*🎉 New Catering Request - Waalai Mess 🎉*\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Event Type:* ${formData.eventType}\n`;
    message += `*Approx. Guests:* ${formData.guests}\n`;
    message += `*Event Date:* ${formData.date}\n`;
    message += `*Location:* ${formData.location}\n`;
    
    // Auto populate cart items
    let finalRequirements = formData.requirements ? formData.requirements.trim() + '\n\n' : '';
    const items = Object.values(selectedItems);
    if (items.length > 0) {
      finalRequirements += `*--- Selected Menu Items ---*\n`;
      items.forEach(item => {
        if (item.type === 'combo') {
          finalRequirements += `• Combo (${item.category}): ${item.name}\n`;
        } else {
          const measureText = item.measure ? `(${item.measure})` : '';
          finalRequirements += `• ${item.qty}x ${item.name} ${measureText}\n`;
        }
      });
    }

    if (finalRequirements) {
      message += `*Specific Requirements:*\n${finalRequirements}\n`;
    }
    
    message += `\nPlease provide me with a catering quote!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsProcessing(false);
      setShowSuccess(true);
      
      setFormData({
        name: '', eventType: 'Wedding', guests: '', date: '', location: '', requirements: ''
      });
      setSelectedItems({});
      
      setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }, 500);
  };

  const QuantityControl = ({ item, type }) => {
    const qty = selectedItems[item.name]?.qty || 0;
    
    if (qty === 0) {
      return (
        <button 
          onClick={() => handleItemModify(item, type, true)}
          style={{ padding: '6px 12px', border: '1px solid var(--color-primary-green)', backgroundColor: 'transparent', color: 'var(--color-primary-green)', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary-green)'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-primary-green)'; }}
        >
          Add
        </button>
      );
    }
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid var(--color-primary-green)', borderRadius: '6px', overflow: 'hidden' }}>
        <button onClick={() => handleItemModify(item, type, false)} style={{ border: 'none', background: 'var(--color-bg-light)', padding: '6px 8px', cursor: 'pointer', color: 'var(--color-earth-brown)' }}><Minus size={14} /></button>
        <span style={{ padding: '0 12px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-dark-green)' }}>{qty}</span>
        <button onClick={() => handleItemModify(item, type, true)} style={{ border: 'none', background: 'var(--color-primary-green)', padding: '6px 8px', cursor: 'pointer', color: 'white' }}><Plus size={14} /></button>
      </div>
    );
  };

  const renderTable = (data, title, head1 = "Item", head2 = "Measure", head3 = "Price") => (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ color: 'var(--color-dark-green)', marginBottom: '12px', borderBottom: '2px solid var(--color-gold-accent)', paddingBottom: '8px' }}>{title}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <thead style={{ backgroundColor: 'var(--color-primary-green)', color: 'white' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>{head1}</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', width: '120px' }}>{head2}</th>
              <th style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', width: '120px' }}>{head3}</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', width: '100px' }}>Add</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee', backgroundColor: selectedItems[item.name] ? 'rgba(76, 171, 76, 0.05)' : 'white' }}>
                <td style={{ padding: '12px', color: 'var(--color-earth-brown)' }}>{item.name}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: '#666' }}>{item.measure || '-'}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: 'var(--color-dark-green)' }}>{item.price}</td>
                <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                  <QuantityControl item={item} type="measure" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderListCard = (items, title, badgeColor) => (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderTop: `4px solid ${badgeColor}` }}>
      <h3 style={{ color: badgeColor, marginBottom: '16px', fontSize: '1.2rem', textAlign: 'center' }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
        {items.map((itemName, index) => {
          const isSelected = !!selectedItems[itemName];
          return (
            <label 
              key={index} 
              style={{ 
                display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: isSelected ? 'var(--color-dark-green)' : 'var(--color-earth-brown)', 
                cursor: 'pointer', padding: '8px', borderRadius: '6px', backgroundColor: isSelected ? 'rgba(255, 193, 7, 0.15)' : 'transparent',
                transition: 'all 0.2s', border: isSelected ? `1px solid ${badgeColor}` : '1px solid transparent'
              }}
            >
              <div 
                style={{ 
                  width: '18px', height: '18px', borderRadius: '4px', border: `2px solid ${isSelected ? badgeColor : '#ccc'}`, 
                  marginRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isSelected ? badgeColor : 'white' 
                }}
              >
                {isSelected && <Check size={14} color="white" />}
              </div>
              <input 
                type="checkbox" 
                hidden 
                checked={isSelected} 
                onChange={() => handleComboToggle(itemName, title)} 
              />
              <span style={{ fontWeight: isSelected ? 600 : 400 }}>{itemName}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  const renderALaCarteGrid = (data, title) => (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ color: 'var(--color-earth-brown)', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px dashed #ccc' }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
        {data.map((item, idx) => {
          const isSelected = !!selectedItems[item.name];
          return (
            <div key={idx} style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', 
              backgroundColor: isSelected ? 'rgba(76, 171, 76, 0.08)' : 'var(--color-bg-light)', 
              borderRadius: '6px', border: isSelected ? '1px solid var(--color-primary-green)' : '1px solid #eaeaea' 
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', color: isSelected ? 'var(--color-dark-green)' : 'var(--color-earth-brown)', fontWeight: isSelected ? 600 : 400 }}>{item.name}</span>
                <span style={{ fontWeight: 600, color: 'var(--color-dark-green)', fontSize: '0.85rem' }}>₹{item.price}</span>
              </div>
              <QuantityControl item={item} type="alacarte" />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="page-padding">
      <Breadcrumbs pageName="Catering Services" />
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'var(--color-dark-green)', marginBottom: '16px' }}>Event Catering & Menus</h1>
          <p style={{ color: 'var(--color-earth-brown)', fontSize: '1.2rem', marginBottom: '16px', maxWidth: '800px', margin: '0 auto' }}>
            From grand weddings to intimate gatherings, <WaalaiText /> Mess provides premium customized catering solutions. Select your items dynamically below for a fast quote.
          </p>
          <div style={{
            marginTop: '20px',
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            backgroundColor: 'rgba(255,193,7,0.12)', border: '1.5px solid rgba(255,193,7,0.5)',
            borderRadius: '12px', padding: '12px 20px', maxWidth: '650px'
          }}>
            <CalendarDays size={24} style={{ color: '#7a5c00', flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#7a5c00', fontWeight: 600, textAlign: 'left' }}>
              <strong>Advance Booking Required:</strong> All catering orders must be placed at least <strong>1 day before</strong> the event date.
            </p>
          </div>
        </div>

        {/* Menu Tabs Section */}
        <div style={{ marginBottom: '30px', backgroundColor: 'var(--color-bg-light)', padding: '24px', borderRadius: '16px', border: '1px solid #e0e0e0', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px' }}>
            <button 
              onClick={() => setActiveTab('measure')}
              style={{
                padding: '12px 24px', borderRadius: '50px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s',
                backgroundColor: activeTab === 'measure' ? 'var(--color-primary-green)' : 'white',
                color: activeTab === 'measure' ? 'white' : 'var(--color-earth-brown)',
                border: activeTab === 'measure' ? 'none' : '1px solid #ccc',
                boxShadow: activeTab === 'measure' ? '0 4px 15px rgba(46,125,50,0.3)' : 'none'
              }}
            >
              <Scale size={18} /> Measure Basket
            </button>
            <button 
              onClick={() => setActiveTab('basket')}
              style={{
                padding: '12px 24px', borderRadius: '50px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s',
                backgroundColor: activeTab === 'basket' ? 'var(--color-primary-green)' : 'white',
                color: activeTab === 'basket' ? 'white' : 'var(--color-earth-brown)',
                border: activeTab === 'basket' ? 'none' : '1px solid #ccc',
                boxShadow: activeTab === 'basket' ? '0 4px 15px rgba(46,125,50,0.3)' : 'none'
              }}
            >
              <ShoppingBag size={18} /> Your Basket (Combos)
            </button>
            <button 
              onClick={() => setActiveTab('alacarte')}
              style={{
                padding: '12px 24px', borderRadius: '50px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s',
                backgroundColor: activeTab === 'alacarte' ? 'var(--color-primary-green)' : 'white',
                color: activeTab === 'alacarte' ? 'white' : 'var(--color-earth-brown)',
                border: activeTab === 'alacarte' ? 'none' : '1px solid #ccc',
                boxShadow: activeTab === 'alacarte' ? '0 4px 15px rgba(46,125,50,0.3)' : 'none'
              }}
            >
              <UtensilsCrossed size={18} /> Our Menu
            </button>
          </div>

          {/* Tab Content */}
          <div style={{ minHeight: '400px' }}>
            {activeTab === 'measure' && (
              <div className="fade-in">
                {renderTable(measureBasket.nonVeg, "Non-Veg (Bulk By Kg)")}
                {renderTable(measureBasket.mealsAndTiffin, "Meals & Tiffin")}
                {renderTable(measureBasket.varietyRice, "Variety Rice (By Padi)")}
              </div>
            )}

            {activeTab === 'basket' && (
              <div className="fade-in">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {renderListCard(yourBasket.anyOne, "ANY ONE (Sweets & Snacks)", "#f59e0b")}
                  {renderListCard(yourBasket.anyTwo, "ANY TWO (Soups, Starters, Spl Gravies)", "#ef4444")}
                  {renderListCard(yourBasket.anyThree, "ANY THREE (Main Course, Briyani, Meals)", "#8b5cf6")}
                </div>
                <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'rgba(46, 125, 50, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--color-primary-green)' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: 'var(--color-dark-green)' }}>Important Notes:</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--color-earth-brown)' }}>
                    {yourBasket.notes.map((note, i) => <li key={i}>{note}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'alacarte' && (
              <div className="fade-in" style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                {renderALaCarteGrid(aLaCarte.mealsAndBriyani, "Meals & Briyani")}
                {renderALaCarteGrid(aLaCarte.chickenVarieties, "Chicken Varieties")}
                {renderALaCarteGrid(aLaCarte.muttonAndFish, "Mutton & Fish")}
                {renderALaCarteGrid(aLaCarte.eggAndVeg, "Egg & Veg")}
                {renderALaCarteGrid(aLaCarte.tiffinAndFastFood, "Tiffin, Dosai & Parotta")}
              </div>
            )}
          </div>
          
          {selectedCount > 0 && (
            <div className="fade-in" style={{ marginTop: '20px', padding: '16px 20px', backgroundColor: 'white', border: '2px solid var(--color-gold-accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: 'var(--color-dark-green)' }}>Items Selected: {selectedCount}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-earth-brown)' }}>Your selections will be automatically included in the quote request.</p>
              </div>
              <button 
                onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
                style={{ padding: '8px 16px', backgroundColor: 'var(--color-dark-green)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Proceed to Request
              </button>
            </div>
          )}
        </div>

        {/* Booking Form */}
        <div id="booking-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: 'var(--color-dark-green)', marginBottom: '24px' }}>Request a Catering Quote</h2>
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
              <input type="text" name="location" className="input-field" required value={formData.location} onChange={handleChange} placeholder="Eg. Your delivery location or venue..." style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--color-earth-brown)' }}>
                Specific Menu Requirements
                {selectedCount > 0 && <span style={{ color: 'var(--color-dark-green)', fontWeight: 'bold', marginLeft: '8px' }}>(+{selectedCount} items selected from menu)</span>}
              </label>
              <textarea name="requirements" className="input-field" rows="4" value={formData.requirements} onChange={handleChange} placeholder="Eg. Add any extra customization notes here..." style={{ border: '1px solid rgba(76,171,76,0.3)', backgroundColor: 'var(--color-warm-sand)' }}></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isProcessing} style={{ marginTop: '16px', fontSize: '1.2rem', padding: '16px', backgroundColor: 'var(--color-primary-green)' }}>
              {isProcessing ? <Loader2 className="animate-spin" /> : "Request Fast Quote via WhatsApp"}
            </button>
          </form>
        </div>
      </div>
      
      <SuccessOverlay 
        isOpen={showSuccess} 
        onClose={() => {
          setShowSuccess(false);
          window.location.reload();
        }} 
        title="Inquiry Sent!" 
        message={<>Thank you for choosing <WaalaiText /> Mess for your grand event. We've received your inquiry and our event experts will contact you via WhatsApp soon.</>}
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
