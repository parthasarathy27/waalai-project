import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  Sparkles, 
  HeartPulse, 
  Quote, 
  MapPin, 
  ChefHat, 
  HeartHandshake,
  Star,
  ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    bgImage: "https://images.unsplash.com/photo-1541014741259-de529411b96a?q=80&w=1920&auto=format&fit=crop",
    featuredImage: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop",
    subtitle: "Authentic Tradition",
    titlePrimary: "Taste the",
    titleHighlight: "Chettinad Legacy",
    description: "Immerse yourself in heritage with our naturally prepared Non-Veg delicacies, slow-cooked for hours.",
    actionText: "Order Biryani",
    actionLink: "/order"
  },
  {
    bgImage: "https://unsplash.com/photos/bunch-of-vegetables-D6Tu_L3chLEhttps://unsplash.com/photos/bunch-of-vegetables-D6Tu_L3chLE?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink",
    featuredImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
    subtitle: "Purity of Nature",
    titlePrimary: "Feel the",
    titleHighlight: "Organic Essence",
    description: "Pure, wholesome vegetarian meals served traditionally. No artificial colors, just nature's goodness.",
    actionText: "See Veg Menu",
    actionLink: "/order"
  },
  {
    bgImage: "https://images.unsplash.com/photo-1555243629-3eba2f7b0f57?q=80&w=1920&auto=format&fit=crop",
    featuredImage: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
    subtitle: "Grandiose Catering",
    titlePrimary: "Expertly",
    titleHighlight: "Curated Events",
    description: "Make your grandest occasions unforgettable with our authentic curated hospitality and service.",
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
      
      {/* SECTION 1: DYAMIC SPLIT-HERO SLIDER */}
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
        
        {/* SHADE GRADIENT - UPDATED TO BE TRANSPARENT ON THE RIGHT */}
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
              <div className="slide-fade-in" style={{ display: 'flex', gap: '20px' }}>
                <button className="btn btn-primary" onClick={() => navigate(slides[currentSlide].actionLink)} style={{ padding: '18px 45px', fontSize: '1.1rem' }}>
                  {slides[currentSlide].actionText}
                </button>
                {/* Dots Navigation */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '20px' }}>
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => setCurrentSlide(i)} style={{
                      width: i === currentSlide ? '30px' : '10px',
                      height: '10px', borderRadius: '5px', border: 'none',
                      backgroundColor: i === currentSlide ? 'var(--color-gold-accent)' : 'rgba(255,255,255,0.3)',
                      transition: 'all 0.3s ease', cursor: 'pointer'
                    }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Featured Image) - UNIFIED ATTRACTIVE BOX DESIGN */}
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
                  border: '4px solid white' // Thick white border for the "box" look
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
              <p style={{ color: 'var(--color-earth-brown)' }}>Sourced from local farms. Zero preservatives, Zero MSG, and Absolutely no hidden flavor enhancers.</p>
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
            <h2 style={{ color: 'white', fontSize: '2.5rem' }}>The Culinary Spectrum</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}>Experience the finest Chettinad, Chinese, and Mughlai dishes in a cozy boutique layout.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              { type: "Chettinad", desc: "Bold, spicy, and authentic Tamil flavors.", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=600" },
              { type: "Chinese", desc: "Stir-fried goodness with a Waalai twist.", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600" },
              { type: "Mughlai", desc: "Rich, creamy, and royal dining legacy.", img: "https://images.unsplash.com/photo-1545240681-41223e74360e?q=80&w=600" }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '20px', overflow: 'hidden', 
                border: '1px solid rgba(255,255,255,0.1)', transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '220px', overflow: 'hidden' }}>
                    <img src={item.img} alt={item.type} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ color: 'var(--color-banana-leaf)', marginBottom: '8px' }}>{item.type}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '0' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WAALAI CARE (SPECIAL OFFER) */}
      <section ref={addToRefs} className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <HeartHandshake size={64} color="var(--color-primary-green)" style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '2.8rem', color: 'var(--color-dark-green)', marginBottom: '24px' }}>Waalai Care for Special People</h2>
          <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto 40px', color: 'var(--color-earth-brown)' }}>
            True hospitality knows no boundaries. We are proud to offer a flat **50% discount** daily on all dine-in meals for our guests with special needs.
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
              { name: "Sundar M.", review: "The 1KG chicken bucket is phenomenal. You can actually taste the raw natural spices and not just artificial heat. True Madurai flavor!", role: "Chef & Food Blogger" }
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
              <h2 style={{ color: 'var(--color-dark-green)', fontSize: '2.5rem', marginBottom: '32px' }}>Find Us in Madurai</h2>
              <div style={{ display: 'grid', gap: '32px' }}>
                 <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--color-warm-sand)' }}>
                   <MapPin color="var(--color-primary-green)" size={32} />
                   <div>
                     <h3 style={{ color: 'var(--color-dark-green)', margin: '0 0 8px 0' }}>Anna Nagar Branch</h3>
                     <p style={{ color: 'var(--color-text-light)', margin: 0 }}>Sathamangalam (Near Ambiga Cinemas), <br/>Anna Nagar, Madurai.</p>
                   </div>
                 </div>
                 <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--color-warm-sand)' }}>
                   <MapPin color="var(--color-secondary-green)" size={32} />
                   <div>
                     <h3 style={{ color: 'var(--color-dark-green)', margin: '0 0 8px 0' }}>KK Nagar Branch</h3>
                     <p style={{ color: 'var(--color-text-light)', margin: 0 }}>KK Nagar Area, <br/>Madurai's Culinary Hub.</p>
                   </div>
                 </div>
              </div>
            </div>

            {/* Catering */}
            <div className="mobile-small-padding" style={{ backgroundColor: 'var(--color-dark-green)', padding: '50px', borderRadius: '30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}><ChefHat size={200} /></div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Planning an Event?</h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9, lineHeight: 1.6 }}>
                Experience our professional 5-star catering service. We bring the authentic Waalai taste to your weddings, corporate meetings, and family gatherings.
              </p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/catering')}
                style={{ backgroundColor: 'var(--color-gold-accent)', color: 'var(--color-earth-brown)', border: 'none', width: '100%', padding: '20px', fontSize: '1.1rem', fontWeight: 800 }}
              >
                Inquire for Catering Services <ChevronRight style={{ marginLeft: '10px' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
