import React, {Component} from 'react';
import LoginPhoneContainer from '../LoginPhoneContainer';
import LoginPwdContainer from '../LoginPwdContainer';
import { Link } from 'react-router-dom';
import style from './index.module.css';

class Wrapper extends Component {
        constructor(props) {
                super(props);
                this.state = { mode: true };
        }
        render(){
                return (
                        <div className={style["page-wrapper"] }>
                                <h1>欢迎登录小米有品</h1>
                                { this.state.mode ? (<LoginPhoneContainer />) : (<LoginPwdContainer />) }
                                <a  onClick={ () => this.setState({ mode: !this.state.mode })}>
                                        { this.state.mode ? "用户名密码登录" : "手机登录"}
                                </a>
                                <Link to="/register" className={style["register"]}>立即注册</Link>
                        </div>
                )
        }
}

export default Wrapper;