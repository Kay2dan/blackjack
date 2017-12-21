// As each card is unique, we can associate a value with each.
// First we have the 13 cards from Spades,
// then, the 13 cards from Clubs,
// then, the 13 cards from Hearts,
// finally the 13 cards from Diamonds. 

// recursive func which get random card, checks 
export const getRandomCard = ( cardsState, min, max ) => {
   const randValue = Math.floor( Math.random() * ( max - min + 1 ) + min );
   if( cardsState.playerCards.includes( randValue ) ||
       cardsState.dealerCards.includes( randValue )){
      return getRandomCard( cardsState, min, max );
   } else return randValue;
};

// get suit card
export const getCardSuit = ( cardValue ) => {
   if( cardValue < 14 ){
      return "spade";
   } else if( cardValue > 13 && cardValue < 27 ){
      return "club";
   } else if( cardValue > 26 && cardValue < 40 ){
      return "heart";
   } else if( cardValue > 39 ){
      return "diamond";
   }
};

// get the number printed on the card (2,3,4...J, Q, K, A);
export const getCardNumber = ( cardValue ) => {
   let num;
   if( cardValue > 13 ){
      num = cardValue % 13 || 13;
   } else {
      num = cardValue;
   }
   switch( num ){
   case( 11 ) :
      return "jack";
   case( 12 ) :
      return "queen";
   case( 13 ) :
      return "king";
   case( 1 ) :
      return "ace";
   default :
      return num;
   }
}

