import React from 'react';

const SCADA: React.FC = () => {
  return (
    <div className="space-y-8">
      <section className="prose prose-blue max-w-none">
        <h1 className="text-3xl font-extrabold text-gray-900">SCADA Systems</h1>
        <p className="text-lg text-gray-600">
          Supervisory Control and Data Acquisition (SCADA) systems are essential for monitoring and controlling large-scale industrial processes.
        </p>
      </section>

      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Expertise</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Paktech Limited provides comprehensive SCADA solutions tailored to your specific industry needs. From simple HMI replacements to complex, distributed SCADA architectures, we have the skills and experience to deliver robust and reliable systems.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Custom HMI Design",
            "Data Logging and Reporting",
            "Remote Monitoring Solutions",
            "Alarm Management",
            "Integration with PLC/PAC",
            "Network Infrastructure Design"
          ].map(item => (
            <li key={item} className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SCADA;
