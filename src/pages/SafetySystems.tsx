import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
          image: 'https://www.paktech.net/assets/images/slide2.jpg',
          link: '/safety-systems/cs300/'
        },
        {
          name: 'SC300e',
          details: 'Advanced safety solutions designed to meet the most demanding industrial requirements with high availability.',
          image: 'https://www.paktech.net/assets/images/slide4.jpg',
          link: '/safety-systems/sc300e/'
        },
        {
          name: 'Tricon CX',
          details: 'Modern high-integrity safety systems. As an approved Triconex integrator, we offer "Form, Fit & Function" replacements.',
          image: 'https://www.paktech.net/assets/images/slide5.jpg',
          link: '/safety-systems/tricon-cx/'
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
      ],
      image: 'https://www.paktech.net/assets/images/slide5.jpg',
      fullImage: true
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
    <AnimatePresence mode="wait">
      <motion.div 
        key={path}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-12 sm:space-y-20 pb-12"
      >
      <section className="prose prose-blue max-w-none mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-16 h-2 bg-blue-600 rounded-full shadow-sm" />
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Industrial Solutions</span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-8">
          {currentContent.title}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-4xl font-medium">
          {currentContent.description}
        </p>
      </section>

      {normalizedPath === '/safety-systems/' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.systems?.map((sys: any, idx: number) => (
            <motion.div 
              key={sys.name} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="group"
            >
              <Link to={sys.link || '#'} className="block h-full">
                <div className="bg-white h-full rounded-[2.5rem] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden flex flex-col">
                  {sys.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img src={sys.image} alt={sys.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="p-8 flex-1 flex flex-col">
                    <h2 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{sys.name}</h2>
                    <p className="text-gray-600 leading-relaxed font-medium line-clamp-3">{sys.details}</p>
                    <div className="mt-auto pt-6 flex items-center text-blue-600 font-bold text-sm uppercase tracking-wider">
                      Learn More
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {(normalizedPath.includes('cs300') || normalizedPath.includes('sc300e') || normalizedPath.includes('tricon-cx')) && (
        <div className="space-y-16 sm:space-y-24">
          {currentContent.image && currentContent.fullImage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative group w-full overflow-hidden rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)]"
            >
              <img 
                src={currentContent.image} 
                alt={currentContent.title} 
                className="w-full h-auto max-h-[700px] object-cover hover:scale-105 transition-transform duration-[2000ms]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 sm:p-16">
                <div className="max-w-3xl">
                  <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 drop-shadow-lg">{currentContent.title}</h2>
                  <div className="w-20 h-2 bg-blue-500 rounded-full" />
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-white p-10 sm:p-16 rounded-[3rem] border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.08)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-3 h-full bg-blue-600" />
            <div className={`grid grid-cols-1 ${(!currentContent.image || currentContent.fullImage) ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-12 sm:gap-20 items-center`}>
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 shadow-lg shadow-blue-200 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Key Features & Capabilities</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {currentContent.features?.map((feature: string, index: number) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start bg-gray-50/50 p-6 rounded-3xl border border-gray-100/80 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-lg transition-all duration-300 group/item"
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mr-5 mt-0.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300 group-hover/item:rotate-12">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-lg text-gray-700 font-bold leading-tight">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              {currentContent.image && !currentContent.fullImage && (
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-700"></div>
                  <img 
                    src={currentContent.image} 
                    alt={currentContent.title} 
                    className="relative rounded-[2.5rem] w-full h-80 sm:h-[450px] object-cover shadow-2xl" 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {normalizedPath === '/control-systems/' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14">
          {currentContent.platforms?.map((platform: any, idx: number) => (
            <motion.div 
              key={platform.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-[2px] rounded-[3rem] shadow-xl hover:shadow-[0_40px_80px_rgba(0,92,171,0.2)] transition-all duration-500 group"
            >
            <div className="bg-white p-10 sm:p-14 rounded-[2.9rem] h-full">
              <h2 className="text-3xl sm:text-4xl font-black text-blue-700 mb-8 tracking-tight group-hover:translate-x-2 transition-transform origin-left">{platform.name}</h2>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium">{platform.details}</p>
            </div>
            </motion.div>
          ))}
        </div>
      )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SafetySystems;
