import React from "react";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const CardNossaEscola = ({ icon, color, title, description, button, link }) => {
  const styledIcon = React.cloneElement(icon, {
    style: { color: color.iconHex },
    className: "w-12 h-12",
  });

  return (
    <div
      className={`
        flex flex-col justify-between items-center 
        ${color.cardBgClass || "bg-white"} rounded-2xl shadow-md 
        transition-transform duration-300 hover:shadow-xl hover:-translate-y-1
        w-full h-full  
        p-6
        min-h-104
      `}
    >
      <div className="flex flex-col items-center">
        <div className={`w-24 h-24 flex items-center justify-center rounded-full mb-5 mt-2 ${color.auraClass || "bg-gray-100"}`}>
          {styledIcon}
        </div>

        <div className={`border-t-2 ${color.borderClass || "border-gray-300"} w-full mb-5`}></div>

        <h1
          className="font-bold text-2xl md:text-3xl text-center mb-4 text-gray-800"
        >
          {title}
        </h1>

        <p
          className="text-lg md:text-xl text-center text-gray-700 mb-6"
          style={{ fontFamily: "Baloo 2, cursive" }}
        >
          {description}
        </p>
      </div>

      <div className="flex justify-center w-full mt-4">
        <Link
          to={link || "/"}
          className="bg-[#038C25] text-white rounded-2xl px-6 py-3 flex items-center justify-center
                     shadow-md hover:shadow-lg hover:scale-105 
                     transition-all duration-200 ease-in-out text-lg md:text-xl cursor-pointer"
        >
          <span>{button}</span>
          <span className="pl-2">
            <MoveRight className="w-6 h-6 md:w-8 md:h-8" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CardNossaEscola;