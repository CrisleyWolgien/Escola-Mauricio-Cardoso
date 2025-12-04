import fotoBanner1 from "../assets/foto_banner1.jpeg";

function Banner() {
  const bannerStyle = {
    backgroundImage: `
      linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 60%), 
      url(${fotoBanner1})
    `,
  };
  return (
    <section
      style={bannerStyle}
      className="relative h-[500px] md:h-[550px] w-full bg-cover bg-center bg-no-repeat"
    >
      <div className="flex h-full w-full flex-col items-center justify-center md:justify-start text-white p-6 md:p-10 text-center">
        
        {/* Títulos Responsivos */}
        <h1 className="font-Poppins font-extrabold text-3xl md:text-[45px] leading-tight md:mt-10">
          EDUCANDO PARA O FUTURO
        </h1>
        <p className="font-RobotoSlab font-bold text-xl md:text-[40px] pt-4 md:pt-10 max-w-4xl leading-snug">
          Um espaço para aprender, crescer e ser feliz em comunidade
        </p>

        {/* Botões: Coluna no mobile, Linha no desktop */}
        <div className="mt-auto flex flex-col md:flex-row gap-4 md:gap-10 pb-10 w-full md:w-auto px-4">
          <button className="w-full md:w-auto rounded-full bg-gray-800 px-6 py-3 font-semibold text-white transition hover:bg-gray-700 text-lg md:text-[24px]">
            Conheça Nossa Escola
          </button>
          <button className="w-full md:w-auto rounded-full border-2 border-white/80 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-gray-900 text-lg md:text-[24px]">
            Últimas Notícias
          </button>
        </div>
      </div>
    </section>
  );
}

export default Banner;