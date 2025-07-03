import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🍰</span>
              </div>
              <h4 className="text-xl font-bold">Negi Cake House</h4>
            </div>
            <p className="text-gray-400">
              Your favorite cake and fast food store, delivering happiness one bite at a time.
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Categories</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Cakes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fast Food</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Combos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Beverages</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Contact</h5>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@sweetsavory.com</li>
              <li>📞 (555) 123-4567</li>
              <li>📍 123 Food Street, Tasty City</li>
              <li>🕒 Mon-Sun: 9AM-10PM</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Negi Cake House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
