import React from 'react';

const PowerSupplies: React.FC = () => {
  return (
    <div className="space-y-8">
      <section className="prose prose-blue max-w-none">
        <h1 className="text-3xl font-extrabold text-gray-900">Power Supplies</h1>
        <p className="text-lg text-gray-600">
          We offer bespoke power supply solutions for industrial applications, ensuring reliable and stable power for your critical control systems.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Bespoke Build</h2>
            <p className="text-gray-600">
              Custom-engineered power supply units designed to meet specific voltage, current, and environmental requirements.
            </p>
          </div>
          <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">19" Rack Variants</h2>
            <p className="text-gray-600">
              Standardized rack-mount power solutions for easy integration into existing control cabinets and server rooms.
            </p>
          </div>
        </div>
        <div className="flex-1">
          <img 
            src="https://www.paktech.net/assets/images/slide3.jpg" 
            alt="Power Supplies" 
            className="rounded-[2rem] shadow-xl w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default PowerSupplies;
