
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
    state ={  
 
        purchasing: false,
        loading: false
    } 

    componentDidMount () {
        // axios.get('https://react-my-burger-95999.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         //response.data pernei ta dedomena apo backend
        //         this.setState({ingredients: response.data});
        //     });
    }


    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <=0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES -1;
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    //     this.updatePurchaseState(updatedIngredients);
    // }


    // addIngredientHandler = (type) => {
    //     //pernw to uparxon state
    //     const oldcount = this.state.ingredients[type];
    //     const updatedCount = oldcount + 1 ;
    //     //kanw copy to state giati de mporw n parw t idio
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type] ;
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
       
    //     // vazw updatedIngredients gia na parw to new state
    //     this.updatePurchaseState(updatedIngredients);

    // }

    // tha t kalesw kai sto add/remove handler gia n energopoiithei
    
    updatePurchaseState (ingredients) {

        // to kanw array
        //array of strings
        // igKey einai t salad,bacon ...
        //thle ton arithmo alpo salad, bacon...
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })

        //me to reduce tha kanw olous tous arithmous enan
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return  sum >0;
    }

    purchaseHandler = ()=> {
        this.setState({purchasing:true});
    }

    //afou pataw to backdrop akurwnw to order
    // ara to purchase tha mpei false
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {

        this.props.history.push('/checkout');

    }


    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {

            disabledInfo[key] = disabledInfo[key]<=0 //gyrnaei true  i false
        }

        let orderSummary = null;
        
        let burger = <Spinner/>
            if( this.props.ings){
                burger = (
                    <Auxiliary>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls 
                        // pernaw to ingrdientAdded st buildcontrols
                        // apo ekei me ena onoma px added
                        // to pernei vazontas props.ingredientAdded
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}/>
                    </Auxiliary>
                    ); 
                    
                    orderSummary = <OrderSummary 
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>;
                }
                // eiai gia na fainetai i oxi to spinner

                if (this.state.loading) {
                    orderSummary  = <Spinner/>;
                }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}
const mapStateToProps = state => {
    return {
        //opou eixa ingredient twra t vazw san ing
        //edw den xreiazete naperasw san argument t ings st props.ingrdeintadd/remove
        //giati t kanw st BuildControls...me to ctrl.type//opou type einai salad...Meat
        
        ings: state.ingredients,
        price: state.totalPrice
    };
}
const mapDispatchToProps = dispatch => {
    return {
        //pernaw san payload to ingName...opou tha paei sto reducer san ingredientName
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder));