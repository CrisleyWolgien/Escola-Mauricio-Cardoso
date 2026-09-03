import { motion } from "framer-motion";

function InternalPageHeader({ title, subtitle, colorClass = "bg-blue-600" }) {
  return (
    <div className={`relative ${colorClass} pt-24 pb-32 overflow-hidden`}>
      {/* Decorative background shapes - Playful Math/School elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-white rounded-full mix-blend-overlay filter blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full mix-blend-overlay filter blur-lg animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        {/* Floating playful shapes */}
        <motion.div 
          className="absolute top-12 left-1/4 text-white opacity-40 text-5xl"
          animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >★</motion.div>
        
        <motion.div 
          className="absolute bottom-24 right-1/4 text-white opacity-40 text-4xl"
          animate={{ y: [0, 20, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >●</motion.div>
        
        <motion.div 
          className="absolute top-20 right-1/3 text-white opacity-40 text-6xl font-bold"
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >+</motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold font-RobotoSlab text-white mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            className="text-xl md:text-2xl text-white font-comicNeue max-w-2xl mx-auto drop-shadow-md font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* SVG Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 rotate-180 flex items-end">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24 fill-[#f9fafb]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  );
}

export default InternalPageHeader;
