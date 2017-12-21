import React, {Component, PropTypes} from 'react';
import { List as iList } from "immutable";
import { getRandomCard,
         getCardPoint } from "./utility";
import Button from '../button';
import TableSection from '../tableSection';
import Overlay from "../overlay";
import './app.css';

var timerId;

class App extends Component {

   constructor(){
      super();
      this.state = {
         gameState: 'in progress', // 'player wins!', 'dealer wins!'
         turn : 'player',
         playerPoints : 0,
         dealerPoints : 0,
         playerCards: iList([
         ]),
         dealerCards: iList([
         ]),
         btnHitState : true,
         btnStickState : true
      }
      this.addACard = this.addACard.bind( this );
      this.stickItHandler = this.stickItHandler.bind( this );
   }

   // this complicated looking func merely adds cards to the player's deck
   // & the dealer's deck. Then clears the timer
   componentDidMount(){
      const addACard = this.addACard;
      setTimeout(() => {
         timerId = setInterval(() => {
            addACard( 'player' );
         }, 500 );
         setTimeout(() => {
            addACard( 'dealer' );
         }, 250 );
         setTimeout(() => {
            clearInterval( timerId );
         }, 1001 );

      }, 500 );
   }

   addACard( playerOrDealer ){
      const ref = `${playerOrDealer}Cards`;
      const newCard = getRandomCard( this.state, 1, 52 );
      const ttlPlayerCards = this.state[ ref ].push( newCard );
      const ttlPoints = this.calcTtlPoints(playerOrDealer, ttlPlayerCards );
      this.setState({ 
         [ ref ] : this.state[ ref ].push( newCard ),
         [ `${ playerOrDealer }Points`] : ttlPoints
      });
      setTimeout(() => {
         const points = this.state[`${playerOrDealer}Points`];
         const checkWin = this.checkWinCondition(playerOrDealer, points);
         this.setState({
               gameState: checkWin
         });
         if( points > 21 ){
            clearInterval( timerId );
         }
      }, 250);
   }

   // we use this func to calc all the cards. Aces & picture cards are 
   // treated differently. Aces are dealth at the end where we check 
   // the best fit for its value, whether it should be 1 or 11 to be
   // added to the totalPoints;
   calcTtlPoints( playerOrDealer, cards ){
      let ttlPoints = 0;
      let acesStack = [];
      cards.forEach(( cardStackId ) => {
         const rem = cardStackId < 14 ? cardStackId : ( cardStackId % 13 || 13 );
         if( this.checkForAces( rem )){
            acesStack.push( cardStackId );
         } else {
            ttlPoints += this.checkGreaterThanTen( rem );
         }
      });
      acesStack.forEach(( aceCard ) => {
         if( ttlPoints - 11 > 21 ){
            ttlPoints += 1;
         } else {
            ttlPoints += 11;
         }
      });
      return ttlPoints;
   }

   checkForAces( cardValue ){
      if( cardValue === 1){
         return true;
      }
   }

   // This func simply checks if the value is greater than 10, then its presumed to be
   // a King, Queen, Jack. So the return value is 10. Othewise, it returns the value;
   checkGreaterThanTen(cardValue){
      if (cardValue <= 10) {
         return cardValue;
      } else return 10;
   }

   checkWinCondition( playerOrDealer, points ){
      console.log( 'checkWinCondition..', playerOrDealer, points );
      if( points === 21 ){
         console.log( 1 );
         return `${ playerOrDealer } wins!`;
      } else if( points < 21 ){
         console.log(2);
         return 'in progress';
      } else if( points > 21 ){
         let otherPlayer = playerOrDealer === 'player' ? 'dealer' : 'player';
         console.log(3);
         return `${ otherPlayer } wins!`;
      }
   }

   stickItHandler(){
      this.setState({
         btnHitState : false,
         btnStickState : false
      });
      setTimeout(() => {
         timerId = setInterval(() => {
            this.addACard( 'dealer' );
         }, 500);
      }, 250 );
   }

   render(){
      const players = [ 'player', 'dealer' ];
      const tableSections = players.map(( eachPlayer, i ) => {
         return <TableSection type = { eachPlayer }
                              points={ this.state[ `${ eachPlayer }Points` ]}
                              cards = { this.state[ `${ eachPlayer }Cards` ]}
                              key = { `ts${ i }`}/>;
      });
      return(
         <div className = 'main'>
            <header>
               <h1 className = 'title'>Black Jack</h1>
               <div className = 'ctrls'>
                  <Button btnType = 'hit'
                          enable = { this.state.btnHitState }
                          onclickAction = {() => this.addACard( 'player' )}/>
                  <Button btnType = 'stick'
                          enable = { this.state.btnStickState }
                          onclickAction = { this.stickItHandler }/>
               </div>
            </header>
            <div className = 'table'>
               { tableSections }
            </div>
            { this.state.gameState === "in progress" ?
               false : <Overlay gameState = { this.state.gameState }/> }
         </div>
      );
   }

}

export default App;