function CardJogos({ titulo, descricao, serie, categoria, imagem, link }) {
  return (
    <div
      className="
        w-full
        bg-white rounded-3xl shadow-md
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
        p-5
        flex flex-col
        h-full
      "
    >
      {/* Imagem com tamanho fixo */}
      <div className="flex justify-center">
        <img
          src={imagem}
          className="w-[80%] h-[180px] object-cover rounded-xl"
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col gap-3 mt-5 flex-1">
        <h1 className="text-center font-bold text-2xl text-gray-800">
          {titulo}
        </h1>

        <p className="mx-3 text-base text-gray-700 leading-relaxed line-clamp-4">
          {descricao}
        </p>

        {/* Série e categoria */}
        <div className="mx-3 flex flex-col gap-1 text-lg text-gray-700">
          <p>
            <span className="font-bold">Série:</span> {serie}
          </p>
          <p>
            <span className="font-bold">Categoria:</span> {categoria}
          </p>
        </div>

        {/* Botão alinhado ao final */}
        <div className="flex justify-center mt-auto">
          <a
            href={link}
            target="_blank"
            className="
              bg-blue-600 text-white px-6 py-2
              rounded-xl font-semibold text-lg
              hover:bg-blue-700 transition-all duration-200
            "
          >
            Jogar
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardJogos;
