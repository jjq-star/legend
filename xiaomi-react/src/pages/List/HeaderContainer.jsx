import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CategoryActions, ProductActions } from '../../store';
import Header from './Header';


const mapStateToProps = (state,{ mId }) => ({
        title: state.category.list.length > 0 ? state.category.list.find(item =>item.id === mId).name : '',
        list: state.category.list.filter(item => item.fid === mId),     //  分类
        orderCol: state.product.orderCol,
        orderDir: state.product.orderDir,
});
const mapDispatchToProps = dispatch => ({
        toggleOrder: orderCol => dispatch(ProductActions.toggleOrder(orderCol)),
        changeName: name => dispatch(ProductActions.changeName(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);