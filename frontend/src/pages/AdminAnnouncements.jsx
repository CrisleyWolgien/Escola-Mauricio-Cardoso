import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, FilePlus2, Save, Send, Trash2 } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001/api";
const emptyForm = { title: "", content: "", category: "Geral", cover_image_url: "", status: "draft" };

export default function AdminAnnouncements() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("emef_admin_token");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  if (!token) return <Navigate to="/admin" replace />;
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  function endExpiredSession() {
    sessionStorage.removeItem("emef_admin_token");
    sessionStorage.setItem("emef_admin_login_notice", "Sua sessão expirou por segurança. Entre novamente para continuar.");
    navigate("/admin", { replace: true });
  }

  async function load() {
    try {
      const response = await fetch(`${API_URL}/announcements/admin`, { headers });
      if (response.status === 401 || response.status === 403) return endExpiredSession();
      if (!response.ok) setMessage("Não foi possível carregar os avisos. Tente novamente.");
      else setItems(await response.json());
    } catch {
      setMessage("Não foi possível conectar ao servidor. Confira se ele está em execução.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);
  function edit(item) { setEditingId(item.id); setForm({ ...item, cover_image_url: item.cover_image_url || "" }); window.scrollTo({ top: 0, behavior: "smooth" }); }
  async function submit(event) {
    event.preventDefault();
    setMessage("");
    const payload = { ...form, cover_image_url: form.cover_image_url || null };
    try {
      const response = await fetch(editingId ? `${API_URL}/announcements/admin/${editingId}` : `${API_URL}/announcements/admin`, { method: editingId ? "PATCH" : "POST", headers, body: JSON.stringify(payload) });
      if (response.status === 401 || response.status === 403) return endExpiredSession();
      if (!response.ok) return setMessage("Não foi possível salvar o aviso. Revise os campos e tente novamente.");
      setMessage(editingId ? "Aviso atualizado." : "Aviso criado.");
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch {
      setMessage("Não foi possível conectar ao servidor. Confira se ele está em execução.");
    }
  }
  async function remove(id) { if (!window.confirm("Excluir este aviso?")) return; const response = await fetch(`${API_URL}/announcements/admin/${id}`, { method: "DELETE", headers }); if (response.ok) load(); }
  return <main className="min-h-screen bg-[#fbf7ee] p-4 font-Poppins text-slate-800 md:p-8"><div className="mx-auto max-w-6xl"><Link to="/admin/painel" className="inline-flex items-center gap-2 text-sm font-black text-teal-800 hover:underline"><ArrowLeft size={16} /> Voltar ao painel</Link><header className="mt-5 flex flex-col gap-4 rounded-[2rem] border-2 border-slate-900 bg-orange-100 p-7 shadow-[6px_6px_0_#fb923c] sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-orange-700">Mural de recados</p><h1 className="mt-1 font-RobotoSlab text-4xl font-black text-slate-900">Avisos da escola</h1><p className="mt-2 text-slate-600">Escreva, revise e publique comunicados para as famílias.</p></div><span className="rounded-full bg-white px-4 py-2 text-sm font-black">{items.filter((item) => item.status === "published").length} publicados</span></header><section className="mt-8 grid gap-8 lg:grid-cols-[.9fr_1.1fr]"><form onSubmit={submit} className="rounded-[2rem] border-2 border-slate-900 bg-white p-6 shadow-[5px_5px_0_#fde68a]"><div className="flex items-center justify-between"><h2 className="font-RobotoSlab text-2xl font-black">{editingId ? "Editar aviso" : "Novo aviso"}</h2><FilePlus2 className="text-orange-600" /></div><div className="mt-6 space-y-4"><label className="block text-sm font-bold">Título<input required minLength="4" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5 w-full rounded-xl border-2 border-slate-200 px-3 py-2.5 outline-none focus:border-orange-500" /></label><label className="block text-sm font-bold">Categoria<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1.5 w-full rounded-xl border-2 border-slate-200 px-3 py-2.5 outline-none focus:border-orange-500" /></label><label className="block text-sm font-bold">Texto<textarea required minLength="10" rows="6" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="mt-1.5 w-full resize-y rounded-xl border-2 border-slate-200 px-3 py-2.5 outline-none focus:border-orange-500" /></label><label className="block text-sm font-bold">URL da imagem <span className="font-normal text-slate-400">(opcional)</span><input type="url" value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} className="mt-1.5 w-full rounded-xl border-2 border-slate-200 px-3 py-2.5 outline-none focus:border-orange-500" /></label><label className="flex items-center gap-3 rounded-xl bg-amber-50 p-3 text-sm font-bold"><input checked={form.status === "published"} onChange={(e) => setForm({ ...form, status: e.target.checked ? "published" : "draft" })} type="checkbox" className="h-4 w-4 accent-orange-600" /> Publicar imediatamente</label>{message && <p className="text-sm font-bold text-teal-700">{message}</p>}<div className="flex gap-3"><button className="flex grow items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-black text-white"><Save size={17} /> Salvar</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="rounded-xl border-2 border-slate-200 px-4 font-bold">Cancelar</button>}</div></div></form><section><h2 className="font-RobotoSlab text-2xl font-black">Todos os avisos</h2><div className="mt-4 space-y-4">{loading ? <p className="text-slate-500">Carregando avisos...</p> : items.map((item) => <article key={item.id} className="rounded-2xl border-2 border-slate-200 bg-white p-5"><div className="flex items-start justify-between gap-4"><div><span className={`rounded-full px-2.5 py-1 text-xs font-black ${item.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{item.status === "published" ? "Publicado" : "Rascunho"}</span><h3 className="mt-3 font-RobotoSlab text-xl font-black">{item.title}</h3><p className="mt-1 text-sm text-slate-500">{item.category}</p></div><div className="flex gap-2"><button onClick={() => edit(item)} className="rounded-lg bg-amber-100 p-2 text-amber-800" aria-label="Editar aviso"><Send size={17} /></button><button onClick={() => remove(item.id)} className="rounded-lg bg-rose-100 p-2 text-rose-700" aria-label="Excluir aviso"><Trash2 size={17} /></button></div></div><p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">{item.content}</p></article>)}{!loading && !items.length && <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-8 text-center text-sm text-slate-600"><CheckCircle2 className="mx-auto mb-2 text-amber-600" />Ainda não há avisos. Crie o primeiro ao lado.</div>}</div></section></section></div></main>;
}
