import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, LazyMotion, domMax } from 'framer-motion';
import { cn } from '../lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenus, setActiveSubmenus] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const checkTouch = () => {
      // More robust touch detection
      const hasTouch = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
      );
      setIsTouch(hasTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
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

  const navItems = React.useMemo(() => [
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
        { 
          title: 'Control Systems', 
          href: '/control-systems/',
        },
      ]
    },
    { title: 'SCADA', href: '/scada/' },
    { title: 'Power Supplies', href: '/power-supply-services/' },
    { title: 'PakNet', href: '/paknet/' },
    { title: 'Contact us', href: '/contact-us/' },
  ], []);

  const isActive = React.useCallback((path: string, exact = false) => {
    if (path === '/' && location.pathname !== '/') return false;
    if (exact) return location.pathname === path;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return location.pathname === path;
  }, [location.pathname]);

  return (
    <LazyMotion features={domMax}>
      <nav className="sticky top-0 z-[130] bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100 gpu-accelerated overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Desktop Menu */}
            <div className="hidden lg:block w-full">
              <ul className="flex items-center justify-center space-x-2">
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
                        if (isTouch && item.submenu && item.submenu.length > 0) {
                          e.preventDefault();
                          setHoveredItem(hoveredItem === item.title ? null : item.title);
                        } else {
                          closeMenu();
                        }
                      }}
                      className={cn(
                        "relative flex items-center text-gray-600 hover:text-pakblue px-4 xl:px-8 py-7 text-[13px] xl:text-[15px] font-bold uppercase tracking-wider transition-all duration-300 min-h-[44px] group",
                        isActive(item.href) && "text-pakblue"
                      )}
                    >
                      <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">{item.title}</span>
                      {item.submenu && item.submenu.length > 0 && (
                        <motion.div
                          animate={{ rotate: hoveredItem === item.title ? 180 : 0 }}
                          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                          className="ml-2 z-10"
                        >
                          <ChevronDown className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      )}
                      
                      {/* Hover background effect */}
                      <AnimatePresence>
                        {hoveredItem === item.title && (
                          <motion.div
                            layoutId="nav-hover"
                            className="absolute inset-x-0 inset-y-4 bg-gray-50 rounded-2xl -z-0"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>

                      {isActive(item.href) && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute bottom-4 left-4 right-4 h-0.5 bg-pakblue rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    <AnimatePresence>
                      {item.submenu && item.submenu.length > 0 && hoveredItem === item.title && (
                        <motion.ul
                          initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(10px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(10px)" }}
                          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute left-0 w-80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl border border-gray-100 py-8 mt-1 z-[150]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent pointer-events-none rounded-2xl" />
                            {item.submenu.map((sub, idx) => {
                              const subId = `desktop-${item.title}-${sub.title}-${idx}`;
                              return (
                                <motion.li 
                                  key={subId} 
                                  className={cn(
                                    "relative group/sub mb-1 last:mb-0",
                                    sub.title === 'Control Systems' && "mt-6"
                                  )}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                >
                                  <Link
                                    to={sub.href}
                                    onClick={(e) => {
                                      if (isTouch && sub.submenu && sub.submenu.length > 0) {
                                        e.preventDefault();
                                        toggleSubmenu(subId);
                                      } else {
                                        closeMenu();
                                      }
                                    }}
                                    className={cn(
                                      "flex items-center justify-between px-6 py-4.5 text-sm transition-all duration-300 rounded-xl mx-3 group/link relative z-10 shadow-sm hover:shadow-md",
                                      isActive(sub.href, true) 
                                        ? "bg-gradient-to-r from-pakblue to-blue-600 text-white" 
                                        : "text-gray-700 hover:bg-gray-100"
                                    )}
                                  >
                                    <span className="font-bold tracking-wide uppercase text-[12px]">{sub.title}</span>
                                    {sub.submenu && sub.submenu.length > 0 && (
                                      <motion.div
                                        animate={{ 
                                          rotate: (isTouch && activeSubmenus.includes(subId)) ? 90 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <ChevronRight className={cn(
                                          "w-4 h-4 opacity-40 transition-all",
                                          "group-hover/link:opacity-100 group-hover/link:translate-x-1"
                                        )} />
                                      </motion.div>
                                    )}
                                  </Link>
                                  {sub.submenu && sub.submenu.length > 0 && (
                                    <div className={cn(
                                      "absolute left-full top-[-32px] w-72 opacity-0 invisible transition-all duration-300 pl-4 z-50",
                                      "group-hover/sub:opacity-100 group-hover/sub:visible",
                                      isTouch && activeSubmenus.includes(subId) && "opacity-100 visible"
                                    )}>
                                      <ul className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl border border-gray-100 py-6 relative">
                                        {sub.submenu.map((inner, iIdx) => {
                                          const innerId = `desktop-${subId}-${inner.title}-${iIdx}`;
                                          return (
                                            <li key={innerId} className="relative group/inner">
                                              <Link
                                                to={inner.href}
                                                onClick={closeMenu}
                                                className={cn(
                                                  "flex items-center justify-between px-6 py-3.5 text-[13px] transition-colors duration-200 font-bold uppercase tracking-tight relative z-10",
                                                  isActive(inner.href, true)
                                                    ? "bg-blue-50 text-pakblue"
                                                    : "text-gray-600 hover:bg-blue-50 hover:text-pakblue"
                                                )}
                                              >
                                                <span>{inner.title}</span>
                                                {inner.submenu && inner.submenu.length > 0 && (
                                                  <motion.div
                                                    animate={{ 
                                                      rotate: (isTouch && activeSubmenus.includes(innerId)) ? 90 : 0,
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                  >
                                                    <ChevronRight className="w-3.5 h-3.5 opacity-30 group-hover/inner:opacity-100" />
                                                  </motion.div>
                                                )}
                                              </Link>
                                              {inner.submenu && inner.submenu.length > 0 && (
                                                <div className={cn(
                                                  "absolute left-full top-0 w-64 opacity-0 invisible transition-all duration-300 pl-3 z-[60]",
                                                  "group-hover/inner:opacity-100 group-hover/inner:visible",
                                                  isTouch && activeSubmenus.includes(innerId) && "opacity-100 visible"
                                                )}>
                                                  <ul className="bg-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-2xl border border-gray-100 py-3">
                                                    {inner.submenu.map((lastItem, lIdx) => (
                                                      <li key={`${innerId}-last-${lIdx}`}>
                                                        <Link
                                                          to={lastItem.href}
                                                          onClick={closeMenu}
                                                          className="block px-6 py-2.5 text-[12px] text-gray-500 hover:bg-gray-50 hover:text-pakblue transition-colors font-medium"
                                                        >
                                                          {lastItem.title}
                                                        </Link>
                                                      </li>
                                                    ))}
                                                  </ul>
                                                </div>
                                              )}
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  )}
                                </motion.li>
                              );
                            })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center justify-end w-full h-16 relative z-[150] px-2 sm:px-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-12 h-12 flex items-center justify-center active:bg-gray-100 active:scale-90 rounded-full transition-all duration-300 overflow-hidden"
                aria-label="Toggle Menu"
              >
                <div className="relative w-6 h-5">
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "#005CAB" } : { rotate: 0, y: 0, backgroundColor: "#374151" }}
                    className="absolute top-0 left-0 w-full h-0.5 rounded-full transition-all"
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0, backgroundColor: "#374151" }}
                    className="absolute top-2 left-0 w-full h-0.5 rounded-full transition-all"
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -8, backgroundColor: "#005CAB" } : { rotate: 0, y: 0, backgroundColor: "#374151" }}
                    className="absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-all"
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
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 right-0 max-h-[85vh] bg-white z-[140] shadow-2xl flex flex-col overflow-hidden rounded-b-3xl"
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
                    className="p-3 active:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar py-2 sm:py-6">
                <nav className="px-4 sm:px-6">
                  <ul className="space-y-0.5 sm:space-y-1">
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
                                      onClick={(e) => {
                                        if (item.submenu && item.submenu.length > 0) {
                                          e.preventDefault();
                                          toggleSubmenu(item.title);
                                        } else {
                                          closeMenu();
                                        }
                                      }}
                                      className={cn(
                                        "flex-1 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-gray-800 transition-colors flex items-center gap-3",
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
                                    {item.submenu && item.submenu.length > 0 && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleSubmenu(item.title);
                                        }}
                                        className={cn(
                                          "p-4 sm:p-5 -mr-2 text-gray-400 hover:text-pakblue transition-all rounded-full ml-1 flex items-center justify-center",
                                          activeSubmenus.includes(item.title) && "bg-blue-50 text-pakblue"
                                        )}
                                      >
                                        <ChevronDown className={cn(
                                          "w-7 h-7 transition-transform duration-300",
                                          activeSubmenus.includes(item.title) && "rotate-180"
                                        )} />
                                      </button>
                                    )}
                                  </div>

                          <AnimatePresence>
                            {item.submenu && item.submenu.length > 0 && activeSubmenus.includes(item.title) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <ul className="pl-6 border-l-2 border-blue-100/50 ml-4 mb-4 sm:mb-6 space-y-1 sm:space-y-2">
                                  {item.submenu.map((sub, sIdx) => {
                                    const subId = `${item.title}-${sub.title}-${sIdx}`;
                                    return (
                                      <li 
                                        key={subId}
                                        className={cn(
                                          sub.title === 'Control Systems' && "pt-4 border-t border-gray-100 mt-2"
                                        )}
                                      >
                                        <div className="flex items-center">
                                          <Link
                                            to={sub.href}
                                            onClick={(e) => {
                                              if (sub.submenu && sub.submenu.length > 0) {
                                                e.preventDefault();
                                                toggleSubmenu(subId);
                                              } else {
                                                closeMenu();
                                              }
                                            }}
                                            className={cn(
                                              "flex-1 py-3 sm:py-4 text-sm sm:text-[17px] font-bold transition-colors duration-200",
                                              isActive(sub.href) ? "text-pakblue" : "text-gray-600 hover:text-pakblue"
                                            )}
                                          >
                                            {sub.title}
                                          </Link>
                                          {sub.submenu && sub.submenu.length > 0 && (
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSubmenu(subId);
                                              }}
                                              className={cn(
                                                "p-4 sm:p-5 -mr-2 text-gray-400 rounded-full ml-1 flex items-center justify-center",
                                                activeSubmenus.includes(subId) && "bg-blue-50 text-pakblue"
                                              )}
                                            >
                                              <ChevronDown className={cn(
                                                "w-6 h-6 transition-transform duration-300",
                                                activeSubmenus.includes(subId) && "rotate-180"
                                              )} />
                                            </button>
                                          )}
                                        </div>
                                        
                                        <AnimatePresence>
                                          {sub.submenu && sub.submenu.length > 0 && activeSubmenus.includes(subId) && (
                                            <motion.ul
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              className="overflow-hidden pl-6 border-l-2 border-blue-100/50 ml-2 mb-2 sm:mb-4 space-y-1 sm:space-y-2"
                                            >
                                              {sub.submenu.map((inner, iIdx) => {
                                                const innerId = `${subId}-${inner.title}-${iIdx}`;
                                                return (
                                                  <li key={innerId}>
                                                    <div className="flex items-center">
                                                      <Link
                                                        to={inner.href}
                                                        onClick={(e) => {
                                                          if (inner.submenu && inner.submenu.length > 0) {
                                                            e.preventDefault();
                                                            toggleSubmenu(innerId);
                                                          } else {
                                                            closeMenu();
                                                          }
                                                        }}
                                                        className={cn(
                                                          "flex-1 py-2.5 sm:py-3.5 text-xs sm:text-[15px] font-bold transition-colors duration-200",
                                                          isActive(inner.href) ? "text-pakblue" : "text-gray-500 hover:text-pakblue"
                                                        )}
                                                      >
                                                        {inner.title}
                                                      </Link>
                                                      {inner.submenu && inner.submenu.length > 0 && (
                                                        <button
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleSubmenu(innerId);
                                                          }}
                                                          className={cn(
                                                            "p-3 text-gray-400 rounded-full ml-1",
                                                            activeSubmenus.includes(innerId) && "bg-blue-50 text-pakblue"
                                                          )}
                                                        >
                                                          <ChevronDown className={cn(
                                                            "w-4 h-4 transition-transform duration-300",
                                                            activeSubmenus.includes(innerId) && "rotate-180"
                                                          )} />
                                                        </button>
                                                      )}
                                                    </div>
                                                    
                                                    <AnimatePresence>
                                                      {inner.submenu && inner.submenu.length > 0 && activeSubmenus.includes(innerId) && (
                                                        <motion.ul
                                                          initial={{ height: 0, opacity: 0 }}
                                                          animate={{ height: "auto", opacity: 1 }}
                                                          exit={{ height: 0, opacity: 0 }}
                                                          className="overflow-hidden pl-4 border-l-2 border-blue-50 ml-1 mb-1 sm:mb-2 space-y-0.5 sm:space-y-1"
                                                        >
                                                          {inner.submenu.map((lastItem, lIdx) => (
                                                            <li key={`${innerId}-last-${lIdx}`}>
                                                              <Link
                                                                to={lastItem.href}
                                                                onClick={closeMenu}
                                                                className={cn(
                                                                  "block py-1.5 sm:py-2 text-[12px] sm:text-[13px] transition-colors duration-200 font-medium",
                                                                  isActive(lastItem.href) ? "text-pakblue" : "text-gray-400 hover:text-pakblue"
                                                                )}
                                                              >
                                                                {lastItem.title}
                                                              </Link>
                                                            </li>
                                                          ))}
                                                        </motion.ul>
                                                      )}
                                                    </AnimatePresence>
                                                  </li>
                                                );
                                              })}
                                            </motion.ul>
                                          )}
                                        </AnimatePresence>
                                      </li>
                                    );
                                  })}
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
    </LazyMotion>
  );
};

export default Navbar;
