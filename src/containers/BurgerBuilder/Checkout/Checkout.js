
import React, { Component } from 'react';
import CheckoutSummary from '../../../components/CheckoutSummary/ChceckoutSummary';
import {Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';  
import {connect} from 'react-redux';

class Checkout extends Component  {

    // state={
    //     ingredients: null,
    //     price: 0
    // }


// componentWillMount() {

//     // edw painoume t params apo t url kai t metatrepei se salad,bacon klp
//     const query = new URLSearchParams(this.props.location.search);
//     const ingredients = {};
//     let price =0;
//     for (let param of query.entries()) {
//         //['salad', '1']
//         if(param[0] ==='price') {
//             price=param[1];
//         } else {
//             ingredients[param[0]] = +param[1]

//         }
//     }
//     this.setState({ingredients: ingredients, totalPrice: price});
// }


    checkoutCanceledHandler = () => {
        //to push paei se mia selida pou orizoume
        //to goBack paei pisw
        this.props.history.goBack();
    }


    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutCanceled={this.checkoutCanceledHandler}
                checkoutContinue={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path + '/contact-data'} 
                component = {ContactData}
            
                />
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        
    }
};
// de thelw na kanw kapoio action dispatch ara de tha valw mapdispatchtoprops


export default connect(mapStateToProps,null)(Checkout);