import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
import NossoJeitoDeEnsinar from "./components/NossoJeitoDeEnsinar";
import ExploreNossaEscola from "./components/ExploreNossaEscola";
import MomentosQueMarcam from "./components/MomentosQueMarcam";
import Jogos from "./components/Jogos";
import Footer from "./components/Footer";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Header/>
        <Banner/>
        <NossoJeitoDeEnsinar/>
        <ExploreNossaEscola/>
        <MomentosQueMarcam/>
        <Jogos/>
        <Footer/>
      </div>
    </>
  );
}

export default App;
