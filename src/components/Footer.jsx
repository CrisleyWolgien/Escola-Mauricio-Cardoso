function FooterEscolar() {
  return (
    <footer
      className="w-full text-gray-200 py-10 px-4"
      style={{ backgroundColor: "#0a1a2f" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-10 md:gap-6">

          {/* ESQUERDA */}
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Escola Maurício Cardoso
            </h2>

            <p className="mt-3 text-gray-300 text-base max-w-sm">
              Educação com carinho, responsabilidade e criatividade.
            </p>

            {/* ÍCONES DE REDES */}
            <div className="flex gap-4 mt-4">
              {/* INSTAGRAM */}
              <a
                href="#"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 7.5h.008v.008H16.5V7.5zM12 9.75A2.25 2.25 0 1 1 9.75 12 2.25 2.25 0 0 1 12 9.75z"
                  />
                </svg>
              </a>

              {/* FACEBOOK */}
              <a
                href="#"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1 .9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* CENTRO - NAVEGAÇÃO */}
          <div className="flex justify-center">
            <nav className="flex flex-wrap justify-center gap-6 text-lg font-semibold max-w-lg">
              {["Sobre", "Notícias", "Momentos", "Calendário", "Jogos", "Projetos"].map(
                (item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-gray-200 hover:text-white transition transform hover:-translate-y-0.5"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* DIREITA - CONTATO */}
          <div className="text-left md:text-right">
            <p className="font-bold text-lg text-white">Contato</p>

            <p className="text-gray-300 text-base mt-2 leading-relaxed">
              contato@mauriciocardoso.com<br />
              (55) 99999-9999
            </p>

            <p className="text-gray-300 text-sm mt-6 font-medium">
              Desenvolvido por{" "}
              <a
                href="https://astrum-craftfly.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 underline"
              >
                Astrum Craftfly
              </a>
            </p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 border-t border-white/10 pt-5 text-center text-sm md:text-base text-gray-300 font-semibold">
          © {new Date().getFullYear()} Escola Maurício Cardoso — Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

export default FooterEscolar;
