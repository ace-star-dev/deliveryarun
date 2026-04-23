import { useState } from 'react';
import { X, MapPin, Phone, User, CreditCard, MessageSquare } from 'lucide-react';
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
      <div className="modal-content animate-fade-in">
        <div className="modal-header">
          <h3>Finalizar Pedido</h3>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label><User size={16} /> Nombre Completo</label>
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label><Phone size={16} /> Teléfono</label>
            <input 
              type="tel" 
              name="phone" 
              required 
              placeholder="Ej: 0981 123 456"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label><MapPin size={16} /> Dirección de Entrega</label>
            <input 
              type="text" 
              name="address" 
              required 
              placeholder="Calle, Nro de casa, Barrio"
              value={formData.address}
              onChange={handleChange}
            />
            {!formData.locationUrl ? (
              <button 
                type="button" 
                style={{
                  background: 'rgba(207, 181, 59, 0.1)',
                  border: '1px solid var(--accent-gold)',
                  color: 'var(--accent-gold)',
                  padding: '0.6rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem',
                  fontWeight: 600
                }}
                onClick={handleGetLocation}
              >
                <MapPin size={14} /> Compartir mi ubicación GPS
              </button>
            ) : (
              <div style={{ color: '#25D366', fontSize: '0.85rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                ✓ Ubicación capturada
                <button 
                  type="button" 
                  onClick={() => setFormData(prev => ({ ...prev, locationUrl: '' }))} 
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline', marginLeft: 'auto' }}
                >
                  Remover
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label><CreditCard size={16} /> Método de Pago</label>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta (en entrega)</option>
              <option value="Transferencia">Transferencia Bancaria</option>
            </select>
          </div>

          <div className="form-group">
            <label><MessageSquare size={16} /> Notas Adicionales</label>
            <textarea 
              name="notes" 
              placeholder="Aclaraciones, timbres, etc."
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="order-summary-mini">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="summary-row total">
              <span>Total a pagar:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '1rem',
              background: 'var(--accent-gold)',
              color: '#000',
              fontWeight: '700',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: 'var(--font-display)'
            }}
          >
            Confirmar Pedido
          </button>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1rem;
        }
        .modal-content {
          background: var(--bg-secondary);
          width: 100%;
          max-width: 500px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          overflow: hidden;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .checkout-form {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        input, select, textarea {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.75rem;
          color: var(--text-primary);
          font-family: var(--font-base);
        }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--accent-gold);
        }
        .order-summary-mini {
          background: var(--bg-primary);
          padding: 1rem;
          border-radius: 8px;
          margin-top: 0.5rem;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        .summary-row.total {
          border-top: 1px solid var(--border-color);
          padding-top: 0.5rem;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--accent-gold);
          margin-bottom: 0;
        }
        .w-full {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default CheckoutModal;
