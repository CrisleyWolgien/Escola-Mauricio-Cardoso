import Banner from "../components/Banner";
import MomentosQueMarcam from "../components/MomentosQueMarcam";
import Jogos from "../components/Jogos";
import MuralDaSemana from "../components/MuralDaSemana";
import PostsRecentes from "../components/PostsRecentes";

function Home() {
  return (
    <div className="relative w-full">
      <Banner />
      <MuralDaSemana />
      <PostsRecentes />
      <MomentosQueMarcam />
      <Jogos />
    </div>
  );
}

export default Home;
