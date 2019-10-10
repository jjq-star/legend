import React, {Component} from 'react';
import LoginInput from '../LoginInput';
import LoginButton from '../LoginButton';

class LoginPwd extends Component{
        render(){
                let { changeAccount, changePwd, login } = this.props;
                return (
                        <div>
                                <LoginInput valueChangeHandler={ changeAccount } placeholder="邮箱/手机号/小米账号" />
                                <LoginInput valueChangeHandler={ changePwd } placeholder="密码" type="password" />
                                <LoginButton onClick={ login } value="登录" />
                        </div>
                )
        }
}

export default LoginPwd;