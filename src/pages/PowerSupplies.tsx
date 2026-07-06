import React from 'react';

const PowerSupplies: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      <section className="prose prose-blue max-w-none mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-2 bg-blue-600 rounded-full shadow-sm" />
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Industrial Power</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-8">Power Supplies</h1>
        <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-4xl font-medium">
          We offer bespoke power supply solutions for industrial applications, ensuring reliable and stable power for your critical control systems.
        </p>
      </section>

      <div className="flex flex-col lg:flex-row gap-10 sm:gap-14 items-center">
        <div className="flex-1 w-full space-y-8">
          <div className="bg-white p-10 sm:p-12 rounded-[3rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
            <h2 className="text-2xl sm:text-3xl font-black text-blue-600 mb-4 tracking-tight">Bespoke Build</h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium">
              Custom-engineered power supply units designed to meet specific voltage, current, and environmental requirements.
            </p>
          </div>
          <div className="bg-white p-10 sm:p-12 rounded-[3rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
            <h2 className="text-2xl sm:text-3xl font-black text-blue-600 mb-4 tracking-tight">19" Rack Variants</h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium">
              Standardized rack-mount power solutions for easy integration into existing control cabinets and server rooms.
            </p>
          </div>
        </div>
        <div className="flex-1 w-full relative group">
          <div className="absolute -inset-4 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-[3.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition duration-700"></div>
          <img 
            src="https://www.paktech.net/assets/images/slide3.jpg" 
            alt="Power Supplies" 
            className="relative rounded-[3rem] shadow-2xl w-full h-auto object-cover max-h-[400px] lg:max-h-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PowerSupplies;
