import React from 'react';

const PakNet: React.FC = () => {
  return (
    <div className="space-y-8">
      <section className="prose prose-blue max-w-none">
        <h1 className="text-3xl font-extrabold text-gray-900">PakNet</h1>
        <p className="text-lg text-gray-600">
          Paktech Limited's latest development (in conjunction with Contemporary Controls) is a Co-axial to Ethernet Proxy device.
        </p>
      </section>

      <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Innovation in Connectivity</h2>
        <p className="text-blue-900 leading-relaxed">
          The PakNet proxy device is predominately (but not restricted to) designed for upgrading existing ARCNET LANs (i.e. TRIDAS). It allows for seamless integration of legacy co-axial based systems with modern Ethernet infrastructure, extending the life and capabilities of your existing hardware investments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Key Features</h3>
          <ul className="space-y-2">
            {[
              "Co-axial to Ethernet conversion",
              "Designed for ARCNET/TRIDAS systems",
              "Low latency performance",
              "Industrial grade reliability",
              "Plug-and-play setup for specific legacy systems"
            ].map(feature => (
              <li key={feature} className="flex items-start text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-gray-600 italic text-center">
            "Extending the lifecycle of your control system infrastructure through modern connectivity solutions."
          </p>
        </div>
      </div>
    </div>
  );
};

export default PakNet;
