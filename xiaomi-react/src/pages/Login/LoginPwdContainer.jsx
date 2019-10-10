import React, { Component } from 'react';
import LoginPwd from './LoginPwd';
import API from '../../utils/api.js';
import { withRouter } from 'react-router-dom';

class LoginPwdContainer extends Component {
        constructor(props) {
                super(props);
                this.state = { account: "", pwd: "" };
                this.changeAccount = this.changeAccount.bind(this);
                this.changePwd = this.changePwd.bind(this);
                this.login = this.login.bind(this);
        }
        changeAccount(account) { this.setState({ account }) }
        changePwd(pwd) { this.setState({ pwd })}
        login() {
                //非空验证
                API.user.loginWithPwd({ name: this.state.account, pwd: this.state.pwd })
                        .then(token => {
                                sessionStorage.setItem('token', token);
                                sessionStorage.setItem('name', this.state.account);
                                this.props.history.replace(this.props.location.state.referer || '/');
                        })
        }
        render() {
                return (
                        <LoginPwd
                                changeAccount={ this.changeAccount }
                                changePwd={ this.changePwd }
                                login={ this.login } />
                )
        }
}

export default withRouter(LoginPwdContainer);