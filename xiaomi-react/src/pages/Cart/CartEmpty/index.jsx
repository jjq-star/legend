import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imgObj from './cart.png';
import style from './index.module.css';


export default () => (
        <div className={ style["cart-empty"]} >
                <img src={ imgObj } alt="" />
                <p>购物车中还没有商品哦...</p>
                <Link to="/">去逛逛</Link>
        </div>
);