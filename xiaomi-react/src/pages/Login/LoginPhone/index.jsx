import React, { Component } from 'react';
import LoginInput from '../LoginInput';
import LoginButton from '../LoginButton';

class LoginPhone extends Component{
        render(){
                let { changePhone, changeCode, login } = this.props;
                return (
                        <div>
                                <LoginInput valueChangeHandler={ changePhone } placeholder="+86 手机号码" />
                                <LoginInput valueChangeHandler={ changeCode } placeholder="短信验证码" />
                                <LoginButton onClick={ login } value="立即登录/注册" />
                        </div>
                )
        }
}

export default LoginPhone;