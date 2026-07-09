import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, MapPin, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 relative z-10">
      {/* Scroll to Top Button */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={scrollToTop}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Paktech Limited</h3>
            <p className="text-sm leading-relaxed">
              System Design, Integration and Commissioning Services for over 30 years.
            </p>
            <div className="flex items-center space-x-3 text-sm">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <span>ISO 9001:2015 Registered Firm</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Safety & Control Systems', path: '/safety-systems/' },
                { name: 'SCADA', path: '/scada/' },
                { name: 'Power Supplies', path: '/power-supply-services/' },
                { name: 'PakNet', path: '/paknet/' },
                { name: 'Contact Us', path: '/contact-us/' }
              ].map(item => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="hover:text-white transition-colors block py-3 min-h-[48px] flex items-center group cursor-pointer"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/sitemap/" 
                  className="hover:text-white transition-colors block py-3 min-h-[48px] flex items-center group cursor-pointer"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    Sitemap
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy/" 
                  className="hover:text-white transition-colors block py-3 min-h-[48px] flex items-center group cursor-pointer"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    Privacy Statement
                  </span>
                </Link>
              </li>
              <li className="text-xs text-gray-500 pt-2">
                Co. Reg: 3325624<br />
                VAT: 765 2897 80
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                <span>Available for international projects and on-site commissioning.</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <Link 
                  to="/contact-us/" 
                  className="hover:text-white transition-colors py-3 min-h-[48px] flex items-center cursor-pointer"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {currentYear} Paktech Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
