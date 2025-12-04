import logo_saur from "../assets/logo_saur.webp"
import logo_panambi from "../assets/logo_panambi.webp"

function Patrocionios() {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 font-RobotoSlab text-center mb-4">
          Nossos Patrocinadores
        </h1>
        <p className="text-center text-gray-600 pb-10 text-xl md:text-2xl">
          Quem fortalece nossa escola e nossos sonhos 🚀
        </p>

        {/* Layout Flex Wrap centralizado */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          
          <div className="flex flex-col items-center justify-center w-40 md:w-60 p-6 bg-white rounded-2xl shadow-sm hover:scale-110 transition-transform duration-300">
            <img 
              src={logo_panambi} 
              alt="Panambi" 
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="flex flex-col items-center justify-center w-40 md:w-60 p-6 bg-white rounded-2xl shadow-sm hover:scale-110 transition-transform duration-300">
            <img 
              src={logo_saur} 
              alt="Saur" 
              className="w-full h-auto object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Patrocionios;