import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const SafetySystems: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const content = {
    '/safety-systems/': {
      title: 'Safety Systems',
      description: 'Paktech Limited has extensive experience in the design, implementation, and support of Safety Instrumented Systems (SIS) and High Integrity Pressure Protection Systems (HIPPS).',
      systems: [
        {
          name: 'CS300',
          details: 'Reliable and field-proven safety systems for critical control applications. We provide full lifecycle support for CS300 systems.',
          image: 'https://www.paktech.net/assets/images/slide2.jpg'
        },
        {
          name: 'SC300e',
          details: 'Advanced safety solutions designed to meet the most demanding industrial requirements with high availability.',
          image: 'https://www.paktech.net/assets/images/slide4.jpg'
        },
        {
          name: 'Tricon CX',
          details: 'Modern high-integrity safety systems. As an approved Triconex integrator, we offer "Form, Fit & Function" replacements.'
        }
      ]
    },
    '/safety-systems/cs300/': {
      title: 'CS300 Safety System',
      description: 'The CS300 is a reliable and field-proven safety system specifically designed for critical control applications in harsh environments.',
      features: [
        'Full lifecycle support and maintenance',
        'High reliability for critical operations',
        'Proven track record in industrial applications',
        'Comprehensive diagnostic capabilities'
      ],
      image: 'https://www.paktech.net/assets/images/slide2.jpg',
      fullImage: true
    },
    '/safety-systems/sc300e/': {
      title: 'SC300e Safety System',
      description: 'The SC300e represents the next generation of safety solutions, offering advanced features and high availability for modern industrial requirements.',
      features: [
        'Enhanced processing power and memory',
        'Flexible I/O configurations',
        'SIL3 certified for safety-critical loops',
        'Seamless integration with existing infrastructure'
      ],
      image: 'https://www.paktech.net/assets/images/slide4.jpg',
      fullImage: true
    },
    '/safety-systems/tricon-cx/': {
      title: 'Tricon CX Safety System',
      description: 'Tricon CX is the latest high-integrity safety system from Schneider Electric (Triconex). As an approved integrator, Paktech offers expert implementation and support.',
      features: [
        'Compact form factor for space-saving installation',
        'Highest level of safety and availability',
        'Support for "Form, Fit & Function" replacements',
        'Advanced cybersecurity features'
      ]
    },
    '/control-systems/': {
      title: 'Control Systems',
      description: 'Beyond dedicated safety systems, we specialize in a wide range of industrial control platforms to meet diverse automation needs.',
      platforms: [
        {
          name: 'Siemens S7',
          details: 'Expertise in S7-300, S7-400, and the latest S7-1200/1500 families.'
        },
        {
          name: 'Rockwell Automation',
          details: 'Comprehensive support for MicroLogix and ControlLogix platforms.'
        }
      ]
    }
  };

  const currentContent: any = content[path as keyof typeof content] || 
                         content[(path + '/') as keyof typeof content] ||
                         content[path.replace(/\/$/, '') as keyof typeof content] ||
                         content['/safety-systems/'];

  const normalizedPath = path.endsWith('/') ? path : path + '/';

  return (
    <motion.div 
      key={path}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <section className="prose prose-blue max-w-none">
        <h1 className="text-3xl font-extrabold text-gray-900">{currentContent.title}</h1>
        <p className="text-lg text-gray-600">
          {currentContent.description}
        </p>
      </section>

      {normalizedPath === '/safety-systems/' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentContent.systems?.map((sys: any) => (
            <div key={sys.name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">{sys.name}</h2>
              <p className="text-gray-600 mb-4">{sys.details}</p>
              {sys.image && (
                <img src={sys.image} alt={sys.name} className="rounded-lg w-full h-48 object-cover" />
              )}
            </div>
          ))}
        </div>
      )}

      {(normalizedPath.includes('cs300') || normalizedPath.includes('sc300e') || normalizedPath.includes('tricon-cx')) && (
        <div className="space-y-12">
          {currentContent.image && currentContent.fullImage && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <img 
                src={currentContent.image} 
                alt={currentContent.title} 
                className="relative rounded-xl w-full h-auto max-h-[600px] object-contain bg-gray-50 shadow-2xl mx-auto" 
              />
            </motion.div>
          )}

          <div className={`bg-white p-8 rounded-2xl border border-gray-100 shadow-sm ${(!currentContent.image || currentContent.fullImage) ? 'w-full' : ''}`}>
            <div className={`grid grid-cols-1 ${(!currentContent.image || currentContent.fullImage) ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-12 items-center`}>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features & Capabilities</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentContent.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start bg-blue-50/50 p-4 rounded-lg border border-blue-100/50">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {currentContent.image && !currentContent.fullImage && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <img 
                    src={currentContent.image} 
                    alt={currentContent.title} 
                    className="relative rounded-xl w-full h-64 object-cover shadow-2xl" 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {normalizedPath === '/control-systems/' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentContent.platforms?.map((platform: any) => (
            <div key={platform.name} className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100/50">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">{platform.name}</h2>
              <p className="text-gray-700 leading-relaxed">{platform.details}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SafetySystems;
