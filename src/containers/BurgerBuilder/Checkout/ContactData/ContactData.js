
import React, { Component } from 'react';
import Button from '../../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../../axios-orders';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Input from '../../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        orderForm: {
                    name:{
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Your name'
                        },
                        value:'',
                        validation: {
                            required: true
                        },
                        valid:false
                    },
                    street: {
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Street'
                        },
                        value:'',
                        validation: {
                            required: true
                        },
                        valid:false
                    },
                    zipcode: {
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Zip Code'
                        },
                        value:'',
                        validation: {
                            required: true
                        },
                        valid:false
                    },
                    country: {
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Country'
                        },
                        value:'',
                        validation: {
                            required: true
                        },
                        valid:false
                    },
                    email: {
                        elementType: 'input',
                        elementConfig:{
                            type:'email',
                            placeholder:'E-mail'
                        },
                        value:'',
                        validation: {
                            required: true
                        },
                        valid:false
                    },   
                    delivery_meth: {
                        elementType: 'select',
                        elementConfig:{
                            options:[
                                {value: 'fastest', displayValue:'Fastest'},
                                {value: 'cheapest', displayValue:'Cheapest'}

                        ]
                        },
                        value:''
                    }
        },
        loading: false
    }

    checkValidity(value, rules)  {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !=='';
        }

        return isValid;
    }

    orderHandler = (event) => { 
        event.preventDefault();
        console.log(this.props.ingredients);

        //pairnw ta stoixeia apo t state
        const formData ={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData

        }

        axios.post('/orders.json', order)
        .then(response => {
            
            this.setState({loading: false, purchasing: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});
        });
    }

        // ta id apo to changed einai to identifier diladi name....
        inputChangedHandler = (event, inputIdentifier) => {
            console.log(event.target.value);
            const updatedOrderForm = {
                ...this.state.orderForm
            };
            // gia n ginoun copy kai ta nested stoixeia 
            const updatedFormElement = {
                ...updatedOrderForm[inputIdentifier
                ]};
            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            updatedOrderForm[inputIdentifier] = updatedFormElement;
            this.setState({orderForm: updatedOrderForm});
        }
    

    render (){

        const formElemtnsArray = [];
        //ta keys einai name, street,zipcode...
        //config eiani auto pou uparxoun mesa st name,street...
        for (let key in this.state.orderForm){
            formElemtnsArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }


        let form =(
            <form onSubmit ={this.orderHandler}>
            {formElemtnsArray.map(formElement => (
                <Input 

                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button btnType="Success">Order</Button>
        </form>

        );

        if (this.state.loading){
            form =<Spinner/>;
        }
        return(


            <div className={classes.ContactData}>
                <h4>Enter you Data</h4>
               {form}
            </div>

        );
    }
}


export default ContactData;