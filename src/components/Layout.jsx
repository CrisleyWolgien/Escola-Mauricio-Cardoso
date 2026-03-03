import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { BookOpen, Paintbrush, Music, Star, Pencil, Palette, GraduationCap, Shapes } from "lucide-react";

function Layout() {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-transparent">
      
      {/* GLOBAL SCHOOL THEME BACKGROUND (Icons & Grid) */}
      <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#faf8f5]">
        {/* Pattern de pontinhos suaves */}
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)', backgroundSize: '35px 35px' }}></div>

        {/* Ícones Escolares Lúdicos Flutuantes */}
        <BookOpen className="absolute top-[10%] left-[8%] w-16 h-16 text-blue-400 opacity-60 animate-[bounce_8s_infinite] -rotate-12" strokeWidth={1.5} />
        
        <div className="absolute top-[25%] right-[10%] text-5xl font-black text-orange-400 font-ComicNeue opacity-50 rotate-12 animate-[spin_12s_linear_infinite]">
          ABC
        </div>

        <Paintbrush className="absolute top-[40%] left-[5%] w-12 h-12 text-pink-400 opacity-60 animate-[pulse_6s_infinite] rotate-45" strokeWidth={1.5} />
        
        <Star className="absolute top-[15%] right-[30%] w-14 h-14 text-yellow-400 fill-yellow-400 opacity-70 animate-[bounce_10s_infinite]" strokeWidth={1} />
        
        <div className="absolute top-[50%] left-[30%] text-6xl font-black text-emerald-400 font-ComicNeue opacity-50 -rotate-12 animate-[pulse_8s_infinite]">
          123
        </div>

        <Music className="absolute top-[60%] right-[15%] w-16 h-16 text-purple-400 opacity-60 animate-[bounce_7s_infinite] rotate-12" strokeWidth={1.5} />
        
        <Pencil className="absolute bottom-[20%] left-[10%] w-20 h-20 text-red-400 opacity-50 animate-[spin_15s_linear_infinite]" strokeWidth={1.5} />
        
        <Palette className="absolute bottom-[10%] right-[12%] w-14 h-14 text-cyan-400 opacity-60 animate-[bounce_9s_infinite] -rotate-45" strokeWidth={1.5} />
        
        <Shapes className="absolute bottom-[5%] left-[40%] w-12 h-12 text-orange-500 opacity-50 animate-[pulse_7s_infinite] rotate-90" strokeWidth={1.5} />
        
        <GraduationCap className="absolute top-[75%] left-[25%] w-16 h-16 text-blue-500 opacity-50 animate-[bounce_11s_infinite] -rotate-12" strokeWidth={1.5} />

        {/* Alguns círculos e estrelas pequenas para preencher */}
        <div className="absolute top-[30%] left-[55%] w-6 h-6 bg-yellow-400 rounded-full opacity-60 animate-[pulse_4s_infinite]"></div>
        <div className="absolute bottom-[35%] right-[40%] w-8 h-8 bg-pink-400 rounded-full opacity-50 animate-[bounce_6s_infinite]"></div>
      </div>

      <div className="relative z-20 flex flex-col min-h-screen">
        <Header />
        <main key={location.pathname} className="grow relative">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
