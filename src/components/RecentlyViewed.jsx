import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentProducts(recent.slice(0, 4)); // Show last 4 products
  }, []);

  const addToRecentlyViewed = (product) => {
    const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const filtered = recent.filter(p => p._id !== product._id);
    const updated = [product, ...filtered].slice(0, 10); // Keep last 10
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  // Expose function globally for use in ProductDetail
  window.addToRecentlyViewed = addToRecentlyViewed;

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 mr-2 text-gray-600" />
        <h3 className="text-lg font-semibold">Recently Viewed</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recentProducts.map((product) => (
          <Card key={product._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-3">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h4 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-orange-600 font-bold text-sm">${product.price}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;