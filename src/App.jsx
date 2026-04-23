import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import ProductCard from './components/ProductCard';
import CategoryCards from './components/CategoryCards';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import { products, categories } from './data/products';
import { formatWhatsAppMessage } from './utils/whatsapp';

function App() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Intersection Observer for reveal effect
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const filterProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const handleCheckoutConfirm = (customerInfo) => {
    const url = formatWhatsAppMessage(cart, total, customerInfo);
    window.open(url, '_blank');
    setIsCheckoutOpen(false);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Interactive Mouse Glow */}
      <div 
        className="mouse-glow" 
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      
      <Header cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
      
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        
        <section id="menu" className="container" style={{ padding: '10rem 0' }}>
          <div className="section-title-wrapper reveal-item" style={{ 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <span className="subtitle-gold" style={{ letterSpacing: '0.6em', color: 'var(--accent-gold)', marginBottom: '1rem', display: 'block' }}>Nuestra Selección</span>
            <h2 className="main-title gold-glow-text" style={{ fontFamily: 'Cinzel', fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, color: 'var(--text-primary)' }}>Obras Maestras</h2>
            <div style={{ width: '80px', height: '2px', background: 'var(--accent-gold)', margin: '2rem auto' }}></div>
          </div>
          
          <div className="reveal-item">
            <CategoryNav 
              categories={categories} 
              activeCategory={activeCategory} 
              onSelect={setActiveCategory} 
            />
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '2.5rem', 
            marginTop: '5rem',
            maxWidth: '1200px',
            margin: '5rem auto 0',
            justifyContent: 'center'
          }}>
            {filterProducts.map((product, index) => (
              <div key={product.id} className="reveal-item" style={{ transitionDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} onAdd={addToCart} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={total}
        onConfirm={handleCheckoutConfirm}
      />

      <WhatsAppFloat />
    </div>
  );
}

export default App;
