import logo_saur from "../assets/logo_saur.webp"
import logo_panambi from "../assets/logo_panambi.webp"

function Patrocionios() {
  return (
    <section className="w-full">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 font-RobotoSlab text-center px-10 pt-10 pb-14">
          Nossos Patrocinadores
        </h1>
        <p className="text-center text-gray-600 pb-8 text-2xl">
          Quem fortalece nossa escola e nossos sonhos 🚀
        </p>
      </div>

      <div className="flex justify-center w-full">
        <ul className="flex flex-nowrap overflow-x-auto items-center gap-x-25 px-10 pb-10 scroll-smooth">
          
          <li className="flex flex-col items-center justify-center min-w-[180px] p-5 bg-white rounded-2xl shadow-sm hover:scale-[1.2] transition-transform duration-300">
            <img 
              src={logo_panambi} 
              alt="Panambi" 
              className="h-35 w-auto "
            />
          </li>

          <li className="flex flex-col items-center justify-center min-w-[180px] p-5 bg-white rounded-2xl shadow-sm hover:scale-[1.2] transition-transform duration-300">
            <img 
              src={logo_saur} 
              alt="Saur" 
              className="h-35 w-auto "
            />
          </li>

        </ul>
      </div>
    </section>
  );
}

export default Patrocionios;
