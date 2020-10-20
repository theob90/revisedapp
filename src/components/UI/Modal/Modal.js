import React, { Component } from 'react'
import classes from './Modal.css';
import _Aux from '../../../_Aux/_Aux';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {



    render(){
        return (
            <_Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                className={classes.Modal}
                
                style={{
        
                    //to show to pairnei apo to modal st burgerBuilder
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity:this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
        </_Aux>
        );
    }
}
export default Modal;