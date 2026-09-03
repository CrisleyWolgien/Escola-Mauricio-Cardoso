import Banner from "../components/Banner";
import NossoJeitoDeEnsinar from "../components/NossoJeitoDeEnsinar";
import ExploreNossaEscola from "../components/ExploreNossaEscola";
import MomentosQueMarcam from "../components/MomentosQueMarcam";
import Jogos from "../components/Jogos";
import MuralDaSemana from "../components/MuralDaSemana";

function Home() {
  return (
    <div className="relative w-full">
      <Banner />
      <MuralDaSemana />
      <NossoJeitoDeEnsinar />
      <ExploreNossaEscola />
      <MomentosQueMarcam />
      <Jogos />
    </div>
  );
}

export default Home;
