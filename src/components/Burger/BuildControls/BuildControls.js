import React from 'react'
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'},
];

const buildControls = (props) => (

    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            //apo edw tha tperase st buildControl
            //to kanw funtion gia na perasw to type tou ingrdient
            added = {() => props.ingredientAdded(ctrl.type)}
            remove = {() => props.ingredientRemove(ctrl.type)}
            // vazw type gia na ginei disabled to antistoixo koumpi
            disabled = {props.disabled[ctrl.type]}/>
        ))}
        <button className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
    </div>
);



export default buildControls;