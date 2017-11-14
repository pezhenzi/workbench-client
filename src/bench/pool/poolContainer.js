import Pool from './pool';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        reportsData:state.initialReports.oldReports.data ? state.initialReports.oldReports.data : [],
    };
};

const PoolContainer = connect(mapStateToProps)(Pool);
export default PoolContainer;