import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import imgObj from './cart.png';
import style from './index.module.css';


export default withRouter(({ location }) => (
        <div className={ style["cart-without-login"]} >
                <img src={ imgObj } alt="" />
                <p>登录后才能看见商品哦...</p>
                <Link to={{ pathname: '/login', state: { referer: location.pathname } }}>立即登录</Link>
        </div>
));