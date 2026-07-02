import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
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
    <nav className="relative z-[100] bg-pakblue shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Menu */}
          <div className="hidden md:block w-full">
            <ul className="flex items-center justify-start space-x-1">
              {navItems.map((item) => (
                <li
                  key={item.title}
                  className="relative"
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
                      "relative flex items-center text-white/90 hover:text-white px-4 py-6 text-sm font-bold uppercase tracking-wider transition-colors duration-200 min-h-[44px]",
                      isActive(item.href) && "text-white"
                    )}
                  >
                    {item.title}
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: hoveredItem === item.title ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-1"
                      >
                        <ChevronDown className="w-4 h-4 opacity-80" />
                      </motion.div>
                    )}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                        initial={false}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.submenu && hoveredItem === item.title && (
                      <motion.ul
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 w-64 bg-white shadow-2xl rounded-b-lg border border-gray-100 py-3 mt-0"
                      >
                        {item.submenu.map((sub) => (
                          <li key={sub.title} className="relative group/sub">
                            <Link
                              to={sub.href}
                              className="flex items-center justify-between px-5 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-pakblue transition-colors duration-200"
                            >
                              <span className="font-medium">{sub.title}</span>
                              {sub.submenu && <ChevronRight className="w-4 h-4 opacity-50 group-hover/sub:opacity-100" />}
                            </Link>
                            {sub.submenu && (
                              <div className="absolute left-full top-0 w-56 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 pl-1">
                                <ul className="bg-white shadow-2xl rounded-lg border border-gray-100 py-2">
                                  {sub.submenu.map((inner) => (
                                    <li key={inner.title}>
                                      <Link
                                        to={inner.href}
                                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-pakblue transition-colors duration-200"
                                      >
                                        {inner.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center justify-between w-full h-16">
            <span className="text-white font-bold text-sm uppercase tracking-widest">Menu</span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-200 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-inner"
          >
            <ul className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <li key={item.title} className="rounded-xl overflow-hidden border border-gray-50 bg-gray-50/30">
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex-1 block px-4 py-3 text-base font-bold text-gray-800 transition-colors",
                        isActive(item.href) && "text-pakblue bg-blue-50/50"
                      )}
                    >
                      {item.title}
                    </Link>
                    {item.submenu && (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className="p-5 text-gray-400 hover:text-pakblue transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                      >
                        <motion.div
                          animate={{ rotate: activeSubmenus.includes(item.title) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-6 h-6" />
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
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-white/50 border-t border-gray-100"
                      >
                        <ul className="py-2 space-y-1">
                          {item.submenu.map((sub) => (
                            <li key={sub.title} className="px-2">
                              <div className="flex items-center justify-between rounded-lg">
                                <Link
                                  to={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="flex-1 block px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-pakblue"
                                >
                                  {sub.title}
                                </Link>
                                {sub.submenu && (
                                  <button
                                    onClick={() => toggleSubmenu(sub.title)}
                                    className="p-4 text-gray-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                  >
                                    <motion.div
                                      animate={{ rotate: activeSubmenus.includes(sub.title) ? 180 : 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <ChevronDown className="w-5 h-5" />
                                    </motion.div>
                                  </button>
                                )}
                              </div>
                              
                              <AnimatePresence>
                                {sub.submenu && activeSubmenus.includes(sub.title) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden ml-4 border-l-2 border-blue-100 mt-1 mb-2"
                                  >
                                    <ul className="space-y-1 py-1">
                                      {sub.submenu.map((inner) => (
                                        <li key={inner.title}>
                                          <Link
                                            to={inner.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-500 hover:text-pakblue hover:bg-blue-50/30 rounded-r-lg transition-colors"
                                          >
                                            {inner.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
