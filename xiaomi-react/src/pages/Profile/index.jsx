import React, { Component } from 'react';
import MiNav from '../../components/MiNav';
import style from './index.module.css';

class Profile extends Component {
        render() {
                return(
                        <div className={ style["page-wrapper"] }>
                                这是个人中心页
                                <MiNav />
                        </div>
                );
        }
}

export default Profile;