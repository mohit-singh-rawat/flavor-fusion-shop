
import { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';
import SearchBar from '@/components/SearchBar';

const Products = () => {
  const { addToCart, cartCount } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, wishlistCount } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');

  const allProducts = [
    {
      id: 1,
      name: "Chocolate Fantasy Cake",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      rating: 4.8,
      category: "cakes",
      description: "Rich chocolate cake with premium cocoa and cream layers"
    },
    {
      id: 2,
      name: "Gourmet Burger Combo",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      rating: 4.6,
      category: "fastfood",
      description: "Juicy beef patty with fries and a drink"
    },
    {
      id: 3,
      name: "Strawberry Delight",
      price: 38.99,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
      rating: 4.9,
      category: "cakes",
      description: "Fresh strawberry cake with cream layers"
    },
    {
      id: 4,
      name: "Crispy Chicken Wings",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop",
      rating: 4.7,
      category: "fastfood",
      description: "Spicy wings with special sauce"
    },
    {
      id: 5,
      name: "Red Velvet Cake",
      price: 42.99,
      image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop",
      rating: 4.8,
      category: "cakes",
      description: "Classic red velvet with cream cheese frosting"
    },
    {
      id: 6,
      name: "Pizza Margherita",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      rating: 4.5,
      category: "fastfood",
      description: "Fresh mozzarella, tomato sauce, and basil"
    },
    {
      id: 7,
      name: "Birthday Special Combo",
      price: 65.99,
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
      rating: 4.9,
      category: "combos",
      description: "Cake + snacks + decorations bundle"
    },
    {
      id: 8,
      name: "Family Feast Combo",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      rating: 4.6,
      category: "combos",
      description: "Burgers, wings, fries, and drinks for 4"
    }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const toggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🍰</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Sweet & Savory
                </h1>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Home</Link>
              <Link to="/products" className="text-orange-600 font-semibold">Products</Link>
              <Link to="/categories" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Categories</Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">About</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/likes">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-12 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Our Products</h1>
          <p className="text-center text-xl opacity-90 mb-8">Discover our delicious selection of cakes and fast food</p>
          
          {/* Enhanced Search Bar */}
          <SearchBar 
            onSearch={setSearchQuery}
            placeholder="Search for cakes, burgers, combos..."
            className="max-w-3xl"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="text-lg font-semibold text-gray-700">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              {searchQuery && (
                <span className="text-orange-600 ml-2">for "{searchQuery}"</span>
              )}
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cakes">Cakes</SelectItem>
                  <SelectItem value="fastfood">Fast Food</SelectItem>
                  <SelectItem value="combos">Combos</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-24 h-24 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        onClick={() => toggleWishlist(product)}
                      >
                        <Heart 
                          className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                        />
                      </Button>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-orange-600 font-medium capitalize">{product.category}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-gray-800 mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-orange-600">${product.price}</span>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
