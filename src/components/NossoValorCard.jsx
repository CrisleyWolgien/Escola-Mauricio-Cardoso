import React from "react";

// O nome do componente agora é NossoValorCard
const NossoValorCard = ({ icon, color, title, description }) => {
  // Este é o código que vai funcionar para o gabarito
  const styledIcon = React.cloneElement(icon, {
    // 1. Define o CONTORNO como PRETO
    style: { color: "black" },
    // 2. Define o PREENCHIMENTO com a cor
    twoToneColor: color.iconHex,
    // 3. Define o tamanho
    className: "text-4xl",
  });

  return (
    <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
      <div
        className={`w-24 h-24 flex items-center justify-center rounded-full mb-6 ${color.auraClass}`}
      >
        {styledIcon}
      </div>

      <h3
        className="text-2xl font-bold text-gray-900 mb-3"
        style={{ fontFamily: "Baloo 2, cursive" }}
      >
        {title}
      </h3>

      <p className="text-gray-600 text-base leading-relaxed">{description}</p>
    </div>
  );
};

export default NossoValorCard;


