import React from 'react';
import Card from '../card';
import { getCardSuit, getCardNumber } from "../app";

const CardSection = ({ cards }) => {
   return(
      <div className = 'cardSection'>
         { cards.map(( eachCard, i ) => {
            const cardSuit = getCardSuit( eachCard ),
                  cardNumber = getCardNumber( eachCard );
            return(
               <Card cardSuit = { cardSuit }
                     cardNumber = { cardNumber }
                     key = { `card${i}` }/>
            );
         })}
      </div>
   );
};

export default CardSection;