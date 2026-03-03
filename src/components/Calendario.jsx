import { Clock, MapPin, Calendar as CalIcon } from "lucide-react";
import { motion } from "framer-motion";

function Calendario() {
  const eventsList = [
    {
      id: 1,
      day: "12",
      month: "OUT",
      title: "Dia das Crianças - Gincana Especial",
      time: "08:00 - 12:00",
      location: "Pátio Principal",
      type: "Festa"
    },
    {
      id: 2,
      day: "20",
      month: "OUT",
      title: "Conselho de Classe 3º Bimestre",
      time: "18:30 - 20:30",
      location: "Auditório / Salas de Aula",
      type: "Reunião"
    },
    {
      id: 3,
      day: "02",
      month: "NOV",
      title: "Feriado de Finados (Sem Aula)",
      time: "O dia todo",
      location: "Escola Fechada",
      type: "Feriado"
    },
    {
      id: 4,
      day: "15",
      month: "NOV",
      title: "Proclamação da República e Feira Cultural",
      time: "09:00 - 16:00",
      location: "Quadra Poliesportiva",
      type: "Evento Cultural"
    }
  ];

  return (
    <div className="flex flex-col grow w-full">
      <div className="flex justify-between items-end mb-10 border-b-2 border-gray-100 pb-6">
        <div>
          <h2 className="text-3xl font-bold font-RobotoSlab text-gray-800 mb-2">Próximos Eventos</h2>
          <p className="text-lg text-gray-500 font-comicNeue">Organize-se para não perder nenhuma de nossas atividades.</p>
        </div>
      </div>

      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {eventsList.map((event) => (
          <motion.div 
            key={event.id} 
            className="bg-white border-2 border-transparent hover:border-green-400 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-[0_15px_30px_rgba(0,128,0,0.1)] transition-all flex flex-col md:flex-row items-center gap-6 group cursor-default relative overflow-hidden"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80 } }
            }}
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
              <button className="w-full md:w-auto px-6 py-4 rounded-xl bg-gray-50 text-gray-700 font-bold border border-gray-200 hover:border-transparent hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95 flex items-center justify-center">
                Lembrar-me
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Calendario;
