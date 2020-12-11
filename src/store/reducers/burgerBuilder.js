 import * as actionTypes from '../actions/actionTypes';


const initialState = {

    ingredients: null,
    error: false,
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:1.0,
    cheese:0.4,
    meat:1.3

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
           return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    //dilwnw pio ingredient tha ginei add..einai san payload st action
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
           };
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

            };
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients,
                error: false
            }; 

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }
            
             
    }
    return state; 
};


export default reducer;