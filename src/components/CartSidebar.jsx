import { X, Minus, Plus, ShoppingBag, CreditCard, Sparkles } from 'lucide-react';
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
      {/* Overlay de Luxo */}
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

      {/* Sidebar Elite */}
      <div className={`cart-sidebar-luxury ${isOpen ? 'open' : ''}`}>
        
        {/* Header da Sidebar */}
        <div className="cart-header-luxury">
          <div className="title-group">
            <span className="subtitle-mini">SU SELECCIÓN</span>
            <h2 className="title-luxury">MI PEDIDO</h2>
          </div>
          <button className="btn-close-luxury" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Lista de Itens */}
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
                      <button onClick={() => onUpdateQuantity(item._id, -1)} className="q-btn"><Minus size={12} /></button>
                      <span className="q-value">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item._id, 1)} className="q-btn"><Plus size={12} /></button>
                    </div>
                  </div>

                  <button 
                    onClick={() => onRemove(item._id)}
                    className="btn-remove-luxury"
                    title="Eliminar"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              {/* Sugestões Signature */}
              {suggestions.length > 0 && (
                <div className="suggestions-section-luxury">
                  <h3 className="suggestions-title">
                    <Sparkles size={12} /> MARIDAJE RECOMENDADO
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

        {/* Footer do Carrinho */}
        {cart.length > 0 && (
          <div className="cart-footer-luxury">
            <div className="total-container-luxury">
              <span className="total-label">TOTAL ESTIMADO</span>
              <span className="total-value">{formatCurrency(total)}</span>
            </div>
            
            <button onClick={onCheckout} className="btn-checkout-luxury">
              <CreditCard size={20} /> CONTINUAR AL PAGO
            </button>
            
            <p className="footer-note-luxury">ARUN ASIAN BAR • EXPERIENCIA PREMIUM</p>
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
          maxWidth: 420px;
          background: linear-gradient(165deg, #0d0d0f 0%, #050505 100%);
          borderLeft: 1px solid rgba(207, 181, 59, 0.2);
          zIndex: 3000;
          transform: translateX(100%);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flexDirection: column;
          boxShadow: -20px 0 60px rgba(0,0,0,0.9);
        }

        .cart-sidebar-luxury.open {
          transform: translateX(0);
        }

        .cart-header-luxury {
          padding: 2rem;
          borderBottom: 1px solid rgba(207, 181, 59, 0.1);
          display: flex;
          justifyContent: space-between;
          alignItems: flex-start;
          background: rgba(255, 255, 255, 0.02);
        }

        .title-luxury {
          margin: 0;
          font-family: var(--font-display);
          color: #fff;
          letter-spacing: 0.15em;
          font-size: 1.4rem;
          font-weight: 600;
        }

        .subtitle-mini {
          font-family: var(--font-accent);
          font-size: 0.6rem;
          color: var(--accent-gold);
          letter-spacing: 0.4em;
          display: block;
          margin-bottom: 0.5rem;
        }

        .btn-close-luxury {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          opacity: 0.5;
          transition: 0.3s;
        }
        .btn-close-luxury:hover { color: var(--accent-gold); transform: rotate(90deg); opacity: 1; }

        .cart-content-luxury {
          flex-grow: 1;
          overflowY: auto;
          padding: 1.5rem;
        }

        .cart-item-luxury {
          display: flex;
          gap: 1.25rem;
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          margin-bottom: 1rem;
          position: relative;
          transition: 0.3s;
        }
        .cart-item-luxury:hover { border-color: rgba(207, 181, 59, 0.3); background: rgba(207, 181, 59, 0.02); }

        .item-image-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 3px;
          overflow: hidden;
          border: 1px solid rgba(207, 181, 59, 0.15);
          flex-shrink: 0;
        }
        .item-image-wrapper img { width: 100%; height: 100%; object-fit: cover; }

        .item-details-luxury { flex-grow: 1; display: flex; flexDirection: column; justifyContent: center; }
        
        .item-name-luxury { 
          color: #fff; 
          font-family: var(--font-display); 
          font-size: 0.95rem; 
          margin-bottom: 0.4rem; 
          letter-spacing: 0.02em;
        }

        .item-price-luxury { 
          color: var(--accent-gold); 
          font-weight: 700; 
          font-size: 0.85rem; 
          margin-bottom: 0.75rem; 
        }

        .quantity-control-luxury {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #000;
          border: 1px solid rgba(207, 181, 59, 0.2);
          width: fit-content;
          border-radius: 4px;
        }
        .q-btn { background: none; border: none; padding: 0.4rem 0.8rem; color: #fff; cursor: pointer; transition: 0.3s; }
        .q-btn:hover { color: var(--accent-gold); }
        .q-value { font-weight: 800; font-size: 0.8rem; color: #fff; min-width: 1.2rem; text-align: center; }

        .btn-remove-luxury {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          color: rgba(255,255,255,0.2);
          background: none;
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-remove-luxury:hover { color: var(--burgundy-red); }

        .suggestions-section-luxury { marginTop: 2.5rem; }
        .suggestions-title { 
          font-size: 0.65rem; 
          color: var(--accent-gold); 
          letter-spacing: 0.3em; 
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.8;
        }

        .suggestion-card-luxury {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: rgba(207, 181, 59, 0.03);
          border: 1px dashed rgba(207, 181, 59, 0.15);
          border-radius: 4px;
          margin-bottom: 0.75rem;
        }
        .s-info { display: flex; align-items: center; gap: 0.75rem; }
        .s-info img { width: 35px; height: 35px; border-radius: 2px; object-fit: cover; }
        .s-name { font-size: 0.75rem; color: #fff; display: block; }
        .s-price { font-size: 0.65rem; color: var(--accent-gold); }
        .s-add-btn { 
          background: var(--accent-gold); 
          color: #000; 
          border: none; 
          border-radius: 3px; 
          padding: 0.3rem 0.6rem; 
          font-size: 0.65rem; 
          font-weight: 800; 
          cursor: pointer; 
          transition: 0.3s;
        }
        .s-add-btn:hover { transform: scale(1.05); }

        .cart-footer-luxury {
          padding: 2rem;
          background: #050505;
          borderTop: 2px solid var(--accent-gold);
          boxShadow: 0 -10px 40px rgba(0,0,0,0.5);
        }

        .total-container-luxury {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .total-label { font-size: 0.75rem; color: var(--text-secondary); letter-spacing: 0.1em; }
        .total-value { 
          color: var(--accent-gold); 
          font-family: var(--font-display); 
          font-size: 1.6rem; 
          font-weight: 700; 
          text-shadow: 0 0 20px rgba(207, 181, 59, 0.3);
        }

        .btn-checkout-luxury {
          width: 100%;
          padding: 1.25rem;
          background: linear-gradient(to right, #CFB53B, #B8860B, #CFB53B);
          background-size: 200% auto;
          color: #000;
          border: none;
          border-radius: 4px;
          font-weight: 900;
          font-family: var(--font-display);
          font-size: 1rem;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: 0.5s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .btn-checkout-luxury:hover { background-position: right center; transform: translateY(-3px); }

        .footer-note-luxury {
          text-align: center;
          font-size: 0.55rem;
          color: var(--text-secondary);
          opacity: 0.4;
          letter-spacing: 0.3em;
          margin-top: 1.5rem;
        }

        .empty-cart-luxury {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          color: var(--text-secondary);
        }
        .icon-circle {
          width: 100px;
          height: 100px;
          background: rgba(207, 181, 59, 0.05);
          border: 1px solid rgba(207, 181, 59, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          color: var(--accent-gold);
          opacity: 0.3;
        }
        .empty-text { font-family: var(--font-display); letter-spacing: 0.2em; font-size: 1rem; margin-bottom: 2rem; }
        .btn-return-luxury {
          background: none;
          border: 1px solid var(--accent-gold);
          color: var(--accent-gold);
          padding: 0.75rem 2rem;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-return-luxury:hover { background: var(--accent-gold); color: #000; }
      `}</style>
    </>
  );
}
