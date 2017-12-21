import React, {PropTypes} from 'react';
import './button.css';

function Button({ btnType, enable, onclickAction }){
   const themeClass = btnType === 'hit' ? 'button-color-primary' : 'button-color-tertiary';
   return(
      <button type = "button"
              className = { `button ${ enable ? '' : 'disabled' } ${ themeClass }` }
              onClick = {() => onclickAction()}>
         { btnType }
      </button>
   );
}

export default Button;
