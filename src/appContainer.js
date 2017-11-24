import App from './App';
import {connect} from 'react-redux';
import {getInitialReports, receiveReportSocket} from "./appAction";
import {useReport, topReport, dropReport} from "./bench/pool/poolAction";
import {getInitialCards, addCard} from "./bench/cards/cardAction";

const mapStateToProps = (state) => {
    const account = localStorage.user_account ? localStorage.user_account : state.homeReducer.logReducer.account;
    return {
        oldReports:state.initialReports.oldReports,
        account:account,
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
        useOneReport:(id, oldReports) => {
            dispatch(useReport(id, oldReports));
        },
        topOneReport:(id) => {
            dispatch(topReport(id));
        },
        dropOneReport:(id) => {
            dispatch(dropReport(id));
        },
        addOneCard:(data) => {
            dispatch(addCard(data));
        },
    }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;