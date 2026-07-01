import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="space-y-8">
      <section className="prose prose-blue max-w-none">
        <div className="flex items-center space-x-3 mb-4">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-gray-900 m-0">Privacy Statement</h1>
        </div>
        <p className="text-lg text-gray-600">
          At Paktech Limited, we are committed to protecting and respecting your privacy.
        </p>
      </section>

      <div className="space-y-6 text-gray-700">
        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
          <p>
            We may collect and process information that you provide by filling in forms on our site, such as your name, email address, and phone number when you enquire about our services.
          </p>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
          <p>
            We use your information to:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provide you with the information and services you request.</li>
            <li>Maintain our internal records (ISO 9001:2015 compliance).</li>
            <li>Improve our services and customer experience.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Security</h2>
          <p>
            We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
          </p>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Contact Us</h2>
          <p>
            If you have any questions about this privacy notice or our treatment of your personal data, please contact us at info@paktech.net.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
