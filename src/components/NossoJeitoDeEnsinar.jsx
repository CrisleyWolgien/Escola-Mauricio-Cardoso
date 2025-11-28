import NossoValorCard from "./NossoValorCard";
import { HeartTwoTone, BulbTwoTone, ContactsTwoTone } from "@ant-design/icons";

const valuesData = [
  {
    icon: <HeartTwoTone />, // Ícone de Coração
    color: {
      iconHex: "#FF0000", // Preenchimento Vermelho
      auraClass: "bg-red-100", // Aura Rosa
    },
    title: "Acolhimento",
    description:
      "Aqui, cada aluno é único, respeitado e se sente em casa para explorar seu potencial.",
  },
  {
    icon: <BulbTwoTone />, // Ícone de Lâmpada
    color: {
      iconHex: "#faad14", // Preenchimento Amarelo
      auraClass: "bg-yellow-100", // Aura Amarela
    },
    title: "Criatividade",
    description:
      "Estimulamos a curiosidade, o pensamento crítico e a descoberta de novas paixões.",
  },
  {
    icon: <ContactsTwoTone />, // Ícone de PESSOAS (para Comunidade)
    color: {
      iconHex: "#40a9ff", // Preenchimento Azul
      auraClass: "bg-blue-100", // Aura Azul
    },
    title: "Comunidade",
    description:
      "Acreditamos na força da parceria entre escola, família e alunos para construir o futuro.",
  },
];

const NossoJeitoDeEnsinar = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2
          className="text-3xl md:text-5xl font-bold text-gray-900 font-RobotoSlab text-center mb-15"

        >
          Nosso Jeito de Educar
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {valuesData.map((value) => (
            // MUDANÇA: Usando o novo componente NossoValorCard
            <NossoValorCard
              key={value.title}
              icon={value.icon}
              color={value.color}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NossoJeitoDeEnsinar;
