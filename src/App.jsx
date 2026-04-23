import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import { client } from './utils/sanity';
import { formatWhatsAppMessage } from './utils/whatsapp';
import { products as localProducts, categories as localCategories } from './data/products';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Todos"]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // Fetch products, categories and settings from Sanity
    const fetchData = async () => {
      try {
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
        const { products: sanityProducts, categories: sanityCategories, settings } = await client.fetch(query);
        
        // Use Sanity products or fallback to local products
        const finalProducts = (sanityProducts && sanityProducts.length > 0) ? sanityProducts : localProducts;
        setProducts(finalProducts);
        setSettings(settings);
        
        // Use Sanity categories or fallback to local categories (or extract from final products)
        if (sanityCategories && sanityCategories.length > 0) {
          setCategories(["Todos", ...sanityCategories.map(c => c.title)]);
        } else if (localCategories && localCategories.length > 0) {
          setCategories(localCategories);
        } else {
          const uniqueCategories = ["Todos", ...new Set(finalProducts.map(p => p.category).filter(Boolean))];
          setCategories(uniqueCategories);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from Sanity, using fallback:", error);
        setProducts(localProducts);
        setCategories(localCategories);
        setLoading(false);
      }
    };

    fetchData();

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

    // Give some time for products to load before observing
    setTimeout(() => {
        document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [loading]);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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
    setIsCartOpen(true);
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
    const url = formatWhatsAppMessage(cart, total, customerInfo, settings?.whatsapp);
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
      
      <Header settings={settings} cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
      
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero settings={settings} />
        
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
                  <div key={product._id} className="reveal-item" style={{ transitionDelay: `${index * 0.1}s` }}>
                    <ProductCard product={product} onAdd={addToCart} />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer settings={settings} />

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
    </div>
  );
}

export default App;
