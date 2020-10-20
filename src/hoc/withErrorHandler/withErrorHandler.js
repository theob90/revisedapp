import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import _Aux from '../../_Aux/_Aux';


const withErrorHandler = (WrappedComponent, axios)  => {
    return (props) => {
        return(
            <_Aux>
                <Modal >
                    something did not wrok!
                </Modal>
                <WrappedComponent {...props}/>
            </_Aux>
        );
    }
}

export default withErrorHandler;