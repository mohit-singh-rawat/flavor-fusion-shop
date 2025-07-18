import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { X, Star, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

const Compare = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productIds = searchParams.get('products')?.split(',') || [];
    // Fetch products by IDs (mock data for now)
    const mockProducts = [
      { id: 1, name: 'Chocolate Fantasy', price: 25, rating: 4.8, category: 'Cakes', image: '/api/placeholder/300/300' },
      { id: 2, name: 'Strawberry Delight', price: 22, rating: 4.6, category: 'Cakes', image: '/api/placeholder/300/300' }
    ];
    setProducts(mockProducts.filter(p => productIds.includes(p.id.toString())));
  }, [searchParams]);

  const features = [
    'Price',
    'Rating', 
    'Category',
    'Availability',
    'Delivery Time'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Comparison</h1>
        <Button variant="outline" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products selected for comparison</p>
          <Button onClick={() => navigate('/products')}>Browse Products</Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 p-4 text-left">Features</th>
                {products.map(product => (
                  <th key={product.id} className="border border-gray-200 p-4 text-center min-w-64">
                    <div className="space-y-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                      <h3 className="font-semibold">{product.name}</h3>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="w-full"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 p-4 font-medium">Price</td>
                {products.map(product => (
                  <td key={product.id} className="border border-gray-200 p-4 text-center">
                    <span className="text-2xl font-bold text-orange-600">${product.price}</span>
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 p-4 font-medium">Rating</td>
                {products.map(product => (
                  <td key={product.id} className="border border-gray-200 p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{product.rating}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-gray-200 p-4 font-medium">Category</td>
                {products.map(product => (
                  <td key={product.id} className="border border-gray-200 p-4 text-center">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      {product.category}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 p-4 font-medium">Availability</td>
                {products.map(product => (
                  <td key={product.id} className="border border-gray-200 p-4 text-center">
                    <span className="text-green-600 font-medium">In Stock</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-gray-200 p-4 font-medium">Delivery Time</td>
                {products.map(product => (
                  <td key={product.id} className="border border-gray-200 p-4 text-center">
                    <span className="text-blue-600 font-medium">2-3 hours</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Compare;