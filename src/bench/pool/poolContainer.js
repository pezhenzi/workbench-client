import Pool from './pool';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {

    return {
        newReportFromSocket:state.appSocketReducer.reportSocket ? state.appSocketReducer.reportSocket : [],
    };
};

const PoolContainer = connect(mapStateToProps)(Pool);
export default PoolContainer;