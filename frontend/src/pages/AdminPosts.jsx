import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AdminImageUpload from "../components/AdminImageUpload";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001/api";
const empty = { title: "", summary: "", content: "", category: "Projetos", status: "draft" };

export default function AdminPosts() {
  const token = sessionStorage.getItem("emef_admin_token");
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(empty);
  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const load = async (selectedId) => {
    const response = await fetch(`${API_URL}/posts/admin`, { headers });
    const items = response.ok ? await response.json() : [];
    setPosts(items);
    if (selectedId) setSelected(items.find((post) => post.id === selectedId) ?? null);
  };

  useEffect(() => { if (token) load(); }, [token]);
  if (!token) return <Navigate to="/admin" replace />;

  function startEdit(post) {
    setSelected(post);
    setForm({ title: post.title, summary: post.summary, content: post.content, category: post.category, status: post.status });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearForm() {
    setSelected(null);
    setForm(empty);
    setImage("");
  }

  async function save(event) {
    event.preventDefault();
    const isEditing = Boolean(selected);
    const response = await fetch(`${API_URL}/posts/admin${isEditing ? `/${selected.id}` : ""}`, {
      method: isEditing ? "PATCH" : "POST", headers, body: JSON.stringify(form),
    });
    if (!response.ok) return setMessage("Não foi possível salvar o post. Tente novamente.");
    const post = await response.json();
    setSelected(post);
    await load(post.id);
    setMessage(isEditing ? "Post atualizado com sucesso." : "Post criado. Agora você pode adicionar as fotos abaixo.");
  }

  async function removePost(post) {
    if (!window.confirm(`Excluir o post “${post.title}”? Esta ação não pode ser desfeita.`)) return;
    const response = await fetch(`${API_URL}/posts/admin/${post.id}`, { method: "DELETE", headers });
    if (!response.ok) return setMessage("Não foi possível excluir o post.");
    if (selected?.id === post.id) clearForm();
    await load();
    setMessage("Post excluído com sucesso.");
  }

  async function addImage(event) {
    event.preventDefault();
    if (!selected || !image) return;
    const response = await fetch(`${API_URL}/posts/admin/${selected.id}/images`, {
      method: "POST", headers,
      body: JSON.stringify({ image_url: image, is_published: true, display_order: selected.images?.length || 0 }),
    });
    if (!response.ok) return setMessage("Não foi possível adicionar a foto.");
    setImage("");
    await load(selected.id);
    setMessage("Foto adicionada ao post.");
  }

  async function removeImage(imageId) {
    if (!selected || !window.confirm("Remover esta foto do post?")) return;
    const response = await fetch(`${API_URL}/posts/admin/images/${imageId}`, { method: "DELETE", headers });
    if (!response.ok) return setMessage("Não foi possível remover a foto.");
    await load(selected.id);
    setMessage("Foto removida do post.");
  }

  return <main className="min-h-screen bg-[#fbf7ee] p-5">
    <div className="mx-auto max-w-6xl">
      <Link to="/admin/painel" className="font-bold text-violet-700">← Painel</Link>
      <h1 className="mt-5 font-RobotoSlab text-4xl font-black">Projetos e posts</h1>
      <p className="mt-2 text-slate-600">Publique projetos, atividades e momentos da escola com uma galeria de fotos.</p>
      {message && <p className="mt-5 rounded-xl bg-emerald-50 p-3 font-semibold text-emerald-800">{message}</p>}
      <div className="mt-7 grid gap-8 lg:grid-cols-2">
        <form onSubmit={save} className="space-y-4 rounded-3xl bg-white p-6 shadow">
          <div className="flex items-center justify-between gap-3"><h2 className="font-RobotoSlab text-2xl font-black">{selected ? "Editar post" : "Novo post"}</h2>{selected && <button type="button" onClick={clearForm} className="font-bold text-violet-700">Novo post</button>}</div>
          <input required placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border p-3" />
          <textarea required placeholder="Resumo" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} className="w-full rounded-xl border p-3" />
          <textarea required placeholder="Texto completo" rows="7" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full rounded-xl border p-3" />
          <input placeholder="Categoria" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border p-3" />
          <label className="flex gap-2 font-semibold"><input type="checkbox" checked={form.status === "published"} onChange={(e) => setForm({ ...form, status: e.target.checked ? "published" : "draft" })} /> Publicar agora</label>
          <button className="block w-full rounded-xl bg-violet-700 p-3 font-black text-white">{selected ? "Salvar alterações" : "Criar post"}</button>
        </form>
        <section><h2 className="font-RobotoSlab text-2xl font-black">Posts criados</h2>{posts.length === 0 && <p className="mt-3 text-slate-600">Ainda não há posts.</p>}{posts.map((post) => <article key={post.id} className={`mt-3 rounded-2xl bg-white p-4 shadow ${selected?.id === post.id ? "ring-2 ring-violet-500" : ""}`}><b>{post.title}</b><br /><small>{post.status === "published" ? "Publicado" : "Rascunho"} · {post.images?.length || 0} foto(s)</small><div className="mt-3 flex gap-3"><button type="button" onClick={() => startEdit(post)} className="font-bold text-violet-700">Editar</button><button type="button" onClick={() => removePost(post)} className="font-bold text-rose-700">Excluir</button></div></article>)}</section>
      </div>
      {selected && <section className="mt-8 rounded-3xl bg-violet-50 p-6"><h2 className="font-RobotoSlab text-2xl font-black">Fotos: {selected.title}</h2><form onSubmit={addImage}><AdminImageUpload token={token} value={image} onChange={setImage} label="Adicionar foto" /><button className="mt-4 rounded-xl bg-violet-700 px-5 py-3 font-black text-white">Adicionar à galeria do post</button></form>{selected.images?.length > 0 && <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">{selected.images.map((photo) => <figure key={photo.id} className="overflow-hidden rounded-2xl bg-white shadow"><img src={photo.image_url} alt={photo.caption || "Foto do post"} className="aspect-square w-full object-cover" /><button type="button" onClick={() => removeImage(photo.id)} className="w-full p-2 text-sm font-bold text-rose-700">Remover foto</button></figure>)}</div>}</section>}
    </div>
  </main>;
}
