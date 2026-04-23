import { MapPin, Phone, Clock } from 'lucide-react';

export default function Footer({ settings }) {
  const scheduleLines = settings?.schedule 
    ? (Array.isArray(settings.schedule) ? settings.schedule : settings.schedule.split('\n'))
    : ["Martes a Domingo", "19:00 - 00:00"];

  return (
    <footer style={{
      background: '#050505',
      padding: '4rem 0 2rem',
      borderTop: '1px solid rgba(207, 181, 59, 0.1)',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ 
              color: 'var(--accent-gold)', 
              fontSize: '1.75rem', 
              marginBottom: '1rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.05em'
            }}>
              ARUN ASIAN BAR
            </h3>
            <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '300px' }}>
              {settings?.footerDescription || "Una experiencia gastronómica única donde la tradición asiática se encuentra con la elegancia contemporánea en el corazón de Salto del Guairá."}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600, fontFamily: 'var(--font-display)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Ubicación y Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <a href={settings?.addressLink || "https://www.google.com/maps/place/Arun+Asian+Bar/@-24.0702146,-54.3079814,17z/data=!3m1!4b1!4m6!3m5!1s0x94f4b1207237d7e9:0x78cf404bc63498f7!8m2!3d-24.0702146!4d-54.3079814!16s%2Fg%2F11ry5mx7tr?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D"} target="_blank" rel="noreferrer" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
                <MapPin size={20} className="text-gold" />
                <span style={{ textDecoration: 'underline' }}>{settings?.address || "Salto del Guairá, Paraguay"}</span>
              </a>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={20} className="text-gold" />
                <span>{settings?.whatsapp || "+595 994 194 471"}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600, fontFamily: 'var(--font-display)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Horarios</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Clock size={20} className="text-gold" />
                <div style={{ textAlign: 'left' }}>
                  {scheduleLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
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
