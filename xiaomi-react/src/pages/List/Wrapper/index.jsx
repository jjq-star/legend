import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderContainer from '../HeaderContainer';
import ContentContainer from '../ContentContainer';
import style from './index.module.css';

class Wrapper extends Component {
        render(){
                return (
                        <div className={ style["page-wrapper" ]}>
                                <Link to='/' className={ ["iconfont", "icon-home", style["home"]].join(' ') }></Link>
                                <div className={ style["header"] }>
                                        <HeaderContainer mId={ this.props.mId } />
                                </div>
                                <div className={ style["content" ]}>
                                        <ContentContainer />
                                </div>
                        </div>
                );
        }
}

export default Wrapper;