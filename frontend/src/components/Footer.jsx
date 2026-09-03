import { Facebook, Instagram, Mail, MapPin, Phone, School } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicApi } from "../lib/api";

const fallbackSettings = {
  school_name: "EMEF Maurício Cardoso",
  address: "Rua Iriapira, S/N - Zona Rural, Panambi/RS",
  phone: "+55 55 3376-9100",
  whatsapp: "555533769100",
  email: null,
  instagram_url: "https://www.instagram.com/emefmauricio/",
  facebook_url: "https://www.facebook.com/emefmauriciocardoso.cardoso/",
};

function FooterEscolar() {
  const [settings, setSettings] = useState(fallbackSettings);

  useEffect(() => {
    const controller = new AbortController();
    publicApi.settings({ signal: controller.signal }).then(setSettings).catch(() => {});
    return () => controller.abort();
  }, []);

  const whatsappNumber = settings.whatsapp?.replace(/\D/g, "");
  return (
    <footer className="mt-12 w-full border-t-4 border-amber-300 bg-[#0a1a2f] px-4 py-6 font-Poppins text-gray-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center md:items-start"><div className="flex items-center gap-2 font-RobotoSlab text-xl font-bold tracking-wide text-white"><School size={24} className="text-amber-300" /><span>{settings.school_name}</span></div><p className="mt-1 text-xs italic text-gray-400">Educação com carinho, responsabilidade e criatividade 📚</p></div>
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium">{[{ name: "Página Inicial", path: "/" }, { name: "Sobre", path: "/sobre" }, { name: "Notícias", path: "/noticias" }, { name: "Momentos", path: "/momentos" }, { name: "Calendário", path: "/calendario" }, { name: "Jogos", path: "/jogos" }].map((item) => <Link key={item.path} to={item.path} onClick={() => window.scrollTo(0, 0)} className="text-gray-300 transition-colors hover:text-amber-300">{item.name}</Link>)}</nav>
        <div className="flex gap-3">{settings.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noreferrer" className="text-gray-400 transition-colors hover:text-white" aria-label="Instagram"><Instagram size={20} /></a>}{settings.facebook_url && <a href={settings.facebook_url} target="_blank" rel="noreferrer" className="text-gray-400 transition-colors hover:text-white" aria-label="Facebook"><Facebook size={20} /></a>}</div>
      </div>
      <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-4 text-center text-xs text-gray-500 md:flex-row md:gap-3">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">{settings.address && <span className="flex items-center gap-1.5"><MapPin size={14} />{settings.address}</span>}{settings.phone && <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 transition hover:text-white"><Phone size={14} />{settings.phone}</a>}{settings.email && <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 transition hover:text-white"><Mail size={14} />{settings.email}</a>}{whatsappNumber && <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="font-bold text-emerald-300 transition hover:text-emerald-100">Falar pelo WhatsApp</a>}</div>
        <span>© {new Date().getFullYear()} Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}

export default FooterEscolar;
