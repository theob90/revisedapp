import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import _Aux from '../../../_Aux/_Aux';


const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses=[classes.SideDrawer, classes.Open];
    }
    return(
        <_Aux>
            {/* // to open kai closed einai apo to layout */}
            <Backdrop show = {props.open} clicked={props.closed}/>
                <div className={attachedClasses.join(' ')}>
                
                <div className={classes.Logo}>
                    <Logo />
                </div>
                    <nav>
                        <NavigationItems />
                    </nav>
                </div>
        </_Aux>
    );
};


export default sideDrawer;