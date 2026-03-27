import { Star, ArrowRight, Bookmark, BookmarkCheck, Loader2, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { auth, db } from "@/src/firebase";
import { doc, setDoc, deleteDoc, onSnapshot, collection } from "firebase/firestore";
import { useCart } from "@/src/contexts/CartContext";
import { toast } from "sonner";

const courses = [
  {
    id: "1",
    title: "Marketing Digital Avançado",
    description: "Domine as estratégias de marketing digital para alavancar seus resultados online.",
    price: 450.00,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    size: "small"
  },
  {
    id: "2",
    title: "Desenvolvimento Web Fullstack",
    description: "Aprenda do zero ao profissional as tecnologias mais requisitadas do mercado.",
    price: 1200.00,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    size: "small"
  },
  {
    id: "3",
    title: "Design de Experiência do Usuário (UX)",
    description: "Crie interfaces incríveis e focadas na melhor experiência para o usuário.",
    price: 780.00,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    size: "small"
  },
  {
    id: "4",
    title: "Liderança e Gestão de Equipes",
    description: "Desenvolva habilidades de liderança para gerir times de alta performance.",
    price: 590.00,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    size: "small"
  }
];

export default function CoursesGrid() {
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!auth.currentUser) {
      setSavedCourseIds([]);
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, `users/${auth.currentUser.uid}/savedCourses`),
      (snapshot) => {
        const ids = snapshot.docs.map(doc => doc.id);
        setSavedCourseIds(ids);
      }
    );

    return () => unsubscribe();
  }, [auth.currentUser]);

  const toggleSaveCourse = async (course: any) => {
    if (!auth.currentUser) {
      alert("Por favor, faça login para salvar cursos.");
      return;
    }

    const isSaved = savedCourseIds.includes(course.id.toString());
    setLoadingIds(prev => [...prev, course.id.toString()]);

    try {
      const courseRef = doc(db, `users/${auth.currentUser.uid}/savedCourses`, course.id.toString());
      if (isSaved) {
        await deleteDoc(courseRef);
      } else {
        await setDoc(courseRef, {
          userId: auth.currentUser.uid,
          courseId: course.id,
          courseTitle: course.title,
          savedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Error toggling save course:", error);
    } finally {
      setLoadingIds(prev => prev.filter(id => id !== course.id.toString()));
    }
  };

  return (
    <section id="cursos" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-dark mb-4">Cursos Donut</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8">
            Explore nossa seleção de cursos premium projetados para impulsionar sua carreira e expandir seus horizontes profissionais.
          </p>
          <button className="btn-outline-primary">
            Conheça Todos os Cursos
          </button>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Large Card (Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 flex flex-col"
          >
            <div className="relative h-64 lg:h-80">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Main Course" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-primary text-white font-bold px-3 py-1 rounded-full text-sm">
                R$ 890,00
              </div>
              <button 
                onClick={() => toggleSaveCourse({ id: "0", title: "Gestão Estratégica de Negócios 4.0" })}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-primary hover:bg-white transition-all shadow-lg"
              >
                {loadingIds.includes("0") ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : savedCourseIds.includes("0") ? (
                  <BookmarkCheck className="w-5 h-5 fill-primary" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500 ml-2">4.9 (120 avaliações)</span>
              </div>
              <h3 className="text-2xl font-black text-dark mb-4 leading-tight">
                Gestão Estratégica de Negócios 4.0
              </h3>
              <p className="text-gray-600 mb-8 flex-1">
                Domine as ferramentas e estratégias necessárias para liderar negócios na era digital. Um curso completo com certificação internacional.
              </p>
              <button 
                onClick={() => {
                  addToCart({ 
                    id: "0", 
                    title: "Gestão Estratégica de Negócios 4.0", 
                    description: "Domine as ferramentas e estratégias necessárias para liderar negócios na era digital.",
                    price: 890.00, 
                    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  });
                  toast.success("Curso adicionado ao carrinho!");
                }}
                className="btn-primary w-full flex justify-center items-center gap-2"
              >
                Adicionar ao Carrinho <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* 2x2 Grid (Right) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative group"
              >
                <button 
                  onClick={() => toggleSaveCourse(course)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-primary opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  {loadingIds.includes(course.id.toString()) ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : savedCourseIds.includes(course.id.toString()) ? (
                    <BookmarkCheck className="w-4 h-4 fill-primary" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
                <div className="h-40 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-lg font-black text-dark mb-2 leading-tight">
                    {course.title}
                  </h4>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-xl font-black text-primary">R$ {course.price.toFixed(2)}</p>
                    <button 
                      onClick={() => {
                        addToCart({ 
                          id: course.id, 
                          title: course.title, 
                          description: course.description,
                          price: course.price, 
                          image: course.image 
                        });
                        toast.success(`${course.title} adicionado ao carrinho!`);
                      }}
                      className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
                    >
                      <ShoppingCart className="w-4 h-4" /> Carrinho
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
