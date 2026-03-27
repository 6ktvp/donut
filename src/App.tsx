import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CoursesGrid from "./components/CoursesGrid";
import PricingPlans from "./components/PricingPlans";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import { Toaster } from "sonner";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import HelpCenter from "./pages/HelpCenter";
import { CartProvider } from "./contexts/CartContext";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function Home() {
  return (
    <>
      <Hero />
      <CoursesGrid />
      <PricingPlans />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Toaster position="top-right" richColors />
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/termos" element={<Terms />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/ajuda" element={<HelpCenter />} />
            </Routes>
          </main>
          <Footer />
          <AIAssistant />
        </div>
      </Router>
    </CartProvider>
  );
}
