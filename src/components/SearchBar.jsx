import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import VoiceSearch from './VoiceSearch';

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term = searchTerm) => {
    if (term.trim()) {
      onSearch(term.trim());
    }
  };

  const handleVoiceSearch = (transcript) => {
    setSearchTerm(transcript);
    handleSearch(transcript);
  };

  return (
    <div className="relative flex items-center max-w-md mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="pl-10 pr-12"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <VoiceSearch onSearch={handleVoiceSearch} />
        </div>
      </div>
      <Button 
        onClick={() => handleSearch()}
        className="ml-2"
        size="sm"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;