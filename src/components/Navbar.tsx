import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenus, setActiveSubmenus] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const toggleSubmenu = (title: string) => {
    setActiveSubmenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };

  const navItems = [
    { title: 'Home', href: '/' },
    {
      title: 'Safety & Control Systems',
      href: '/safety-systems/',
      submenu: [
        {
          title: 'Safety Systems',
          href: '/safety-systems/',
          submenu: [
            { title: 'CS300', href: '/safety-systems/cs300/' },
            { title: 'SC300e', href: '/safety-systems/sc300e/' },
            { title: 'Tricon CX', href: '/safety-systems/tricon-cx/' },
          ]
        },
        { title: 'Control Systems', href: '/control-systems/' },
      ]
    },
    { title: 'SCADA', href: '/scada/' },
    { title: 'Power Supplies', href: '/power-supply-services/' },
    { title: 'PakNet', href: '/paknet/' },
    { title: 'Contact us', href: '/contact-us/' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    if (path === '/safety-systems/' && (
      location.pathname === '/safety-systems/cs300/' ||
      location.pathname === '/safety-systems/sc300e/' ||
      location.pathname === '/safety-systems/tricon-cx/'
    )) return true;
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-[100] bg-pakblue/95 backdrop-blur-md shadow-xl border-b border-white/10 gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Desktop Menu */}
          <div className="hidden md:block w-full">
            <ul className="flex items-center justify-start space-x-1">
              {navItems.map((item) => (
                <li
                  key={item.title}
                  className="relative h-full"
                  onMouseEnter={() => !isTouch && setHoveredItem(item.title)}
                  onMouseLeave={() => !isTouch && setHoveredItem(null)}
                >
                  <Link
                    to={item.href}
                    onClick={(e) => {
                      if (isTouch && item.submenu) {
                        e.preventDefault();
                        setHoveredItem(hoveredItem === item.title ? null : item.title);
                      }
                    }}
                    className={cn(
                      "relative flex items-center text-white/80 hover:text-white px-5 py-5 text-sm font-bold uppercase tracking-widest transition-all duration-300 min-h-[44px] group",
                      isActive(item.href) && "text-white"
                    )}
                  >
                    <span className="relative z-10">{item.title}</span>
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: hoveredItem === item.title ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "anticipate" }}
                        className="ml-2 z-10"
                      >
                        <ChevronDown className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                      </motion.div>
                    )}
                    
                    {/* Hover background effect */}
                    <AnimatePresence>
                      {hoveredItem === item.title && (
                        <motion.div
                          layoutId="nav-hover"
                          className="absolute inset-x-1 inset-y-2 bg-white/10 rounded-lg -z-0"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    {isActive(item.href) && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-white"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.submenu && hoveredItem === item.title && (
                      <motion.ul
                        initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute left-0 w-72 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-xl border border-gray-100 py-3 mt-1"
                      >
                        {item.submenu.map((sub, idx) => (
                          <motion.li 
                            key={sub.title} 
                            className="relative group/sub"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link
                              to={sub.href}
                              onClick={(e) => {
                                if (isTouch && sub.submenu) {
                                  e.preventDefault();
                                  toggleSubmenu(sub.title);
                                }
                              }}
                              className="flex items-center justify-between px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-pakblue transition-all duration-200"
                            >
                              <span className="font-semibold">{sub.title}</span>
                              {sub.submenu && (
                                <motion.div
                                  animate={{ 
                                    rotate: (isTouch && activeSubmenus.includes(sub.title)) ? 90 : 0,
                                    x: (isTouch && activeSubmenus.includes(sub.title)) ? 0 : 0
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ChevronRight className={cn(
                                    "w-4 h-4 opacity-30 transition-all",
                                    "group-hover/sub:opacity-100 group-hover/sub:translate-x-1"
                                  )} />
                                </motion.div>
                              )}
                            </Link>
                            {sub.submenu && (
                              <div className={cn(
                                "absolute left-full top-[-12px] w-64 opacity-0 invisible transition-all duration-300 pl-2",
                                "group-hover/sub:opacity-100 group-hover/sub:visible",
                                isTouch && activeSubmenus.includes(sub.title) && "opacity-100 visible"
                              )}>
                                <ul className="bg-white shadow-2xl rounded-xl border border-gray-100 py-2 overflow-hidden">
                                  <div className="absolute top-0 left-0 w-1 h-full bg-pakblue/10"></div>
                                  {sub.submenu.map((inner) => (
                                    <li key={inner.title}>
                                      <Link
                                        to={inner.href}
                                        className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-pakblue transition-colors duration-200"
                                      >
                                        {inner.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center justify-between w-full h-14">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 group/menu focus:outline-none"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_white] group-hover/menu:scale-125 transition-transform"></div>
              <span className="text-white font-black text-xs uppercase tracking-[0.2em] group-hover/menu:text-blue-200 transition-colors">Menu</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-300 active:scale-90 flex items-center justify-center border border-white/5"
            >
              <div className="relative w-6 h-6">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0"
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex flex-col justify-center items-center gap-1"
                    >
                      <span className="w-5 h-0.5 bg-white rounded-full"></span>
                      <span className="w-5 h-0.5 bg-white rounded-full"></span>
                      <span className="w-3 h-0.5 bg-white rounded-full self-start ml-0.5"></span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-x-0 top-[56px] bottom-0 bg-white z-[90] overflow-y-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white pointer-events-none"></div>
            <ul className="relative px-6 pt-8 pb-20 space-y-4">
              {navItems.map((item, idx) => (
                <motion.li 
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex-1 block py-2 text-2xl font-black text-gray-900 tracking-tight transition-all group-active:translate-x-2",
                        isActive(item.href) && "text-pakblue"
                      )}
                    >
                      {item.title}
                      {isActive(item.href) && (
                        <motion.div 
                          layoutId="mobile-active"
                          className="w-8 h-1 bg-pakblue mt-1 rounded-full"
                        />
                      )}
                    </Link>
                    {item.submenu && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubmenu(item.title);
                        }}
                        className="p-4 -m-4 text-gray-400 hover:text-pakblue transition-all"
                      >
                        <motion.div
                          animate={{ rotate: activeSubmenus.includes(item.title) ? 180 : 0, scale: activeSubmenus.includes(item.title) ? 1.2 : 1 }}
                        >
                          <ChevronDown className="w-7 h-7" />
                        </motion.div>
                      </button>
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {item.submenu && activeSubmenus.includes(item.title) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="py-4 pl-4 space-y-4 border-l-2 border-blue-100 ml-1">
                          {item.submenu.map((sub, sIdx) => (
                            <motion.li 
                              key={sub.title}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: sIdx * 0.05 }}
                            >
                              <div className="flex items-center justify-between">
                                <Link
                                  to={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="flex-1 block text-lg font-bold text-gray-600 hover:text-pakblue"
                                >
                                  {sub.title}
                                </Link>
                                {sub.submenu && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSubmenu(sub.title);
                                    }}
                                    className="p-3 -m-2 text-gray-400 hover:text-pakblue transition-colors"
                                  >
                                    <ChevronDown 
                                      className={cn(
                                        "w-6 h-6 transition-transform duration-300",
                                        activeSubmenus.includes(sub.title) && "rotate-180"
                                      )} 
                                    />
                                  </button>
                                )}
                              </div>
                              
                              <AnimatePresence>
                                {sub.submenu && activeSubmenus.includes(sub.title) && (
                                  <motion.ul
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden mt-3 ml-4 space-y-3"
                                  >
                                    {sub.submenu.map((inner) => (
                                      <li key={inner.title}>
                                        <Link
                                          to={inner.href}
                                          onClick={() => setIsOpen(false)}
                                          className="block text-base font-medium text-gray-500 hover:text-pakblue py-1"
                                        >
                                          {inner.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
