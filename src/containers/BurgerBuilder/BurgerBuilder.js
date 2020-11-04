
import React, {Component} from 'react';
import Auxiliary from '../../Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:1.0,
    cheese:0.4,
    meat:1.3

}


class BurgerBuilder extends Component {
    state ={
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    } 

    componentDidMount () {
        axios.get('https://react-my-burger-95999.firebaseio.com/ingredients.json')
            .then(response => {
                //response.data pernei ta dedomena apo backend
                this.setState({ingredients: response.data});
            });
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES -1;
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
        this.updatePurchaseState(updatedIngredients);
    }


    addIngredientHandler = (type) => {
        //pernw to uparxon state
        const oldcount = this.state.ingredients[type];
        const updatedCount = oldcount + 1 ;
        //kanw copy to state giati de mporw n parw t idio
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type] ;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
       
        // vazw updatedIngredients gia na parw to new state
        this.updatePurchaseState(updatedIngredients);

    }

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
        this.setState({purchaseable: sum >0});
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
        // // alert('You continue');
        

        const queryParams = [];
        for(let i in this.state.ingredients){
            //metatrepw to ingredients oste na mpoun st url gia t search este na t perasw st checkut
            queryParams.push(encodeURIComponent(i)+ '='+ encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'&' + queryString
        });

    }


    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {

            disabledInfo[key] = disabledInfo[key]<=0 //gyrnaei true  i false
        }

        let orderSummary = null;
        
        let burger = <Spinner/>
            if( this.state.ingredients){
                burger = (
                    <Auxiliary>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                        // pernaw to ingrdientAdded st buildcontrols
                        // apo ekei me ena onoma px added
                        // to pernei vazontas props.ingredientAdded
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchaseable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}/>
                    </Auxiliary>
                    ); 
                    
                    orderSummary = <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder);