import React from "react";

const HealthBar = ({ hp }) => {
    return (
      <div className="w-full bg-gray-300 rounded-full overflow-hidden mt-2">
        <div
          className={`h-4 ${hp > 50 ? "bg-green-500" : hp > 20 ? "bg-yellow-500" : "bg-red-500"} transition-all duration-500`}
          style={{ width: `${hp}%` }}
        ></div>
      </div>
    );
  };
  
  export default HealthBar;
  