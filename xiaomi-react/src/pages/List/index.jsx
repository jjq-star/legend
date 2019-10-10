import React,{ Component } from 'react';
import ListContext from './context.js';
import { connect } from 'react-redux';
import { CategoryActions,ProductActions } from '../../store';
import Wrapper from './Wrapper';

class List extends Component{
        constructor(props) {
                super(props);
                this.toggleShowMode = this.toggleShowMode.bind(this);
                this.state = {
                        mId: parseInt(props.match.params.mId),
                        showWithListMode: 'false',
                        toggleShowMode: this.toggleShowMode
                }
        }
        toggleShowMode() { this.setState({ showWithListMode: !this.state.showWithListMode }); }
        render(){
                return (
                        <ListContext.Provider value={ this.state }>
                                <Wrapper mId={ this.state.mId } />
                        </ListContext.Provider>
                );
        }
        componentDidMount() {
                this.props.getCategoryData(0).then(() =>this.props.getCategoryData(parseInt(this.props.match.params.mId)));
                this.props.changeSId(parseInt(this.props.match.params.sId));
        }
        //负责： 如果路由中的 mId 或 sId 如果变化了马上把最新值写到 state 中的 mId 和 sId 中去
        componentWillReceiveProps(nextProps) {
                if(/^\/list\/\d+\/\d+$/.test(nextProps.location.pathname)) {
                        let { mId, sId } = nextProps.match.params;
                        if(this.state.mId !== parseInt(mId)) {
                                this.setState({ mId: parseInt(mId) });
                        }
                        this.props.changeSId(parseInt(sId));
                }
        }
        shouldComponentUpdate(nextProps,nextState) {
                //使这个组件在离开的时候不用刷新
                //不要再这个生命周期钩子函数中修改 state
                return /^\/list\/\d+\/\d+$/.test(nextProps.location.pathname);
        }
}

const mapDispatchToProps = dispatch => ({
        getCategoryData: fid => dispatch(CategoryActions.getData(fid)),
        changeSId: sId => dispatch(ProductActions.changeSId(sId))
});

export default connect(null,mapDispatchToProps)(List);