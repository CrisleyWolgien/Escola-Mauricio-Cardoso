import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardJogos from "./CardJogos";
import { publicApi } from "../lib/api";

const cardColors = ["bg-purple-100", "bg-cyan-100", "bg-amber-100", "bg-emerald-100"];

function Jogos({ hideTitle = false, hideButton = false }) {
  const [games, setGames] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    publicApi.games({ signal: controller.signal })
      .then((items) => { setGames(items); setState("ready"); })
      .catch((error) => { if (error.name !== "AbortError") setState("error"); });
    return () => controller.abort();
  }, []);

  return (
    <section className={`relative bg-transparent py-12 md:py-24 ${hideTitle ? "pt-8" : ""}`}>
      <div className="mx-auto max-w-7xl rounded-[3rem] border-4 border-indigo-200 bg-indigo-100/80 px-4 py-12 shadow-xl backdrop-blur-sm md:px-8">
        {!hideTitle && <h2 className="mb-10 text-center font-RobotoSlab text-3xl font-bold text-gray-900 md:text-5xl">Jogos Educativos</h2>}
        {state === "loading" && <p className="py-14 text-center font-bold text-gray-500">Carregando jogos...</p>}
        {state === "error" && <p className="py-14 text-center font-bold text-rose-700">Não foi possível carregar os jogos agora.</p>}
        {state === "ready" && !games.length && <div className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border-2 border-dashed border-indigo-300 bg-white/70 px-6 py-12 text-center"><Gamepad2 className="mb-3 text-indigo-600" size={32} /><p className="font-RobotoSlab text-xl font-black text-gray-800">Novos jogos em breve</p><p className="mt-2 text-sm text-gray-600">A direção selecionará jogos educativos para as turmas.</p></div>}
        {!!games.length && <div className="grid grid-cols-1 gap-8 px-1 sm:grid-cols-2 md:px-8 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game, index) => <motion.div key={game.id} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.min(index * 0.08, 0.5), type: "spring" }}><CardJogos titulo={game.title} descricao={game.description} serie={game.grade_from === game.grade_to ? `${game.grade_from}º ano` : `${game.grade_from}º ao ${game.grade_to}º ano`} categoria={game.category} imagem={game.image_url} link={game.game_url} cardBgClass={cardColors[index % cardColors.length]} /></motion.div>)}
        </div>}
        {!hideButton && <div className="mb-4 mt-12 flex justify-center"><Link to="/jogos" className="inline-block rounded-xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-700">Ver mais jogos</Link></div>}
      </div>
    </section>
  );
}

export default Jogos;
