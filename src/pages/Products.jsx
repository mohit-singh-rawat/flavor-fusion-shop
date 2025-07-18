import { useEffect, useState } from "react";
import { Search, Star, Filter, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { toast } from "sonner";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../redux/products/action";
import SearchFilters from "../components/SearchFilters";
import RecentlyViewed from "../components/RecentlyViewed";
import QuickView from "../components/QuickView";
import '../styles/animations.css';

const Products = () => {
  const navigate = useNavigate();
  const { category: urlCategory } = useParams();
  const { addToCart, cartCount } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, wishlistCount } =
    useWishlist();
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "all");
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    category: urlCategory || '',
    minPrice: '',
    maxPrice: '',
    sortBy: ''
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.getProducts || {});
  const { data: products = [], loading = false } = productState;
  console.log(productState,'product')

  useEffect(() => {
    dispatch(getProductAction(filters));
  }, [dispatch, filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setSearchQuery(newFilters.search);
    setSelectedCategory(newFilters.category || 'all');
    setSortBy(newFilters.sortBy || 'name');
    setCurrentPage(1);
  };

  // Update selected category when URL changes
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

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

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    console.log(page,"pages")
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, searchQuery]);


  const toggleWishlist = (product) => {
    const productId = product.id || product._id;
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      toast.success(`${product.name} removed from wishlist`, { duration: 3000 });
    } else {
      addToWishlist({
        ...product,
        id: productId,
        image: product.image || product.imageUrl,
      });
      toast.success(`${product.name} added to wishlist`, { duration: 3000 });
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
    toast.success(`${product.name} added to cart!`, { duration: 3000 });
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">

      {/* Page Header */}
      <section className="py-12 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-300"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-center mb-4 animate-fade-in-up">
            {urlCategory ? (
              <>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent capitalize">
                  {urlCategory === 'party-supplies' ? 'Party Supplies' : urlCategory}
                </span> Collection
              </>
            ) : (
              <>Our <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Delicious</span> Products</>
            )}
          </h1>
          <p className="text-center text-xl opacity-90 mb-8 animate-fade-in-up animation-delay-300">
            {urlCategory ? `Explore our amazing ${urlCategory === 'party-supplies' ? 'party supplies' : urlCategory} collection` : 'Discover our mouth-watering selection of cakes and fast food 🍰🍔'}
          </p>

          <div className="max-w-4xl mx-auto">
            <SearchFilters 
            className = "text-black-600"
              onFiltersChange={handleFiltersChange}
              filters={filters}
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="text-lg font-semibold text-gray-700">
              {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} found
              {searchQuery && (
                <span className="text-orange-600 ml-2">for "{searchQuery}"</span>
              )}
              {totalPages > 1 && (
                <span className="text-sm text-gray-500 ml-2">
                  (Page {currentPage} of {totalPages})
                </span>
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
                  <SelectItem value="toys">Toys</SelectItem>
                  <SelectItem value="drinks">Drinks</SelectItem>
                  <SelectItem value="party-supplies">Party Supplies</SelectItem>
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
          ) : sortedProducts.length === 0 ? (
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
              {paginatedProducts.map((product, index) => (
                <Card key={product.id || product._id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-bounce-in hover-lift" style={{animationDelay: `${index * 100}ms`}}>
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
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
                      
                      <h4 className="font-semibold text-gray-800 mb-2 cursor-pointer hover:text-orange-600" onClick={() => navigate(`/product/${product._id}`)}>{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-orange-600">${product.price}</span>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleQuickView(product)}
                          >
                            Quick View
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
     
          {/* Pagination */}
          {!loading && sortedProducts.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sortedProducts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          )}

          {/* Recently Viewed */}
          <RecentlyViewed />
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickView
        product={quickViewProduct}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
    </div>
  );
};

export default Products;
