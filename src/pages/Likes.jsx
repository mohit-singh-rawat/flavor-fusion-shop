import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const Likes = () => {
  const { wishlistItems, wishlistCount, removeFromWishlist } = useWishlist();
  const { addToCart, cartCount } = useCart();

  const handleAddToCart = (product) => {
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
                  Negi Cake House
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
      <section className="py-12 bg-gradient-to-r from-pink-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Your Wishlist ❤️</h1>
          <p className="text-center text-xl opacity-90">Products you've liked and want to remember</p>
        </div>
      </section>

      {/* Liked Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {wishlistItems.length === 0 ? (
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
                  {wishlistCount} Favorite{wishlistCount !== 1 ? 's' : ''}
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((product) => (
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
                          onClick={() => {
                            removeFromWishlist(product.id);
                            toast.success(`${product.name} removed from wishlist`);
                          }}
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
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Likes;
