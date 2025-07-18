import { useEffect, useState } from 'react';
import { Star, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAction } from '../redux/products/action';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import TrendingProducts from '../components/TrendingProducts';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import '../styles/animations.css';

const Home = () => {
  const dispatch = useDispatch();
  const { data: products = [] } = useSelector((state) => state.getProducts || {});
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    dispatch(getProductAction());
    
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, [dispatch]);

  const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : [];

  const categories = [
    { name: "Cakes", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop", count: 25 },
    { name: "Fast Food", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop", count: 18 },
    { name: "Combos", image: "https://foodoncall.co.in/wp-content/uploads/2017/09/foodie-ultimate-combo.png", count: 12 }
  ];

  const toggleWishlist = (product) => {
    const productId = product.id || product._id;
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      toast.success(`${product.name} removed from wishlist`, { duration: 3000 });
    } else {
      addToWishlist({
        ...product,
        id: productId,
        image: product.image || product.imageUrl
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
      description: product.description
    });
    toast.success(`${product.name} added to cart!`, { duration: 3000 });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gradient-to-br from-amber-900 to-amber-800' : 'bg-gradient-to-br from-orange-50 to-amber-50'
    }`}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              Delicious <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Cakes</span> &
              <br />
              <span className="bg-gradient-to-r from-pink-300 to-red-300 bg-clip-text text-transparent animate-pulse">Fast Food</span>
            </h2>
            <p className="text-xl mb-8 opacity-90 animate-fade-in-up animation-delay-300">
              Fresh, handcrafted cakes and mouth-watering fast food delivered to your door
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
              <Link to="/products">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  🛒 Order Now
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-2 border-white text-orange-600 hover:bg-white hover:text-orange-600 px-8 py-4 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  📋 View Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-20 ${
          isDarkMode ? 'bg-gradient-to-t from-amber-900' : 'bg-gradient-to-t from-orange-50'
        }`}></div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Shop by Category</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className={`group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-6 hover:rotate-2 animate-fade-in-up hover-lift ${
                isDarkMode ? 'bg-amber-800 border-amber-700' : 'bg-white backdrop-blur-sm'
              }`} style={{animationDelay: `${index * 200}ms`}}>
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-2xl font-bold">{category.name}</h4>
                      <p className="text-sm opacity-90">{category.count} items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={`py-16 ${isDarkMode ? 'bg-amber-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h3 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Featured Products</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card key={product.id || product._id} className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-bounce-in hover-lift ${
                isDarkMode ? 'bg-amber-800 border-amber-700' : 'bg-white'
              }`} style={{animationDelay: `${index * 150}ms`}}>
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <img 
                      src={product.image || product.imageUrl} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-125 transition-all duration-500 filter group-hover:brightness-110"
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
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-orange-300' : 'text-orange-600'
                      }`}>{product.category}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className={`text-sm ml-1 ${
                          isDarkMode ? 'text-amber-200' : 'text-gray-600'
                        }`}>{product.rating}</span>
                      </div>
                    </div>
                    
                    <h4 className={`font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>{product.name}</h4>
                    <p className={`text-sm mb-3 ${
                      isDarkMode ? 'text-amber-200' : 'text-gray-600'
                    }`}>{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xl font-bold ${
                        isDarkMode ? 'text-orange-300' : 'text-orange-600'
                      }`}>${product.price}</span>
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
        </div>
      </section>

      {/* Trending Products */}
      <section className={`py-16 ${isDarkMode ? 'bg-amber-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <TrendingProducts />
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className={`py-16 ${isDarkMode ? 'bg-amber-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <PersonalizedRecommendations />
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${
        isDarkMode ? 'bg-gradient-to-r from-amber-800 to-amber-700' : 'bg-gradient-to-r from-orange-100 to-red-100'
      }`}>
        <div className="container mx-auto px-4 text-center">
          <h3 className={`text-3xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Ready to Order?</h3>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            isDarkMode ? 'text-amber-200' : 'text-gray-600'
          }`}>
            Join thousands of satisfied customers who trust us for their special occasions and daily cravings
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-4">
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
