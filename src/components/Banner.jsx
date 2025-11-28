import fotoBanner1 from "../assets/foto_banner1.jpeg";

function Banner() {
  const bannerStyle = {
    backgroundImage: `
      linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 60%), 
      url(${fotoBanner1})
    `,
  };
  return (
    <section
      style={bannerStyle}
      className="relative h-[550px] w-full bg-cover bg-no-repeat"
    >
      <div className="flex h-full w-full flex-col items-center text-white  p-10">
        <h1 className="font-Poppins font-extrabold text-[45px]">
          EDUCANDO PARA O FUTURO
        </h1>
        <p className="font-RobotoSlab font-bold text-[40px] pt-10 ">
          Um espaço para aprender, crescer e ser feliz em comunidade
        </p>
        <div className="mt-auto flex flex-col gap-100 pt-10 mb-10 sm:flex-row">
          <button className="rounded-full bg-gray-800 px-8 py-3 font-semibold text-white transition hover:bg-gray-700 text-[24px]">
            Conheça Nossa Escola
          </button>
          <button className="rounded-full border-2 border-white/80 px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-gray-900 text-[24px]">
            Últimas Notícias
          </button>
        </div>
      </div>
    </section>
  );
}

export default Banner;
