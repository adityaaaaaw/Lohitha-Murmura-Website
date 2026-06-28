import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Search products...' }) => (
  <div className="relative">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-lighter pointer-events-none" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="input pl-11 pr-10"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-lighter hover:text-text"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

export default SearchBar;
