import App from './App';
import {connect} from 'react-redux';
import {getInitialReports, receiveReportSocket} from "./appAction";
import {useReport, topReport, dropReport} from "./bench/pool/poolAction";
import {getInitialCards} from "./bench/cards/cardAction";

const mapStateToProps = (state) => {
    return {
        oldReports:state.initialReports.oldReports,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        receiveReportSocket:(reportData) => {
            dispatch(receiveReportSocket(reportData));
        },
        getInitialReports:() => {
            dispatch(getInitialReports());
        },
        getInitialCards:() => {
            dispatch(getInitialCards());
        },
        //以下三个方法处理socket操作。
        useOneReport:(id, oldReports) => {
            dispatch(useReport(id, oldReports));
        },
        topOneReport:(id) => {
            dispatch(topReport(id));
        },
        dropOneReport:(id) => {
            dispatch(dropReport(id));
        },
    }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;