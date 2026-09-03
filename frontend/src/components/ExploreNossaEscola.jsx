import fundo_explore from "../assets/fundo_papel_rasgado.png";
import CardNossaEscola from "./CardNossaEscola";
import { CalendarDays, Lightbulb, School } from "lucide-react";

function ExploreNossaEscola() {
  return (
    <section className="relative w-full mx-auto flex flex-col items-center py-12 md:py-24">
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-8 py-12 bg-sky-100/80 border-4 border-sky-200 backdrop-blur-sm rounded-[3rem] shadow-xl">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-RobotoSlab text-center">
          Explore Nossa Escola
        </h2>

        {/* Container Flex ajustado com gap e centralização */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 w-full">
          
          {/* Wrapper do Card 1 - Define largura de 30% em PC */}
          <div className="w-full md:w-[30%] min-w-[300px]">
            <CardNossaEscola
              icon={<CalendarDays />}
              color={{ iconHex: "#0550F2", auraClass: "bg-blue-200", cardBgClass: "bg-blue-100", borderClass: "border-blue-300" }}
              title="Fique por Dentro"
              description="Acompanhe os últimos eventos, projetos e comunicados da nossa comunidade escolar."
              button="Ver Eventos"
              link="/calendario"
            />
          </div>

          {/* Wrapper do Card 2 */}
          <div className="w-full md:w-[30%] min-w-[300px]">
            <CardNossaEscola
              icon={<School />}
              color={{ iconHex: "#FF5900", auraClass: "bg-orange-200", cardBgClass: "bg-orange-100", borderClass: "border-orange-300" }}
              title="Conheça a Escola"
              description="Explore nossas salas de aula, biblioteca, pátio e toda a estrutura que oferecemos aos alunos."
              button="Ver Escola"
              link="/sobre"
            />
          </div>

          {/* Wrapper do Card 3 */}
          <div className="w-full md:w-[30%] min-w-[300px]">
            <CardNossaEscola
              icon={<Lightbulb />}
              color={{ iconHex: "#D400FF", auraClass: "bg-fuchsia-200", cardBgClass: "bg-fuchsia-100", borderClass: "border-fuchsia-300" }}
              title="Projetos que Inspiram"
              description="Descubra os projetos que desenvolvemos para estimular a criatividade e o aprendizado."
              button="Ver Projetos"
              link="/noticias"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExploreNossaEscola;