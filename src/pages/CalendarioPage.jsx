import Calendario from "../components/Calendario";
import InternalPageHeader from "../components/InternalPageHeader";

function CalendarioPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <InternalPageHeader 
        title="Calendário Escolar" 
        subtitle="Confira as datas importantes, recessos, avaliações e festividades de todo o ano letivo."
        colorClass="bg-gradient-to-r from-emerald-500 to-green-600"
      />
      <div className="-mt-10 relative z-10 pb-20 max-w-7xl mx-auto px-4 md:px-8">
        {/* Container branco elegante */}
        <div className="bg-white rounded-3xl shadow-xl p-8 min-h-[50vh]">
          <Calendario />
        </div>
      </div>
    </div>
  );
}

export default CalendarioPage;
