import { Plus, Star } from 'lucide-react';
import { formatCurrency } from '../data/products';

export default function ProductCard({ product, onAdd }) {
  const hasImage = !!product.image;

  return (
    <div className="elite-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}>
      <div className="img-container">
        {hasImage ? (
          <img 
            src={product.image} 
            alt={product.name} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="product-img-zoom"
          />
        ) : (
          <div className="fallback-luxury">
            <span style={{ 
              color: 'var(--accent-gold)', 
              fontFamily: 'var(--font-display)', 
              fontSize: '0.7rem', 
              letterSpacing: '0.3em',
              zIndex: 1
            }}>
              EXPERIENCIA ARUN
            </span>
          </div>
        )}

        {/* Floating Price Badge */}
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'var(--accent-gold)',
          color: '#000',
          padding: '0.5rem 1rem',
          fontSize: '0.85rem',
          fontWeight: 700,
          zIndex: 2,
          fontFamily: 'var(--font-display)'
        }}>
          {formatCurrency(product.price)}
        </div>
      </div>
      
      <div style={{
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        textAlign: 'center',
        background: 'rgba(0,0,0,0.4)'
      }}>
        {product.category === "Signature" && (
          <div style={{
            color: 'var(--accent-gold)',
            fontSize: '0.65rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <Star size={10} fill="currentColor" /> Signature <Star size={10} fill="currentColor" />
          </div>
        )}

        <h3 style={{
          fontSize: '1.65rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)'
        }}>
          {product.name}
        </h3>
        
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.85rem',
          marginBottom: '2.5rem',
          flexGrow: 1,
          lineHeight: 2,
          opacity: 0.7,
          fontStyle: 'italic',
          fontFamily: 'var(--font-base)'
        }}>
          "{product.description}"
        </p>
        
        <button 
          onClick={() => onAdd(product)}
          className="category-tab active"
          style={{ width: '100%', fontSize: '0.7rem', padding: '1rem' }}
        >
          <Plus size={14} style={{ marginRight: '10px' }} />
          AÑADIR AL PEDIDO
        </button>
      </div>

      <style>{`
        .elite-card:hover .product-img-zoom {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
