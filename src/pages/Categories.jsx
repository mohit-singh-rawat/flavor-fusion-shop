import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAction } from '../redux/products/action';
import '../styles/animations.css';


const Categories = () => {
  const dispatch = useDispatch();
  const { data: products = [] } = useSelector((state) => state.getProducts || {});
  
  useEffect(() => {
    dispatch(getProductAction());
  }, [dispatch]);
  
  // Generate categories from products data
  const getProductsByCategory = (category) => {
    return Array.isArray(products) ? products.filter(product => product.category === category) : [];
  };
  
  const categories = [
    {
      name: "Cakes",
      slug: "cakes",
      description: "Handcrafted cakes for special occasions",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop",
      count: getProductsByCategory('cakes').length,
      products: getProductsByCategory('cakes').slice(0, 4).map(p => p.name)
    },
    {
      name: "Fast Food",
      slug: "fastfood",
      description: "Quick, delicious meals for any time",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop",
      count: getProductsByCategory('fastfood').length,
      products: getProductsByCategory('fastfood').slice(0, 4).map(p => p.name)
    },
    {
      name: "Combos",
      slug: "combos",
      description: "Perfect combinations for great value",
      image: "https://tb-static.uber.com/prod/image-proc/processed_images/be11e1fa0362b57e465f4311fa0b50ac/8a42ee7a692dfa4155879820804a277f.jpeg",
      count: getProductsByCategory('combos').length,
      products: getProductsByCategory('combos').slice(0, 4).map(p => p.name)
    },
    {
      name: "Toys",
      slug: "toys",
      description: "Fun toys and gifts for kids",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      count: getProductsByCategory('toys').length,
      products: getProductsByCategory('toys').slice(0, 4).map(p => p.name)
    },
    {
      name: "Drinks",
      slug: "drinks",
      description: "Refreshing beverages and smoothies",
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&h=400&fit=crop",
      count: getProductsByCategory('drinks').length,
      products: getProductsByCategory('drinks').slice(0, 4).map(p => p.name)
    },
    {
      name: "Party Supplies",
      slug: "party-supplies",
      description: "Everything you need for celebrations",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
      count: getProductsByCategory('party-supplies').length,
      products: getProductsByCategory('party-supplies').slice(0, 4).map(p => p.name)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-300"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-center mb-4 animate-fade-in-up">
            Browse <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Categories</span> 🍽️
          </h1>
          <p className="text-center text-xl opacity-90 animate-fade-in-up animation-delay-300">Find exactly what you're craving today!</p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-6 hover:rotate-2 animate-bounce-in hover-lift overflow-hidden bg-white/90 backdrop-blur-sm border-orange-100" style={{animationDelay: `${index * 200}ms`}}>
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
                    
                    <Link to={`/products/category/${category.slug}`}>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 group">
                        Explore Category
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
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
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Contact Us
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
