import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";

export default function Contact() {
  return (
    <div className="pt-20 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-dark mb-4">Contato</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Tem alguma dúvida ou sugestão? Entre em contato conosco. Estamos prontos para ajudar você a transformar sua carreira.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-black text-dark mb-8">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-dark">E-mail</p>
                    <p className="text-gray-500">contato@donutcursos.com.br</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-dark">Telefone</p>
                    <p className="text-gray-500">+55 (11) 9999-9999</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-dark">Endereço</p>
                    <p className="text-gray-500">Av. Paulista, 1000 - Bela Vista, São Paulo - SP</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-light rounded-3xl">
              <h4 className="text-xl font-black text-dark mb-4">Horário de Atendimento</h4>
              <p className="text-gray-600 text-sm">Segunda a Sexta: 09:00 às 18:00</p>
              <p className="text-gray-600 text-sm">Sábado: 09:00 às 13:00</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">Nome Completo</label>
                  <input 
                    type="text" 
                    placeholder="Seu nome"
                    className="w-full bg-light border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark">E-mail</label>
                  <input 
                    type="email" 
                    placeholder="seu@email.com"
                    className="w-full bg-light border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-dark">Assunto</label>
                <select className="w-full bg-light border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none">
                  <option>Dúvidas sobre Cursos</option>
                  <option>Suporte Técnico</option>
                  <option>Parcerias Corporativas</option>
                  <option>Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-dark">Mensagem</label>
                <textarea 
                  rows={5}
                  placeholder="Como podemos ajudar?"
                  className="w-full bg-light border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                />
              </div>
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                Enviar Mensagem <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
