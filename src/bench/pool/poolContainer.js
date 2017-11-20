import Pool from './pool';
import {connect} from 'react-redux';
import {useReport, dropReport, topReport, showEditorCreateModal} from "./poolAction";

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
        topTargetReport:(id) => {
            dispatch(topReport(id));
        },
        dropTargetReport:(id) => {
            dispatch(dropReport(id));
        },
        showEditorCreate:() => {
            dispatch(showEditorCreateModal());
        },
    }
};
const PoolContainer = connect(mapStateToProps, mapDispatchToProps)(Pool);
export default PoolContainer;