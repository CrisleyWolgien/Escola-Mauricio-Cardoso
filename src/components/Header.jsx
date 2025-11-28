function Header() {
  return (
    <>
      <div className="">
        <div className="flex flex-row arround justify-between p-3 px-5 ">
          <h1 className="text-[35px] font-bold items-center font-comicNeue ">EMEF MAURICIO CARDOSO</h1>
          <ul className="flex flex-row text-[22px] items-center font-comicNeue">
            <li className="px-2">Sobre Nós</li>
            <li className="px-2">Notícias</li>
            <li className="px-2">Calendario</li>
            <li className="px-2">Área dos Pais</li>
            <li className="px-2">Contato</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
