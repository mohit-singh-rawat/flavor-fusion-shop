import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import RazorpayButton from '../components/RazorpayButton';

const Cart = () => {
  const { cartItems, cartCount, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { wishlistCount } = useWishlist();

  const deliveryFee = 4.99;
  const discount = 5.00;
  const totalPrice = getTotalPrice();
  const finalTotal = totalPrice + deliveryFee - discount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
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
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
      <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <ShoppingCart className="w-8 h-8 mr-3" />
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
          </div>
          <p className="text-center text-xl opacity-90">Review your items and proceed to checkout</p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
              <Link to="/products">
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Cart Items ({cartCount})
                  </h2>
                  <Link to="/products">
                    <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 h-32 sm:h-auto">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 p-4">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1 mb-4 sm:mb-0">
                              <span className="text-sm text-blue-600 font-medium capitalize">{item.category}</span>
                              <h4 className="font-semibold text-gray-800 text-lg mb-1">{item.name}</h4>
                              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                              <p className="text-xl font-bold text-blue-600">${item.price.toFixed(2)} each</p>
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end space-y-4">
                              <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-8 h-8 hover:bg-blue-100"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-8 h-8 hover:bg-blue-100"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-lg font-bold text-gray-800">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between text-xl font-bold mb-6">
                      <span>Total</span>
                      <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
                    </div>
                    
                    <RazorpayButton 
                      amount={finalTotal}
                      onSuccess={(response) => {
                        console.log('Payment successful:', response);
                        // Clear cart after successful payment
                        // You can add cart clearing logic here
                      }}
                      onError={(error) => {
                        console.error('Payment failed:', error);
                      }}
                    />
                    
                    <p className="text-sm text-gray-500 text-center">
                      Secure checkout with SSL encryption
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
