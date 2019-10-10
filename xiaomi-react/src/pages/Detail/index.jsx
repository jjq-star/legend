import React, { Component } from 'react';
import API from '../../utils/api.js';
import Wrapper from './Wrapper';

class Detail extends Component{
        constructor(props) {
                super(props);
                this.state = {
                        id: parseInt(this.props.match.params.id),
                        model: {},
                        cartCount: 0,
                };
                this.buy = this.buy.bind(this);
        }
        render(){
                return (
                        <Wrapper
                                buy={ this.buy }
                                model={ this.state.model }
                                cartCount={ this.state.cartCount } />
                );
        }
        componentDidMount() {
                API.product.getModel(parseInt(this.state.id))
                        .then(model => {
                                this.setState({ model })
                        });
                if(sessionStorage.getItem('token')) { // 如果登录了就获取购物车中的 商品数量
                        API.cart.getCount().then(cartCount => this.setState({ cartCount }));
                }
        }
        buy(count) {
                if( !sessionStorage.getItem('token')) {
                        this.props.history.push({ pathname: '/login', state: { referer: this.props.location.pathname } });
                        return new Promise(() => {});
                }
                else return API.cart.addProduct({ pid: this.state.id, count: count })
                        .then(() => this.setState({ cartCount: count + this.setState.cartCount }))
        }
}

export default Detail;