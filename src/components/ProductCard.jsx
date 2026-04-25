import { Plus, Star } from 'lucide-react';
import { formatCurrency } from '../data/products';
import { urlFor } from '../utils/sanity';

export default function ProductCard({ product, onAdd }) {
  const getImageUrl = () => {
    if (!product.image) return null;
    
    // Se for o fallback local que adicionamos
    if (product.image.localPath) {
      return product.image.localPath;
    }

    // Se for um objeto de asset da Sanity
    if (product.image.asset) {
      try {
        return urlFor(product.image).width(600).url();
      } catch {
        return null;
      }
    }

    // Se for uma string (caso antigo)
    if (typeof product.image === 'string') {
      return product.image;
    }
    
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="elite-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}>
      <div className="img-container responsive-img-height">
        {imageUrl ? (
          <img 
            src={imageUrl} 
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
              fontSize: '0.6rem', 
              letterSpacing: '0.2em',
              zIndex: 1,
              textAlign: 'center',
              padding: '0 0.5rem'
            }}>
              EXPERIENCIA ARUN
            </span>
          </div>
        )}

        {/* Floating Price Badge */}
        <div className="price-badge">
          {formatCurrency(product.price)}
        </div>
      </div>
      
      <div className="card-content-responsive">
        {product.category === "Signature" && (
          <div className="signature-badge">
            <Star size={8} fill="currentColor" /> <span>Signature</span> <Star size={8} fill="currentColor" />
          </div>
        )}

        <h3 className="product-title-responsive">
          {product.name}
        </h3>
        
        <p className="product-desc-responsive">
          "{product.description}"
        </p>
        
        <button 
          onClick={() => onAdd(product)}
          className="category-tab active add-btn-responsive"
        >
          <Plus size={14} className="plus-icon-hide" />
          <span>AÑADIR</span>
        </button>
      </div>

      <style>{`
        .img-container.responsive-img-height {
          height: 160px;
        }
        .price-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: var(--accent-gold);
          color: #000;
          padding: 0.3rem 0.6rem;
          font-size: 0.7rem;
          font-weight: 800;
          z-index: 2;
          font-family: var(--font-display);
        }
        .card-content-responsive {
          padding: 1.25rem 0.75rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          text-align: center;
          background: rgba(0,0,0,0.4);
        }
        .signature-badge {
          color: var(--accent-gold);
          font-size: 0.55rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
        }
        .product-title-responsive {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-family: var(--font-display);
          line-height: 1.2;
        }
        .product-desc-responsive {
          color: var(--text-secondary);
          font-size: 0.7rem;
          margin-bottom: 1.25rem;
          flex-grow: 1;
          line-height: 1.5;
          opacity: 0.6;
          font-style: italic;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .add-btn-responsive {
          width: 100%; 
          font-size: 0.65rem !important; 
          padding: 0.7rem 0.5rem !important;
          letter-spacing: 0.1em !important;
        }

        @media (min-width: 768px) {
          .img-container.responsive-img-height {
            height: 280px;
          }
          .price-badge {
            top: 1.5rem;
            right: 1.5rem;
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
          .card-content-responsive {
            padding: 2.5rem;
          }
          .signature-badge {
            font-size: 0.65rem;
            letter-spacing: 0.4em;
            margin-bottom: 1rem;
            gap: 0.5rem;
          }
          .product-title-responsive {
            font-size: 1.65rem;
            margin-bottom: 1rem;
          }
          .product-desc-responsive {
            font-size: 0.85rem;
            margin-bottom: 2.5rem;
            line-height: 2;
            -webkit-line-clamp: 3;
          }
          .add-btn-responsive {
            font-size: 0.7rem !important; 
            padding: 1rem !important;
          }
        }
        
        .elite-card:hover .product-img-zoom {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
