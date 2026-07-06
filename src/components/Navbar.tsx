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

  const closeMenu = () => {
    setIsOpen(false);
    setActiveSubmenus([]);
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
    <>
      <nav className="sticky top-0 z-[130] bg-pakblue/95 backdrop-blur-md shadow-xl border-b border-white/10 gpu-accelerated overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Desktop Menu */}
            <div className="hidden lg:block w-full">
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
                        "relative flex items-center text-white/80 hover:text-white px-2 xl:px-4 py-5 text-[11px] xl:text-[13px] font-bold uppercase tracking-tight xl:tracking-widest transition-all duration-300 min-h-[44px] group",
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
                            className="absolute inset-0 bg-white/10 rounded-full -z-0"
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
                          className="absolute bottom-1 left-2 right-2 h-0.5 bg-blue-400 rounded-full"
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
                          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute left-0 w-72 bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl border border-white/20 py-4 mt-3 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none" />
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
                                className="flex items-center justify-between px-6 py-3.5 text-sm text-gray-700 hover:bg-pakblue hover:text-white transition-all duration-300 rounded-xl mx-2 group/link"
                              >
                                <span className="font-semibold tracking-wide">{sub.title}</span>
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
                                      "group-hover/link:opacity-100 group-hover/link:translate-x-1"
                                    )} />
                                  </motion.div>
                                )}
                              </Link>
                              {sub.submenu && (
                                <div className={cn(
                                  "absolute left-full top-[-16px] w-64 opacity-0 invisible transition-all duration-300 pl-4",
                                  "group-hover/sub:opacity-100 group-hover/sub:visible",
                                  isTouch && activeSubmenus.includes(sub.title) && "opacity-100 visible"
                                )}>
                                  <ul className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 py-3 overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-pakblue"></div>
                                    {sub.submenu.map((inner) => (
                                      <li key={inner.title}>
                                        <Link
                                          to={inner.href}
                                          className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-pakblue transition-colors duration-200 font-medium"
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
            <div className="lg:hidden flex items-center justify-end w-full h-14 relative z-[150] px-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-12 h-12 flex items-center justify-center bg-white/15 hover:bg-white/25 active:scale-90 rounded-full border border-white/20 transition-all duration-300 shadow-xl overflow-hidden"
                aria-label="Toggle Menu"
              >
                <div className="relative w-6 h-5">
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    className="absolute top-0 left-0 w-full h-0.5 bg-white rounded-full transition-all"
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                    className="absolute top-2 left-0 w-full h-0.5 bg-white rounded-full transition-all"
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full transition-all"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="lg:hidden fixed inset-0 bg-pakblue/60 backdrop-blur-md z-[135]"
            />

            {/* Menu Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[140] shadow-2xl flex flex-col overflow-hidden sm:rounded-l-2xl"
            >
              {/* Menu Header */}
              <div className="p-6 bg-pakblue text-white relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex flex-col">
                    <span className="font-black tracking-[0.2em] uppercase text-xs opacity-70">Paktech Limited</span>
                    <span className="text-xl font-bold">Navigation</span>
                  </div>
                  <button 
                    onClick={closeMenu}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar py-6">
                <nav className="px-6">
                  <ul className="space-y-1">
                    {navItems.map((item, idx) => (
                      <motion.li 
                        key={item.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Link
                              to={item.href}
                              onClick={closeMenu}
                              className={cn(
                                "flex-1 py-4 text-lg font-bold text-gray-800 transition-colors flex items-center gap-3",
                                isActive(item.href) && "text-pakblue"
                              )}
                            >
                              {isActive(item.href) && (
                                <motion.div 
                                  layoutId="mobile-active-dot"
                                  className="w-1.5 h-1.5 bg-pakblue rounded-full" 
                                />
                              )}
                              {item.title}
                            </Link>
                            {item.submenu && (
                              <button
                                onClick={() => toggleSubmenu(item.title)}
                                className={cn(
                                  "p-4 text-gray-400 hover:text-pakblue transition-all rounded-full",
                                  activeSubmenus.includes(item.title) && "bg-blue-50 text-pakblue"
                                )}
                              >
                                <ChevronDown className={cn(
                                  "w-5 h-5 transition-transform duration-300",
                                  activeSubmenus.includes(item.title) && "rotate-180"
                                )} />
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
                                <ul className="pl-4 border-l-2 border-blue-50 ml-2 mb-4 space-y-1">
                                  {item.submenu.map((sub, sIdx) => (
                                    <li key={sub.title}>
                                      <div className="flex items-center">
                                        <Link
                                          to={sub.href}
                                          onClick={closeMenu}
                                          className="flex-1 py-3 text-[16px] font-semibold text-gray-600 hover:text-pakblue"
                                        >
                                          {sub.title}
                                        </Link>
                                        {sub.submenu && (
                                          <button
                                            onClick={() => toggleSubmenu(sub.title)}
                                            className="p-3 text-gray-400"
                                          >
                                            <ChevronDown className={cn(
                                              "w-4 h-4 transition-transform duration-300",
                                              activeSubmenus.includes(sub.title) && "rotate-180"
                                            )} />
                                          </button>
                                        )}
                                      </div>
                                      
                                      <AnimatePresence>
                                        {sub.submenu && activeSubmenus.includes(sub.title) && (
                                          <motion.ul
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden pl-4 border-l-2 border-blue-50 ml-1 mb-2 space-y-1"
                                          >
                                            {sub.submenu.map((inner) => (
                                              <li key={inner.title}>
                                                <Link
                                                  to={inner.href}
                                                  onClick={closeMenu}
                                                  className="block py-2.5 text-sm font-medium text-gray-500 hover:text-pakblue"
                                                >
                                                  {inner.title}
                                                </Link>
                                              </li>
                                            ))}
                                          </motion.ul>
                                        )}
                                      </AnimatePresence>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>
              
              {/* Menu Footer */}
              <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                <Link 
                  to="/contact-us/"
                  onClick={closeMenu}
                  className="flex items-center justify-center w-full bg-pakblue text-white font-bold py-5 rounded-xl shadow-xl shadow-blue-900/20 active:scale-[0.98] transition-all"
                >
                  Request a Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
