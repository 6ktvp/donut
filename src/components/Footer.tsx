import { Youtube, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <Link to="/" className="flex flex-col items-start">
            <span className="text-4xl font-black text-primary tracking-tighter mb-2">DONUT</span>
            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-6">Cursos & Treinamentos</span>
            <p className="text-gray-400 text-sm leading-relaxed">
              A Donut é a plataforma líder em educação corporativa e treinamentos online no Brasil. Transformamos carreiras e empresas através do conhecimento.
            </p>
          </Link>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><Link to="/sobre" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link to="/#cursos" className="hover:text-primary transition-colors">Nossos Cursos</Link></li>
              <li><Link to="/#planos" className="hover:text-primary transition-colors">Planos e Preços</Link></li>
              <li><Link to="/contato" className="hover:text-primary transition-colors">Trabalhe Conosco</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-black mb-6">Suporte</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><Link to="/ajuda" className="hover:text-primary transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/termos" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
              <li><Link to="/termos" className="hover:text-primary transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-black mb-6">Contato</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>contato@donutcursos.com.br</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+55 (11) 9999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-medium">
            © 2026 Donut Cursos & Treinamentos. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
