import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare, Briefcase, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

declare global {
  interface Window {
    turnstile: any;
    onTurnstileLoad: () => void;
    isTurnstileReady?: boolean;
  }
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Sales',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const turnstileRendered = React.useRef(false);

  // Clear form data on success or error reset
  useEffect(() => {
    let saveTimeout: number;
    saveTimeout = window.setTimeout(() => {
      sessionStorage.setItem('contactFormData', JSON.stringify(formData));
    }, 500);
    return () => window.clearTimeout(saveTimeout);
  }, [formData]);

  useEffect(() => {
    let timeoutId: number;
    if (status === 'success' || status === 'error') {
      timeoutId = window.setTimeout(() => setStatus('idle'), 5000);
    }
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [status]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    const validDepartments = departments.map(d => d.id);
    if (!validDepartments.includes(formData.department)) {
      newErrors.department = 'Invalid department selected';
    }

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = 'Name is required';
    } else if (trimmedName.length > 100) {
      newErrors.name = 'Name must be under 100 characters';
    }

    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const trimmedSubject = formData.subject.trim();
    if (!trimmedSubject) {
      newErrors.subject = 'Subject is required';
    } else if (trimmedSubject.length > 150) {
      newErrors.subject = 'Subject must be under 150 characters';
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      newErrors.message = 'Message is required';
    } else if (trimmedMessage.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (trimmedMessage.length > 2000) {
      newErrors.message = 'Message must be under 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (status === 'sending') return;
    if (!validate()) return;
    
    // Server-side verification is recommended for production.
    // For this static site, we rely on client-side check + secret key in EmailJS if applicable.
    if (!turnstileToken) {
      setErrors(prev => ({ ...prev, turnstile: 'Please complete the security check' }));
      return;
    }
    
    setStatus('sending');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const replyTemplateId = import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration is missing');
      setStatus('error');
      return;
    }

    try {
      const templateParams = {
        name: formData.name.trim(),
        user_name: formData.name.trim(),
        user_email: formData.email.trim().toLowerCase(),
        from_name: formData.name.trim(),
        reply_to: formData.email.trim().toLowerCase(),
        to_email: 'info@paktech.net',
        subject: formData.subject.trim() || 'Website Enquiry',
        department: formData.department,
        message: formData.message.trim(),
        'g-recaptcha-response': turnstileToken,
        time: new Date().toLocaleString('en-GB', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      };

      // Send primary notification email with 15s timeout
      await Promise.race([
        emailjs.send(serviceId, templateId, templateParams, publicKey),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 15000))
      ]);
      
      // Send separate auto-reply if a dedicated template ID is provided
      // Handle separately so it doesn't break the main success state
      if (replyTemplateId) {
        emailjs.send(serviceId, replyTemplateId, templateParams, publicKey)
          .catch(err => console.warn('Auto-reply failed to send:', err));
      }
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        department: 'Sales',
        subject: '',
        message: ''
      });
      setErrors({});
      sessionStorage.removeItem('contactFormData');
      // Reset Turnstile
      if (window.turnstile && widgetId) {
        try {
          window.turnstile.reset(widgetId);
          setTurnstileToken(null);
        } catch (e) {
          console.warn('Turnstile reset failed, re-rendering:', e);
          turnstileRendered.current = false;
          // Small delay before re-render attempt
          setTimeout(() => {
            const container = document.getElementById('turnstile-container');
            if (container) container.innerHTML = ''; // Clear container
            // The main useEffect fallback or next render cycle will pick it up
            // Or we can manually trigger it if we want to be aggressive
          }, 100);
        }
      }
    } catch (err) {
      console.error('Failed to send email:', err);
      setStatus('error');
    }
  };

  useEffect(() => {
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      console.warn('Cloudflare Turnstile site key is missing');
      return;
    }

    const renderTurnstile = () => {
      if (turnstileRendered.current) return;
      
      const container = document.getElementById('turnstile-container');
      if (window.turnstile && container) {
        try {
          turnstileRendered.current = true;
          const id = window.turnstile.render('#turnstile-container', {
            sitekey: siteKey,
            callback: (token: string) => {
              setTurnstileToken(token);
              setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.turnstile;
                return newErrors;
              });
            },
            'error-callback': (err: any) => {
              console.error('Turnstile error:', err);
              // Error 300030: The widget was removed or became invalid
              if (err === '300030' || err === 300030) {
                turnstileRendered.current = false;
                setTurnstileToken(null);
                const container = document.getElementById('turnstile-container');
                if (container) container.innerHTML = '';
                // Re-attempt render
                setTimeout(renderTurnstile, 500);
              } else {
                turnstileRendered.current = false;
              }
            },
            'expired-callback': () => {
              setTurnstileToken(null);
              turnstileRendered.current = false;
            }
          });
          setWidgetId(id);
        } catch (e) {
          console.error('Turnstile render failed:', e);
          turnstileRendered.current = false;
        }
      }
    };

    const handleReady = () => {
      renderTurnstile();
    };

    if (window.isTurnstileReady && window.turnstile) {
      // Small delay to ensure DOM is ready even if script was already loaded
      setTimeout(renderTurnstile, 100);
    } else {
      window.addEventListener('turnstile-ready', handleReady);
    }

    // Fallback interval just in case event is missed
    const fallbackInterval = setInterval(() => {
      if (window.turnstile && !turnstileRendered.current) {
        renderTurnstile();
      }
      if (turnstileRendered.current) {
        clearInterval(fallbackInterval);
      }
    }, 2000);

    return () => {
      window.removeEventListener('turnstile-ready', handleReady);
      clearInterval(fallbackInterval);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch (e) {
          console.warn('Turnstile remove failed:', e);
        }
      }
      turnstileRendered.current = false;
    };
  }, [widgetId]);

  useEffect(() => {
    const savedData = sessionStorage.getItem('contactFormData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (err) {
        console.error('Failed to parse saved form data:', err);
      }
    }
  }, []);

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
                <label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pakblue transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-pakblue/20 focus:border-pakblue focus:bg-white outline-none transition-all duration-200`}
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pakblue transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-pakblue/20 focus:border-pakblue focus:bg-white outline-none transition-all duration-200`}
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
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
              <label htmlFor="subject" className="text-sm font-bold text-gray-700 ml-1">Subject</label>
              <input
                id="subject"
                type="text"
                required
                placeholder="How can we help?"
                className={`w-full px-4 py-3 bg-gray-50 border ${errors.subject ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-pakblue/20 focus:border-pakblue focus:bg-white outline-none transition-all duration-200`}
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1 ml-1">{errors.subject}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label htmlFor="message" className="text-sm font-bold text-gray-700">Your Message</label>
                <span className={`text-[10px] font-bold ${formData.message.length > 2000 ? 'text-red-500' : 'text-gray-400'}`}>
                  {formData.message.length} / 2000
                </span>
              </div>
              <textarea
                id="message"
                required
                rows={4}
                placeholder="Please describe your enquiry in detail..."
                className={`w-full px-4 py-3 bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-pakblue/20 focus:border-pakblue focus:bg-white outline-none transition-all duration-200 resize-none`}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>}
            </div>

            <div className="space-y-2">
              <div id="turnstile-container" className="flex justify-center md:justify-start"></div>
              {errors.turnstile && <p className="text-red-500 text-xs mt-1 ml-1">{errors.turnstile}</p>}
            </div>

            <div className="pt-2 relative">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-pakblue hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 text-lg overflow-hidden group/btn relative"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-all duration-700 ease-in-out opacity-0 group-hover/btn:opacity-100" />
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
              <div aria-live="polite" className="mt-4 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm font-semibold">Enquiry sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            {status === 'error' && (
              <div aria-live="polite" className="mt-4 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-sm font-semibold">Failed to send enquiry. Please try again or email us directly.</span>
                </div>
                <button 
                  type="button"
                  onClick={() => handleSubmit()}
                  className="text-sm font-bold text-red-700 hover:text-red-800 underline w-fit ml-8"
                >
                  Try again
                </button>
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
                    10-12 Jordangate,<br />
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
              href="https://www.google.com/maps/place/10-12+Jordangate,+Macclesfield+SK10+1EE/@53.2621738,-2.1276026,17z/data=!3m1!4b1!4m6!3m5!1s0x487a4938f23cbead:0x77de9b346c806cfb!8m2!3d53.2621713!4d-2.1255589!16s%2Fg%2F11crqjrfky?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D" 
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
