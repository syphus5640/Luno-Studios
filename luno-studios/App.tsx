
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Reviews } from './pages/Reviews';
import { AIReceptionist } from './pages/AIReceptionist';
import { WebDesign } from './pages/WebDesign';
import { Cancellation } from './pages/Cancellation';
import { BookingProvider } from './src/context/BookingContext';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <BookingProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/products/ai-receptionist" element={<AIReceptionist />} />
            <Route path="/products/web-design" element={<WebDesign />} />
            <Route path="/cancellation" element={<Cancellation />} />
            {/* Fallback redirect */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </HashRouter>
    </BookingProvider>
  );
};

export default App;
