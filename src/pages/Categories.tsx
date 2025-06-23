
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Categories = () => {
  const categories = [
    {
      name: "Premium Cakes",
      description: "Handcrafted cakes for special occasions",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop",
      count: 25,
      products: [
        "Chocolate Fantasy",
        "Strawberry Delight", 
        "Red Velvet Classic",
        "Vanilla Dream"
      ]
    },
    {
      name: "Fast Food Favorites",
      description: "Quick, delicious meals for any time",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop",
      count: 18,
      products: [
        "Gourmet Burgers",
        "Crispy Wings",
        "Fresh Pizzas",
        "Loaded Fries"
      ]
    },
    {
      name: "Value Combos",
      description: "Perfect combinations for great value",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
      count: 12,
      products: [
        "Birthday Specials",
        "Family Feasts",
        "Party Packages",
        "Student Deals"
      ]
    },
    {
      name: "Healthy Options",
      description: "Nutritious choices without compromising taste",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
      count: 15,
      products: [
        "Fresh Salads",
        "Grilled Options",
        "Fruit Cakes",
        "Protein Bowls"
      ]
    },
    {
      name: "Beverages",
      description: "Refreshing drinks to complement your meal",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop",
      count: 20,
      products: [
        "Fresh Juices",
        "Coffee & Tea",
        "Smoothies",
        "Soft Drinks"
      ]
    },
    {
      name: "Desserts & Treats",
      description: "Sweet endings to perfect meals",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop",
      count: 22,
      products: [
        "Ice Cream",
        "Pastries",
        "Cookies",
        "Seasonal Treats"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
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
              <Link to="/categories" className="text-orange-600 font-semibold">Categories</Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">About</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-12 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Browse Categories</h1>
          <p className="text-center text-xl opacity-90">Find exactly what you're craving</p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {category.count} items
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-2">Popular items:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {category.products.map((product, productIndex) => (
                          <span key={productIndex} className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 group">
                      Explore Category
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Can't Find What You're Looking For?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us for custom orders or special requests. We're here to make your food dreams come true!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
              View All Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
