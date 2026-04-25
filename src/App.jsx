import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import WhatsAppFloat from './components/WhatsAppFloat';
import Footer from './components/Footer';
import { ShoppingBag, CheckCircle } from 'lucide-react';
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [settings, setSettings] = useState({});
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const cartBtnRef = useRef(null);
  const scrollProgressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.width = scrolled + "%";
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query = `{
          "products": *[_type == "dish"] {
            _id,
            name,
            description,
            price,
            "category": category->title,
            image,
            available
          },
          "categories": *[_type == "category"] {
            title
          },
          "settings": *[_type == "siteSettings"][0] {
            whatsapp,
            instagram,
            address,
            addressLink,
            schedule,
            heroTitle,
            heroSubtitle,
            heroImage,
            footerDescription,
            menuTitle,
            menuSubtitle
          }
        }`;
        const data = await client.fetch(query);
        
        if (data) {
            const { products: sanityProducts, categories: sanityCategories, settings: sanitySettings } = data;
            
            let finalProducts = [];
            if (sanityProducts && sanityProducts.length > 0) {
              finalProducts = sanityProducts.map(p => {
                if (!p.image) {
                  const localFileName = {
                    "Sashimi Mostaza": "sashimi_mostaza.jpg",
                    "Sashimi na Manteiga": "sashimi_manteiga.jpg",
                    "Pulpo Canadiense": "pulpo.jpg",
                    "Uramaki Bacon & Couve": "uramaki.jpg",
                    "Niguiri de Salmón": "niguiri.jpg",
                    "Niguiri de Salmón Trufado": "niguiri.jpg",
                    "Poke II": "poke.jpg",
                    "Poke Arun": "poke.jpg",
                    "Mignon N’ Pasta": "mignon.jpg",
                    "Mignon ao Molho de Ostras": "mignon.jpg",
                    "Combinado Arun": "combinado.jpg",
                    "Combo Especial (20 peças)": "combinado.jpg",
                    "Lychee Martini": "drink.jpg"
                  }[p.name];

                  if (localFileName) {
                    return { ...p, image: { localPath: `/${localFileName}` } };
                  }
                }
                return p;
              });
            } else {
              finalProducts = localProducts.map(p => ({ ...p, _id: p.id.toString() }));
            }
            setProducts(finalProducts);
            if (sanitySettings) {
                setSettings(sanitySettings);
            }
            
            if (sanityCategories && sanityCategories.length > 0) {
              setCategories(["Todos", ...sanityCategories.map(c => c.title)]);
            } else {
              const currentProducts = sanityProducts && sanityProducts.length > 0 ? sanityProducts : localProducts;
              const uniqueCategories = ["Todos", ...new Set(currentProducts.map(p => p.category).filter(Boolean))];
              setCategories(uniqueCategories);
            }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from Sanity, using fallback:", error);
        setLoading(false);
      }
    };

    fetchData();

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
        document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filterProducts = activeCategory === "Todos" 
    ? products.filter(p => p.available !== false)
    : products.filter(p => p.category === activeCategory && p.available !== false);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    setIsCartAnimating(true);
    setShowNotification(true);
    setIsCartOpen(true); // Abre o carrinho automaticamente
    setTimeout(() => setIsCartAnimating(false), 500);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item._id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const handleCheckoutConfirm = (customerInfo) => {
    const url = formatWhatsAppMessage(cart, total, customerInfo, settings?.whatsapp || "+595984431766");
    window.open(url, '_blank');
    setIsCheckoutOpen(false);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className="scroll-progress" ref={scrollProgressRef}></div>
      
      <div 
        className="mouse-glow" 
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      
      <Header settings={settings} cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero settings={settings} />
        
        <section id="menu" className="container" style={{ padding: '4rem 0 10rem' }}>
          <div className="section-title-wrapper reveal-item" style={{ 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto 3rem'
          }}>
            <span className="subtitle-gold" style={{ letterSpacing: '0.6em', color: 'var(--accent-gold)', marginBottom: '1rem', display: 'block' }}>{settings?.menuSubtitle || "Nuestra Selección"}</span>
            <h2 className="main-title gold-glow-text" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, color: 'var(--text-primary)' }}>{settings?.menuTitle || "Obras Maestras"}</h2>
            <div style={{ width: '80px', height: '2px', background: 'var(--accent-gold)', margin: '2rem auto' }}></div>
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--accent-gold)' }}>
              Cargando menú de autor...
            </div>
          ) : (
            <>
              <CategoryNav 
                categories={categories} 
                activeCategory={activeCategory} 
                onSelect={(cat) => {
                  setActiveCategory(cat);
                  const menuEl = document.getElementById('menu');
                  if (menuEl) {
                    const offset = 140; 
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = menuEl.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
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

      {showNotification && (
        <div className="cart-notification">
          <CheckCircle size={18} /> ITEM AÑADIDO
        </div>
      )}

      {cartItemCount > 0 && (
        <button 
          className={`floating-cart-btn ${isCartAnimating ? 'cart-animate' : ''}`}
          onClick={() => setIsCartOpen(true)}
          ref={cartBtnRef}
          style={{ 
            display: 'flex', 
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
          }}
        >
          <ShoppingBag size={30} strokeWidth={1.5} />
          <span className="cart-badge">{cartItemCount}</span>
        </button>
      )}

      <WhatsAppFloat phone={settings?.whatsapp || "+595984431766"} />
      <Footer settings={settings} />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        products={products}
        onAdd={addToCart}
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
    </div>
  );
}

export default App;
