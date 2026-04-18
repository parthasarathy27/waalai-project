import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { Search, Navigation, Loader2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Branch locations in Madurai
const BRANCHES = [
  { name: 'Main Branch (Chokikulam)', coords: [9.9333, 78.1333] },
  { name: 'Anna Nagar', coords: [9.9247, 78.1383] }
];

// Component to handle map center changes
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const LocationPicker = ({ isOpen, onClose, onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('Click on the map or search to find your location');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState([9.9252, 78.1198]); // Madurai center
  const [mapZoom, setMapZoom] = useState(13);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        handleLocationSelect(e.latlng);
      },
    });

    return position === null ? null : (
      <Marker position={position}></Marker>
    );
  };

  const handleLocationSelect = async (latlng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&zoom=18&addressdetails=1`);
      const data = await response.json();
      const addr = data.display_name || `Lat: ${latlng.lat.toFixed(4)}, Lng: ${latlng.lng.toFixed(4)}`;
      setAddress(addr);

      let minDistance = Infinity;
      BRANCHES.forEach(branch => {
        const d = calculateDistance(latlng.lat, latlng.lng, branch.coords[0], branch.coords[1]);
        if (d < minDistance) minDistance = d;
      });

      onLocationSelect({
        address: addr,
        lat: latlng.lat,
        lng: latlng.lng,
        distance: Math.ceil(minDistance)
      });
    } catch (error) {
      console.error("Geocoding failed:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setIsSearching(true);
    try {
      // Search restricted to Madurai TN area
      const query = searchQuery.toLowerCase().includes('madurai') ? searchQuery : `${searchQuery}, Madurai, Tamil Nadu`;
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const latlng = { lat: parseFloat(lat), lng: parseFloat(lon) };
        
        setMapCenter([latlng.lat, latlng.lng]);
        setMapZoom(16);
        setPosition(latlng);
        setAddress(display_name);
        
        let minDistance = Infinity;
        BRANCHES.forEach(branch => {
          const d = calculateDistance(latlng.lat, latlng.lng, branch.coords[0], branch.coords[1]);
          if (d < minDistance) minDistance = d;
        });

        onLocationSelect({
          address: display_name,
          lat: latlng.lat,
          lng: latlng.lng,
          distance: Math.ceil(minDistance)
        });
      } else {
        alert("Location not found. Please try a different area name.");
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setMapCenter([latlng.lat, latlng.lng]);
      setMapZoom(16);
      setPosition(latlng);
      handleLocationSelect(latlng);
    }, () => {
      alert("Unable to retrieve your location. Please check your browser permissions.");
    });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 10000, display: 'flex', 
      alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)'
    }}>
      <div style={{
        backgroundColor: 'white', padding: '30px', borderRadius: '28px',
        width: '95%', maxWidth: '850px', height: '85vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.6)', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ color: 'var(--color-dark-green)', margin: 0, fontSize: '1.5rem', fontFamily: "'Outfit', sans-serif" }}>Delivery Location</h3>
            <p style={{ color: 'var(--color-earth-brown)', fontSize: '0.85rem', margin: '4px 0 0', opacity: 0.8 }}>Select your delivery area for fresh authentic food</p>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: '#f0f0f0', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>&times;</button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-earth-brown)' }} 
            />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search area (e.g., Anna Nagar, Sathamangalam...)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '45px', marginBottom: 0, height: '54px', border: '2px solid rgba(46, 125, 50, 0.2)' }}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isSearching}
            style={{ width: 'auto', padding: '0 25px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            Search
          </button>
        </form>

        {/* Map Container */}
        <div style={{ flex: 1, borderRadius: '20px', overflow: 'hidden', border: '3px solid rgba(46, 125, 50, 0.1)', position: 'relative' }}>
          <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
            <ChangeView center={mapCenter} zoom={mapZoom} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>

          {/* Floating Action Buttons */}
          <button 
            onClick={handleLocateMe}
            title="Detect My Location"
            style={{
              position: 'absolute', bottom: '25px', right: '25px', zIndex: 1000,
              width: '60px', height: '60px', borderRadius: '18px', backgroundColor: 'white',
              border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.2)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-green)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            <Navigation size={28} />
          </button>
        </div>

        {/* Selected Address Display */}
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'var(--color-bg-light)', borderRadius: '14px', border: '1px solid rgba(46, 125, 50, 0.1)' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <Search size={20} style={{ color: 'var(--color-secondary-green)', marginTop: '2px' }} />
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-dark-green)', fontSize: '0.95rem' }}>Selected Address:</p>
              <p style={{ margin: '4px 0 0', color: 'var(--color-earth-brown)', fontSize: '0.9rem', lineHeight: 1.4 }}>{address}</p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            className="btn btn-primary" 
            onClick={onClose}
            disabled={!position}
            style={{ padding: '16px 60px', fontSize: '1.2rem', boxShadow: '0 8px 25px rgba(46, 125, 50, 0.3)' }}
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
