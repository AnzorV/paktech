import React from 'react';

const SCADA: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      <section className="prose prose-blue max-w-none mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-2 bg-blue-600 rounded-full" />
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Monitoring & Control</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-8">SCADA Systems</h1>
        <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-4xl font-medium">
          Supervisory Control and Data Acquisition (SCADA) systems are essential for monitoring and controlling large-scale industrial processes.
        </p>
      </section>

      <div className="bg-white p-10 sm:p-14 rounded-[3rem] border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.08)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-3 h-full bg-blue-600" />
        <h2 className="text-3xl sm:text-4xl font-black text-blue-600 mb-8 tracking-tight">Our Expertise</h2>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-10 font-medium">
          Paktech Limited provides comprehensive SCADA solutions tailored to your specific industry needs. From simple HMI replacements to complex, distributed SCADA architectures, we have the skills and experience to deliver robust and reliable systems.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {[
            "Custom HMI Design",
            "Data Logging and Reporting",
            "Remote Monitoring Solutions",
            "Alarm Management",
            "Integration with PLC/PAC",
            "Network Infrastructure Design"
          ].map(item => (
            <li key={item} className="flex items-center bg-gray-50/50 p-6 rounded-3xl border border-gray-100/80 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300 group">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mr-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-lg text-gray-700 font-bold">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SCADA;
