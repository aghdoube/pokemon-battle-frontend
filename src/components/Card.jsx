import React from "react";

const Card = ({ name, image, attack, children }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <img src={image} alt={name} className="w-32 h-32 mx-auto" />
        <h2 className="text-lg font-bold mt-2">{name}</h2>
        <p className="text-sm text-gray-600">Catch me</p> 

        {children}
      </div>
    );
  };
  
  export default Card;
  