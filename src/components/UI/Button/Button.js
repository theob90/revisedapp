import React from 'react'
import classes from  './Button.css'


const button = (props) => (
    //exw array apo classes, giauto vazw []
    //bazw props.btnType giati tha travaw type gia to an tha eiani cancel i continue
    <button 
    //prosoxio.. to join thelei keno
        className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
);

export default button;