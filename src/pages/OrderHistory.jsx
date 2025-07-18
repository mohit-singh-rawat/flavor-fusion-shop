import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import OrderStatus from '../components/OrderStatus';
import { getOrderHistoryAction } from '../redux/orders/action';
import { toast } from 'sonner';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orderHistoryState = useSelector((state) => state.orderHistory);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getOrderHistoryAction());
  }, [dispatch]);
  
  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(getOrderHistoryAction());
    
    // Reset refreshing state after a delay
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Orders refreshed');
    }, 1000);
  };
  
  // Show error if any
  useEffect(() => {
    if (orderHistoryState.error) {
      toast.error('Failed to load orders: ' + orderHistoryState.error.message);
    }
  }, [orderHistoryState.error]);

  if (orderHistoryState.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <ShoppingBag className="w-8 h-8 mr-3" />
              <h1 className="text-4xl font-bold">Order History</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={handleRefresh} 
              disabled={isRefreshing || orderHistoryState.loading}
              className="text-white border-white hover:bg-white/20"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <p className="text-xl opacity-90">Track all your orders and purchases</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {orderHistoryState.data?.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
              <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
              <Link to="/products">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orderHistoryState.data?.map((order) => (
              <Card key={order._id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Order #{order._id?.slice(-8)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {order.items?.length} items • ${order.total}
                      </p>
                    </div>
                    <OrderStatus status={order.status} createdAt={order.createdAt} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {order.items?.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <img
                          src={item.image || '/placeholder-image.jpg'}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} • ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items?.length > 3 && (
                      <div className="flex items-center justify-center text-gray-500">
                        +{order.items.length - 3} more items
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Ordered on {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <Link to={`/order/${order._id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;