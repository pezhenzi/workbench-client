import Pool from './pool';
import {connect} from 'react-redux';
import {useReport, dropReport, topReport, showEditorCreateModal, currentReport} from "./poolAction";

const mapStateToProps = (state) => {
    const cardsList = state.cardReducer.cardsList;
    return {
        reportsData:state.initialReports.oldReports ? state.initialReports.oldReports : [],
        cardsList:cardsList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        topTargetReport:(id) => {
            dispatch(topReport(id));
        },
        dropTargetReport:(id) => {
            dispatch(dropReport(id));
        },
        showEditorCreate:() => {
            dispatch(showEditorCreateModal());
        },
        getCurrentReport:(id) => {
            dispatch(currentReport(id));
        },
    }
};
const PoolContainer = connect(mapStateToProps, mapDispatchToProps)(Pool);
export default PoolContainer;