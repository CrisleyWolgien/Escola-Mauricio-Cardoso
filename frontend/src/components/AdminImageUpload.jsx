import { ImageUp, LoaderCircle } from "lucide-react";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001/api";
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function AdminImageUpload({ label = "Imagem", value, onChange, token, optional = true }) {
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  async function upload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) return setMessage("Escolha uma imagem JPEG, PNG ou WebP.");
    if (file.size > MAX_IMAGE_SIZE_BYTES) return setMessage("A imagem deve ter no máximo 10 MB.");
    setMessage(""); setUploading(true);
    const form = new FormData(); form.append("file", file);
    try {
      const response = await fetch(`${API_URL}/uploads/images`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return setMessage(data.detail || "Não foi possível enviar a imagem.");
      onChange(data.image_url); setMessage("Imagem enviada com sucesso.");
    } catch {
      setMessage("Não foi possível conectar ao armazenamento de imagens.");
    } finally { setUploading(false); }
  }

  return <div className="space-y-2"><label className="block text-sm font-bold">{label} {optional && <span className="font-normal text-slate-400">(opcional)</span>}<input value={value || ""} onChange={(event) => onChange(event.target.value)} type="url" placeholder="Cole uma URL ou envie um arquivo abaixo" className="mt-1.5 w-full rounded-xl border-2 border-slate-200 px-3 py-2.5 outline-none focus:border-pink-500" /></label><label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-pink-300 bg-pink-50 px-4 py-3 text-sm font-black text-pink-700 transition hover:bg-pink-100"><input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} disabled={uploading} />{uploading ? <LoaderCircle size={17} className="animate-spin" /> : <ImageUp size={17} />}{uploading ? "Enviando imagem..." : "Escolher foto do celular ou computador"}</label><p className="text-xs text-slate-500">JPEG, PNG ou WebP · até 10 MB</p>{message && <p className="text-sm font-bold text-teal-700">{message}</p>}{value && <img src={value} alt="Prévia da imagem escolhida" className="max-h-40 rounded-xl border-2 border-slate-200 object-cover" />}</div>;
}
