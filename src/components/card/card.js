import React, {PropTypes} from 'react';
import './card.css';


function Card({ cardSuit, cardNumber }){
  return (
      <div className = { `card card-suit-${ cardSuit } card-value-${ cardNumber }` }/>
  );
}

export default Card;
