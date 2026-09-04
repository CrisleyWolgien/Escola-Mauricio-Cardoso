import { ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicApi } from "../lib/api";

const fallbackImage = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop";

export default function PostsRecentes() {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    publicApi.announcements({ signal: controller.signal })
      .then((items) => { setPosts(items.slice(0, 6)); setState("ready"); })
      .catch((error) => { if (error.name !== "AbortError") setState("error"); });
    return () => controller.abort();
  }, []);

  return <section className="py-12 md:py-20"><div className="mx-auto max-w-7xl px-4 md:px-8"><div className="rounded-[2.75rem] border-4 border-violet-200 bg-violet-50/80 p-5 shadow-xl backdrop-blur-sm md:p-10"><header className="flex flex-col gap-4 border-b-2 border-violet-200 pb-7 md:flex-row md:items-end md:justify-between"><div><span className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-white"><BookOpen size={15} /> Blog da escola</span><h2 className="mt-4 font-RobotoSlab text-3xl font-black text-slate-900 md:text-5xl">Posts recentes</h2><p className="mt-2 max-w-2xl font-comicNeue text-lg text-slate-600">Notícias, projetos e histórias que acontecem na nossa comunidade.</p></div><Link to="/noticias" className="inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-black text-violet-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow md:self-auto">Ver todas as publicações <ArrowRight size={16} /></Link></header>{state === "loading" && <p className="py-14 text-center font-bold text-slate-500">Carregando publicações...</p>}{state === "error" && <p className="py-14 text-center font-bold text-rose-700">Não foi possível carregar as publicações agora.</p>}{state === "ready" && !posts.length && <p className="mt-7 rounded-3xl border-2 border-dashed border-violet-300 bg-white/70 px-6 py-12 text-center font-comicNeue text-lg text-slate-600">As primeiras publicações da escola aparecerão aqui.</p>}{state === "ready" && posts.length > 0 && <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <Link key={post.id} to={`/noticias/${post.id}`} className="group overflow-hidden rounded-3xl border-2 border-white bg-white shadow-sm transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"><img src={post.cover_image_url || fallbackImage} alt="" className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" /><div className="p-5"><div className="flex items-center justify-between gap-3"><span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">{post.category}</span><span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400"><CalendarDays size={13} />{new Date(post.published_at || post.created_at).toLocaleDateString("pt-BR")}</span></div><h3 className="mt-4 font-RobotoSlab text-2xl font-black leading-tight text-slate-900 transition group-hover:text-violet-700">{post.title}</h3><p className="mt-3 line-clamp-3 font-comicNeue text-slate-600">{post.summary || post.content}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-black text-violet-700">Ler publicação <ArrowRight size={16} /></span></div></Link>)}</div>}</div></div></section>;
}
