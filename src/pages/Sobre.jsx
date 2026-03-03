import NossoJeitoDeEnsinar from "../components/NossoJeitoDeEnsinar";
import MomentosQueMarcam from "../components/MomentosQueMarcam";
import InternalPageHeader from "../components/InternalPageHeader";

function Sobre() {
  return (
    <div className="bg-white min-h-screen">
      <InternalPageHeader 
        title="Sobre a Escola" 
        subtitle="Conheça a nossa história, nossa metodologia e como preparamos nossos alunos para o futuro."
        colorClass="bg-gradient-to-r from-orange-400 to-red-500"
      />
      <div className="-mt-16 relative z-10 w-full bg-white rounded-t-[3rem] overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.05)] pt-8">
        <NossoJeitoDeEnsinar />
      </div>
      <div className="py-10 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(254,248,231,0.85)_51%)]">
        <MomentosQueMarcam hideTitle={false} />
      </div>
    </div>
  );
}

export default Sobre;
