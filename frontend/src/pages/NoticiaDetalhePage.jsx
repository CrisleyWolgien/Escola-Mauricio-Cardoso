import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InternalPageHeader from "../components/InternalPageHeader";
import { publicApi } from "../lib/api";

function NoticiaDetalhePage() {
  const { announcementId } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    publicApi.announcement(announcementId, { signal: controller.signal })
      .then(setAnnouncement)
      .then(() => setState("ready"))
      .catch((error) => {
        if (error.name !== "AbortError") setState(error.status === 404 ? "missing" : "error");
      });
    return () => controller.abort();
  }, [announcementId]);

  const date = announcement?.published_at
    ? new Date(announcement.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <InternalPageHeader title="Mural de Notícias" subtitle="Informações e comunicados para a nossa comunidade escolar." colorClass="bg-gradient-to-r from-purple-500 to-fuchsia-600" />
      <main className="relative z-10 mx-auto -mt-10 max-w-4xl px-4 pb-20 md:px-8">
        <article className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
          {state === "loading" && <p className="p-10 text-center font-bold text-gray-500">Carregando notícia...</p>}
          {state === "missing" && <p className="p-10 text-center font-bold text-gray-600">Esta notícia não está mais disponível.</p>}
          {state === "error" && <p className="p-10 text-center font-bold text-rose-600">Não foi possível carregar esta notícia agora.</p>}
          {announcement && <>
            {announcement.cover_image_url && <img src={announcement.cover_image_url} alt="" className="h-64 w-full object-cover md:h-96" />}
            <div className="p-7 md:p-12">
              <Link to="/noticias" className="inline-flex items-center gap-2 text-sm font-bold text-purple-700 hover:underline"><ArrowLeft size={16} /> Todas as notícias</Link>
              <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold text-gray-500"><span className="inline-flex items-center gap-1.5"><Tag size={16} className="text-purple-600" />{announcement.category}</span>{date && <span className="inline-flex items-center gap-1.5"><CalendarDays size={16} className="text-purple-600" />{date}</span>}</div>
              <h1 className="mt-5 font-RobotoSlab text-3xl font-black leading-tight text-gray-900 md:text-5xl">{announcement.title}</h1>
              <div className="mt-8 whitespace-pre-wrap font-comicNeue text-lg leading-relaxed text-gray-700">{announcement.content}</div>
            </div>
          </>}
        </article>
      </main>
    </div>
  );
}

export default NoticiaDetalhePage;
