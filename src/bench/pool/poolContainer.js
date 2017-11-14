import Pool from './pool';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        reportsData:state.initialReports.oldReports ? state.initialReports.oldReports : [],
    };
};

const PoolContainer = connect(mapStateToProps)(Pool);
export default PoolContainer;