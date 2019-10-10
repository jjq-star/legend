import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CartActions } from '../../store';
import Wrapper from './Wrapper';

class Cart extends Component {
        render() {
                return (
                        <Wrapper isEmpty={ this.props.isEmpty } />
                )
        }
        componentDidMount() {
                if(sessionStorage.getItem("token")) this.props.init();
        }
}

const mapStateToProps = state => ({
        isEmpty: state.cart.list.length === 0
});
const mapDispatchToProps = dispatch => ({
        init: () => dispatch(CartActions.init())
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
