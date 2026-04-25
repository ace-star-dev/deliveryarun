import { X, Minus, Plus, ShoppingBag, CreditCard, Sparkles } from 'lucide-react';
import { formatCurrency } from '../data/products';
import { urlFor } from '../utils/sanity';

export default function CartSidebar({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onCheckout, products, onAdd }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 5, 5, 0.9)',
            backdropFilter: 'blur(15px)',
            zIndex: 2500,
          }}
        />
      )}

      <div className={`cart-sidebar-luxury ${isOpen ? 'open' : ''}`}>
        
        <div className="cart-header-luxury">
          <div className="title-group">
            <span className="subtitle-mini">SU SELECCIÓN</span>
            <h2 className="title-luxury">MI PEDIDO</h2>
          </div>
          <button className="btn-close-luxury" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-content-luxury">
          {cart.length === 0 ? (
            <div className="empty-cart-luxury">
              <div className="icon-circle">
                <ShoppingBag size={40} />
              </div>
              <p className="empty-text">SU CARRITO ESTÁ VACÍO</p>
              <button onClick={onClose} className="btn-return-luxury">VER LA CARTA</button>
            </div>
          ) : (
            <div className="items-list-luxury">
              {cart.map(item => (
                <div key={item._id} className="cart-item-luxury">
                  <div className="item-image-wrapper">
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.name} 
                      onError={(e) => { e.target.src = '/logoarun.png'; }}
                    />
                  </div>
                  
                  <div className="item-details-luxury">
                    <h4 className="item-name-luxury">{item.name}</h4>
                    <div className="item-price-luxury">
                      {formatCurrency(item.price)}
                    </div>
                    
                    <div className="quantity-control-luxury">
                      <button onClick={() => onUpdateQuantity(item._id, -1)} className="q-btn"><Minus size={10} /></button>
                      <span className="q-value">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item._id, 1)} className="q-btn"><Plus size={10} /></button>
                    </div>
                  </div>

                  <button 
                    onClick={() => onRemove(item._id)}
                    className="btn-remove-luxury"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              {suggestions.length > 0 && (
                <div className="suggestions-section-luxury">
                  <h3 className="suggestions-title">
                    <Sparkles size={10} /> MARIDAJE RECOMENDADO
                  </h3>
                  <div className="suggestions-grid">
                    {suggestions.map(p => (
                      <div key={p._id} className="suggestion-card-luxury">
                        <div className="s-info">
                          <img src={getImageUrl(p.image)} alt={p.name} />
                          <div className="s-details">
                            <span className="s-name">{p.name}</span>
                            <span className="s-price">{formatCurrency(p.price)}</span>
                          </div>
                        </div>
                        <button onClick={() => onAdd(p)} className="s-add-btn">+ ADD</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer-luxury">
            <div className="total-container-luxury">
              <span className="total-label">TOTAL ESTIMADO</span>
              <span className="total-value">{formatCurrency(total)}</span>
            </div>
            
            <button onClick={onCheckout} className="btn-checkout-luxury">
              <CreditCard size={18} /> CONTINUAR AL PAGO
            </button>
          </div>
        )}
      </div>

      <style>{`
        .cart-sidebar-luxury {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 400px;
          background: linear-gradient(165deg, #0d0d0f 0%, #050505 100%);
          border-left: 1px solid rgba(207, 181, 59, 0.2);
          z-index: 4000;
          transform: translateX(100%);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          box-shadow: -20px 0 60px rgba(0,0,0,0.9);
        }

        .cart-sidebar-luxury.open { transform: translateX(0); }

        .cart-header-luxury {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid rgba(207, 181, 59, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: rgba(255, 255, 255, 0.02);
        }

        .subtitle-mini {
          font-family: var(--font-accent);
          font-size: 0.55rem;
          color: var(--accent-gold);
          letter-spacing: 0.4em;
          display: block;
          margin-bottom: 0.25rem;
        }

        .title-luxury {
          margin: 0;
          font-family: var(--font-display);
          color: #fff;
          letter-spacing: 0.1em;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .btn-close-luxury { background: none; border: none; color: var(--text-secondary); cursor: pointer; opacity: 0.5; transition: 0.3s; }
        .btn-close-luxury:hover { color: var(--accent-gold); opacity: 1; }

        .cart-content-luxury { flex-grow: 1; overflow-y: auto; padding: 1.25rem; }

        .cart-item-luxury {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          margin-bottom: 0.75rem;
          position: relative;
        }

        .item-image-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 3px;
          overflow: hidden;
          border: 1px solid rgba(207, 181, 59, 0.1);
          flex-shrink: 0;
        }
        .item-image-wrapper img { width: 100%; height: 100%; object-fit: cover; }

        .item-name-luxury { color: #fff; font-family: var(--font-display); font-size: 0.9rem; margin-bottom: 0.25rem; }
        .item-price-luxury { color: var(--accent-gold); font-weight: 700; font-size: 0.8rem; margin-bottom: 0.5rem; }

        .quantity-control-luxury {
          display: flex;
          align-items: center;
          background: #000;
          border: 1px solid rgba(207, 181, 59, 0.2);
          border-radius: 4px;
          width: fit-content;
        }
        .q-btn { background: none; border: none; padding: 0.3rem 0.6rem; color: #fff; cursor: pointer; }
        .q-value { font-weight: 800; font-size: 0.75rem; color: #fff; min-width: 1.2rem; text-align: center; }

        .btn-remove-luxury { position: absolute; top: 0.5rem; right: 0.5rem; color: rgba(255,255,255,0.2); background: none; border: none; cursor: pointer; }

        .suggestions-title { font-size: 0.6rem; color: var(--accent-gold); letter-spacing: 0.2em; margin: 1.5rem 0 1rem; display: flex; align-items: center; gap: 0.5rem; opacity: 0.7; }
        .suggestion-card-luxury { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem; background: rgba(207, 181, 59, 0.02); border: 1px dashed rgba(207, 181, 59, 0.1); border-radius: 4px; margin-bottom: 0.5rem; }
        .s-info { display: flex; align-items: center; gap: 0.5rem; }
        .s-info img { width: 30px; height: 30px; border-radius: 2px; object-fit: cover; }
        .s-name { font-size: 0.7rem; color: #fff; }
        .s-price { font-size: 0.6rem; color: var(--accent-gold); }
        .s-add-btn { background: var(--accent-gold); color: #000; border: none; border-radius: 2px; padding: 0.2rem 0.5rem; font-size: 0.6rem; font-weight: 800; cursor: pointer; }

        .cart-footer-luxury {
          padding: 1.5rem 2rem;
          background: #050505;
          border-top: 1px solid rgba(207, 181, 59, 0.2);
        }

        .total-container-luxury { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
        .total-label { font-size: 0.7rem; color: var(--text-secondary); letter-spacing: 0.1em; }
        .total-value { color: var(--accent-gold); font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; }

        .btn-checkout-luxury {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(to right, #CFB53B, #B8860B, #CFB53B);
          background-size: 200% auto;
          color: #000;
          border: none;
          border-radius: 4px;
          font-weight: 900;
          font-family: var(--font-display);
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: 0.5s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        .btn-checkout-luxury:hover { background-position: right center; }

        @media (max-width: 480px) {
          .cart-sidebar-luxury { max-width: 100%; }
        }
      `}</style>
    </>
  );
}
