import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactUs: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl bg-pakblue p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">How can we help you?</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl font-medium">
            Get in touch with Paktech Limited for enquiries regarding our services, system design, or support requirements.
          </p>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      <div className="max-w-4xl mx-auto">
        {/* Contact Info Cards */}
        <section className="bg-white p-6 md:p-10 rounded-2xl border border-gray-100 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50 pb-8">
            <h2 className="text-3xl font-bold text-gray-900">Contact Details</h2>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <Clock className="w-5 h-5 text-pakblue" />
              <span className="text-pakblue font-bold text-sm">24/7/365 Support</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="flex items-start gap-5 group/item">
                <div className="bg-blue-50 p-4 rounded-2xl text-pakblue group-hover/item:bg-pakblue group-hover/item:text-white transition-all duration-300 shadow-sm">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5">Email Us</p>
                  <a href="mailto:info@paktech.net" className="text-pakblue hover:text-blue-700 font-extrabold text-xl md:text-2xl transition-colors">info@paktech.net</a>
                </div>
              </div>

              <div className="flex items-start gap-5 group/item">
                <div className="bg-blue-50 p-4 rounded-2xl text-pakblue group-hover/item:bg-pakblue group-hover/item:text-white transition-all duration-300 shadow-sm">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5">Call Us</p>
                  <p className="text-gray-900 font-extrabold text-xl md:text-2xl">+44 (0) 1625 434111</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group/item">
                <div className="bg-blue-50 p-4 rounded-2xl text-pakblue group-hover/item:bg-pakblue group-hover/item:text-white transition-all duration-300 shadow-sm">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5">Our Office</p>
                  <p className="text-gray-700 font-bold text-lg md:text-xl leading-relaxed">
                    10-12 Jordangate,<br />
                    Macclesfield, SK10 1EE, UK
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group/item">
                <div className="bg-blue-50 p-4 rounded-2xl text-pakblue group-hover/item:bg-pakblue group-hover/item:text-white transition-all duration-300 shadow-sm">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1.5">Support hours</p>
                  <p className="text-gray-700 font-bold text-lg md:text-xl leading-relaxed">
                    24/7/365 Support for contract customers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <a 
              href="https://www.google.com/maps/place/10-12+Jordangate,+Macclesfield+SK10+1EE/@53.2621738,-2.1276026,17z/data=!3m1!4b1!4m6!3m5!1s0x487a4938f23cbead:0x77de9b346c806cfb!8m2!3d53.2621713!4d-2.1255589!16s%2Fg%2F11crqjrfky?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-gray-900 hover:bg-black text-white font-extrabold py-5 rounded-2xl transition-all shadow-xl active:scale-[0.98] text-lg group"
            >
              <MapPin className="w-6 h-6 transition-transform group-hover:scale-110" />
              Get Directions on Google Maps
            </a>
          </div>
        </section>
      </div>

      <section className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[500px] relative group">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2382.472714524419!2d-2.127747523268801!3d53.26217448206161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a4938f23cbead%3A0x77de9b346c806cfb!2s10-12%20Jordangate%2C%20Macclesfield%20SK10%201EE!5e0!3m2!1sen!2suk!4v1720352520000!5m2!1sen!2suk" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          title="Paktech Limited Full Map"
          className="contrast-[105%] transition-all duration-700"
        ></iframe>
        <div className="absolute top-6 right-6">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl border border-white/50 flex items-center gap-3">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
            <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">Office Location Confirmed</span>
          </div>
        </div>
        <div className="absolute bottom-6 left-6">
          <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-white/50">
            <div className="flex items-center gap-4">
              <div className="bg-pakblue p-3 rounded-xl shadow-lg shadow-blue-200">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg leading-none mb-1">Paktech Limited</h4>
                <p className="text-sm text-gray-500 font-medium">Macclesfield, United Kingdom</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
