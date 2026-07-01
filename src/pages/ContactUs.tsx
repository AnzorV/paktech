import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare, Briefcase, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Sales',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setStatus('sending');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_5pd9kzl';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_hm5d1i7';
    const replyTemplateId = import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'b8WFkZiqWCZh3HbP5';

    try {
      const templateParams = {
        name: formData.name,
        user_name: formData.name,
        user_email: formData.email,
        from_name: formData.name,
        reply_to: formData.email,
        to_email: 'info@paktech.net',
        subject: formData.subject || 'Website Enquiry',
        department: formData.department,
        message: formData.message,
        time: new Date().toLocaleString('en-GB', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      };

      // Send primary notification email
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Send separate auto-reply if a dedicated template ID is provided
      if (replyTemplateId) {
        await emailjs.send(serviceId, replyTemplateId, templateParams, publicKey);
      }
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        department: 'Sales',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const departments = [
    { id: 'Sales', name: 'Sales & Estimating', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Support', name: 'Technical Support', icon: <Clock className="w-4 h-4" /> },
    { id: 'Admin', name: 'General Enquiries', icon: <Mail className="w-4 h-4" /> },
  ];

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Form */}
        <section className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl border border-gray-100 shadow-2xl relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-100 p-2.5 rounded-xl">
              <MessageSquare className="w-6 h-6 text-pakblue" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Send an Enquiry</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pakblue transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pakblue/20 focus:border-pakblue focus:bg-white outline-none transition-all duration-200"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pakblue transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pakblue/20 focus:border-pakblue focus:bg-white outline-none transition-all duration-200"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 ml-1">Select Department</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setFormData({...formData, department: dept.id})}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all text-sm font-semibold ${
                      formData.department === dept.id 
                        ? 'border-pakblue bg-blue-50 text-pakblue shadow-sm' 
                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {dept.icon}
                    {dept.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
              <input
                type="text"
                required
                placeholder="How can we help?"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pakblue/20 focus:border-pakblue focus:bg-white outline-none transition-all duration-200"
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Your Message</label>
              <textarea
                required
                rows={4}
                placeholder="Please describe your enquiry in detail..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pakblue/20 focus:border-pakblue focus:bg-white outline-none transition-all duration-200 resize-none"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <div className="pt-2 relative">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-pakblue hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Enquiry to {formData.department}
                  </>
                )}
              </button>
              
              <p className="mt-4 text-xs text-gray-400 text-center flex items-center justify-center gap-1.5 px-4">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                Your enquiry will be sent directly to our {formData.department} team.
              </p>
            </div>

            {status === 'success' && (
              <div className="mt-4 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm font-semibold">Enquiry sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-sm font-semibold">Failed to send enquiry. Please try again or email us directly.</span>
              </div>
            )}
          </form>
        </section>

        {/* Contact Info Cards */}
        <section className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-50 pb-4">Contact Details</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 group/item">
                <div className="bg-blue-50 p-3 rounded-xl text-pakblue group-hover/item:bg-pakblue group-hover/item:text-white transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Us</p>
                  <a href="mailto:info@paktech.net" className="text-pakblue hover:text-blue-700 font-bold text-lg transition-colors">info@paktech.net</a>
                </div>
              </div>

              <div className="flex items-start gap-4 group/item">
                <div className="bg-blue-50 p-3 rounded-xl text-pakblue group-hover/item:bg-pakblue group-hover/item:text-white transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-gray-900 font-bold text-lg">+44 (0) 1625 434111</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group/item">
                <div className="bg-blue-50 p-3 rounded-xl text-pakblue group-hover/item:bg-pakblue group-hover/item:text-white transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Our Office</p>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    1st Floor, 10-12 Jordan Gate,<br />
                    Macclesfield, SK10 1EE, UK
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group/item">
                <div className="bg-blue-50 p-3 rounded-xl text-pakblue group-hover/item:bg-pakblue group-hover/item:text-white transition-all duration-300">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Support hours</p>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    24/7/365 Support for contract customers.
                  </p>
                </div>
              </div>
            </div>

            <a 
              href="https://goo.gl/maps/PaktechLimited" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </section>
      </div>

      {/* Full Width Map Section */}
      <section className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[500px] relative group">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1191.2367642873595!2d-2.1287116841616!3d53.33475197997576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a36c64993132f%3A0xc6c7936a9e88a0b9!2sPaktech%20Limited!5e0!3m2!1sen!2suk!4v1719331000000!5m2!1sen!2suk" 
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
