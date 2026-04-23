import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

export default function Header({ settings, cartItemCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 100, 
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      height: scrolled ? '70px' : '100px',
      background: scrolled ? 'rgba(8, 8, 8, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 2rem'
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/logoarun.png" 
            alt="Arun Logo" 
            style={{ 
              height: scrolled ? '35px' : '50px', 
              transition: 'all 0.5s ease',
              cursor: 'pointer'
            }} 
            onClick={() => window.scrollTo(0,0)} 
          />
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: 'none', gap: '3rem' }} className="desktop-nav">
          <a href="#" className="nav-link active">Inicio</a>
          <a href="#menu" className="nav-link">La Carta</a>
          <a href={settings?.instagram || "https://www.instagram.com/arunasianbar/"} target="_blank" rel="noreferrer" className="nav-link">Instagram</a>
        </nav>

        <style>{`
          @media (min-width: 1024px) {
            .desktop-nav { display: flex !important; }
            .mobile-toggle { display: none !important; }
          }
          .nav-link {
            color: #fff;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.25em;
            transition: all 0.3s ease;
            position: relative;
            opacity: 0.7;
          }
          .nav-link:hover, .nav-link.active {
            opacity: 1;
            color: var(--accent-gold);
          }
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            width: 0;
            height: 1px;
            background: var(--accent-gold);
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }
          .nav-link:hover::after, .nav-link.active::after {
            width: 20px;
          }
          .btn-icon-luxury {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(212, 175, 55, 0.1);
            color: #fff;
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
            position: relative;
            cursor: pointer;
          }
          .btn-icon-luxury:hover {
            background: var(--accent-gold);
            color: #000;
            border-color: var(--accent-gold);
            box-shadow: 0 0 15px var(--accent-gold-glow);
          }
        `}</style>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div className="btn-icon-luxury" onClick={onCartClick}>
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartItemCount > 0 && (
              <span style={{
                position: 'absolute', 
                top: '-2px', 
                right: '-2px', 
                background: 'var(--accent-burgundy)', 
                color: 'var(--text-primary)', 
                fontSize: '0.65rem', 
                fontWeight: 'bold',
                width: '18px', 
                height: '18px', 
                borderRadius: '50%',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {cartItemCount}
              </span>
            )}
          </div>
          
          <div className="btn-icon-luxury mobile-toggle" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={18} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'var(--bg-primary)', zIndex: 1000,
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }} className="reveal">
          <button style={{ 
            position: 'absolute', top: '2.5rem', right: '2.5rem', 
            background: 'none', border: 'none', color: 'var(--text-primary)' 
          }} onClick={() => setMobileMenuOpen(false)}>
            <X size={32} strokeWidth={1} />
          </button>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3rem', fontSize: '2.5rem', fontFamily: 'var(--font-display)' }}>
            <a href="#" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Inicio</a>
            <a href="#menu" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>La Carta</a>
            <a href={settings?.instagram || "https://www.instagram.com/arunasianbar/"} target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Instagram</a>
          </nav>
          
          <div style={{ marginTop: '5rem', color: 'var(--accent-gold)', opacity: 0.5, fontSize: '0.75rem', letterSpacing: '0.4em' }}>
            BIG DREAMS • GOOD MUSIC
          </div>
        </div>
      )}
    </header>
  );
}
