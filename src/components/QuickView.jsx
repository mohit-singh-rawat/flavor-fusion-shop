import { X, Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { toast } from 'sonner';

const QuickView = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Quick View</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="space-y-4">
              <img
                src={product.image || '/api/placeholder/400/400'}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <img
                    key={i}
                    src={product.image || '/api/placeholder/100/100'}
                    alt={`${product.name} ${i}`}
                    className="w-16 h-16 object-cover rounded border cursor-pointer hover:border-orange-500"
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 4.5)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.rating || 4.5})</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-orange-600">
                ${product.price}
              </div>

              <div>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
              </div>

              <p className="text-gray-600">
                {product.description || "Delicious and freshly made with premium ingredients. Perfect for any occasion!"}
              </p>

              {/* Options */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <div className="flex gap-2">
                    {['Small', 'Medium', 'Large'].map(size => (
                      <Button key={size} variant="outline" size="sm">
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">-</Button>
                    <span className="px-4 py-2 border rounded">1</span>
                    <Button variant="outline" size="sm">+</Button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleAddToCart} className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={handleWishlistToggle}
                  className={isInWishlist(product.id) ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Additional Info */}
              <div className="text-sm text-gray-600 space-y-1 pt-4 border-t">
                <p>✓ Fresh ingredients</p>
                <p>✓ Same day delivery available</p>
                <p>✓ Custom message option</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;