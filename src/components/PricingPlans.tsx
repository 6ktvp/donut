import { Check } from "lucide-react";
import { motion } from "motion/react";

const plans = [
  {
    name: "Tudo Online",
    price: "100% Grátis",
    description: "Ideal para quem está começando sua jornada de aprendizado.",
    features: ["Acesso a cursos gratuitos", "Comunidade de alunos", "Certificado digital simples"],
    buttonText: "Matrícula",
    buttonClass: "bg-gray-200 text-dark hover:bg-gray-300",
    recommended: false
  },
  {
    name: "Profissional",
    price: "R$ 550,00",
    period: "/mês",
    description: "A escolha perfeita para profissionais que buscam especialização.",
    features: ["Acesso ilimitado a todos os cursos", "Mentoria mensal em grupo", "Certificados reconhecidos", "Material de apoio exclusivo"],
    buttonText: "Assinar Agora",
    buttonClass: "bg-primary text-white hover:bg-primary/90",
    recommended: true
  },
  {
    name: "Matrícula grátis",
    price: "R$ 1.299,00",
    period: "/trimestre",
    description: "Para empresas e equipes que buscam resultados em escala.",
    features: ["Tudo do plano Profissional", "Suporte prioritário 24/7", "Acesso a workshops ao vivo", "Dashboard de progresso"],
    buttonText: "Assinar Agora",
    buttonClass: "bg-primary text-white hover:bg-primary/90",
    recommended: false
  }
];

export default function PricingPlans() {
  return (
    <section id="planos" className="py-24 bg-dark text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Amplie seus Conhecimentos</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta aos seus objetivos e comece a transformar seu futuro hoje mesmo.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white text-dark rounded-3xl p-10 flex flex-col shadow-2xl ${plan.recommended ? 'ring-4 ring-primary' : ''}`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest">
                  Recomendado
                </div>
              )}
              <h3 className="text-xl font-black mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">{plan.price}</span>
                {plan.period && <span className="text-gray-500 font-bold">{plan.period}</span>}
              </div>
              <p className="text-gray-500 text-sm mb-8 flex-1">
                {plan.description}
              </p>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-black transition-all duration-300 ${plan.buttonClass}`}>
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
