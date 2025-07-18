import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { getRelatedProductsAction } from '../redux/recommendations/action';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { toast } from 'sonner';

const RelatedProducts = ({ productId, category }) => {
  const dispatch = useDispatch();
  const relatedProductsState = useSelector((state) => state.relatedProducts);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (productId) {
      dispatch(getRelatedProductsAction({ productId }));
    }
  }, [dispatch, productId]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      category: product.category,
      description: product.description,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        category: product.category,
        description: product.description,
      });
      toast.success(`${product.name} added to wishlist`);
    }
  };

  if (relatedProductsState.loading) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">You might also like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!relatedProductsState.data || relatedProductsState.data.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">You might also like</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProductsState.data.slice(0, 4).map((product) => (
          <Card key={product._id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-3 group-hover:scale-105 transition-transform"
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 bg-white/80 hover:bg-white"
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart 
                    className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                  />
                </Button>
              </div>
              
              <Link to={`/product/${product._id}`}>
                <h4 className="font-medium text-sm mb-1 hover:text-orange-600 line-clamp-2">
                  {product.name}
                </h4>
              </Link>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-600 font-bold text-sm">${product.price}</span>
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500 ml-1">{product.rating || 4.5}</span>
                </div>
              </div>
              
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-xs"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;