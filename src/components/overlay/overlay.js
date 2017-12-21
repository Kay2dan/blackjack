import React from "react";

const Overlay = ({ gameState }) => {
   return(
      <div className = 'overlay'>
         <div className = 'notification'>
            {gameState}
         </div>
      </div>
   );
};

export default Overlay;