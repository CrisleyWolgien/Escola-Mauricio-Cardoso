import { Clock, MapPin, Calendar as CalIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { publicApi } from "../lib/api";

function formatGoogleCalendarDate(value) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function Calendario() {
  const [eventsList, setEventsList] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const controller = new AbortController();
    publicApi.events({ signal: controller.signal })
      .then((events) => setEventsList(events.map((event) => {
        const date = new Date(event.starts_at);
        return { ...event, day: String(date.getDate()).padStart(2, "0"), month: date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "").toUpperCase(), time: date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }), type: event.event_type };
      })))
      .catch((error) => { if (error.name !== "AbortError") setStatus("error"); })
      .finally(() => setStatus((current) => current === "error" ? current : "ready"));
    return () => controller.abort();
  }, []);

  function openGoogleCalendar(event) {
    const start = new Date(event.starts_at);
    const end = event.ends_at ? new Date(event.ends_at) : new Date(start.getTime() + 60 * 60 * 1000);
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${formatGoogleCalendarDate(start)}/${formatGoogleCalendarDate(end)}`,
      details: event.description || "Evento da EMEF Maurício Cardoso.",
      location: event.location || "EMEF Maurício Cardoso",
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-col grow w-full">
      <div className="flex justify-between items-end mb-10 border-b-2 border-gray-100 pb-6">
        <div>
          <h2 className="text-3xl font-bold font-RobotoSlab text-gray-800 mb-2">Próximos Eventos</h2>
          <p className="text-lg text-gray-500 font-comicNeue">Organize-se para não perder nenhuma de nossas atividades.</p>
        </div>
      </div>

      <div className="space-y-6">
        {eventsList.map((event, index) => (
          <motion.div 
            key={event.id} 
            className="bg-white border-2 border-transparent hover:border-green-400 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-[0_15px_30px_rgba(0,128,0,0.1)] transition-all flex flex-col md:flex-row items-center gap-6 group cursor-default relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: index * 0.1 }}
          >
            {/* Detalhe visual charmoso */}
            <div className="absolute top-0 bottom-0 left-0 w-2 bg-linear-to-b from-green-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Date Block */}
            <div className="bg-emerald-50 rounded-2xl w-full md:w-32 py-5 flex flex-col items-center justify-center shrink-0 border-2 border-emerald-100 group-hover:bg-linear-to-br group-hover:from-emerald-500 group-hover:to-green-600 group-hover:border-transparent transition-all duration-300">
              <span className="text-4xl font-bold font-RobotoSlab text-emerald-700 group-hover:text-white transition-colors">{event.day}</span>
              <span className="text-sm font-bold uppercase tracking-widest text-emerald-600 group-hover:text-emerald-100 mt-1 transition-colors">{event.month}</span>
            </div>

            {/* Content info */}
            <div className="flex flex-col grow">
              <div className="mb-2">
                <span className="inline-flex items-center px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-full">
                  <CalIcon className="w-3 h-3 mr-2" />
                  {event.type}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-emerald-700 transition-colors">{event.title}</h3>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-500 text-sm font-semibold font-comicNeue">
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Clock className="w-4 h-4 mr-2 text-emerald-600" />
                  {event.time}
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <MapPin className="w-4 h-4 mr-2 text-rose-500" />
                  {event.location}
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="w-full md:w-auto shrink-0 mt-4 md:mt-0">
              <button type="button" onClick={() => openGoogleCalendar(event)} className="w-full md:w-auto px-6 py-4 rounded-xl bg-gray-50 text-gray-700 font-bold border border-gray-200 hover:border-transparent hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95 flex items-center justify-center">
                Adicionar ao Google Agenda
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {status === "loading" && <p className="mt-8 text-center font-bold text-gray-500">Carregando calendário...</p>}
      {status === "error" && <p className="mt-8 text-center font-bold text-rose-600">Não foi possível carregar o calendário agora.</p>}
      {status === "ready" && !eventsList.length && <p className="mt-8 text-center font-bold text-gray-500">Ainda não há eventos publicados.</p>}
    </div>
  );
}

export default Calendario;
