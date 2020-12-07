import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {

        type: actionTypes.ADD_INGREDIENTS,
        // to ingrdient name einai apo to BurgerBuilder
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}


export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        // to 2o igredients to value pou exw apo panw
        ingredients: ingredients
    };
};

export const initIngredients = () => {
    return dispatch =>{
        axios.get('https://react-my-burger-95999.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        });
    };
};