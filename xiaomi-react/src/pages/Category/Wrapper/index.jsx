import React, { Component } from 'react';
import LeftContainer from '../LeftContainer';
import RightContainer from '../RightContainer';
import MiNav from '../../../components/MiNav';
import style from './index.module.css';

class Wrapper extends Component {
        render() {
                let { activeId, toggleId } = this.props;
                return (
                        <div className={ style["page-wrapper"] }>
                                <div className={ style["header"] }></div>
                                <div className={ style["content"] }>
                                        <div className={ style["left"] }>
                                                <LeftContainer activeId={ activeId } toggleId={ toggleId } />
                                        </div>
                                        <div className={ style["right"] }>
                                                <RightContainer activeId={ activeId } />
                                        </div>
                                </div>
                                <div className={ style["footer"] }>
                                        <MiNav />
                                </div>
                        </div>
                )
        }
}

export  default Wrapper;