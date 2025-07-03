import { useEffect, useState } from "react";
import { Search, ShoppingCart, Heart, User, Star, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { toast } from "sonner";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../redux/products/action";

const Products = () => {
  const { addToCart, cartCount } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, wishlistCount } =
    useWishlist();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.getProducts || {});
  const { data: products = [], loading = false } = productState;
  console.log(productState,'product')

  useEffect(() => {
    dispatch(getProductAction());
  }, [dispatch]);

  const productsToUse = Array.isArray(products) ? products : [];

  const filteredProducts = productsToUse.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });


  const toggleWishlist = (product) => {
    const productId = product.id || product._id;
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        ...product,
        id: productId,
        image: product.image || product.imageUrl,
      });
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id || product._id,
      name: product.name,
      price: product.price,
      image: product.image || product.imageUrl,
      category: product.category,
      description: product.description,
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
                  Negi Cake House
                </h1>
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Home
              </Link>
              <Link to="/products" className="text-orange-600 font-semibold">
                Products
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                About
              </Link>
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
          <p className="text-center text-xl opacity-90 mb-8">
            Discover our delicious selection of cakes and fast food
          </p>

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
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
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
                <Card key={product.id || product._id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={product.image || product.imageUrl} 
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
                          className={`w-5 h-5 ${isInWishlist(product.id || product._id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                        />
                      </Button>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-orange-600 font-medium capitalize">{product.category}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">{product.rating || 4.5}</span>
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
