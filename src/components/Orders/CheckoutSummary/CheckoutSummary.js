import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%', margin:'auto', left:'-20px'}}>
                <Burger ingredients = {props.ingredients} />
            </div>
            <Button btnType="Danger" click={props.orderCancel}>CANCEL</Button>
            <Button btnType="Success" click={props.orderContinue} >CONTINUE</Button>

        </div>
    );
}
export default checkoutSummary;