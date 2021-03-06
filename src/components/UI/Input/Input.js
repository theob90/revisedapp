import React from 'react';
import classes from './Input.css';

const input = (props) => {


    let inputElement = null;


    switch(props.elementType){
        case('input'):
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case('textarea'):
            inputElement = <textarea className={classes.InputElementInput}{...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case('select'): 
            inputElement  =(
                 <select 
                    className={classes.InputElement}
                    {...props.elementConfig} 
                    value={props.value} onChange={props.changed}>
                        {/* ta option t pernei dunamika apo contactdata */}
                        {props.elementConfig.options.map(option =>(
                            <option key={option.value} 
                                value={option.value}>
                                {option.displayValue} onChange={props.changed}</option>
                        ))}
                 </select>);  
            break;
        default:
            inputElement = <input className={classes.InputElement}{...props.elementConfig} value={props.value}/>;  
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
         </div>
    );

};


export default input;