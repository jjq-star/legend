import React, {Component} from 'react';
import CartFooter from './CartFooter';
import { CartActions } from '../../store';
import { connect } from 'react-redux';




const mapStateToProps = state => ({
        allSelect1: state.cart.list.every(item => item.select1),
        allSelect2: state.cart.list.every(item => item.select2),
        total1: state.cart.list.filter(item => item.select1).reduce((sum,item) => sum + item.count, 0),
        total2: state.cart.list.filter(item => item.select2).reduce((sum,item) => sum + item.count, 0),
        account: state.cart.list.filter(item => item.select1).reduce((sum,item) => sum + item.count * item.price, 0)
});
const mapDispatchToProps = dispatch => ({
        toggleAllSelect1: checked => dispatch(CartActions.toggleAllSelect1(checked)),
        toggleAllSelect2: checked => dispatch(CartActions.toggleAllSelect2(checked)),
        remove: () => dispatch(CartActions.remove())
});
export default connect(mapStateToProps, mapDispatchToProps)(CartFooter);