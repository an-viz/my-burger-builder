import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
    return <li key={igKey}><span style={{textTransform :'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>;
    });

    return(
        <Auxiliary>
            <h2 style={{textAlign:'center', fontFamily:'cursive'}}>Your Order Summary</h2>
            <p>A delicious burger with the following ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p style={{textAlign:'right'}}>Total Price : <strong>{props.price.toFixed(2)} $</strong></p>
            <p>Continue to check out?</p>
            <Button btnType="Danger" click={props.orderCancel}>CANCEL</Button>
            <Button btnType="Success" click={props.orderContinue} >CONTINUE</Button>
        </Auxiliary>
    );
    
};

export default orderSummary;