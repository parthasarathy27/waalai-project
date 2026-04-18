import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import WaalaiText from '../components/WaalaiText';
import banner1 from '../assets/banners/banner1.jpg';
import bannerimg1 from '../assets/banners/bannerimg1.png';
import bannerimg2 from '../assets/banners/bannerimg2.png';
import bannerimg3 from '../assets/banners/bannerimg3.png';
import { 
  Leaf, 
  Sparkles, 
  HeartPulse, 
  Quote, 
  MapPin, 
  ChefHat, 
  HeartHandshake,
  Star,
  ChevronRight,
  Phone,
  Clock,
  Mail,
  UtensilsCrossed,
  Flame,
  Crown,
  Drumstick,
  Fish,
  Soup,
  Utensils,
  Beef
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    bgImage: bannerimg1,
    featuredImage: bannerimg1,
    subtitle: "ESTABLISHED 1931",
    titlePrimary: "Experience the",
    titleHighlight: <><WaalaiText white scale={1.6} /> Heritage</>,
    description: <><WaalaiText white scale={1.3} /> Mess & <WaalaiText white scale={1.3} /> Aahar. Recognized for its authentic and traditional home-style flavors since 1931.</>,
    actionText: "Order Non-Veg",
    actionLink: "/order?type=nonveg"
  },
  {
    bgImage: bannerimg2,
    featuredImage: bannerimg2,
    subtitle: "TRADITIONAL DINING",
    titlePrimary: "Authentic",
    titleHighlight: "Banana Leaf Service",
    description: "Rooted in tradition, we take pride in serving wholesome, healthy meals on fresh banana leaves.",
    actionText: "Order Veg Meals",
    actionLink: "/order?type=veg"
  },
  {
    bgImage: bannerimg3,
    featuredImage: bannerimg3,
    subtitle: "EXQUISITE CATERING",
    titlePrimary: "Perfected with",
    titleHighlight: "Flawless Service",
    description: "Elevate your celebrations with our premium catering. We bring the authentic taste of tradition to your most grand events.",
    actionText: "Inquire Catering",
    actionLink: "/catering"
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // GSAP animations for slide change
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.slide-fade-in', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
      gsap.fromTo('.slide-img-in',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [currentSlide]);

  // General scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        gsap.fromTo(section,
          { y: 60, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            }
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* SECTION 1: DYNAMIC SPLIT-HERO SLIDER */}
      <section ref={heroRef} className="hero-section">
        {/* BACKGROUND LAYER (SHADED) */}
        {slides.map((slide, idx) => (
          <div key={idx} style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${slide.bgImage})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: idx === currentSlide ? 0.3 : 0,
            transition: 'opacity 1.5s ease-in-out',
            zIndex: 0
          }} />
        ))}
        
        {/* SHADE GRADIENT */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(90deg, rgba(27, 94, 32, 0.95) 20%, rgba(27, 94, 32, 0) 80%)',
          zIndex: 1
        }} />

        {/* CONTENT LAYER */}
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-grid">
            {/* Left Column (Text) */}
            <div>
              <span className="slide-fade-in" style={{ 
                display: 'inline-block', color: 'var(--color-gold-accent)', fontSize: '1.2rem', 
                fontWeight: 800, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '20px'
              }}>
                {slides[currentSlide].subtitle}
              </span>
              <h1 className="slide-fade-in" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'white', marginBottom: '24px', lineHeight: 1.1 }}>
                {slides[currentSlide].titlePrimary} <br/> 
                <span style={{ color: 'var(--color-banana-leaf)' }}>{slides[currentSlide].titleHighlight}</span>
              </h1>
              <p className="slide-fade-in" style={{ fontSize: '1.3rem', color: 'var(--color-warm-sand)', marginBottom: '40px', lineHeight: 1.6, opacity: 0.9 }}>
                {slides[currentSlide].description}
              </p>
              <div className="slide-fade-in" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px', alignItems: 'center' }}>
                <button className="btn btn-primary" onClick={() => navigate(slides[currentSlide].actionLink)} style={{ padding: '18px 45px', fontSize: '1.1rem' }}>
                  {slides[currentSlide].actionText}
                </button>
                
                {/* Dots Navigation */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '10px' }}>
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => setCurrentSlide(i)} style={{
                      width: i === currentSlide ? '25px' : '8px',
                      height: '8px', borderRadius: '50px', border: 'none',
                      backgroundColor: i === currentSlide ? 'var(--color-gold-accent)' : 'rgba(255,255,255,0.3)',
                      transition: 'all 0.3s ease', cursor: 'pointer'
                    }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Featured Image) */}
            <div className="hero-image-box slide-img-in" style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '500px', height: '500px' }}>
              {/* Decorative Floating Frame */}
              <div style={{
                position: 'absolute', top: '20px', right: '-20px', bottom: '-20px', left: '20px',
                border: '2px solid var(--color-gold-accent)', borderRadius: '32px', zIndex: 0
              }}></div>
              
              <img src={slides[currentSlide].featuredImage} 
                alt="Waalai Special Dish" 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  borderRadius: '32px', 
                  position: 'relative', 
                  zIndex: 1, 
                  objectFit: 'cover', 
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                  border: '4px solid white'
                }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 100% PURE FOUNDATION */}
      <section ref={addToRefs} className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ color: 'var(--color-dark-green)', fontSize: '2.8rem' }}>உணவே மருந்து (Food is Medicine)</h2>
            <p style={{ maxWidth: '800px', margin: '16px auto 0', color: 'var(--color-earth-brown)', fontSize: '1.2rem' }}>
              Our foundation is built purely on ancient Tamil culinary science. We never compromise on your health or heritage.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="glass mobile-small-padding" style={{ padding: '40px 24px', textAlign: 'center', borderRadius: '24px', borderTop: '4px solid var(--color-primary-green)', backgroundColor: 'var(--color-warm-sand)' }}>
              <Leaf size={48} color="var(--color-primary-green)" style={{ margin: '0 auto 24px' }} />
              <h3 style={{ color: 'var(--color-dark-green)', marginBottom: '16px' }}>100% Natural</h3>
              <p style={{ color: 'var(--color-earth-brown)' }}>Sourced from local farms. Zero preservatives and Absolutely no hidden flavor enhancers.</p>
            </div>
            <div className="glass mobile-small-padding" style={{ padding: '40px 24px', textAlign: 'center', borderRadius: '24px', borderTop: '4px solid var(--color-gold-accent)', backgroundColor: 'var(--color-warm-sand)' }}>
              <Sparkles size={48} color="var(--color-gold-accent)" style={{ margin: '0 auto 24px' }} />
              <h3 style={{ color: 'var(--color-dark-green)', marginBottom: '16px' }}>No Artificial Colors</h3>
              <p style={{ color: 'var(--color-earth-brown)' }}>Our vibrant colors come strictly from pure turmeric and authentic sun-dried chillies.</p>
            </div>
            <div className="glass mobile-small-padding" style={{ padding: '40px 24px', textAlign: 'center', borderRadius: '24px', borderTop: '4px solid var(--color-secondary-green)', backgroundColor: 'var(--color-warm-sand)' }}>
              <HeartPulse size={48} color="var(--color-secondary-green)" style={{ margin: '0 auto 24px' }} />
              <h3 style={{ color: 'var(--color-dark-green)', marginBottom: '16px' }}>Traditional Care</h3>
              <p style={{ color: 'var(--color-earth-brown)' }}>Slow-cooked in traditional vessels to ensure every bite provides true nourishment for your body.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CULINARY SPECTRUM */}
      <section ref={addToRefs} className="section-padding" style={{ backgroundColor: 'var(--color-dark-green)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ color: 'white', fontSize: '2.5rem' }}>The Authentic Spectrum</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}>Experience the finest Traditional and Authentic culinary heritage in a cozy boutique layout.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              { type: "Signature Dishes", desc: "Bold, spicy, and authentic Tamil flavors.", icon: <UtensilsCrossed size={48} /> },
              { type: "Heritage Recipes", desc: "Time-honored cooking methods for pure, natural taste.", icon: <Flame size={48} /> },
              { type: "Traditional Staples", desc: "Rooted in wholesome grains and royal dining heritage.", icon: <Crown size={48} /> }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '20px', overflow: 'hidden', 
                border: '1px solid rgba(255,255,255,0.1)', transition: 'transform 0.3s ease',
                textAlign: 'center', padding: '48px 24px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ 
                  width: '90px', height: '90px', borderRadius: '50%', margin: '0 auto 24px',
                  backgroundColor: 'rgba(124, 179, 66, 0.15)', border: '2px solid rgba(124, 179, 66, 0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-banana-leaf)',
                }}>
                  {item.icon}
                </div>
                <h3 style={{ color: 'var(--color-banana-leaf)', marginBottom: '8px' }}>{item.type}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '0' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WAALAI CARE (SPECIAL OFFER) */}
      <section ref={addToRefs} className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <HeartHandshake size={64} color="var(--color-primary-green)" style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '2.8rem', color: 'var(--color-dark-green)', marginBottom: '24px' }}><WaalaiText style={{height: '1em'}}/> Care for Uniquely Gifted Guests</h2>
          <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto 40px', color: 'var(--color-earth-brown)' }}>
            True hospitality knows no boundaries. We are proud to offer a flat **50% discount** daily on all dine-in meals for our uniquely gifted guests (தனித்திறன் படைத்தவர்கள்).
          </p>
          <div style={{ 
            display: 'inline-block', padding: '24px 48px', backgroundColor: 'var(--color-primary-green)', 
            color: 'white', borderRadius: '50px', fontSize: '1.4rem', fontWeight: 800,
            boxShadow: '0 15px 40px rgba(76, 175, 80, 0.3)'
          }}>
            FLAT 50% OFFER - DINING FOR ALL
          </div>
        </div>
      </section>

      {/* SECTION 4.5: MAGIL VIRUNDHU PROMO BANNER */}
      <section ref={addToRefs} style={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #33691e 100%)',
        padding: '80px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* background pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=1&w=1920&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
        {/* floating emojis */}
        <div style={{ position: 'absolute', top: '20px', left: '3%', opacity: 0.12 }}><Leaf size={60} color="white" /></div>
        <div style={{ position: 'absolute', bottom: '20px', right: '4%', opacity: 0.12 }}><UtensilsCrossed size={60} color="white" /></div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.03 }}><ChefHat size={200} color="white" /></div>

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            {/* Text content */}
            <div>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--color-gold-accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.85rem', marginBottom: '16px' }}>
                <Leaf size={16} /> Traditional Banana Leaf Feast
              </span>
              <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                   <UtensilsCrossed size={40} /> மகிழ் விருந்து
                </div>
                <span style={{ color: 'var(--color-banana-leaf)', fontSize: '0.7em' }}>Magil Virundhu</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                Pre-book an authentic traditional feast served on fresh banana leaves. Enjoy Biryani, Chicken Roast, Egg, and Veg sides — prepared fresh, just for your table.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '36px', justifyContent: 'center' }}>
                {[
                  { tag: 'Biryani', icon: <Flame size={14} /> },
                  { tag: 'Chicken Roast', icon: <Drumstick size={14} /> },
                  { tag: 'Egg & Veg Sides', icon: <Leaf size={14} /> },
                  { tag: 'Payasam & Sweets', icon: <Utensils size={14} /> },
                  { tag: 'Ice Cream', icon: <Star size={14} /> }
                ].map(item => (
                  <span key={item.tag} style={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    color: 'white', borderRadius: '50px', 
                    padding: '8px 18px', fontSize: '0.85rem', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    {item.icon} {item.tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate('/magil-virundhu')}
                style={{
                  background: 'var(--color-gold-accent)', color: '#1b1b1b',
                  border: 'none', borderRadius: '50px',
                  padding: '18px 40px', fontSize: '1.1rem', fontWeight: 800,
                  cursor: 'pointer', boxShadow: '0 8px 28px rgba(255,193,7,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(255,193,7,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,193,7,0.35)'; }}
              >
                <UtensilsCrossed size={20} /> Book Magil Virundhu <ChevronRight size={20} />
              </button>
            </div>
        </div>
      </section>

      {/* SECTION 5: PREMIUM TESTIMONIALS */}
      <section ref={addToRefs} className="section-padding" style={{ backgroundColor: 'var(--color-warm-sand)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span style={{ color: 'var(--color-primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>Real Experiences</span>
              <h2 style={{ color: 'var(--color-dark-green)', fontSize: '3rem', marginTop: '10px' }}>What Our Family Says</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {[
              { name: "Karthik R.", review: "It feels like eating homemade food. Knowing they don't add colors makes me confident to feed this to my kids daily. Truly unmatched purity.", role: "Regular Customer" },
              { name: "Priya Lakshmi", review: "We booked them for our wedding. The banana leaf meals were incredibly authentic and the guests praised the natural taste endlessly!", role: "Event Client" },
              { name: "Sundar M.", review: "The 1KG chicken bucket is phenomenal. You can actually taste the raw natural spices and not just artificial heat. True traditional flavor!", role: "Chef & Food Blogger" }
            ].map((t, i) => (
              <div key={i} className="mobile-small-padding" style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative', borderBottom: '5px solid var(--color-gold-accent)' }}>
                <Quote size={50} color="var(--color-primary-green)" style={{ opacity: 0.1, position: 'absolute', top: '20px', right: '20px' }} />
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--color-gold-accent)" color="var(--color-gold-accent)" />)}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '32px', color: 'var(--color-earth-brown)', fontSize: '1.1rem', lineHeight: 1.7 }}>"{t.review}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '23px', backgroundColor: 'var(--color-secondary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>{t.name.charAt(0)}</div>
                  <div>
                    <h4 style={{ margin: 0, color: 'var(--color-dark-green)' }}>{t.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-primary-green)', fontWeight: 600 }}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: BRANCH LOCATIONS & CATERING INQUIRY */}
      <section ref={addToRefs} className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px' }}>
             {/* Locations */}
            <div>
              <h2 style={{ color: 'var(--color-dark-green)', fontSize: '2.5rem', marginBottom: '32px' }}>Visit Our Outlets</h2>
              <div style={{ display: 'grid', gap: '32px' }}>
                 <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--color-warm-sand)' }}>
                   <MapPin color="var(--color-primary-green)" size={32} />
                   <div>
                     <h3 style={{ color: 'var(--color-dark-green)', margin: '0 0 8px 0' }}>Main Branch</h3>
                     <p style={{ color: 'var(--color-text-light)', margin: 0 }}>12, Lady Doak College Rd, <br/>Chinna Chokikulam, Madurai 625002.</p>
                   </div>
                 </div>
                 <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--color-warm-sand)' }}>
                   <MapPin color="var(--color-secondary-green)" size={32} />
                   <div>
                     <h3 style={{ color: 'var(--color-dark-green)', margin: '0 0 8px 0' }}>Anna Nagar Branch</h3>
                     <p style={{ color: 'var(--color-text-light)', margin: 0 }}>No:187, 80 Feet Rd, opp. DD Designs, <br/>Near Ambiga Cinemas, Anna Nagar, <br/>Sathamangalam 625020.</p>
                   </div>
                 </div>
              </div>
            </div>

            {/* Catering */}
            <div className="mobile-small-padding" style={{ backgroundColor: 'white', border: '3px solid var(--color-primary-green)', padding: '47px', borderRadius: '30px', color: 'var(--color-dark-green)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05 }}><ChefHat size={150} /></div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-dark-green)' }}>Planning an Event?</h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--color-earth-brown)', fontWeight: 500, lineHeight: 1.6 }}>
                Experience our professional 5-star catering service. We bring the authentic <WaalaiText /> taste to your weddings, corporate meetings, and family gatherings.
              </p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/catering')}
                style={{ backgroundColor: 'var(--color-primary-green)', color: 'white', border: 'none', width: '100%', padding: '20px', fontSize: '1.1rem', fontWeight: 800, borderRadius: '50px' }}
              >
                Enquire for Catering Services <ChevronRight style={{ marginLeft: '10px' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CONTACT US */}
      <section ref={addToRefs} id="contact" className="section-padding" style={{ backgroundColor: 'var(--color-warm-sand)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: 'var(--color-primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>Reach Out</span>
            <h2 style={{ color: 'var(--color-dark-green)', fontSize: '2.8rem', marginTop: '10px' }}>Get in Touch</h2>
            <p style={{ color: 'var(--color-earth-brown)', fontSize: '1.2rem', maxWidth: '700px', margin: '16px auto 0' }}>
              We'd love to hear from you. Find us at our traditional restaurant or reach out via WhatsApp for immediate assistance.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {/* Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass" style={{ padding: '32px', display: 'flex', alignItems: 'flex-start', gap: '16px', borderRadius: '16px', backgroundColor: 'white', borderLeft: '4px solid var(--color-primary-green)' }}>
                <MapPin size={32} color="var(--color-primary-green)" style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ marginBottom: '8px', color: 'var(--color-dark-green)' }}>Our Branches</h3>
                  <p style={{ color: 'var(--color-earth-brown)', marginBottom: '12px', fontSize: '0.9rem' }}>
                    <strong>Main Branch:</strong> 12, Lady Doak College Rd, Chinna Chokikulam, Madurai, Tamil Nadu 625002.
                  </p>
                  <p style={{ color: 'var(--color-earth-brown)', fontSize: '0.9rem' }}>
                    <strong>Anna Nagar:</strong> No:187, 80 Feet Rd, opp. DD Designs, Near Ambiga Cinemas, Anna Nagar, Sathamangalam, Tamil Nadu 625020.
                  </p>
                </div>
              </div>

              <div className="glass" style={{ padding: '32px', display: 'flex', alignItems: 'flex-start', gap: '16px', borderRadius: '16px', backgroundColor: 'white', borderLeft: '4px solid var(--color-gold-accent)' }}>
                <Phone size={32} color="var(--color-gold-accent)" style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ marginBottom: '8px', color: 'var(--color-dark-green)' }}>Phone Number</h3>
                  <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-earth-brown)' }}>
                    <a href="tel:9367757775" style={{ color: 'inherit', textDecoration: 'none' }}>93677 57775</a>
                  </p>
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
            <div className="glass" style={{ padding: '8px', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', backgroundColor: 'white' }}>
              <iframe 
                src="https://maps.google.com/maps?q=12+Lady+Doak+College+Rd+Chinna+Chokikulam+Madurai&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%"
                style={{ border: 0, borderRadius: '8px', minHeight: '380px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Waalai Mess Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
