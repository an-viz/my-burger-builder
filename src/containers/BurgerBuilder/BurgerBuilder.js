import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGERDIENT_PRICES= {
    salad : 0.5,
    cheese : 1,
    bacon : 0.7,
    meat : 1.2
};

class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable : false,
        purchased : false,
        loading : false
    }
    componentDidMount(){
        axios.get('https://react-burger-builder-3c0c3.firebaseio.com/ingredients.json')
            .then( response => {
                this.setState({ingredients : response.data})
            })
    }
    updatePurchaseState (ingredients){
        const sum = Object.keys(this.state.ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum+el;
        },0);
        this.setState({
            purchasable : sum>0
        })
    }
    addIngredientHandler = (type) => {
            const oldCount = this.state.ingredients[type];
            const updatedCount = oldCount +1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;

            const oldPrice = this.state.totalPrice;
            const updatedPrice = oldPrice + INGERDIENT_PRICES[type];
            this.setState({
                ingredients : updatedIngredients,
                totalPrice : updatedPrice
            })
            this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const oldPrice = this.state.totalPrice;
            const updatedPrice = oldPrice - INGERDIENT_PRICES[type];
            this.setState({
                ingredients : updatedIngredients,
                totalPrice : updatedPrice
            })
            this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () =>{
        this.setState({purchased:true});
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchased : false});
    }

    purchaseContinueHandler = () => {
        // alert('You can continue with your order!')
        
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search : '?' + queryString
        });
    }
    render(){
        const disabledInfo =  {
            ...this.state.ingredients
        };
        for( let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0 ;
        }

        let orderSummary = null;

        let burger = <Spinner />

        if(this.state.ingredients){
            burger = <Auxiliary>
                        <Burger ingredients = {this.state.ingredients}/>
                        <BuildControls
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled = {disabledInfo}
                        price = {this.state.totalPrice}
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchaseHandler} />
                    </Auxiliary>;
            orderSummary = <OrderSummary ingredients={this.state.ingredients} 
                            price={this.state.totalPrice}
                            orderCancel = {this.purchaseCancelHandler}
                            orderContinue={this.purchaseContinueHandler}  />
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return(
            <Auxiliary>
                <Modal show ={this.state.purchased} hide={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                 <p style={{border: '2px solid red', boxSizing:'border-box', boxShadow:'0 2px #eee', width:'35%'}}>Created with <span>💖</span> by Anirudh Viswanath</p>

            </Auxiliary>
        );
    }
}
export default BurgerBuilder;