import { motion } from "framer-motion";
import CardJogos from "./CardJogos";

function Jogos() {
  return (
    <section className="relative floating-dots py-16 ">
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-RobotoSlab text-center mb-10">
        Jogos Educativos
      </h2>

      {/* GRID COM ANIMAÇÃO */}
      <motion.div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-10
          px-10
        "
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* CARD 01 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, type: "spring" }}
          viewport={{ once: true }}
        >
          <CardJogos
            titulo="Jogo 01"
            descricao="Descrição do jogo Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Tempora sit natus cum esse quas modi, enim obcaecati corrupti officia autem corporis."
            serie="1 ano"
            categoria="Matemática"
            imagem="https://ik.imagekit.io/1yjzzwotx/imagens%20jogos%20mauricio%20cardoso/IMG%20JOGO%20TESTE"
            link="https://google.com"
          />
        </motion.div>

        {/* CARD 02 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.25, type: "spring" }}
          viewport={{ once: true }}
        >
          <CardJogos
            titulo="Jogo 02"
            descricao="Descrição do jogo Lorem ipsum dolor sit amet consectetur adipisicing elit."
            serie="1 ano"
            categoria="Matemática"
            imagem="https://ik.imagekit.io/1yjzzwotx/imagens%20jogos%20mauricio%20cardoso/IMG%20JOGO%20TESTE"
            link="https://google.com"
          />
        </motion.div>
      </motion.div>

      {/* BOTÃO VER MAIS */}
      <div className="flex justify-center mt-12">
        <button
          className="
            bg-blue-600 text-white
            px-8 py-3
            rounded-xl text-lg font-semibold
            hover:bg-blue-700 hover:scale-105
            transition-all duration-300 shadow-md
          "
        >
          Ver mais jogos
        </button>
      </div>
    </section>
  );
}

export default Jogos;
