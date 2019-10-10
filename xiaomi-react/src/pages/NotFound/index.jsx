import React, { Component } from 'react';
import style from './index.module.css';

class NotFound extends Component {
        render() {
                return (
                        <div className={ style["page-wrapper"] }>这是 404 页面</div>
                );
        }
}

export default NotFound;