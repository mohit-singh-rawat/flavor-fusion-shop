
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search for cakes, burgers, combos...", className = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch?.('');
  };

  return (
    <div className={`relative max-w-2xl mx-auto ${className}`}>
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className={`w-5 h-5 transition-colors duration-200 ${isFocused ? 'text-orange-500' : 'text-gray-400'}`} />
        </div>
        
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            pl-12 pr-12 py-4 text-lg rounded-2xl border-2 
            transition-all duration-300 shadow-lg
            ${isFocused 
              ? 'border-orange-300 bg-white shadow-xl ring-4 ring-orange-100' 
              : 'border-gray-200 bg-gray-50 hover:border-orange-200 hover:bg-white'
            }
          `}
        />
        
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-transparent"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </Button>
        )}
      </div>
      
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 mb-2">Popular searches:</span>
            {['Chocolate Cake', 'Burger Combo', 'Pizza', 'Wings', 'Birthday Special'].map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="px-3 py-1 text-sm bg-orange-50 text-orange-600 rounded-full hover:bg-orange-100 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
