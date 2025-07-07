import { Link } from 'react-router-dom';
import { Clock, Award, Users, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import '../styles/animations.css';
import { Card, CardContent } from '../components/ui/card';
import AnkushImage from '../assets/images';
import SanchitImage from '../assets/images';
import AyushImage from '../assets/images'; 
const About = () => {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "10,000+" },
    { icon: Award, label: "Years of Excellence", value: "15+" },
    { icon: Clock, label: "Average Delivery Time", value: "30 min" },
    { icon: MapPin, label: "Locations Served", value: "50+" }
  ];

const team = [
  {
    name: "Chef Sanchit Negi",
    role: "Head Baker & CEO Or Director",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZMIBGLWDQMgb7ySRtkAyoXGw_GIaj9smqew&s',
    description: "15+ years of experience in artisanal baking"
  },
  {
    name: "Ayush Singh Bisht",
    role: "Kitchen Manager", 
    image: 'https://www.eatingwell.com/thmb/rMkPIu4kqvqLEvP50QPRmKJrsU0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/LegendPR_Kristen_Kish_2108-2000-59507b8a4d9d431dbd22880765db43fd.jpg',
    description: "Expert in fast food preparation and quality control"
  },
  {
    name: "Ankush Rawat",
    role: "Kitchen Master",
    image: 'https://www.shape.com/thmb/CZBa9yKcSqcKEUhoYyPrOJf975Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/kaysen-700_0-7531093e39fa40bead36d5651bc60383.jpg',
    description: "Ensuring smooth operations and customer satisfaction"
  }
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-300"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-center mb-4 animate-fade-in-up">
            About <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Negi Cake House</span> 🏠
          </h1>
          <p className="text-center text-xl opacity-90 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
            Bringing you the finest cakes and fast food with passion, quality, and love since 2009 ❤️
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
                    src={member?.image || 'C:\Users\Mohit\Downloads\SanchitCakeHouse\flavor-fusion-shop\src\assets\Ankush.jpg'} 
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
            <Link to="/products">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4">
                Order Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
