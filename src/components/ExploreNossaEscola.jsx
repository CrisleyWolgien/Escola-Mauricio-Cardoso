import fundo_explore from "../assets/fundo_papel_rasgado.png";
import CardNossaEscola from "./CardNossaEscola";
import { CalendarDays, Lightbulb, School } from "lucide-react";

function ExploreNossaEscola() {
  return (
    <section
      className="relative w-[98%] mx-auto flex flex-col items-center px-0 md:px-2 "
      style={{
        backgroundImage: `url(${fundo_explore})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom center",
        paddingTop: "3rem",
        paddingBottom: "8rem",
      }}
    >
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-RobotoSlab text-center">
          Explore Nossa Escola
        </h2>

        <div className="flex flex-wrap justify-between mt-12 w-full items-stretch">
          <CardNossaEscola
            icon={<CalendarDays />}
            color={{ iconHex: "#0550F2" }}
            title="Fique por Dentro"
            description="Acompanhe os últimos eventos, projetos e comunicados da nossa comunidade escolar."
            button="Ver Eventos"
          />
          <CardNossaEscola
            icon={<School />}
            color={{ iconHex: "#FF5900" }}
            title="Conheça a Escola"
            description="Explore nossas salas de aula, biblioteca, pátio e toda a estrutura que oferecemos aos alunos."
            button="Ver Escola"
          />
          <CardNossaEscola
            icon={<Lightbulb />}
            color={{ iconHex: "#D400FF" }}
            title="Projetos que Inspiram"
            description="Descubra os projetos que desenvolvemos para estimular a criatividade e o aprendizado."
            button="Ver Projetos"
          />
        </div>
      </div>
    </section>
  );
}

export default ExploreNossaEscola;
