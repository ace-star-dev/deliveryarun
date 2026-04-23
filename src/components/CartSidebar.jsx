import { X, Minus, Plus, ShoppingBag, CreditCard, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '../data/products';

export default function CartSidebar({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleContinueShopping = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
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
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
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
        zIndex: 101,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        <div style={{
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} className="text-accent" /> Tu Pedido
          </h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px'
              }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} 
                />
                
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.name}</h4>
                    <button 
                      onClick={() => onRemove(item.id)}
                      style={{ color: 'var(--text-secondary)', background: 'none', padding: '0.2rem', cursor: 'pointer', border: 'none' }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                  
                  <div style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                    {formatCurrency(item.price)}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.2rem', color: 'var(--text-primary)', cursor: 'pointer' }}
                    ><Minus size={14} /></button>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, minWidth: '1rem', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.2rem', color: 'var(--text-primary)', cursor: 'pointer' }}
                    ><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: 600 }}>
              <span>Total</span>
              <span style={{ color: 'var(--accent-color)' }}>{formatCurrency(total)}</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                className="btn-primary" 
                onClick={onCheckout}
                style={{ 
                  width: '100%', 
                  padding: '0.85rem', 
                  fontSize: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem'
                }}
              >
                <CreditCard size={18} /> Finalizar Pedido
              </button>

              <button 
                onClick={handleContinueShopping}
                style={{ 
                  width: '100%', 
                  padding: '0.85rem', 
                  fontSize: '0.9rem', 
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-luxury)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  e.currentTarget.style.color = 'var(--accent-gold)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <ArrowLeft size={16} /> Continuar Comprando
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
