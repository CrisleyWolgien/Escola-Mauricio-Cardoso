import { useState } from "react";
import { Menu, X, BookOpen, Newspaper, CalendarDays, Gamepad2, Camera, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Sobre Nós", path: "/sobre", icon: <BookOpen className="w-5 h-5" />, color: "hover:bg-orange-100 hover:text-orange-600", activeTheme: "bg-orange-100 text-orange-600 border-b-4 border-orange-500" },
    { name: "Notícias", path: "/noticias", icon: <Newspaper className="w-5 h-5" />, color: "hover:bg-purple-100 hover:text-purple-600", activeTheme: "bg-purple-100 text-purple-600 border-b-4 border-purple-500" },
    { name: "Projetos", path: "/posts", icon: <Sparkles className="w-5 h-5" />, color: "hover:bg-violet-100 hover:text-violet-600", activeTheme: "bg-violet-100 text-violet-600 border-b-4 border-violet-500" },
    { name: "Calendário", path: "/calendario", icon: <CalendarDays className="w-5 h-5" />, color: "hover:bg-emerald-100 hover:text-emerald-600", activeTheme: "bg-emerald-100 text-emerald-600 border-b-4 border-emerald-500" },
    { name: "Jogos", path: "/jogos", icon: <Gamepad2 className="w-5 h-5" />, color: "hover:bg-blue-100 hover:text-blue-600", activeTheme: "bg-blue-100 text-blue-600 border-b-4 border-blue-500" },
    { name: "Galeria", path: "/momentos", icon: <Camera className="w-5 h-5" />, color: "hover:bg-pink-100 hover:text-pink-600", activeTheme: "bg-pink-100 text-pink-600 border-b-4 border-pink-500" },
  ];

  return (
    <header className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] w-full z-50 sticky top-0 border-b-[6px] border-b-yellow-400">
      <div className="flex justify-between items-center py-3 px-5 lg:px-8 w-full max-w-7xl mx-auto">
        
        {/* Nome da escola - ESQUERDA */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ rotate: [0, -15, 15, -15, 15, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="bg-linear-to-br from-blue-400 to-blue-600 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 shrink-0"
          >
            <span className="text-2xl md:text-3xl">🎒</span>
          </motion.div>
          <div className="flex flex-col justify-center ml-1">
            <span className="w-fit rounded-full bg-emerald-500 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.12em] text-white shadow-sm md:text-[10px]">
              Escola Municipal de Ensino Fundamental
            </span>
            <span className="text-2xl md:text-[32px] font-black font-comicNeue flex items-center gap-2 mt-0.5 group-hover:scale-105 transition-transform origin-left drop-shadow-sm">
              <span className="text-blue-600">Maurício</span>
              <span className="text-orange-500">Cardoso</span>
            </span>
          </div>
        </Link>

        {/* Menu Desktop - DIREITA */}
        <ul className="hidden lg:flex flex-row text-[18px] items-center font-bold font-comicNeue gap-2 ml-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300
                    ${isActive ? link.activeTheme : `text-gray-600 ${link.color} border-b-4 border-transparent`}
                  `}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {link.icon}
                  </motion.div>
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Botão Mobile - DIREITA */}
        <button
          className="lg:hidden text-gray-800 focus:outline-none ml-auto p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div whileTap={{ scale: 0.9 }}>
            {isOpen ? <X size={28} className="text-red-500" /> : <Menu size={28} className="text-blue-600" />}
          </motion.div>
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-white shadow-2xl border-t-2 border-gray-100 flex flex-col font-comicNeue text-xl z-50 overflow-hidden absolute top-full left-0 origin-top"
          >
            <div className="flex flex-col p-4 space-y-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className={`
                      flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold border-b-4 
                      ${isActive ? link.activeTheme : "text-gray-600 hover:bg-gray-50 border-transparent"}
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`p-2 rounded-xl shadow-sm ${isActive ? 'bg-white/50 text-current' : 'bg-white text-gray-400 border border-gray-100'}`}>
                      {link.icon}
                    </div>
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
