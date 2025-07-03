import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Clock, Award, Users, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "10,000+" },
    { icon: Award, label: "Years of Excellence", value: "15+" },
    { icon: Clock, label: "Average Delivery Time", value: "30 min" },
    { icon: MapPin, label: "Locations Served", value: "50+" }
  ];

  const team = [
    {
      name: "Chef Maria Rodriguez",
      role: "Head Baker",
      image: "https://images.unsplash.com/photo-1594824720293-31dd4f1cbdc3?w=300&h=300&fit=crop&crop=face",
      description: "15+ years of experience in artisanal baking"
    },
    {
      name: "John Smith",
      role: "Kitchen Manager", 
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&h=300&fit=crop&crop=face",
      description: "Expert in fast food preparation and quality control"
    },
    {
      name: "Sarah Johnson",
      role: "Operations Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      description: "Ensuring smooth operations and customer satisfaction"
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
                  Negi Cake House
                </h1>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Products</Link>
              <Link to="/categories" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Categories</Link>
              <Link to="/about" className="text-orange-600 font-semibold">About</Link>
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

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">About Negi Cake House</h1>
          <p className="text-center text-xl opacity-90 max-w-3xl mx-auto">
            Bringing you the finest cakes and fast food with passion, quality, and love since 2009
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  Negi Cake House began as a small family bakery in 2009, with a simple mission: to create 
                  delicious, high-quality food that brings people together. What started as a passion project 
                  has grown into a beloved local institution.
                </p>
                <p>
                  Our founder, Maria Rodriguez, began baking at the age of 12 alongside her grandmother in 
                  Mexico. She brought these traditional recipes and techniques to our kitchen, where they 
                  blend perfectly with modern fast food favorites.
                </p>
                <p>
                  Today, we're proud to serve our community with fresh, made-to-order cakes and fast food 
                  that never compromises on quality or taste. Every item is prepared with the same care 
                  and attention that Maria learned all those years ago.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop" 
                alt="Our kitchen"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-orange-500 text-white p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Impact</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Quality First</h3>
              <p className="text-gray-600">
                We use only the finest ingredients and traditional techniques to ensure every bite is perfect.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Made with Love</h3>
              <p className="text-gray-600">
                Every item is crafted with passion and care, just like family recipes passed down through generations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Community Focus</h3>
              <p className="text-gray-600">
                We're proud to be part of this community and committed to giving back through local partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made Negi Cake House their go-to choice for special occasions and everyday treats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4">
              Order Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
