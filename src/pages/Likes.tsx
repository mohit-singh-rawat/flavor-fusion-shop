
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Likes = () => {
  const [likedProducts, setLikedProducts] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Sample products data (in real app, this would come from context/state management)
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
    }
  ];

  // Load liked products from localStorage (in real app, this would be from context/API)
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedProducts');
    if (savedLikes) {
      const likedIds = JSON.parse(savedLikes);
      const liked = allProducts.filter(product => likedIds.includes(product.id));
      setLikedProducts(liked);
    }
  }, []);

  const removeFromLikes = (productId: number) => {
    const updatedLikes = likedProducts.filter(product => product.id !== productId);
    setLikedProducts(updatedLikes);
    
    // Update localStorage
    const likedIds = updatedLikes.map(product => product.id);
    localStorage.setItem('likedProducts', JSON.stringify(likedIds));
  };

  const addToCart = (productId: number) => {
    setCartCount(prev => prev + 1);
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
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
              <Link to="/products" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Products</Link>
              <Link to="/categories" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Categories</Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">About</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/likes">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  {likedProducts.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {likedProducts.length}
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
      <section className="py-12 bg-gradient-to-r from-pink-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Your Favorites ❤️</h1>
          <p className="text-center text-xl opacity-90">Products you've liked and want to remember</p>
        </div>
      </section>

      {/* Liked Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {likedProducts.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No favorites yet</h3>
              <p className="text-gray-500 mb-6">Start exploring and add products to your favorites!</p>
              <Link to="/products">
                <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  {likedProducts.length} Favorite{likedProducts.length !== 1 ? 's' : ''}
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {likedProducts.map((product) => (
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
                          onClick={() => removeFromLikes(product.id)}
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
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
                          <span className="text-xl font-bold text-pink-600">${product.price}</span>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                            onClick={() => addToCart(product.id)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Likes;
