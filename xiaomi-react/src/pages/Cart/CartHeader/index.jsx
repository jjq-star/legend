import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import style from './index.module.css';

class CartHeader extends Component{
        render(){
                return (
                        <div className={ style["cart-header"] }>
                                <h1>购物车</h1>
                                <div className={ style["left"] }>
                                        <a className="iconfont icon-back" onClick={ () => this.props.history.goBack() } ></a>
                                </div>
                                <div className={ style["right"]}>
                                        { this.props.children }
                                </div>
                        </div>
                )
        }
}

export default withRouter(CartHeader);