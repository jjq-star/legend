import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.module.css';

class LoginInput extends Component{
        render(){
                let { placeholder, type, valueChangeHandler } = this.props;
                return (
                        <div className={ style["login-input"] }>
                                <input
                                        type={ type }
                                        placeholder={ placeholder }
                                        onBlur={ e => valueChangeHandler(e.target.value)}
                                />
                        </div>
                );
        }
}

//类组件对外属性进行强制约定(表达对数据的预期）
LoginInput.propTypes = {
        valueChangeHandler: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        type: PropTypes.string
};
//类组件设置对外属性的默认值
LoginInput.defaultProps = {
        placeholder: '请输入...',
        type: 'text'
};
export default LoginInput;