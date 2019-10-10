import { connect } from 'react-redux';
import { ProductActions } from '../../store';
import Content from './Content';

const mapStateToProps = state => ({
        list: state.product.list,
        hasMore: state.product.hasMore,
        isLoading: state.product.isLoading
});

const mapDispatchToProps = dispatch => ({
        loadMore: () => dispatch(ProductActions.loadMore())
});

export default connect(mapStateToProps,mapDispatchToProps)(Content)