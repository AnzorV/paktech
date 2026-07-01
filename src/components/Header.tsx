import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_better.png';
import person from '../assets/person.png';

const Header: React.FC = () => {
  return (
    <header className="bg-pakblue flex items-center justify-between shadow-xl overflow-hidden relative min-h-[100px] md:min-h-[160px]">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-15 pointer-events-none"></div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 pl-4 sm:pl-6 lg:pl-8 z-10 py-4 flex-1">
        <Link to="/" className="transition-transform hover:scale-105 duration-300 flex-shrink-0">
          <img 
            src={logo} 
            alt="Paktech Limited" 
            className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px] h-auto object-contain brightness-0 invert drop-shadow-md" 
          />
        </Link>
        
        <div className="hidden lg:block w-px h-12 bg-white/30 self-center"></div>

        <div className="flex items-center flex-1">
          <h1 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight max-w-xl leading-snug italic drop-shadow-lg opacity-95 text-center sm:text-left">
            Control Systems Design, Integration and Commissioning Services
          </h1>
        </div>
      </div>

      <div className="hidden sm:flex items-stretch justify-end z-10 self-stretch">
        <div className="relative group flex-shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition duration-700 z-20"></div>
          <img 
            src={person} 
            alt="Technical Expert" 
            className="relative w-32 md:w-64 lg:w-80 h-full object-cover grayscale-[0.1] brightness-110 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out [mask-image:linear-gradient(to_right,transparent,black_40%)]" 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
