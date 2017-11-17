import Pool from './pool';
import {connect} from 'react-redux';
import {useReport, topReport, dropReport} from "./poolAction";

const mapStateToProps = (state) => {
    console.log(state);
    return {
        reportsData:state.initialReports.oldReports ? state.initialReports.oldReports : [],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        useTargetReport:(id, oldReports) => {
            dispatch(useReport(id, oldReports));
        },
        topTargetReport:(id, oldReports) => {
            dispatch(topReport(id, oldReports));
        },
        dropTargetReport:(id, oldReports) => {
            dispatch(dropReport(id, oldReports));
        },
    }
};
const PoolContainer = connect(mapStateToProps, mapDispatchToProps)(Pool);
export default PoolContainer;