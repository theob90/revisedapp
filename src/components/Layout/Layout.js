import React, {Component} from 'react';
import _Aux from '../../_Aux/_Aux';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

state ={
    showSideDrawer: false
}

sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
}

sideDrawerToogleHandler = () => {
    this.setState((prevState) => {
        return {showSideDrawer: !prevState.showSideDrawer};
    });
}

    render () {
        return (
            <_Aux>
            <Toolbar  drawerToogleClicked ={this.sideDrawerToogleHandler}/>
            <Sidedrawer  open={this.state.showSideDrawer }
            closed={this.sideDrawerClosedHandler}/>
            <main  className={classes.Content}>
                {this.props.children}
            </main>
        </_Aux>
        );
    }


}

export default Layout;