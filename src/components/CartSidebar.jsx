import { X, Minus, Plus, ShoppingBag, CreditCard, ArrowLeft, PlusCircle } from 'lucide-react';
import { formatCurrency } from '../data/products';
import { urlFor } from '../utils/sanity';

export default function CartSidebar({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onCheckout, products, onAdd }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Suggestions for upsell (items not in cart, preferably drinks or small items)
  const suggestions = products
    .filter(p => !cart.find(item => item._id === p._id))
    .filter(p => p.category === "Bebidas" || p.category === "Signature" || p.price < 50000)
    .slice(0, 3);

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.localPath) return image.localPath;
    if (image.asset) {
      try {
        return urlFor(image).width(120).url();
      } catch {
        return null;
      }
    }
    if (typeof image === 'string') return image;
    return null;
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
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
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
        maxWidth: '450px',
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
          padding: '2rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(to right, #080808, #1a1a1a)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)'
        }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', color: 'var(--accent-gold)', margin: 0 }}>MI PEDIDO</h2>
            <p style={{ fontSize: '0.7rem', opacity: 0.5, letterSpacing: '0.2em', marginTop: '0.2rem' }}>ARUN ASIAN BAR</p>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212, 175, 55, 0.2)', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '4rem', padding: '0 2rem' }}>
              <div style={{ 
                width: '100px', height: '100px', background: 'rgba(212, 175, 55, 0.05)', 
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 2rem'
              }}>
                <ShoppingBag size={40} style={{ opacity: 0.3, color: 'var(--accent-gold)' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#fff', marginBottom: '1rem' }}>Tu carrito está vacío</p>
              <button 
                onClick={onClose}
                className="category-tab active"
                style={{ fontSize: '0.7rem', padding: '1rem 2rem' }}
              >
                VER CARTA
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cart.map(item => (
                  <div key={item._id} style={{
                    display: 'flex',
                    gap: '1.25rem',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    position: 'relative'
                  }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={item.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        onError={(e) => { e.target.src = '/logoarun.png'; e.target.style.padding = '10px'; }}
                      />
                    </div>
                    
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h4 style={{ fontWeight: 600, fontSize: '1rem', fontFamily: 'var(--font-display)', color: '#fff', marginBottom: '0.4rem' }}>{item.name}</h4>
                      <div style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.8rem' }}>
                        {formatCurrency(item.price)}
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '4px' }}>
                          <button 
                            onClick={() => onUpdateQuantity(item._id, -1)}
                            style={{ background: 'none', border: 'none', padding: '0.5rem', color: 'var(--text-primary)', cursor: 'pointer' }}
                          ><Minus size={14} /></button>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, minWidth: '2rem', textAlign: 'center', color: 'var(--accent-gold)' }}>
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(item._id, 1)}
                            style={{ background: 'none', border: 'none', padding: '0.5rem', color: 'var(--text-primary)', cursor: 'pointer' }}
                          ><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => onRemove(item._id)}
                      style={{ 
                        position: 'absolute', top: '1rem', right: '1rem',
                        color: 'rgba(255,255,255,0.3)', background: 'none', cursor: 'pointer', border: 'none' 
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* UPSELL SECTION */}
              {suggestions.length > 0 && (
                <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
                  <h3 style={{ 
                    fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--accent-gold)', 
                    marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                    paddingBottom: '0.5rem'
                  }}>PARA ACOMPAÑAR</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {suggestions.map(p => (
                      <div key={p._id} style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.8rem', background: 'rgba(207, 181, 59, 0.03)', border: '1px dashed rgba(207, 181, 59, 0.2)',
                        borderRadius: '8px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden' }}>
                            <img src={getImageUrl(p.image)} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{p.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{formatCurrency(p.price)}</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => onAdd(p)}
                          style={{ 
                            background: 'var(--accent-gold)', color: '#000', border: 'none', 
                            borderRadius: '4px', padding: '0.4rem 0.8rem', fontSize: '0.7rem',
                            fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
                          }}
                        >
                          <PlusCircle size={14} /> AÑADIR
                        </button>
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
            padding: '2rem 1.5rem',
            borderTop: '2px solid var(--accent-gold)',
            background: 'linear-gradient(to top, #000, #080808)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: '#fff' }}>
              <span>TOTAL</span>
              <span style={{ color: 'var(--accent-gold)', textShadow: '0 0 10px rgba(207, 181, 59, 0.3)' }}>{formatCurrency(total)}</span>
            </div>
            
            <button 
              className="floating-cart-btn" 
              onClick={onCheckout}
              style={{ 
                position: 'relative',
                bottom: 'auto',
                right: 'auto',
                width: '100%', 
                height: 'auto',
                padding: '1.4rem', 
                borderRadius: '8px',
                fontSize: '1rem', 
                letterSpacing: '0.3em',
                fontWeight: 900,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '1rem',
                background: 'var(--accent-gold)',
                color: '#000',
                boxShadow: '0 10px 30px rgba(207, 181, 59, 0.4)'
              }}
            >
              <CreditCard size={22} /> FINALIZAR PEDIDO
            </button>

            <button 
              onClick={onClose}
              style={{ 
                width: '100%', padding: '0.5rem', background: 'none', border: 'none',
                color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '0.1em',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
              }}
            >
              <ArrowLeft size={12} /> CONTINUAR COMPRANDO
            </button>
          </div>
        )}

      </div>
    </>
  );
}
