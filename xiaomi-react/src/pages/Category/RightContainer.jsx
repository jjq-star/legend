import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CategoryActions } from '../../store';
import Right from './Right';

class RightContainer extends Component {
        render() {
                let { activeId, avatar, list } = this.props;
                return (
                        <Right activeId={ activeId } avatar={ avatar } list={ list } />
                )
        }
        componentWillReceiveProps(nextProps) {  //当父组件传来的 props 中的任何一个数据发生改变时触发
                if(this.props.activeId !== nextProps.activeId ) this.props.getData(nextProps.activeId);
        }
}


const mapStateToProps = (state, props) => ({
        avatar: props.activeId !== 0 ? state.category.list.find(item => item.id === props.activeId).avatar : '',
        list: props.activeId !== 0 ? state.category.list.filter(item => item.fid === props.activeId) : []
});
const mapDispatchToProps = dispatch => ({
        getData: fid => dispatch( CategoryActions.getData(fid))
});

export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);