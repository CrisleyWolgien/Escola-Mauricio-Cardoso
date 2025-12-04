import React from "react";
import { MoveRight } from "lucide-react";

const CardNossaEscola = ({ icon, color, title, description, button }) => {
  const styledIcon = React.cloneElement(icon, {
    style: { color: color.iconHex },
    className: "w-16 h-16",
  });

  return (
    <div
      className="
        flex flex-col justify-between items-center 
        bg-white rounded-2xl shadow-md 
        transition-transform duration-300 hover:shadow-xl hover:-translate-y-1
        w-full h-full  
        p-6
        min-h-[26rem]
      "
    >
      {/* Removi: max-w-sm e md:w-1/4 */}
      {/* Adicionei: h-full para garantir altura igual */}
      
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center rounded-full mb-5 pt-6">
          {styledIcon}
        </div>

        <div className="border-t-2 border-gray-300 w-full mb-5"></div>

        <h1
          className="font-bold text-2xl md:text-3xl text-center mb-4"
          style={{ color: color.iconHex }}
        >
          {title}
        </h1>

        <p
          className="text-lg md:text-xl text-center text-gray-900 mb-6"
          style={{ fontFamily: "Baloo 2, cursive" }}
        >
          {description}
        </p>
      </div>

      <div className="flex justify-center w-full mt-4">
        <button
          className="bg-[#038C25] text-white rounded-2xl px-6 py-3 flex items-center justify-center
                     shadow-md hover:shadow-lg hover:scale-105 
                     transition-all duration-200 ease-in-out text-lg md:text-xl cursor-pointer"
        >
          <span>{button}</span>
          <span className="pl-2">
            <MoveRight className="w-6 h-6 md:w-8 md:h-8" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CardNossaEscola;