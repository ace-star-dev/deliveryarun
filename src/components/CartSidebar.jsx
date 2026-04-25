import { X, Minus, Plus, ShoppingBag, CreditCard } from 'lucide-react';
import { formatCurrency } from '../data/products';
import { urlFor } from '../utils/sanity';

export default function CartSidebar({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onCheckout, products, onAdd }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const suggestions = products
    .filter(p => !cart.find(item => item._id === p._id))
    .filter(p => p.category === "Bebidas" || p.category === "Signature" || p.price < 50000)
    .slice(0, 2);

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.localPath) return image.localPath;
    if (image.asset) {
      try {
        return urlFor(image).width(100).url();
      } catch {
        return null;
      }
    }
    if (typeof image === 'string') return image;
    return null;
  };

  return (
    <>
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
          }}
        />
      )}

      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '400px',
        background: '#080808',
        borderLeft: '1px solid var(--accent-gold)',
        zIndex: 1001,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-20px 0 50px rgba(0,0,0,0.9)'
      }}>
        
        <div style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', color: 'var(--accent-gold)', margin: 0, letterSpacing: '0.1em' }}>MI PEDIDO</h2>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '4rem' }}>
              <ShoppingBag size={40} style={{ opacity: 0.2, color: 'var(--accent-gold)', marginBottom: '1rem' }} />
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item._id} style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  position: 'relative'
                }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      onError={(e) => { e.target.src = '/logoarun.png'; }}
                    />
                  </div>
                  
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h4 style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff', marginBottom: '0.25rem' }}>{item.name}</h4>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      {formatCurrency(item.price)}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', background: '#000', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '4px' }}>
                        <button onClick={() => onUpdateQuantity(item._id, -1)} style={{ background: 'none', border: 'none', padding: '0.3rem 0.6rem', color: '#fff', cursor: 'pointer' }}><Minus size={12} /></button>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, minWidth: '1.5rem', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item._id, 1)} style={{ background: 'none', border: 'none', padding: '0.3rem 0.6rem', color: '#fff', cursor: 'pointer' }}><Plus size={12} /></button>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => onRemove(item._id)}
                    style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', color: 'rgba(255,255,255,0.2)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              {suggestions.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--accent-gold)', marginBottom: '1rem', textTransform: 'uppercase' }}>Sugerencias</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {suggestions.map(p => (
                      <div key={p._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', background: 'rgba(207, 181, 59, 0.02)', border: '1px dashed rgba(207, 181, 59, 0.1)', borderRadius: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={getImageUrl(p.image)} alt={p.name} style={{ width: '30px', height: '30px', borderRadius: '3px', objectFit: 'cover' }} />
                          <div style={{ fontSize: '0.75rem', color: '#fff' }}>{p.name}</div>
                        </div>
                        <button onClick={() => onAdd(p)} style={{ background: 'var(--accent-gold)', color: '#000', border: 'none', borderRadius: '3px', padding: '0.25rem 0.5rem', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer' }}>+ ADD</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{
            padding: '1.5rem',
            borderTop: '2px solid var(--accent-gold)',
            background: '#050505',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
              <span>TOTAL</span>
              <span style={{ color: 'var(--accent-gold)' }}>{formatCurrency(total)}</span>
            </div>
            
            <button 
              onClick={onCheckout}
              style={{ 
                width: '100%', 
                padding: '1rem', 
                borderRadius: '4px',
                fontSize: '0.9rem', 
                fontWeight: 900,
                background: 'var(--accent-gold)',
                color: '#000',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem'
              }}
            >
              <CreditCard size={18} /> CONTINUAR AL PAGO
            </button>
          </div>
        )}
      </div>
    </>
  );
}
