import React, {Component} from 'react'
import Auxiliary from '../../../Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('order did update');
    }


    render () {


        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>);
        });

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>a delicious with the following ingredients</p>

                <ul>
                    <li>
                        {ingredientSummary}
                    </li>
                </ul>
                {/* // tp prise to pernei apo burgerBuilder */}
                <p><strong>Total price:{this.props.price.toFixed(2)} </strong></p>

                <p>Continue to checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
            </Auxiliary>
        );
    }

}




export default OrderSummary;