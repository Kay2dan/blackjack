import React from "react";
import CardSection from "../cardSection";

const TableSection = ({ type, points, cards }) => {
   return(
      <div className = 'tableSection'>
         <CardSection cards = { cards }/>
         <div className = 'pointsSection'>
            <h3>Points Total:</h3>
            <span>{ points }</span>
         </div>
         <div className = { 'player' }>
            { type }
         </div>
      </div>
   );
}

export default TableSection;
