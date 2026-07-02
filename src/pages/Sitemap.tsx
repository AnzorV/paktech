import React from 'react';
import { Link } from 'react-router-dom';
import { List, ChevronRight, Globe, Shield, Zap, Mail, Layout, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Sitemap: React.FC = () => {
  const sections = [
    {
      title: 'Main Navigation',
      icon: <Globe className="w-5 h-5" />,
      links: [
        { name: 'Home', path: '/' },
        { name: 'Contact Us', path: '/contact-us/' },
        { name: 'PakNet', path: '/paknet/' },
      ]
    },
    {
      title: 'Safety Systems',
      icon: <Shield className="w-5 h-5" />,
      links: [
        { name: 'Overview', path: '/safety-systems/' },
        { name: 'CS300 Systems', path: '/safety-systems/cs300/' },
        { name: 'SC300e Systems', path: '/safety-systems/sc300e/' },
        { name: 'Tricon CX', path: '/safety-systems/tricon-cx/' },
      ]
    },
    {
      title: 'Control & Power',
      icon: <Zap className="w-5 h-5" />,
      links: [
        { name: 'Control Systems', path: '/control-systems/' },
        { name: 'SCADA Solutions', path: '/scada/' },
        { name: 'Power Supplies', path: '/power-supply-services/' },
      ]
    },
    {
      title: 'Company Info',
      icon: <Info className="w-5 h-5" />,
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy/' },
        { name: 'Sitemap', path: '/sitemap/' },
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <section className="prose prose-blue max-w-none">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Layout className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 m-0">Website Sitemap</h1>
        </div>
        <p className="text-lg text-gray-600">
          A comprehensive map of all content available on the Paktech Limited website.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-6 pb-2 border-b border-gray-50">
              <div className="text-blue-600">{section.icon}</div>
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
            </div>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="flex items-center group py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-50 rounded-2xl p-8 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-blue-900 font-bold text-lg">Can't find what you're looking for?</h3>
          <p className="text-blue-700">Our team is ready to help you with any specific queries regarding our systems.</p>
        </div>
        <Link 
          to="/contact-us/" 
          className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          <Mail className="w-5 h-5 mr-2" />
          Get in Touch
        </Link>
      </motion.div>
    </div>
  );
};

export default Sitemap;
