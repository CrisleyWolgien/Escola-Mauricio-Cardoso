import { useState } from "react";
import { KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Credenciais inválidas");
      const { access_token } = await response.json();
      sessionStorage.setItem("emef_admin_token", access_token);
      navigate("/admin/painel");
    } catch {
      setError("Não foi possível entrar. Confira seu e-mail e senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fbf7ee] p-5 font-Poppins text-slate-800 selection:bg-amber-200">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-6xl overflow-hidden rounded-[2.5rem] border-4 border-slate-900 bg-white shadow-[12px_12px_0_#fbbf24] lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden bg-[#155e75] p-8 text-white md:p-14">
          <div className="absolute -left-16 -top-14 h-56 w-56 rounded-full bg-amber-300" />
          <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full border-[28px] border-emerald-300" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <span className="inline-flex -rotate-2 items-center gap-2 rounded-full bg-amber-300 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-900"><ShieldCheck size={16} /> Área protegida</span>
              <h1 className="mt-10 max-w-md font-RobotoSlab text-4xl font-black leading-tight md:text-6xl">Coordene o dia a dia da escola.</h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-cyan-50">Publique avisos, organize eventos e compartilhe os momentos que fazem parte da nossa comunidade.</p>
            </div>
            <p className="mt-14 border-l-4 border-amber-300 pl-4 text-sm font-bold text-cyan-100">EMEF Maurício Cardoso<br /><span className="font-normal">Panambi · Rio Grande do Sul</span></p>
          </div>
        </section>

        <section className="flex items-center p-7 md:p-14">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-10">
              <span className="text-sm font-black uppercase tracking-[0.18em] text-orange-500">Bom trabalho!</span>
              <h2 className="mt-2 font-RobotoSlab text-4xl font-black text-slate-900">Entrar no painel</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">Acesso exclusivo da direção e pessoas autorizadas.</p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm font-bold text-slate-700">E-mail<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-2 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-teal-600 focus:bg-white" /></label>
              <label className="block text-sm font-bold text-slate-700">Senha<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength="12" className="mt-2 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-teal-600 focus:bg-white" /></label>
              {error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
              <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 font-black text-white shadow-[0_5px_0_#fbbf24] transition hover:-translate-y-0.5 disabled:opacity-60"><KeyRound size={18} />{loading ? "Entrando..." : "Entrar com segurança"}</button>
            </form>
            <p className="mt-9 flex items-center gap-2 text-xs text-slate-400"><LockKeyhole size={14} /> Sua sessão é protegida e tem tempo limitado.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
