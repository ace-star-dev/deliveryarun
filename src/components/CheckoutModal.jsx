import { useState } from 'react';
import { X, MapPin, Phone, User, CreditCard, MessageSquare, Check } from 'lucide-react';
import { formatCurrency } from '../data/products';

const CheckoutModal = ({ isOpen, onClose, total, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    locationUrl: '',
    notes: '',
    paymentMethod: 'Efectivo'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const url = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
        setFormData(prev => ({ ...prev, locationUrl: url }));
      }, () => {
        alert('No se pudo obtener la ubicación. Por favor, asegúrese de tener activado el GPS o dar los permisos.');
      });
    } else {
      alert('Tu navegador no soporta geolocalización.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in compact-modal">
        <div className="modal-header-compact">
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', color: 'var(--accent-gold)' }}>FINALIZAR PEDIDO</h3>
          <button className="btn-close-compact" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form-compact">
          <div className="form-row">
            <div className="form-group-compact">
              <label><User size={13} /> Nombre</label>
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-compact">
              <label><Phone size={13} /> Teléfono</label>
              <input 
                type="tel" 
                name="phone" 
                required 
                placeholder="0981..."
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group-compact">
            <label><MapPin size={13} /> Dirección de Entrega</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                name="address" 
                required 
                placeholder="Calle, Nro de casa, Barrio"
                value={formData.address}
                onChange={handleChange}
                style={{ flexGrow: 1 }}
              />
              <button 
                type="button" 
                className={`gps-btn ${formData.locationUrl ? 'active' : ''}`}
                onClick={handleGetLocation}
                title="Compartir GPS"
              >
                {formData.locationUrl ? <Check size={16} /> : <MapPin size={16} />}
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group-compact" style={{ flex: 1 }}>
              <label><CreditCard size={13} /> Método de Pago</label>
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta (en entrega)</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </div>
          </div>

          <div className="form-group-compact">
            <label><MessageSquare size={13} /> Notas (Opcional)</label>
            <textarea 
              name="notes" 
              placeholder="Aclaraciones, timbres, etc."
              value={formData.notes}
              onChange={handleChange}
              rows="2"
            ></textarea>
          </div>

          <div className="order-summary-compact">
            <div className="summary-row-compact total-row">
              <span>TOTAL A PAGAR:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <button type="submit" className="btn-confirm-compact">
            ENVIAR PEDIDO POR WHATSAPP
          </button>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1rem;
        }
        .compact-modal {
          background: #0a0a0a;
          width: 100%;
          max-width: 440px;
          border-radius: 8px;
          border: 1px solid var(--accent-gold);
          box-shadow: 0 20px 60px rgba(0,0,0,0.8);
          max-height: 95vh;
          overflow-y: auto;
        }
        .modal-header-compact {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(to right, #0a0a0a, #151515);
        }
        .btn-close-compact {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          opacity: 0.6;
          transition: 0.3s;
        }
        .btn-close-compact:hover { opacity: 1; color: var(--accent-gold); }
        
        .checkout-form-compact {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .form-row {
          display: flex;
          gap: 0.75rem;
        }
        .form-group-compact {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex: 1;
        }
        .form-group-compact label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          color: var(--accent-gold);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }
        .form-group-compact input, 
        .form-group-compact select, 
        .form-group-compact textarea {
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 0.6rem;
          color: #fff;
          font-size: 0.85rem;
          width: 100%;
          transition: 0.3s;
        }
        .form-group-compact input:focus {
          border-color: var(--accent-gold);
          background: #151515;
          outline: none;
        }
        
        .gps-btn {
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: var(--accent-gold);
          width: 42px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          cursor: pointer;
          flex-shrink: 0;
          transition: 0.3s;
        }
        .gps-btn.active {
          background: #25D366;
          color: #000;
          border-color: #25D366;
        }
        
        .order-summary-compact {
          background: rgba(255,255,255,0.02);
          padding: 0.75rem;
          border-radius: 4px;
          margin-top: 0.25rem;
          border-left: 3px solid var(--accent-gold);
        }
        .summary-row-compact {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
        }
        .total-row {
          font-weight: 800;
          font-size: 1rem;
          color: #fff;
        }
        
        .btn-confirm-compact {
          width: 100%;
          padding: 0.9rem;
          background: var(--accent-gold);
          color: #000;
          font-weight: 800;
          border: none;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
          letter-spacing: 0.1em;
          margin-top: 0.5rem;
          transition: 0.3s;
        }
        .btn-confirm-compact:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(207, 181, 59, 0.4);
        }

        @media (max-width: 480px) {
          .form-row { flex-direction: column; }
          .compact-modal { border-radius: 0; height: 100%; max-height: 100vh; }
        }
      `}</style>
    </div>
  );
};

export default CheckoutModal;
