import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';

const SearchBar = ({ onSearch, placeholder = "Search for cakes, burgers, combos...", className = "" }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get products from Redux store for search suggestions
  const { data: allProducts = [] } = useSelector((state) => state.getProducts || {});

  const filteredSuggestions = searchQuery.length > 0 && Array.isArray(allProducts)
    ? allProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearch = (value) => {
    setSearchQuery(value);
    onSearch?.(value);
    setShowSuggestions(value.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch?.('');
    setShowSuggestions(false);
  };

  const selectSuggestion = (productName) => {
    setSearchQuery(productName);
    onSearch?.(productName);
    setShowSuggestions(false);
    setIsFocused(false);
  };

  return (
    <div className={`relative max-w-2xl mx-auto ${className}`}>
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
          <Search className={`w-5 h-5 transition-colors duration-200 ${isFocused ? 'text-orange-500' : 'text-gray-400'}`} />
        </div>
        
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (searchQuery.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => {
            // Delay hiding suggestions to allow for clicks
            setTimeout(() => {
              setIsFocused(false);
              setShowSuggestions(false);
            }, 200);
          }}
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
            className="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-transparent z-10"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </Button>
        )}
      </div>
      
      {/* Enhanced Search Suggestions with Images and Prices */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {filteredSuggestions.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-sm font-medium text-gray-500 border-b border-gray-100">
                Search Results
              </div>
              {filteredSuggestions.map((product) => (
                <button
                  key={product.id}
                  onClick={() => selectSuggestion(product.name)}
                  className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
                >
                  <img 
                    src={product.image || product.imageUrl} 
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-800">{product.name}</div>
                    <div className="text-sm text-gray-500 capitalize">{product.category}</div>
                  </div>
                  <div className="font-bold text-orange-600">${product.price}</div>
                </button>
              ))}
            </div>
          ) : searchQuery.length > 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <div>No products found for "{searchQuery}"</div>
            </div>
          ) : (
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-3">Popular searches:</div>
              <div className="flex flex-wrap gap-2">
                {['Chocolate Cake', 'Burger Combo', 'Pizza', 'Wings', 'Birthday Special'].map((term) => (
                  <button
                    key={term}
                    onClick={() => selectSuggestion(term)}
                    className="px-3 py-1 text-sm bg-orange-50 text-orange-600 rounded-full hover:bg-orange-100 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
