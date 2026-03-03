import MomentosQueMarcam from "../components/MomentosQueMarcam";
import InternalPageHeader from "../components/InternalPageHeader";

function MomentosPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <InternalPageHeader 
        title="Galeria de Momentos" 
        subtitle="Confira mais um pouco de todos os momentos marcantes da nossa história, eventos e festividades."
        colorClass="bg-gradient-to-r from-pink-500 to-rose-500"
      />
      <div className="pb-20 -mt-10 relative z-10">
        <MomentosQueMarcam hideTitle={true} hideButton={true} />
      </div>
    </div>
  );
}

export default MomentosPage;
