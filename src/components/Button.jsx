import React from "react";

const Button = ({ text, onClick, color = "blue" }) => {
    return (
      <button
        className={`px-4 py-2 bg-${color}-500 text-white rounded-md hover:bg-${color}-700 transition`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  