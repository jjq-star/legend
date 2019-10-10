import React, {Component} from 'react';
import LoginPhone from './LoginPhone';

class LoginPhoneContainer extends Component{
        constructor(props) {
                super(props);
                this.state = { phone: '', code: '' };
                this.changePhone = this.changePhone.bind(this);
                this.changeCode = this.changeCode.bind(this);
                this.login = this.login.bind(this);
        }
        changePhone(phone) { this.setState({ phone })}
        changeCode(code) { this.setState({ code })}
        login() { alert("暂未开放") }
        render(){
                return (
                        <LoginPhone
                                changePhone={ this.changePhone }
                                changeCode={ this.changeCode }
                                login={ this.login } />
                )
        }
}

export default LoginPhoneContainer;