import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import fotoBanner1 from "../assets/foto_banner1.jpeg";

function Banner() {
  return (
    <section className="relative overflow-hidden bg-transparent pt-24 pb-32 md:pt-32 md:pb-40">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-100 rounded-bl-[100px] md:rounded-bl-[250px] opacity-40 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col space-y-8 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-orange-200 text-orange-800 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]">
              MATRÍCULAS 2027 ABERTAS
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl lg:text-[60px] font-black text-gray-900 font-comicNeue leading-[1.15]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            O futuro do seu filho começa com <span className="text-orange-500 relative whitespace-nowrap">
              amor
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,15 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> e educação.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed font-RobotoSlab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Um ambiente acolhedor onde brincar e aprender andam de mãos dadas, preparando nossas crianças para um mundo de possibilidades.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              to="/sobre"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-[0_6px_0_rgb(29,78,216)] active:shadow-[0_0px_0_rgb(29,78,216)] active:translate-y-1.5 flex justify-center items-center gap-2"
            >
              Conheça a Escola 🏫
            </Link>
            <Link 
              to="/noticias"
              className="bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-bold text-lg px-8 py-4 rounded-2xl transition-all hover:border-gray-300 flex justify-center items-center shadow-sm"
            >
              Últimas Notícias
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Featured Image */}
        <motion.div 
          className="relative order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
        >
          {/* Creative Image Mask */}
          <div className="relative z-20 aspect-square md:aspect-4/3 w-full max-w-lg mx-auto">
            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-6 transform transition-transform hover:rotate-12 duration-500 z-0"></div>
            <div className="absolute inset-0 bg-yellow-400 rounded-[3rem] -rotate-3 transform z-10"></div>
            <img 
              src={fotoBanner1} 
              alt="Crianças brincando na escola" 
              className="absolute inset-0 w-full h-full object-cover rounded-[3rem] z-20 shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {/* Floating Element 1 */}
          <motion.div 
            className="absolute -top-10 -right-5 z-30 bg-white p-4 rounded-2xl shadow-xl border-2 border-orange-100 flex items-center gap-3"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-xl">🎨</div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Aulas de</p>
              <p className="text-sm font-black text-gray-800">Artes e Cores</p>
            </div>
          </motion.div>

          {/* Floating Element 2 */}
          <motion.div 
            className="absolute -bottom-5 -left-10 z-30 bg-white p-4 rounded-2xl shadow-xl border-2 border-orange-100 flex items-center gap-3"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-xl">🏃</div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Espaço para</p>
              <p className="text-sm font-black text-gray-800">Recreação</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default Banner;