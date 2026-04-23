import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      width: '100%'
    }}>
      {/* Immersive Image that dictates height */}
      <img 
        src="/hero.jpg" 
        alt="Arun Asian Experience" 
        style={{
          width: '100%',
          height: '60vh',
          minHeight: '400px',
          display: 'block',
          objectFit: 'cover'
        }}
      />
      
      {/* Overlay Background for text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(8, 8, 8, 0.75)',
        zIndex: 2
      }}></div>

      <div className="container" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        textAlign: 'center',
        width: '100%'
      }}>
        <div className="reveal-item">
          <img 
            src="/logoarun.png" 
            alt="Arun Logo" 
            style={{ height: '80px', margin: '0 auto 2rem', display: 'block' }} 
          />
          
          <h1 className="gold-glow-text" style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            marginBottom: '1rem',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.02em'
          }}>
            Arun Asian Bar
          </h1>

          <span className="subtitle-gold" style={{ 
            letterSpacing: '0.4em', 
            marginBottom: '3rem', 
            display: 'block', 
            color: 'var(--accent-gold)', 
            fontSize: '0.85rem' 
          }}>
            BIG DREAMS, GOOD MUSIC & EXPENSIVE TASTE
          </span>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="category-tab active" 
              onClick={() => document.getElementById('menu').scrollIntoView({behavior: 'smooth'})}
              style={{ padding: '1.2rem 4rem', fontSize: '0.9rem' }}
            >
              EXPLORAR MENÚ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
