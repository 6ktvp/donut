import { motion } from "motion/react";
import { Users, Target, Rocket, Award } from "lucide-react";

const stats = [
  { icon: Users, label: "Alunos Ativos", value: "50k+" },
  { icon: Target, label: "Cursos Disponíveis", value: "200+" },
  { icon: Rocket, label: "Treinamentos", value: "150+" },
  { icon: Award, label: "Certificados", value: "100k+" }
];

export default function About() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl font-black text-dark tracking-tighter mb-8 leading-tight">
              Transformando o futuro através da <span className="text-primary">Educação Digital</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              A Donut Cursos & Treinamentos nasceu com a missão de democratizar o acesso ao conhecimento de alta qualidade. Acreditamos que a educação é a ferramenta mais poderosa para transformar carreiras e empresas.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nossa plataforma oferece uma experiência de aprendizado única, focada em resultados práticos e no desenvolvimento de habilidades reais exigidas pelo mercado de trabalho atual.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/about/1200/800" 
                alt="Donut Team" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-primary text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <span className="text-4xl font-black block mb-1">10+</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80">Anos de Experiência</span>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-light p-8 rounded-2xl text-center hover:bg-primary/5 transition-colors"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <span className="text-3xl font-black text-dark block mb-2 tracking-tighter">{stat.value}</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Mission/Vision/Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-dark tracking-tighter">Nossa Missão</h3>
            <p className="text-gray-600 leading-relaxed">
              Capacitar profissionais e empresas através de treinamentos inovadores e acessíveis, impulsionando o crescimento econômico e social.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-dark tracking-tighter">Nossa Visão</h3>
            <p className="text-gray-600 leading-relaxed">
              Ser a maior e mais respeitada plataforma de educação corporativa e treinamentos online da América Latina até 2030.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-dark tracking-tighter">Nossos Valores</h3>
            <p className="text-gray-600 leading-relaxed">
              Inovação constante, foco no aluno, transparência, excelência pedagógica e compromisso com resultados reais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
