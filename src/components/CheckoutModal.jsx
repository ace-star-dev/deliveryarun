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
        alert('No se pudo obtener la ubicación.');
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
    <div className="modal-overlay-luxury">
      <div className="modal-content-luxury animate-fade-in ultra-compact">
        <div className="modal-header-luxury compact">
          <div className="title-group">
            <span className="subtitle-mini">CONFIRMACIÓN</span>
            <h3>FINALIZAR PEDIDO</h3>
          </div>
          <button className="btn-close-luxury" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form-luxury compact">
          <div className="form-row">
            <div className="form-group-luxury">
              <label>NOMBRE</label>
              <div className="input-wrapper">
                <User size={12} className="input-icon" />
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="Su nombre"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group-luxury">
              <label>TELÉFONO</label>
              <div className="input-wrapper">
                <Phone size={12} className="input-icon" />
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
          </div>

          <div className="form-group-luxury">
            <label>DIRECCIÓN DE ENTREGA</label>
            <div className="input-wrapper">
              <MapPin size={12} className="input-icon" />
              <input 
                type="text" 
                name="address" 
                required 
                placeholder="Calle, Nro, Barrio"
                value={formData.address}
                onChange={handleChange}
              />
              <button 
                type="button" 
                className={`gps-btn-luxury ${formData.locationUrl ? 'active' : ''}`}
                onClick={handleGetLocation}
              >
                {formData.locationUrl ? <Check size={14} /> : <MapPin size={14} />}
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group-luxury">
              <label>MÉTODO DE PAGO</label>
              <div className="input-wrapper">
                <CreditCard size={12} className="input-icon" />
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                  <option value="Transferencia">Transferencia</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-group-luxury">
            <label>NOTAS</label>
            <div className="input-wrapper">
              <MessageSquare size={12} className="input-icon top" />
              <textarea 
                name="notes" 
                placeholder="Referencias..."
                value={formData.notes}
                onChange={handleChange}
                rows="1"
              ></textarea>
            </div>
          </div>

          <div className="summary-card-luxury compact">
            <div className="summary-line total">
              <span className="label">TOTAL FINAL</span>
              <span className="value-gold">{formatCurrency(total)}</span>
            </div>
          </div>

          <button type="submit" className="btn-confirm-luxury compact">
            ORDENAR POR WHATSAPP
          </button>
        </form>
      </div>

      <style>{`
        .modal-overlay-luxury {
          position: fixed;
          inset: 0;
          background: rgba(5, 5, 5, 0.9);
          backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5000;
          padding: 1rem;
        }
        
        .modal-content-luxury {
          background: linear-gradient(145deg, #0d0d0f 0%, #050505 100%);
          width: 100%;
          max-width: 440px;
          border-radius: 4px;
          border: 1px solid rgba(207, 181, 59, 0.2);
          box-shadow: 0 30px 70px rgba(0,0,0,0.8), inset 0 0 40px rgba(207, 181, 59, 0.03);
          position: relative;
        }

        .modal-header-luxury.compact {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(207, 181, 59, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .subtitle-mini {
          font-family: var(--font-accent);
          font-size: 0.55rem;
          color: var(--accent-gold);
          letter-spacing: 0.4em;
          display: block;
          margin-bottom: 0.25rem;
        }

        .title-group h3 {
          margin: 0;
          font-family: var(--font-display);
          color: #fff;
          letter-spacing: 0.1em;
          font-size: 1rem;
        }

        .btn-close-luxury { background: none; border: none; color: var(--text-secondary); cursor: pointer; opacity: 0.5; }

        .checkout-form-luxury.compact {
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .form-row { display: flex; gap: 0.75rem; }
        .form-group-luxury { display: flex; flex-direction: column; gap: 0.4rem; flex: 1; }
        .form-group-luxury label { font-size: 0.6rem; color: var(--text-secondary); letter-spacing: 0.15em; font-weight: 700; }

        .input-wrapper { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: 0.6rem; color: var(--accent-gold); opacity: 0.5; }
        .input-icon.top { top: 0.6rem; }

        .checkout-form-luxury input,
        .checkout-form-luxury select,
        .checkout-form-luxury textarea {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 4px;
          padding: 0.6rem 0.75rem 0.6rem 2.2rem;
          color: #fff;
          font-size: 0.85rem;
          width: 100%;
          transition: 0.3s;
        }

        .checkout-form-luxury input:focus,
        .checkout-form-luxury select:focus,
        .checkout-form-luxury textarea:focus {
          outline: none;
          border-color: var(--accent-gold);
          background: rgba(207, 181, 59, 0.05);
        }

        .gps-btn-luxury {
          position: absolute;
          right: 0.4rem;
          background: rgba(207, 181, 59, 0.1);
          border: 1px solid rgba(207, 181, 59, 0.2);
          color: var(--accent-gold);
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          cursor: pointer;
        }
        .gps-btn-luxury.active { background: #1a5c2e; color: #fff; }

        .summary-card-luxury.compact {
          background: rgba(207, 181, 59, 0.04);
          padding: 0.75rem 1rem;
          border-radius: 4px;
          border: 1px solid rgba(207, 181, 59, 0.1);
          margin-top: 0.25rem;
        }

        .summary-line.total { display: flex; justify-content: space-between; align-items: center; }
        .summary-line.total .label { font-size: 0.7rem; font-weight: 800; color: #fff; letter-spacing: 0.05em; }
        .value-gold {
          color: var(--accent-gold);
          font-size: 1.1rem;
          font-weight: 700;
          font-family: var(--font-display);
        }

        .btn-confirm-luxury.compact {
          width: 100%;
          padding: 0.9rem;
          background: linear-gradient(to right, #CFB53B, #B8860B, #CFB53B);
          background-size: 200% auto;
          color: #000;
          font-weight: 900;
          border: none;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
          letter-spacing: 0.1em;
          transition: 0.5s;
          font-family: var(--font-display);
        }
        .btn-confirm-luxury:hover { background-position: right center; transform: translateY(-2px); }

        @media (max-width: 480px) {
          .modal-content-luxury.ultra-compact { border-radius: 0; border: none; height: auto; max-height: 100vh; }
          .form-row { flex-direction: column; gap: 0.75rem; }
        }
      `}</style>
    </div>
  );
};

export default CheckoutModal;
