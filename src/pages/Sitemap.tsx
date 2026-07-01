import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'lucide-react';

const Sitemap: React.FC = () => {
  const links = [
    { name: 'Home', path: '/' },
    {
      name: 'Safety & Control Systems',
      path: '/safety-systems/',
      sublinks: [
        { name: 'CS300', path: '/safety-systems/cs300/' },
        { name: 'SC300e', path: '/safety-systems/sc300e/' },
        { name: 'Tricon CX', path: '/safety-systems/tricon-cx/' },
        { name: 'Control Systems', path: '/control-systems/' },
      ]
    },
    { name: 'SCADA', path: '/scada/' },
    { name: 'Power Supplies', path: '/power-supply-services/' },
    { name: 'PakNet', path: '/paknet/' },
    { name: 'Contact Us', path: '/contact-us/' },
    { name: 'Privacy Policy', path: '/privacy-policy/' },
    { name: 'Sitemap', path: '/sitemap/' },
  ];

  return (
    <div className="space-y-8">
      <section className="prose prose-blue max-w-none">
        <div className="flex items-center space-x-3 mb-4">
          <List className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-gray-900 m-0">Sitemap</h1>
        </div>
        <p className="text-lg text-gray-600">
          Navigate through our website using the links below.
        </p>
      </section>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="text-blue-600 hover:underline font-bold text-lg">
                {link.name}
              </Link>
              {link.sublinks && (
                <ul className="ml-6 mt-2 space-y-2 border-l-2 border-gray-50 pl-4">
                  {link.sublinks.map((sub) => (
                    <li key={sub.path}>
                      <Link to={sub.path} className="text-gray-600 hover:text-blue-600 transition-colors">
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sitemap;
