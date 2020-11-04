import React, {Component} from 'react';
import Auxiliary from '../../Auxiliary/Auxiliary';
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
            <Auxiliary>
            <Toolbar  drawerToogleClicked ={this.sideDrawerToogleHandler}/>
            <Sidedrawer  open={this.state.showSideDrawer }
            closed={this.sideDrawerClosedHandler}/>
            <main  className={classes.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
        );
    }


}

export default Layout;