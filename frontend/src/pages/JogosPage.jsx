import Jogos from "../components/Jogos";
import InternalPageHeader from "../components/InternalPageHeader";

function JogosPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <InternalPageHeader 
        title="Portal de Jogos Educativos" 
        subtitle="Aprender brincando é o nosso lema! Escolha um dos jogos abaixo e divirta-se enquanto aprende."
        colorClass="bg-gradient-to-r from-blue-500 to-indigo-600"
      />
      <div className="-mt-10 relative z-10 pb-20">
        <Jogos hideTitle={true} hideButton={true} />
      </div>
    </div>
  );
}

export default JogosPage;
