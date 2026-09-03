import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

function ImageCard({ src, alt = "", className = "", onClick, hideTitle = false, bgColor = "bg-white", borderColor = "border-white" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={() => onClick(src)}
      className={`relative flex items-center justify-center ${bgColor} rounded-xl overflow-hidden cursor-pointer p-2 shadow-sm ${className}`}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-xl" />
      )}

      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`object-contain max-w-full max-h-full ${bgColor} border-4 ${borderColor} rounded-lg shadow-md transition hover:scale-110 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        
        initial={{
          opacity: 0,
          y: 10,
          scale: 0.9,
          rotate: -2 + Math.random() * 4,
        }}
        animate={hideTitle ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : undefined}
        whileInView={!hideTitle ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : undefined}
        viewport={!hideTitle ? { once: true } : undefined}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

function MomentosQueMarcam({ hideTitle = false, hideButton = false }) {
  const [selected, setSelected] = useState(null);

  const images = [
    "https://ik.imagekit.io/1yjzzwotx/imagens%20mauricio%20cardoso/582982793_18064857650612931_1764061231946257377_n.webp?updatedAt=1764287850717",
    "https://ik.imagekit.io/1yjzzwotx/imagens%20mauricio%20cardoso/545339242_18056995961612931_965341656926113052_n.webp?updatedAt=1764287850729",
    "https://ik.imagekit.io/1yjzzwotx/imagens%20mauricio%20cardoso/584605858_18066132692612931_6675804905653516036_n.webp?updatedAt=1764287850654",
    "https://ik.imagekit.io/1yjzzwotx/imagens%20mauricio%20cardoso/469602468_3769929546590708_2801713821292167757_n.webp?updatedAt=1764287850725",
    "https://ik.imagekit.io/1yjzzwotx/imagens%20mauricio%20cardoso/553322410_18059030879612931_7897978615929521253_n.webp?updatedAt=1764287850735",
    "https://ik.imagekit.io/1yjzzwotx/imagens%20mauricio%20cardoso/448030498_1494264274841217_3116567116514852801_n.webp?updatedAt=1764287850459",
    "https://ik.imagekit.io/1yjzzwotx/imagens%20mauricio%20cardoso/569314222_18062935364612931_3969127523933513214_n.webp?updatedAt=1764287849843",
    "https://ik.imagekit.io/1yjzzwotx/imagens%20mauricio%20cardoso/464885531_1219857309067153_2193158575551950147_n.webp?updatedAt=1764288894678",
  ];

  const bgClasses = ["bg-rose-100", "bg-sky-100", "bg-amber-100", "bg-emerald-100", "bg-fuchsia-100", "bg-blue-100", "bg-orange-100", "bg-teal-100"];
  const borderClasses = ["border-rose-300", "border-sky-300", "border-amber-300", "border-emerald-300", "border-fuchsia-300", "border-blue-300", "border-orange-300", "border-teal-300"];

  return (
    <section className={hideTitle ? "pb-15 pt-8" : "bg-transparent py-12 md:py-24"}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 bg-rose-100/80 border-4 border-rose-200 backdrop-blur-sm rounded-[3rem] shadow-xl">
        {!hideTitle && (
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 font-RobotoSlab text-center px-10 pb-14">
              Momentos que Marcam
            </h1>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-12 auto-rows-[250px] md:auto-rows-[350px]">
          {images.map((url, i) => (
            <ImageCard 
              key={i} 
              src={url} 
              alt="" 
              onClick={setSelected} 
              hideTitle={hideTitle} 
              bgColor={bgClasses[i % bgClasses.length]}
              borderColor={borderClasses[i % borderClasses.length]}
            />
          ))}
        </div>

        {!hideButton && (
          <div className="flex justify-center mt-16">
            <Link 
              to="/momentos"
              className="bg-[#4131e9] text-white text-lg font-bold uppercase rounded-full shadow-md px-6 py-3 hover:scale-105 transition hover:bg-[#3529c5] cursor-pointer"
            >
              Ver Galeria Completa
            </Link>
          </div>
        )}
      </div>

      {/* MODAL ZOOM */}
      <AnimatePresence>
        {selected && (
          <motion.div
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selected}
              alt=""
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-xl border-8 border-white bg-white"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ type: "spring", stiffness: 220, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MomentosQueMarcam;