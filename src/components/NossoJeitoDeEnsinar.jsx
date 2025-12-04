import NossoValorCard from "./NossoValorCard";
import { HeartTwoTone, BulbTwoTone, ContactsTwoTone } from "@ant-design/icons";

const valuesData = [
  {
    icon: <HeartTwoTone />, 
    color: { iconHex: "#FF0000", auraClass: "bg-red-100" },
    title: "Acolhimento",
    description: "Aqui, cada aluno é único, respeitado e se sente em casa para explorar seu potencial.",
  },
  {
    icon: <BulbTwoTone />, 
    color: { iconHex: "#faad14", auraClass: "bg-yellow-100" },
    title: "Criatividade",
    description: "Estimulamos a curiosidade, o pensamento crítico e a descoberta de novas paixões.",
  },
  {
    icon: <ContactsTwoTone />, 
    color: { iconHex: "#40a9ff", auraClass: "bg-blue-100" },
    title: "Comunidade",
    description: "Acreditamos na força da parceria entre escola, família e alunos para construir o futuro.",
  },
];

const NossoJeitoDeEnsinar = () => {
  return (
    // Padding ajustado: py-12 no mobile, py-24 no desktop
    <section className="bg-white py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-RobotoSlab text-center mb-10 md:mb-15">
          Nosso Jeito de Educar
        </h2>
        {/* Grid ajustado automaticamente: 1 coluna no mobile, 3 no desktop */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {valuesData.map((value) => (
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