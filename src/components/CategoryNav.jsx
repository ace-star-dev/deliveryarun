export default function CategoryNav({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-nav-container">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`category-tab ${activeCategory === category ? 'active' : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
