export default function CategoryCards({ onSelectCategory }) {
  const categories = [
    {
      id: 'signature',
      title: 'Signature',
      image: 'https://images.unsplash.com/photo-1534482421-3d055a430d88?w=500&q=80',
    },
    {
      id: 'sushi',
      title: 'Sushi & Sashimi',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80',
    },
    {
      id: 'cocktails',
      title: 'Coctelería',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80',
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    }}>
      {categories.map((cat, i) => (
        <div 
          key={cat.id}
          className="glass-card animate-fade-in category-card"
          onClick={() => {
            onSelectCategory(cat.title);
            document.getElementById('menu').scrollIntoView({behavior: 'smooth'});
          }}
          style={{
            position: 'relative',
            height: '350px',
            borderRadius: 'var(--border-radius)',
            overflow: 'hidden',
            cursor: 'pointer',
            animationDelay: `${i * 0.2}s`,
            border: '1px solid rgba(212, 175, 55, 0.1)'
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 11, 11, 0.95) 0%, rgba(11, 11, 11, 0.2) 100%)',
            zIndex: 1
          }}></div>
          <img 
            src={cat.image} 
            alt={cat.title} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '2rem',
            zIndex: 2,
            right: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-display)'
            }}>
              {cat.title}
            </h3>
            <span style={{
              display: 'inline-flex',
              padding: '0.5rem 1.25rem',
              background: 'transparent',
              color: 'var(--accent-color)',
              fontSize: '0.9rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: '1px solid var(--accent-color)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }} className="view-btn">
              Explorar Selección
            </span>
          </div>
        </div>
      ))}
      <style>{`
        .category-card:hover img {
          transform: scale(1.1);
        }
        .category-card:hover .view-btn {
          background: var(--accent-color);
          color: var(--bg-primary);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
        }
      `}</style>
    </div>
  );
}
