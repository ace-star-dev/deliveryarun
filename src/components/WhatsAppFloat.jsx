import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = ({ phone, message = "¡Hola! Me gustaría hacer una consulta." }) => {
  if (!phone) return null;
  
  const url = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
        zIndex: 999,
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.3)';
      }}
    >
      <MessageCircle size={32} />
    </a>
  );
};

export default WhatsAppFloat;
