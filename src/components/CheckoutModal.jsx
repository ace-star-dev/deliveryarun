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
    <div className="modal-overlay-luxury">
      <div className="modal-content-luxury animate-fade-in">
        <div className="modal-header-luxury">
          <div className="title-group">
            <span className="subtitle-mini">CONFIRMACIÓN</span>
            <h3>FINALIZAR PEDIDO</h3>
          </div>
          <button className="btn-close-luxury" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form-luxury">
          <div className="form-row">
            <div className="form-group-luxury">
              <label>NOMBRE COMPLETO</label>
              <div className="input-wrapper">
                <User size={14} className="input-icon" />
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="Escriba su nombre..."
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group-luxury">
              <label>TELÉFONO</label>
              <div className="input-wrapper">
                <Phone size={14} className="input-icon" />
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="Ej: 0981..."
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group-luxury">
            <label>DIRECCIÓN DE ENTREGA</label>
            <div className="input-wrapper">
              <MapPin size={14} className="input-icon" />
              <input 
                type="text" 
                name="address" 
                required 
                placeholder="Calle, Nro de casa, Barrio..."
                value={formData.address}
                onChange={handleChange}
              />
              <button 
                type="button" 
                className={`gps-btn-luxury ${formData.locationUrl ? 'active' : ''}`}
                onClick={handleGetLocation}
                title="Compartir Ubicación GPS"
              >
                {formData.locationUrl ? <Check size={16} /> : <MapPin size={16} />}
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group-luxury">
              <label>MÉTODO DE PAGO</label>
              <div className="input-wrapper">
                <CreditCard size={14} className="input-icon" />
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta (en la entrega)</option>
                  <option value="Transferencia">Transferencia Bancaria</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-group-luxury">
            <label>NOTAS ADICIONALES</label>
            <div className="input-wrapper">
              <MessageSquare size={14} className="input-icon top" />
              <textarea 
                name="notes" 
                placeholder="Aclaraciones, timbres, referencias..."
                value={formData.notes}
                onChange={handleChange}
                rows="2"
              ></textarea>
            </div>
          </div>

          <div className="summary-card-luxury">
            <div className="summary-line">
              <span className="label">SUBTOTAL</span>
              <span className="value">{formatCurrency(total)}</span>
            </div>
            <div className="summary-line total">
              <span className="label">TOTAL FINAL</span>
              <span className="value-gold">{formatCurrency(total)}</span>
            </div>
          </div>

          <button type="submit" className="btn-confirm-luxury">
            ORDENAR POR WHATSAPP
          </button>
          
          <p className="footer-secure">
            <Check size={10} /> Pedido seguro vía cifrado de WhatsApp
          </p>
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
          z-index: 3000;
          padding: 1.5rem;
        }
        
        .modal-content-luxury {
          background: linear-gradient(145deg, #0d0d0f 0%, #050505 100%);
          width: 100%;
          max-width: 480px;
          border-radius: 4px;
          border: 1px solid rgba(207, 181, 59, 0.2);
          box-shadow: 0 30px 70px rgba(0,0,0,0.8), inset 0 0 40px rgba(207, 181, 59, 0.03);
          position: relative;
          overflow: hidden;
        }

        .modal-content-luxury::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, var(--accent-gold), transparent);
        }

        .modal-header-luxury {
          padding: 1.75rem 2rem;
          border-bottom: 1px solid rgba(207, 181, 59, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .title-group h3 {
          margin: 0;
          font-family: var(--font-display);
          color: #fff;
          letter-spacing: 0.15em;
          font-size: 1.25rem;
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
          padding: 5px;
        }
        .btn-close-luxury:hover { opacity: 1; color: var(--accent-gold); transform: rotate(90deg); }

        .checkout-form-luxury {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: flex;
          gap: 1.25rem;
        }

        .form-group-luxury {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          flex: 1;
        }

        .form-group-luxury label {
          font-size: 0.65rem;
          color: var(--text-secondary);
          letter-spacing: 0.2em;
          font-weight: 700;
          font-family: var(--font-base);
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          color: var(--accent-gold);
          opacity: 0.6;
        }
        .input-icon.top { top: 0.75rem; }

        .checkout-form-luxury input,
        .checkout-form-luxury select,
        .checkout-form-luxury textarea {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 4px;
          padding: 0.8rem 1rem 0.8rem 2.5rem;
          color: #fff;
          font-size: 0.9rem;
          width: 100%;
          transition: all 0.4s ease;
          font-family: var(--font-base);
        }

        .checkout-form-luxury input:focus,
        .checkout-form-luxury select:focus,
        .checkout-form-luxury textarea:focus {
          outline: none;
          border-color: var(--accent-gold);
          background: rgba(207, 181, 59, 0.05);
          box-shadow: 0 0 15px rgba(207, 181, 59, 0.1);
        }

        .gps-btn-luxury {
          position: absolute;
          right: 0.5rem;
          background: rgba(207, 181, 59, 0.15);
          border: 1px solid rgba(207, 181, 59, 0.3);
          color: var(--accent-gold);
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          cursor: pointer;
          transition: 0.3s;
        }
        .gps-btn-luxury:hover { background: var(--accent-gold); color: #000; }
        .gps-btn-luxury.active { background: #1a5c2e; border-color: #2ecc71; color: #fff; }

        .summary-card-luxury {
          background: rgba(207, 181, 59, 0.03);
          padding: 1.5rem;
          border-radius: 4px;
          border: 1px solid rgba(207, 181, 59, 0.1);
          margin-top: 0.5rem;
        }

        .summary-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .summary-line .label { font-size: 0.7rem; letter-spacing: 0.1em; color: var(--text-secondary); }
        .summary-line .value { font-size: 0.9rem; color: #fff; font-weight: 500; }

        .summary-line.total {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(207, 181, 59, 0.2);
        }
        .summary-line.total .label { font-size: 0.8rem; font-weight: 800; color: #fff; }
        .value-gold {
          color: var(--accent-gold);
          font-size: 1.4rem;
          font-weight: 700;
          font-family: var(--font-display);
          text-shadow: 0 0 20px rgba(207, 181, 59, 0.3);
        }

        .btn-confirm-luxury {
          width: 100%;
          padding: 1.25rem;
          background: linear-gradient(to right, #CFB53B, #B8860B, #CFB53B);
          background-size: 200% auto;
          color: #000;
          font-weight: 900;
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          cursor: pointer;
          letter-spacing: 0.2em;
          transition: 0.5s;
          font-family: var(--font-display);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }
        .btn-confirm-luxury:hover {
          background-position: right center;
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(207, 181, 59, 0.3);
        }

        .footer-secure {
          text-align: center;
          font-size: 0.6rem;
          color: var(--text-secondary);
          opacity: 0.5;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 1rem;
        }

        @media (max-width: 600px) {
          .form-row { flex-direction: column; gap: 1.25rem; }
          .modal-content-luxury { border-radius: 0; border: none; height: 100%; max-height: 100vh; overflow-y: auto; }
          .checkout-form-luxury { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default CheckoutModal;
