import { connect } from 'react-redux';
import { CartActions } from '../../store';
import CartList from './CartList';

const mapStateToProps = state => ({
        list: state.cart.list
});

const mapDispatchToProps = dispatch => ({
        toggleSelect1: id => dispatch(CartActions.toggleSelect1(id)),
        toggleSelect2: id => dispatch(CartActions.toggleSelect2(id)),
        increase: id => dispatch(CartActions.increase(id)),
        decrease: id => dispatch(CartActions.decrease(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartList);