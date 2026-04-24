import { X, Minus, Plus, ShoppingBag, CreditCard, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '../data/products';
import { urlFor } from '../utils/sanity';

export default function CartSidebar({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.localPath) return image.localPath;
    if (image.asset) {
      try {
        return urlFor(image).width(120).url();
      } catch (e) {
        return null;
      }
    }
    if (typeof image === 'string') return image;
    return null;
  };

  const handleContinueShopping = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            transition: 'opacity 0.3s'
          }}
        />
      )}

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '400px',
        background: 'var(--bg-secondary)',
        borderLeft: '1px solid var(--border-color)',
        zIndex: 1001,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-20px 0 50px rgba(0,0,0,0.5)'
      }}>
        
        <div style={{
          padding: '2rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'var(--font-display)', color: 'var(--accent-gold)' }}>
            <ShoppingBag size={22} /> TU PEDIDO
          </h2>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '4rem' }}>
              <ShoppingBag size={64} style={{ margin: '0 auto 1.5rem', opacity: 0.1, color: 'var(--accent-gold)' }} />
              <p style={{ letterSpacing: '0.1em', fontSize: '0.9rem' }}>Tu carrito está esperando por ti.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item._id} style={{
                display: 'flex',
                gap: '1.25rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                borderRadius: '4px'
              }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={(e) => { e.target.src = '/logoarun.png'; e.target.style.padding = '10px'; }}
                  />
                </div>
                
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontWeight: 600, fontSize: '0.95rem', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{item.name}</h4>
                    <button 
                      onClick={() => onRemove(item._id)}
                      style={{ color: 'var(--text-secondary)', background: 'none', padding: '0.2rem', cursor: 'pointer', border: 'none' }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                    {formatCurrency(item.price)}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '2px' }}>
                      <button 
                        onClick={() => onUpdateQuantity(item._id, -1)}
                        style={{ background: 'none', border: 'none', padding: '0.4rem', color: 'var(--text-primary)', cursor: 'pointer' }}
                      ><Minus size={14} /></button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '1.5rem', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item._id, 1)}
                        style={{ background: 'none', border: 'none', padding: '0.4rem', color: 'var(--text-primary)', cursor: 'pointer' }}
                      ><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{
            padding: '2rem 1.5rem',
            borderTop: '1px solid var(--border-color)',
            background: 'rgba(10, 10, 10, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
              <span>TOTAL</span>
              <span style={{ color: 'var(--accent-gold)' }}>{formatCurrency(total)}</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                className="category-tab active" 
                onClick={onCheckout}
                style={{ 
                  width: '100%', 
                  padding: '1.2rem', 
                  fontSize: '0.85rem', 
                  letterSpacing: '0.2em',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.75rem'
                }}
              >
                <CreditCard size={18} /> FINALIZAR PEDIDO
              </button>

              <button 
                onClick={handleContinueShopping}
                style={{ 
                  width: '100%', 
                  padding: '1.2rem', 
                  fontSize: '0.75rem', 
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  letterSpacing: '0.15em',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.75rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-luxury)'
                }}
              >
                <ArrowLeft size={16} /> CONTINUAR COMPRANDO
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
