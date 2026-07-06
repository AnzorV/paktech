import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_better.png';
import person from '../assets/person.png';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-pakblue via-[#004e92] to-pakblue flex items-center justify-between shadow-2xl overflow-hidden relative min-h-[100px] md:min-h-[160px]">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
      
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 pl-4 sm:pl-8 lg:pl-12 z-10 py-6 sm:py-4 flex-1">
        <Link to="/" className="transition-all hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] duration-500 flex-shrink-0">
          <img 
            src={logo} 
            alt="Paktech Limited" 
            className="w-full max-w-[160px] xs:max-w-[200px] sm:max-w-[240px] md:max-w-[300px] h-auto object-contain drop-shadow-2xl brightness-0 invert" 
            loading="eager"
            decoding="async"
          />
        </Link>
        
        <div className="hidden lg:block w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent self-center"></div>

        <div className="flex items-center flex-1 w-full sm:w-auto">
          <h1 className="text-white text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold tracking-tight max-w-2xl leading-tight italic drop-shadow-2xl opacity-100 text-center sm:text-left w-full sm:w-auto px-4 sm:px-0 bg-clip-text">
            Control Systems Design, Integration and Commissioning Services
          </h1>
        </div>
      </div>

      <div className="hidden sm:flex items-stretch justify-end z-10 self-stretch relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-pakblue to-transparent z-30"></div>
        <div className="relative group flex-shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition duration-700 z-20"></div>
          <img 
            src={person} 
            alt="Technical Expert" 
            className="relative w-36 md:w-64 lg:w-96 h-full object-cover grayscale-[0.2] brightness-110 group-hover:grayscale-0 group-hover:brightness-105 group-hover:scale-110 transition-all duration-1000 ease-in-out [mask-image:linear-gradient(to_right,transparent,black_30%)]" 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
