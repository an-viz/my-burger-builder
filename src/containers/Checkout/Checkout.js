import React , { Component } from 'react';
import { Route } from 'react-router-dom';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state = {
            ingredients : null,
            price : 0
        }
        
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for( let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients : ingredients, price : price});
    }

    orderCancelHandler = () => {
        this.props.history.goBack();
    }
    orderContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        
        return(
            <div>
                <CheckoutSummary 
                ingredients = {this.state.ingredients}
                orderCancel={this.orderCancelHandler}
                orderContinue={this.orderContinueHandler}/>
                <Route path={this.props.match.path + '/contact-data'} 
                       render={(props) => <ContactData ingredients={this.state.ingredients} price= {this.state.price} {...props} />} />
            </div>
        );
    }
}
export default Checkout;