import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, LazyMotion, domMax } from 'framer-motion';
import { ChevronLeft, ChevronRight, Image as ImageIcon, X } from 'lucide-react';

// Import local assets
import photo1 from '../assets/photo_1_2026-06-25_14-49-54.jpg';
import photo2 from '../assets/photo_2_2026-06-25_14-49-54.jpg';
import photo3 from '../assets/photo_3_2026-06-25_14-49-54.jpg';
import photo4 from '../assets/photo_4_2026-06-25_14-49-54.jpg';
import photo5 from '../assets/photo_5_2026-06-25_14-49-54.jpg';
import photo6 from '../assets/photo_6_2026-06-25_14-49-54.jpg';
import photo7 from '../assets/photo_7_2026-06-25_14-49-54.jpg';
import photo8 from '../assets/photo_8_2026-06-25_14-49-54.jpg';
import photo9 from '../assets/photo_9_2026-06-25_14-49-54.jpg';

// Client logos
import bpLogo from '../assets/BP_Helios_logo.svg.webp';
import lubeRefLogo from '../assets/lube-ref-logo-svg-vector.svg';
import woodGroupLogo from '../assets/wood_group.png';
import repsolSinopecLogo from '../assets/Repsol-Sinopec-Logo-Photoroom.png';
import provironLogo from '../assets/proviron-logo-square-Photoroom.png';

// Real client logos
const clientLogos = [
  { 
    name: "BP", 
    logo: bpLogo 
  },
  { 
    name: "Lube Ref", 
    logo: lubeRefLogo 
  },
  { 
    name: "Wood Group", 
    logo: woodGroupLogo 
  },
  { 
    name: "Repsol Sinopec", 
    logo: repsolSinopecLogo 
  },
  { 
    name: "Proviron", 
    logo: provironLogo 
  }
];

const slides = [
    {
      image: photo1,
      title: "Control Systems",
      href: "/control-systems/",
      description: "Expert design and integration"
    },
    {
      image: photo4,
      title: "System Design",
      href: "/control-systems/",
      description: "Over 30 years of excellence"
    },
    {
      image: photo3,
      title: "CS300 Systems",
      href: "/safety-systems/cs300/",
      description: "Reliable safety solutions"
    },
    {
      image: photo2,
      title: "Safety Systems",
      href: "/safety-systems/sc300e/",
      description: "Protecting your operations"
    }
];

const galleryPhotos = [
  photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <LazyMotion features={domMax}>
      <div className="space-y-20 pb-12">
      {/* Hero Slider */}
      <section className="relative h-[300px] xs:h-[400px] md:h-[600px] overflow-hidden group shadow-2xl rounded-[2.5rem] will-change-transform">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover will-change-transform"
              loading={currentSlide === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5 sm:p-8 md:p-12 z-20">
              <div className="text-white max-w-xl">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-2 sm:mb-3 tracking-tight drop-shadow-lg"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm sm:text-base md:text-xl text-white/95 mb-4 sm:mb-6 font-medium drop-shadow-md line-clamp-2 sm:line-clamp-none"
                >
                  {slides[currentSlide].description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link 
                    to={slides[currentSlide].href}
                    className="relative inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold transition-all text-xs sm:text-sm md:text-base cursor-pointer overflow-hidden group/btn hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/20"
                  >
                    <span className="relative z-10">Explore Services</span>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-all duration-1000 ease-in-out" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 hover:scale-110 active:scale-90 flex min-w-[44px] min-h-[44px] items-center justify-center z-10"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 hover:scale-110 active:scale-90 flex min-w-[44px] min-h-[44px] items-center justify-center z-10"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all hover:scale-125 active:scale-90 ${currentSlide === idx ? "bg-white w-6 md:w-8" : "bg-white/40 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </section>

      {/* Intro Text */}
      <section className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 sm:mb-6">
          Paktech Limited has over 30 years experience in providing System Design, Integration and Commissioning Services.
        </h1>
        <p className="text-sm sm:text-base md:text-lg">
          We provide engineering and support services from complete Systems Build through to 24/7/365 Support. 
          State-of-the-art technologies combined with Consultancy Services, Project Management, SCADA, PC and PLC industry-focused software solutions.
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {[
            {
              title: "TMR Safety Systems",
              href: "/safety-systems/",
              items: ["CS300", "SC300E", "Tricon CX"],
              gradient: "from-blue-600 to-indigo-600"
            },
            {
              title: "Control Systems",
              href: "/control-systems/",
              items: ["Siemens S7", "RA MicroLogix", "RA ControlLogix"],
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              title: "Power Supplies",
              href: "/power-supply-services/",
              items: ["Bespoke Build", "19\" Rack Variants"],
              gradient: "from-indigo-500 to-purple-600"
            }
        ].map((feat) => (
          <motion.div 
            key={feat.title} 
            whileHover={{ y: -8 }}
            className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group"
          >
            <div className={`w-12 h-1 bg-gradient-to-r ${feat.gradient} rounded-full mb-6 group-hover:w-20 transition-all duration-500`} />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              <Link to={feat.href} className="hover:text-blue-600 transition-colors cursor-pointer block">{feat.title}</Link>
            </h3>
            <ul className="space-y-4">
              {feat.items.map(item => (
                <li key={item} className="flex items-center text-gray-600 text-sm sm:text-base font-medium">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feat.gradient} mr-4`} />
                  {item}
                </li>
              ))}
            </ul>
            <Link 
              to={feat.href} 
              className="mt-8 flex items-center text-sm font-bold text-blue-600 group/link hover:gap-3 transition-all"
            >
              Learn More <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Clients */}
      <section className="pt-6 sm:pt-8 border-t border-gray-100">
        <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 sm:mb-8 text-center uppercase tracking-widest">Our clients include...</h4>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 items-center px-4">
          {clientLogos.map((client) => (
            <div key={client.name} className="flex flex-col items-center group w-[80px] sm:w-[100px] md:w-[140px]">
              <div className="h-10 sm:h-12 md:h-16 w-full flex items-center justify-center mb-2 hover:scale-110 transition-transform duration-300">
                {client.logo ? (
                  <img 
                    src={client.logo} 
                    alt={`${client.name} logo`} 
                    className="max-h-full max-w-full object-contain filter drop-shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-[10px] sm:text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors text-center px-2">
                    {client.name}
                  </span>
                )}
              </div>
              {client.logo && (
                <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Project Gallery Section */}
      <section className="space-y-6 pt-6 sm:pt-8 border-t border-gray-100 flex flex-col items-center">
        <div className="flex flex-col items-center space-y-2 text-blue-600 text-center">
          <div className="bg-blue-600/10 p-2 sm:p-3 rounded-full">
            <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-gray-900">Project Gallery</h2>
          <div className="w-12 sm:w-16 h-1 bg-blue-600 rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full">
          {galleryPhotos.map((photo, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPhoto(photo)}
              className="relative aspect-square rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden shadow-sm bg-gray-100 group cursor-pointer"
            >
              <img 
                src={photo} 
                alt={`Project Photo ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold text-[10px] sm:text-sm bg-blue-600/80 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 sm:gap-2">
                  <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" /> Full View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors bg-black/50 p-3 rounded-full z-[60] min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/20"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-8 h-8" />
            </button>
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedPhoto} 
                alt="Full size project photo"
                className="max-w-full max-h-full object-contain rounded-[2rem] shadow-2xl will-change-transform"
                onClick={(e) => e.stopPropagation()}
                decoding="async"
              />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </LazyMotion>
  );
};

export default Home;
