import { useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md relative w-full z-50">
      <div className="flex flex-row justify-between items-center p-3 px-5 max-w-7xl mx-auto">
        
        {/* Título Responsivo */}
        <h1 className="text-2xl md:text-[35px] font-bold items-center font-comicNeue">
          EMEF MAURICIO CARDOSO
        </h1>

        {/* Menu Desktop (Escondido em Mobile) */}
        <ul className="hidden md:flex flex-row text-[22px] items-center font-comicNeue gap-6">
          <li className="cursor-pointer hover:text-blue-600 transition">Sobre Nós</li>
          <li className="cursor-pointer hover:text-blue-600 transition">Notícias</li>
          <li className="cursor-pointer hover:text-blue-600 transition">Calendário</li>
          <li className="cursor-pointer hover:text-blue-600 transition">Área dos Pais</li>
          <li className="cursor-pointer hover:text-blue-600 transition">Contato</li>
        </ul>

        {/* Botão Mobile */}
        <button 
          className="md:hidden text-gray-800 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col items-center py-5 space-y-4 font-comicNeue text-xl z-50">
          <span className="cursor-pointer hover:text-blue-600 w-full text-center py-2" onClick={() => setIsOpen(false)}>Sobre Nós</span>
          <span className="cursor-pointer hover:text-blue-600 w-full text-center py-2" onClick={() => setIsOpen(false)}>Notícias</span>
          <span className="cursor-pointer hover:text-blue-600 w-full text-center py-2" onClick={() => setIsOpen(false)}>Calendário</span>
          <span className="cursor-pointer hover:text-blue-600 w-full text-center py-2" onClick={() => setIsOpen(false)}>Área dos Pais</span>
          <span className="cursor-pointer hover:text-blue-600 w-full text-center py-2" onClick={() => setIsOpen(false)}>Contato</span>
        </div>
      )}
    </header>
  );
}

export default Header;