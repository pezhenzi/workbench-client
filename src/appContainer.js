import App from './App';
import {connect} from 'react-redux';
import {getInitialReports, receiveReportSocket} from "./appAction";

const mapStateToProps = (state) => {
    return {
        testData:`Good Luck!`,
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
    }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;