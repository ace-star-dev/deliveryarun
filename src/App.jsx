import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { client } from './utils/sanity';
import { formatWhatsAppMessage } from './utils/whatsapp';
import { products as localProducts, categories as localCategories } from './data/products';

function App() {
  const [products, setProducts] = useState(localProducts);
  const [categories, setCategories] = useState(localCategories);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [settings, setSettings] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const scrollProgressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.width = scrolled + "%";
      }
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query = `{
          "products": *[_type == "dish"] {
            _id, name, description, price, "category": category->title, image, available
          },
          "categories": *[_type == "category"] { title },
          "settings": *[_type == "siteSettings"][0] {
            whatsapp, instagram, address, addressLink, schedule,
            heroTitle, heroSubtitle, heroImage, footerDescription,
            menuTitle, menuSubtitle
          }
        }`;
        const data = await client.fetch(query);
        if (data) {
            const { products: sanityProducts, categories: sanityCategories, settings: sanitySettings } = data;
            if (sanityProducts && sanityProducts.length > 0) {
              setProducts(sanityProducts.map(p => {
                if (!p.image) {
                  const localFileName = {
                    "Sashimi Mostaza": "sashimi_mostaza.jpg", "Sashimi na Manteiga": "sashimi_manteiga.jpg",
                    "Pulpo Canadiense": "pulpo.jpg", "Uramaki Bacon & Couve": "uramaki.jpg",
                    "Niguiri de Salmón": "niguiri.jpg", "Niguiri de Salmón Trufado": "niguiri.jpg",
                    "Poke II": "poke.jpg", "Poke Arun": "poke.jpg", "Mignon N’ Pasta": "mignon.jpg",
                    "Mignon ao Molho de Ostras": "mignon.jpg", "Combinado Arun": "combinado.jpg",
                    "Combo Especial (20 peças)": "combinado.jpg", "Lychee Martini": "drink.jpg"
                  }[p.name];
                  if (localFileName) return { ...p, image: { localPath: `/${localFileName}` } };
                }
                return p;
              }));
            }
            if (sanitySettings) setSettings(sanitySettings);
            if (sanityCategories && sanityCategories.length > 0) {
              setCategories(["Todos", ...sanityCategories.map(c => c.title)]);
            }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
        document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
    }, 1000);

    return () => observer.disconnect();
  }, []);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const filterProducts = activeCategory === "Todos" 
    ? products.filter(p => p.available !== false)
    : products.filter(p => p.category === activeCategory && p.available !== false);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="app-wrapper">
      <div className="scroll-progress" ref={scrollProgressRef}></div>
      <div className="mouse-glow" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} />
      
      <Header settings={settings} cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main style={{ width: '100%', overflow: 'hidden' }}>
        <Hero settings={settings} />
        
        <section id="menu" className="container" style={{ padding: '4rem 0 10rem' }}>
          <div className="section-title-wrapper reveal-item">
            <span className="subtitle-gold">{settings?.menuSubtitle || "Nuestra Selección"}</span>
            <h2 className="main-title gold-glow-text">{settings?.menuTitle || "Obras Maestras"}</h2>
            <div className="title-separator"></div>
          </div>
          
          {loading ? (
            <div className="loading-state">Cargando menú...</div>
          ) : (
            <>
              <CategoryNav 
                categories={categories} 
                activeCategory={activeCategory} 
                onSelect={(cat) => {
                  setActiveCategory(cat);
                  const menuEl = document.getElementById('menu');
                  if (menuEl) window.scrollTo({ top: menuEl.offsetTop - 100, behavior: 'smooth' });
                }} 
              />
              <div className="product-grid">
                {filterProducts.map((product, index) => (
                  <div key={product._id} className="reveal-item visible" style={{ transitionDelay: `${index * 0.05}s` }}>
                    <ProductCard product={product} onAdd={addToCart} />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      {showNotification && <div className="cart-notification">ITEM AÑADIDO</div>}

      {cartItemCount > 0 && (
        <button className="floating-cart-btn" onClick={() => setIsCartOpen(true)}>
          <ShoppingBag size={28} />
          <span className="cart-badge">{cartItemCount}</span>
        </button>
      )}

      <Footer settings={settings} />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={(id) => setCart(prev => prev.filter(item => item._id !== id))}
        onUpdateQuantity={(id, delta) => setCart(prev => prev.map(item => item._id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(i => i.quantity > 0))}
        products={products}
        onAdd={addToCart}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={total}
        onConfirm={(info) => {
          const url = formatWhatsAppMessage(cart, total, info, settings?.whatsapp || "+595984431766");
          window.open(url, '_blank');
          setIsCheckoutOpen(false);
          setCart([]);
          setIsCartOpen(false);
        }}
      />
    </div>
  );
}

export default App;
