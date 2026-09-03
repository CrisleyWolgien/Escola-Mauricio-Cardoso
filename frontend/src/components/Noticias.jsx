import { Calendar, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicApi } from "../lib/api";

function Noticias() {
  const [newsList, setNewsList] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const controller = new AbortController();
    publicApi.announcements({ signal: controller.signal })
      .then(setNewsList)
      .catch((error) => { if (error.name !== "AbortError") setStatus("error"); })
      .finally(() => setStatus((current) => current === "error" ? current : "ready"));
    return () => controller.abort();
  }, []);

  return (
    <div className="flex flex-col grow w-full">
      <div className="flex justify-between items-end mb-8 border-b-2 border-gray-100 pb-4">
        <div>
          <h2 className="text-3xl font-bold font-RobotoSlab text-gray-800 mb-2">Últimas Atualizações</h2>
          <p className="text-lg text-gray-500 font-comicNeue">Confira o que está rolando nos corredores da EMEF Mauricio Cardoso.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsList.map((item, index) => (
          <motion.div 
            key={item.id} 
            className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: index * 0.15 }}
          >
            {/* Imagem de Capa */}
            <Link to={`/noticias/${item.id}`} className="flex h-full flex-col" aria-label={`Ler notícia: ${item.title}`}>
              <div className="w-full h-48 overflow-hidden relative bg-blue-100">
                <img
                  src={item.cover_image_url || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop"}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                <span className="absolute bottom-4 left-4 rounded-full bg-blue-100 px-4 py-1 text-sm font-bold tracking-wide text-blue-800 shadow-md">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex flex-col grow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center text-gray-400 text-sm font-bold uppercase tracking-wider">
                  <Calendar className="w-4 h-4 mr-2" />
                  {item.published_at ? new Date(item.published_at).toLocaleDateString("pt-BR") : "Em breve"}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-comicNeue line-clamp-3">
                {item.summary || item.content}
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-blue-600 font-bold group-hover:text-blue-800">
                Ler Notícia Completa
                <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-2" />
              </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      {status === "loading" && <p className="mt-8 text-center font-bold text-gray-500">Carregando avisos...</p>}
      {status === "error" && <p className="mt-8 text-center font-bold text-rose-600">Não foi possível carregar os avisos agora.</p>}
      {status === "ready" && !newsList.length && <p className="mt-8 text-center font-bold text-gray-500">Ainda não há avisos publicados.</p>}
    </div>
  );
}

export default Noticias;
