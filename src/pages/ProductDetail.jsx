import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAction } from '../redux/products/action';
import { getReviewsAction, addReviewAction } from '../redux/reviews/action';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import RelatedProducts from '../components/RelatedProducts';
import { isUserAuthenticated } from '../utils/auth';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const dispatch = useDispatch();
  const { data: products = [] } = useSelector((state) => state.getProducts || {});
  const reviewsState = useSelector((state) => state.reviews);
  const addReviewState = useSelector((state) => state.addReview);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    dispatch(getProductAction());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find(p => p._id === id);
      setSelectedProduct(product);
      if (product) {
        dispatch(getReviewsAction({ productId: id }));
        // Add to recently viewed
        if (window.addToRecentlyViewed) {
          window.addToRecentlyViewed(product);
        }
      }
    }
  }, [products, id, dispatch]);

  useEffect(() => {
    if (addReviewState.success) {
      toast.success('Review added successfully!');
      dispatch(getReviewsAction({ productId: id }));
    }
    if (addReviewState.error) {
      toast.error('Failed to add review');
    }
  }, [addReviewState.success, addReviewState.error, dispatch, id]);

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Product not found</h2>
          <Link to="/products">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: selectedProduct._id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.imageUrl,
      category: selectedProduct.category,
      description: selectedProduct.description,
      quantity: quantity
    };
    addToCart(cartItem);
    toast.success(`${selectedProduct.name} added to cart!`, { duration: 2000 });
  };

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: selectedProduct._id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.imageUrl,
      category: selectedProduct.category,
      description: selectedProduct.description
    };

    if (isInWishlist(selectedProduct._id)) {
      removeFromWishlist(selectedProduct._id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const handleReviewSubmit = (reviewData) => {
    if (!isUserAuthenticated()) {
      toast.error('Please login to add a review');
      return;
    }
    dispatch(addReviewAction({
      data: {
        productId: selectedProduct._id,
        ...reviewData
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">


      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-cover"
                />
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-orange-600 font-medium capitalize bg-orange-100 px-3 py-1 rounded-full">
                {selectedProduct.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedProduct.name}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(selectedProduct.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                ({selectedProduct.rating} rating)
              </span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="text-3xl font-bold text-orange-600 mb-6">
              ₹{selectedProduct.price}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                onClick={handleWishlistToggle}
                className={`border-2 ${
                  isInWishlist(selectedProduct._id)
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-600'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isInWishlist(selectedProduct._id) ? 'fill-current' : ''
                  }`}
                />
              </Button>
            </div>

            {/* Product Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Product Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium capitalize">{selectedProduct.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock:</span>
                    <span className="font-medium">{selectedProduct.stock} available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium">{selectedProduct.rating}/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <ReviewList 
            reviews={reviewsState.data} 
            loading={reviewsState.loading} 
          />
          
          {isUserAuthenticated() && (
            <ReviewForm 
              onSubmit={handleReviewSubmit}
              loading={addReviewState.loading}
            />
          )}
        </div>

        {/* Related Products */}
        <RelatedProducts 
          productId={selectedProduct._id}
          category={selectedProduct.category}
        />
      </div>
    </div>
  );
};

export default ProductDetail;