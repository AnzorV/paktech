import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Newspaper, ChevronRight } from 'lucide-react';

const news = [
  "Paktech Limited's latest development is a Co-axial to Ethernet Proxy device predominately for upgrading existing ARCNET LANs.",
  "Paktech Limited has been approved as a Triconex integrator, offering replacement of CS300 / SC300E systems with Triconex CX.",
];

const testimonials = [
  {
    quote: "Mike Adams and the team at Paktech Limited have been a great source of assistance to BGTT. They have been consistently reliable and their expertise with SC300E is second to none.",
    author: "BGTT"
  },
  {
    quote: "The upgrade and refurbishment of our CS300 Systems along with the Mimic replacement has exceeded our expectations. I would recommend Paktech Limited to any company.",
    author: "BP Cooper River"
  }
];

const Sidebar: React.FC = () => {
  const [newsIdx, setNewsIdx] = useState(0);
  const [testiIdx, setTestiIdx] = useState(0);

  useEffect(() => {
    const newsTimer = setInterval(() => setNewsIdx(p => (p + 1) % news.length), 8000);
    const testiTimer = setInterval(() => setTestiIdx(p => (p + 1) % testimonials.length), 13000);
    return () => { clearInterval(newsTimer); clearInterval(testiTimer); };
  }, []);

  return (
    <div className="space-y-12">
      {/* Latest News */}
      <section>
        <div className="flex items-center space-x-2 text-blue-600 mb-6 border-b border-blue-100 pb-2">
          <Newspaper className="w-5 h-5" />
          <h2 className="text-xl font-bold uppercase tracking-wider">Latest News</h2>
        </div>
        <div className="relative h-48 sm:h-40 md:h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={newsIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0"
            >
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                {news[newsIdx]}
              </p>
              <Link to="/paknet/" className="inline-flex items-center text-blue-600 font-semibold text-xs uppercase hover:underline py-2 min-h-[44px]">
                Find out more <ChevronRight className="ml-1 w-3 h-3" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="flex items-center space-x-2 text-blue-600 mb-6 border-b border-blue-100 pb-2">
          <Quote className="w-5 h-5" />
          <h2 className="text-xl font-bold uppercase tracking-wider">Testimonials</h2>
        </div>
        <div className="relative h-64 sm:h-56 md:h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={testiIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="absolute inset-0 bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
            >
              <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                "{testimonials[testiIdx].quote}"
              </p>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest border-t pt-4">
                — {testimonials[testiIdx].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <motion.section 
        whileHover={{ scale: 1.02 }}
        className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-200"
      >
        <h3 className="text-lg font-bold mb-2">Need Support?</h3>
        <p className="text-blue-100 text-xs mb-4">Our engineers are available 24/7/365 for your critical systems.</p>
        <Link 
          to="/contact-us/" 
          className="block text-center bg-white text-blue-600 font-bold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors shadow-lg"
        >
          Contact Us
        </Link>
      </motion.section>
    </div>
  );
};

export default Sidebar;
