import Noticias from "../components/Noticias";
import InternalPageHeader from "../components/InternalPageHeader";

function NoticiasPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <InternalPageHeader 
        title="Mural de Notícias" 
        subtitle="Fique por dentro de tudo que acontece: Projetos, comunicados e o dia-a-dia da escola."
        colorClass="bg-gradient-to-r from-purple-500 to-fuchsia-600"
      />
      <div className="-mt-10 relative z-10 pb-20 max-w-7xl mx-auto px-4 md:px-8">
        {/* Usando padding para dar respiro ao conteúdo base */}
        <div className="bg-white rounded-3xl shadow-xl p-8 min-h-[50vh]">
          <Noticias />
        </div>
      </div>
    </div>
  );
}

export default NoticiasPage;
