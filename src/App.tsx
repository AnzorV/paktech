import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const SafetySystems = lazy(() => import('./pages/SafetySystems'));
const SCADA = lazy(() => import('./pages/SCADA'));
const PowerSupplies = lazy(() => import('./pages/PowerSupplies'));
const PakNet = lazy(() => import('./pages/PakNet'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#FFF] font-sans text-gray-900">
        {/* Header Area (Blue Background) */}
        <div className="w-full">
          <Header />
        </div>

        {/* Navbar Area (Blue Background) */}
        <Navbar />

        {/* Main Content Area */}
        <main className="w-full py-8 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-[1800px] mx-auto">
          <div className="bg-white shadow-[0_32px_100px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden flex flex-col lg:flex-row w-full min-h-[600px] sm:min-h-[800px] border border-gray-100">
            <div className="flex-1 p-6 sm:p-10 md:p-16 lg:p-20">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/safety-systems/" element={<SafetySystems />} />
                  <Route path="/safety-systems/cs300/" element={<SafetySystems />} />
                  <Route path="/safety-systems/sc300e/" element={<SafetySystems />} />
                  <Route path="/safety-systems/tricon-cx/" element={<SafetySystems />} />
                  <Route path="/control-systems/" element={<SafetySystems />} />
                  <Route path="/scada/" element={<SCADA />} />
                  <Route path="/power-supply-services/" element={<PowerSupplies />} />
                  <Route path="/paknet/" element={<PakNet />} />
                  <Route path="/contact-us/" element={<ContactUs />} />
                  <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
                  <Route path="/sitemap/" element={<Sitemap />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
            <aside className="w-full lg:w-[400px] bg-[#fdfdfd] p-6 sm:p-10 md:p-16 border-t lg:border-t-0 lg:border-l border-gray-100/80 relative">
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden lg:block" />
              <Sidebar />
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
