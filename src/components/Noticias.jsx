import { Calendar, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

function Noticias() {
  const newsList = [
    {
      id: 1,
      title: "Semana da Criança: Confira a programação completa",
      date: "05 Out 2026",
      summary: "Preparamos uma semana cheia de surpresas, gincanas e muita diversão. Saiba quais serão as atividades de cada dia.",
      badge: "Eventos",
      color: "bg-blue-100 text-blue-800",
      image: "https://images.unsplash.com/photo-1544212720-6d338f0fa04c?q=80&w=2069&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Reunião de Pais e Mestres do 2º Trimestre",
      date: "28 Set 2026",
      summary: "Avisamos a todos os responsáveis que nossa reunião ocorrerá na próxima quinta-feira no auditório principal.",
      badge: "Avisos",
      color: "bg-orange-100 text-orange-800",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Feira de Ciências bate recorde de projetos inscritos",
      date: "15 Set 2026",
      summary: "Nossos pequenos cientistas surpreenderam a todos com experimentos incríveis de robótica e biologia ambiental.",
      badge: "Projetos",
      color: "bg-purple-100 text-purple-800",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Abertas as matrículas para as turmas de robótica",
      date: "01 Set 2026",
      summary: "Garanta a vaga do seu filho nas nossas novas atividades extracurriculares no laboratório de tecnologia.",
      badge: "Matrículas",
      color: "bg-green-100 text-green-800",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col grow w-full">
      <div className="flex justify-between items-end mb-8 border-b-2 border-gray-100 pb-4">
        <div>
          <h2 className="text-3xl font-bold font-RobotoSlab text-gray-800 mb-2">Últimas Atualizações</h2>
          <p className="text-lg text-gray-500 font-comicNeue">Confira o que está rolando nos corredores da EMEF Mauricio Cardoso.</p>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
      >
        {newsList.map((item) => (
          <motion.div 
            key={item.id} 
            className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-2"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
            }}
          >
            {/* Imagem de Capa */}
            <div className="w-full h-48 overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
              <span className={`absolute bottom-4 left-4 px-4 py-1 rounded-full text-sm font-bold tracking-wide shadow-md ${item.color}`}>
                {item.badge}
              </span>
            </div>

            <div className="p-6 flex flex-col grow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center text-gray-400 text-sm font-bold uppercase tracking-wider">
                  <Calendar className="w-4 h-4 mr-2" />
                  {item.date}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-comicNeue line-clamp-3">
                {item.summary}
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-blue-600 font-bold group-hover:text-blue-800">
                Ler Notícia Completa
                <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="flex justify-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button className="px-8 py-4 rounded-full border-2 border-gray-200 text-gray-600 font-bold hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm bg-white active:scale-95">
          Carregar Notícias Antigas
        </button>
      </motion.div>
    </div>
  );
}

export default Noticias;
