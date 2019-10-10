import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.module.css';

class LoginButton extends Component{
        render(){
                let { value, onClick } = this.props;
                return (
                        <button className={ style["login-button"] } onClick={ onClick } >{ value }</button>
                )
        }
}

LoginButton.propTypes = {
        value : PropTypes.string,
        onClick: PropTypes.func.isRequired
};
LoginButton.defaultProps = {
        value: '确定'
};

export default LoginButton;