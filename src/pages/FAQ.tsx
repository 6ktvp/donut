import { motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Como funcionam os cursos da Donut?",
    answer: "Nossos cursos são 100% online, com videoaulas gravadas, materiais de apoio em PDF e exercícios práticos. Você pode assistir no seu ritmo, de qualquer dispositivo."
  },
  {
    question: "Recebo certificado ao concluir um curso?",
    answer: "Sim! Todos os nossos cursos e treinamentos oferecem certificado de conclusão digital, que pode ser compartilhado no LinkedIn ou impresso."
  },
  {
    question: "Quais são as formas de pagamento?",
    answer: "Aceitamos cartões de crédito (com parcelamento em até 12x), boleto bancário e PIX. O acesso é liberado imediatamente após a confirmação do pagamento."
  },
  {
    question: "Posso cancelar minha assinatura?",
    answer: "Sim, você pode cancelar sua assinatura a qualquer momento através do seu painel de controle. O acesso continuará ativo até o final do período já pago."
  },
  {
    question: "Como funciona o suporte aos alunos?",
    answer: "Oferecemos suporte técnico e pedagógico através do nosso fórum exclusivo para alunos e também via e-mail. Nossa equipe responde em até 24 horas úteis."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-32 pb-24 bg-light min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-black text-dark mb-4 tracking-tighter">FAQ</h1>
          <p className="text-gray-600">Tire suas dúvidas sobre a Donut Cursos & Treinamentos.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-dark">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-gray-600 border-t border-gray-50 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
