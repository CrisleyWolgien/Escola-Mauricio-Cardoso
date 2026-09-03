import { ArrowRight, CalendarDays, Clock3, MapPin, Newspaper } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicApi } from "../lib/api";

function MuralDaSemana() {
  const [content, setContent] = useState({ announcements: [], events: [] });
  const [state, setState] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      publicApi.announcements({ signal: controller.signal }),
      publicApi.events({ signal: controller.signal }),
    ])
      .then(([announcements, events]) => {
        setContent({ announcements: announcements.slice(0, 2), events: events.slice(0, 3) });
        setState("ready");
      })
      .catch((error) => { if (error.name !== "AbortError") setState("error"); });
    return () => controller.abort();
  }, []);

  const hasContent = content.announcements.length || content.events.length;
  return (
    <section className="relative py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="overflow-hidden rounded-[2.75rem] border-4 border-sky-200 bg-sky-100/80 p-5 shadow-xl backdrop-blur-sm md:p-10">
          <div className="mb-7 flex flex-col justify-between gap-4 border-b-2 border-sky-200 pb-6 md:flex-row md:items-end">
            <div><span className="inline-flex -rotate-1 items-center gap-2 rounded-full bg-amber-300 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-slate-900"><Newspaper size={15} /> Mural da semana</span><h2 className="mt-4 font-RobotoSlab text-3xl font-black text-slate-900 md:text-5xl">O que acontece por aqui</h2><p className="mt-2 max-w-2xl font-comicNeue text-lg text-slate-600">Avisos importantes e os próximos encontros da nossa comunidade.</p></div>
            <Link to="/noticias" className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow md:self-auto">Ver todas as notícias <ArrowRight size={16} /></Link>
          </div>

          {state === "loading" && <p className="py-14 text-center font-bold text-slate-500">Atualizando o mural...</p>}
          {state === "error" && <p className="py-14 text-center font-bold text-rose-700">Não foi possível atualizar o mural agora.</p>}
          {state === "ready" && !hasContent && <p className="rounded-3xl border-2 border-dashed border-sky-300 bg-white/70 px-6 py-12 text-center font-comicNeue text-lg text-slate-600">Em breve teremos novas informações neste mural.</p>}
          {state === "ready" && hasContent && <div className="grid gap-7 lg:grid-cols-[1.15fr_.85fr]">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[.16em] text-sky-800"><Newspaper size={17} /> Avisos recentes</div>
              {content.announcements.length ? content.announcements.map((notice) => <Link key={notice.id} to={`/noticias/${notice.id}`} className="group block rounded-3xl border-2 border-white bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-md"><span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">{notice.category}</span><h3 className="mt-3 font-RobotoSlab text-2xl font-black text-slate-900 transition group-hover:text-purple-700">{notice.title}</h3><p className="mt-2 line-clamp-2 font-comicNeue text-slate-600">{notice.content}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-purple-700">Ler aviso <ArrowRight size={16} /></span></Link>) : <p className="rounded-3xl bg-white/70 p-6 text-slate-600">Ainda não há avisos publicados.</p>}
            </div>
            <div className="rounded-[2rem] border-2 border-emerald-200 bg-emerald-50 p-5 shadow-sm md:p-6"><div className="flex items-center gap-2 text-sm font-black uppercase tracking-[.16em] text-emerald-800"><CalendarDays size={17} /> Próximos eventos</div><div className="mt-5 space-y-3">{content.events.length ? content.events.map((event) => { const date = new Date(event.starts_at); return <article key={event.id} className="rounded-2xl bg-white p-4 shadow-sm"><div className="flex gap-4"><div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-emerald-600 text-white"><span className="font-RobotoSlab text-xl font-black leading-none">{String(date.getDate()).padStart(2, "0")}</span><span className="mt-1 text-[10px] font-black uppercase">{date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}</span></div><div><span className="text-xs font-black uppercase tracking-wide text-emerald-700">{event.event_type}</span><h3 className="mt-1 font-RobotoSlab text-lg font-black text-slate-900">{event.title}</h3><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold text-slate-500"><span className="inline-flex items-center gap-1"><Clock3 size={13} />{date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>{event.location && <span className="inline-flex items-center gap-1"><MapPin size={13} />{event.location}</span>}</div></div></div></article>; }) : <p className="rounded-2xl bg-white/70 p-5 text-sm text-slate-600">Ainda não há eventos publicados.</p>}</div><Link to="/calendario" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-800 hover:underline">Abrir calendário completo <ArrowRight size={16} /></Link></div>
          </div>}
        </div>
      </div>
    </section>
  );
}

export default MuralDaSemana;
