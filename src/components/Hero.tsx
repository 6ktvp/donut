import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    title: "Cursos & Treinamentos",
    subtitle: "Transforme sua carreira com os melhores cursos online e treinamentos corporativos do mercado. Aprenda com especialistas.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    featured: {
      title: "Gestão Estratégica de Negócios 4.0",
      price: "R$ 890,00",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    id: 2,
    title: "Marketing Digital 360",
    subtitle: "Domine as ferramentas mais modernas de marketing e impulsione suas vendas com estratégias validadas.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    featured: {
      title: "Marketing Digital Avançado",
      price: "R$ 450,00",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  },
  {
    id: 3,
    title: "Liderança de Alta Performance",
    subtitle: "Desenvolva habilidades de liderança para guiar equipes ao sucesso em ambientes dinâmicos e desafiadores.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    featured: {
      title: "Liderança e Gestão de Equipes",
      price: "R$ 590,00",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[600px] bg-dark overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-[10000ms] scale-110"
            style={{ backgroundImage: `url("${banners[currentIndex].image}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent" />

          <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-start space-y-6"
              >
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                  {banners[currentIndex].title.split(' & ').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && <><br /><span className="text-primary">& </span></>}
                    </span>
                  ))}
                </h1>
                <p className="text-xl text-gray-200 max-w-lg font-medium">
                  {banners[currentIndex].subtitle}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => scrollToSection('cursos')}
                    className="btn-primary flex items-center gap-2"
                  >
                    Nossos cursos <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => scrollToSection('planos')}
                    className="btn-outline"
                  >
                    Nossos planos →
                  </button>
                </div>
              </motion.div>

              {/* Right Content - Featured Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hidden lg:flex justify-end"
              >
                <div className="glass-card w-[380px] rounded-2xl overflow-hidden p-6 relative group">
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    DESTAQUE
                  </div>
                  <img 
                    src={banners[currentIndex].featured.image} 
                    alt="Course Thumbnail" 
                    className="w-full h-48 object-cover rounded-xl mb-4"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">(4.9/5.0)</span>
                  </div>
                  <h3 className="text-xl font-black text-dark mb-2 leading-tight">
                    {banners[currentIndex].featured.title}
                  </h3>
                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Investimento</p>
                      <p className="text-2xl font-black text-dark">{banners[currentIndex].featured.price}</p>
                    </div>
                    <button 
                      onClick={() => scrollToSection('cursos')}
                      className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors"
                    >
                      Mais detalhes
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary w-8' : 'bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
