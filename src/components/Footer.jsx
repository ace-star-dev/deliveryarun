import { MapPin, Phone, Clock } from 'lucide-react';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function Footer() {
  return (
    <footer style={{
      background: '#050505',
      padding: '4rem 0 2rem',
      borderTop: '1px solid rgba(212, 175, 55, 0.1)',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          
          <div>
            <h3 style={{ 
              color: 'var(--accent-color)', 
              fontSize: '1.75rem', 
              marginBottom: '1rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.05em'
            }}>
              ARUNA
            </h3>
            <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
              El santuario de la alta cocina asiática en Salto del Guairá. 
              Donde la sofisticación y el sabor se encuentran para crear momentos inolvidables.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://www.instagram.com/arunasianbar/" target="_blank" rel="noreferrer" className="btn-icon">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="btn-icon">
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>Ubicación y Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={20} className="text-gold" />
                <span>Salto del Guairá, Paraguay <br /> Plaza City - Shop. Mercosur</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={20} className="text-gold" />
                <span>+595 981 123 456</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>Horarios</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Clock size={20} className="text-gold" />
                <div>
                  <p>Mar - Jue: 19:00 - 00:00</p>
                  <p>Vie - Dom: 19:00 - 01:30</p>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 600 }}>* Abierto los Domingos</p>
            </div>
          </div>

        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '2rem',
          textAlign: 'center',
          fontSize: '0.85rem'
        }}>
          <p>© {new Date().getFullYear()} AXIS - Soluciones Digitales - Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
