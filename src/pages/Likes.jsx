import { Link } from 'react-router-dom';
import { Star, Trash2, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

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
    toast.success(`${product.name} added to cart!`, { duration: 3000 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50">


      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-pink-600 via-red-500 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-300"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-center mb-4 animate-fade-in-up">
            Your <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Wishlist</span> ❤️
          </h1>
          <p className="text-center text-xl opacity-90 animate-fade-in-up animation-delay-300">Products you've liked and want to remember</p>
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
                {wishlistItems.map((product, index) => (
                  <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-bounce-in hover-lift" style={{animationDelay: `${index * 100}ms`}}>
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
                            toast.success(`${product.name} removed from wishlist`, { duration: 3000 });
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
