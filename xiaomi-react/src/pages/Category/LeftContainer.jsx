import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CategoryActions } from '../../store';
import Left from './Left';

class LeftContainer extends Component {
        render() {
                let { list, activeId, toggleId } = this.props;
                return (
                        <Left list={ list } activeId={ activeId } toggleId={ toggleId } />
                )
        }
        componentDidMount() {
                let { getData, toggleId } = this.props;
                getData(0).then(() => toggleId(this.props.list[0].id));
        }
}

const mapStateToProps = ( state, props ) => ({
        list: state.category.list.length > 0 ? state.category.list.filter(item => item.fid === 0) : []
});

const mapDispatchToProps = dispatch => ({
        getData: fid => dispatch(CategoryActions.getData(fid))
});

export default connect(mapStateToProps,mapDispatchToProps)(LeftContainer);