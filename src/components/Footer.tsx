import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
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
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link to={item.path} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link to="/sitemap/" className="hover:text-white transition-colors">Sitemap</Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link 
                    to="/privacy-policy/" 
                    className="inline-flex items-center hover:text-white transition-colors"
                  >
                    Privacy Statement
                  </Link>
                </motion.div>
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
                <Mail className="w-5 h-5 text-blue-500" />
                <Link to="/contact-us/" className="hover:text-white transition-colors">Send an Enquiry</Link>
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
