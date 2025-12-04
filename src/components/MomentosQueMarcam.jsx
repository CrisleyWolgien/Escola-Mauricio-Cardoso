import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function ImageCard({ src, alt = "", className = "", onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={() => onClick(src)}
      className={`relative flex items-center justify-center bg-white/60 rounded-xl overflow-hidden cursor-pointer ${className}`}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-xl" />
      )}

      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`object-contain bg-white border-4 border-white rounded-lg shadow-md p-1 max-w-[75%] max-h-[95%] hover:scale-110 transition ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        initial={{
          opacity: 0,
          y: 10,
          scale: 0.9,
          rotate: -2 + Math.random() * 4,
        }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-40px" }}
      />
    </div>
  );
}

function MomentosQueMarcam() {
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

  return (
    <section className="bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(254,248,231,0.85)_51%)] pt-16 pb-15">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 font-RobotoSlab text-center px-10 pb-14">
          Momentos que Marcam
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 md:px-24 auto-rows-[300px] md:auto-rows-[350px]">
        {images.map((url, i) => (
          <ImageCard key={i} src={url} alt="" onClick={setSelected} />
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <button className="bg-[#4131e9] text-white text-lg font-bold uppercase rounded-full shadow-md px-6 py-3 hover:scale-105 transition hover:bg-[#3529c5]">
          Ver Galeria Completa
        </button>
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
              className="absolute top-6 right-6 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
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
