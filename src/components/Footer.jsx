import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin, School } from "lucide-react";

function FooterEscolar() {
  return (
    <footer className="w-full bg-[#0a1a2f] text-gray-200 py-6 px-4 mt-12 font-Poppins border-t-4 border-amber-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Esquerda: Logo e Slogan */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 text-white font-bold text-xl font-RobotoSlab tracking-wide">
            <School size={24} className="text-amber-300" />
            <span>Escola Maurício Cardoso</span>
          </div>
          <p className="text-xs text-gray-400 mt-1 italic">
            Educação com carinho, responsabilidade e criatividade 📚
          </p>
        </div>

        {/* Centro: Links Compactos */}
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium">
          {[
            { name: "Página Inicial", path: "/" },
            { name: "Sobre", path: "/sobre" },
            { name: "Notícias", path: "/noticias" },
            { name: "Momentos", path: "/momentos" },
            { name: "Calendário", path: "/calendario" },
            { name: "Jogos", path: "/jogos" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => window.scrollTo(0, 0)}
              className="text-gray-300 hover:text-amber-300 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Direita: Redes Sociais */}
        <div className="flex gap-3">
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
            <Facebook size={20} />
          </a>
        </div>
      </div>

      {/* Divisória e Infos Finais em Linha Única */}
      <div className="mt-6 pt-4 border-t border-white/10 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4 md:gap-3">
        
        {/* Infos de Contato Lineares */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 w-full md:w-auto text-center">
          <span className="flex items-center justify-center gap-1.5"><MapPin size={14}/> Rua Exemplo, 1234 - Centro</span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center justify-center gap-1.5"><Phone size={14}/> (55) 99999-9999</span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center justify-center gap-1.5"><Mail size={14}/> contato@escola.com</span>
        </div>

        {/* Créditos */}
        <div className="flex flex-col md:flex-row items-center text-center gap-1 md:gap-2">
          <span>© {new Date().getFullYear()} Todos os direitos reservados.</span>
          <span className="hidden md:inline">-</span>
          <span>
            Feito por{" "}
            <a href="https://astrum-craftfly.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white font-medium">
              Astrum Craftfly
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default FooterEscolar;
