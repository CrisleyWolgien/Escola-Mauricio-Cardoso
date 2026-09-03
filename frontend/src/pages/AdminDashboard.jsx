import { CalendarDays, ChevronRight, FileText, Gamepad2, Image, LogOut, Settings, Sparkles } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const sections = [
  { title: "Avisos", text: "Comunicados para as famílias", icon: FileText, color: "bg-orange-100 text-orange-700", path: "/admin/avisos" },
  { title: "Calendário", text: "Eventos e datas escolares", icon: CalendarDays, color: "bg-emerald-100 text-emerald-700", path: "/admin/calendario" },
  { title: "Galeria", text: "Álbuns e fotos da escola", icon: Image, color: "bg-pink-100 text-pink-700", path: "/admin/galeria" },
  { title: "Jogos", text: "Links educativos por série", icon: Gamepad2, color: "bg-indigo-100 text-indigo-700", path: "/admin/jogos" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  if (!sessionStorage.getItem("emef_admin_token")) return <Navigate to="/admin" replace />;
  function logout() { sessionStorage.removeItem("emef_admin_token"); navigate("/admin"); }
  return (
    <main className="min-h-screen bg-[#fbf7ee] p-4 font-Poppins text-slate-800 md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 rounded-[2rem] border-2 border-slate-900 bg-slate-900 px-6 py-6 text-white shadow-[7px_7px_0_#fbbf24] sm:flex-row sm:items-center sm:justify-between md:px-9">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">Área administrativa</p><h1 className="mt-1 font-RobotoSlab text-2xl font-black">EMEF Maurício Cardoso</h1></div>
          <div className="flex items-center gap-3"><Link to="/" className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20">Ver site</Link><button onClick={logout} className="inline-flex items-center gap-2 rounded-xl bg-rose-400 px-4 py-2 text-sm font-black text-slate-900 hover:bg-rose-300"><LogOut size={16} /> Sair</button></div>
        </header>
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border-2 border-amber-300 bg-amber-100 p-7 md:p-9"><span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-wider text-orange-600"><Sparkles size={14} className="mr-1" /> Central de conteúdo</span><h2 className="mt-5 max-w-xl font-RobotoSlab text-3xl font-black leading-tight text-slate-900">O que a comunidade precisa saber hoje?</h2><p className="mt-3 max-w-xl text-slate-600">Escolha uma seção para criar, revisar ou publicar conteúdos no site.</p></div>
          <Link to="/admin/configuracoes" className="group flex items-center justify-between rounded-[2rem] border-2 border-slate-900 bg-white p-7 transition hover:-translate-y-1 hover:shadow-[5px_5px_0_#0f766e]"><div><Settings className="text-teal-700" /><h2 className="mt-4 font-RobotoSlab text-xl font-black">Dados da escola</h2><p className="mt-1 text-sm text-slate-500">Contato, endereço e redes sociais</p></div><ChevronRight className="transition group-hover:translate-x-1" /></Link>
        </section>
        <section className="mt-8 grid gap-5 sm:grid-cols-2">
          {sections.map(({ title, text, icon: Icon, color, path }) => <Link key={title} to={path} className="group flex items-center gap-5 rounded-[1.7rem] border-2 border-slate-200 bg-white p-6 transition hover:border-slate-900 hover:shadow-[5px_5px_0_#fbbf24]"><div className={`rounded-2xl p-4 ${color}`}><Icon size={28} /></div><div className="grow"><h3 className="font-RobotoSlab text-xl font-black">{title}</h3><p className="mt-1 text-sm text-slate-500">{text}</p></div><ChevronRight className="text-slate-400 transition group-hover:translate-x-1" /></Link>)}
        </section>
      </div>
    </main>
  );
}
