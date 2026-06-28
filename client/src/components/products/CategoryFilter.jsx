const CategoryFilter = ({ categories, selected, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => onSelect('')}
      className={`px-4 py-2 rounded-full text-sm font-semibold font-heading border transition-all duration-200 ${
        !selected
          ? 'bg-primary text-white border-primary'
          : 'bg-white text-text-light border-border hover:border-primary hover:text-primary'
      }`}
    >
      All Products
    </button>
    {categories.map((cat) => (
      <button
        key={cat._id}
        onClick={() => onSelect(cat._id)}
        className={`px-4 py-2 rounded-full text-sm font-semibold font-heading border transition-all duration-200 ${
          selected === cat._id
            ? 'bg-primary text-white border-primary'
            : 'bg-white text-text-light border-border hover:border-primary hover:text-primary'
        }`}
      >
        {cat.name}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
