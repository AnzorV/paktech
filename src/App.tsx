import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import SafetySystems from './pages/SafetySystems';
import SCADA from './pages/SCADA';
import PowerSupplies from './pages/PowerSupplies';
import PakNet from './pages/PakNet';
import ContactUs from './pages/ContactUs';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

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
        <main className="w-full py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col lg:flex-row w-full min-h-[600px]">
            <div className="flex-1 p-4 sm:p-6 md:p-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/safety-systems" element={<SafetySystems />} />
                <Route path="/safety-systems/cs300" element={<SafetySystems />} />
                <Route path="/safety-systems/sc300e" element={<SafetySystems />} />
                <Route path="/safety-systems/tricon-cx" element={<SafetySystems />} />
                <Route path="/control-systems" element={<SafetySystems />} />
                <Route path="/scada" element={<SCADA />} />
                <Route path="/power-supply-services" element={<PowerSupplies />} />
                <Route path="/paknet" element={<PakNet />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <aside className="w-full lg:w-80 bg-gray-50 p-4 sm:p-6 md:p-10 border-t lg:border-t-0 lg:border-l border-gray-100">
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
