import { AnimatePresence, motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicApi } from "../lib/api";

const colors = ["bg-rose-100", "bg-sky-100", "bg-amber-100", "bg-emerald-100", "bg-fuchsia-100", "bg-blue-100", "bg-orange-100", "bg-teal-100"];

function MomentosQueMarcam({ hideTitle = false, hideButton = false }) {
  const [photos, setPhotos] = useState([]);
  const [state, setState] = useState("loading");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadGallery() {
      try {
        const albums = await publicApi.albums({ signal: controller.signal });
        const photoGroups = await Promise.all(albums.map(async (album) => {
          const albumPhotos = await publicApi.photos(album.id, { signal: controller.signal });
          return albumPhotos.map((photo) => ({ ...photo, albumTitle: album.title }));
        }));
        setPhotos(photoGroups.flat().sort((a, b) => a.display_order - b.display_order));
        setState("ready");
      } catch (error) {
        if (error.name !== "AbortError") setState("error");
      }
    }
    loadGallery();
    return () => controller.abort();
  }, []);

  return (
    <section className={hideTitle ? "pb-15 pt-8" : "bg-transparent py-12 md:py-24"}>
      <div className="mx-auto max-w-7xl rounded-[3rem] border-4 border-rose-200 bg-rose-100/80 px-4 py-12 shadow-xl backdrop-blur-sm md:px-8">
        {!hideTitle && <h1 className="px-10 pb-14 text-center font-RobotoSlab text-3xl font-bold text-gray-900 md:text-5xl">Momentos que Marcam</h1>}

        {state === "loading" && <p className="py-14 text-center font-bold text-gray-500">Carregando a galeria...</p>}
        {state === "error" && <p className="py-14 text-center font-bold text-rose-700">Não foi possível carregar a galeria agora.</p>}
        {state === "ready" && !photos.length && <div className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border-2 border-dashed border-rose-300 bg-white/70 px-6 py-12 text-center"><Camera className="mb-3 text-rose-500" size={32} /><p className="font-RobotoSlab text-xl font-black text-gray-800">Novos momentos em breve</p><p className="mt-2 text-sm text-gray-600">A direção publicará aqui os registros das atividades da escola.</p></div>}
        {!!photos.length && <div className="grid auto-rows-[220px] grid-cols-2 gap-4 px-1 md:auto-rows-[320px] md:grid-cols-4 md:gap-6 md:px-8">
          {photos.map((photo, index) => <motion.button key={photo.id} type="button" onClick={() => setSelected(photo)} className={`group relative overflow-hidden rounded-2xl p-2 text-left shadow-sm ${colors[index % colors.length]}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.06, 0.5) }}>
            <img src={photo.image_url} alt={photo.caption || `Foto do álbum ${photo.albumTitle}`} loading="lazy" className="h-full w-full rounded-xl border-4 border-white object-cover shadow-md transition duration-500 group-hover:scale-105" />
            {(photo.caption || photo.albumTitle) && <span className="absolute inset-x-2 bottom-2 rounded-b-xl bg-slate-900/70 px-3 py-2 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100">{photo.caption || photo.albumTitle}</span>}
          </motion.button>)}
        </div>}

        {!hideButton && <div className="mt-16 flex justify-center"><Link to="/momentos" className="cursor-pointer rounded-full bg-[#4131e9] px-6 py-3 text-lg font-bold uppercase text-white shadow-md transition hover:scale-105 hover:bg-[#3529c5]">Ver Galeria Completa</Link></div>}
      </div>

      <AnimatePresence>{selected && <motion.div onClick={() => setSelected(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.figure className="relative max-h-[90vh] max-w-[90vw]" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(event) => event.stopPropagation()}><img src={selected.image_url} alt={selected.caption || `Foto do álbum ${selected.albumTitle}`} className="max-h-[82vh] rounded-xl border-8 border-white bg-white shadow-xl" />{selected.caption && <figcaption className="mt-3 rounded-xl bg-white px-4 py-2 text-center font-bold text-gray-700">{selected.caption}</figcaption>}</motion.figure><button onClick={() => setSelected(null)} className="absolute right-6 top-6 rounded-full bg-white p-2 shadow-lg transition hover:scale-110" aria-label="Fechar foto">✕</button></motion.div>}</AnimatePresence>
    </section>
  );
}

export default MomentosQueMarcam;
