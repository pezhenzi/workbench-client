import App from './App';
import {connect} from 'react-redux';
import {receiveReportSocket} from './appSocketAction';

const mapStateToProps = (state) => {
    return {
        testData:`Good Luck!`,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        testDispatch:() => {
            console.log(`Test dispatch from appContainer.`);
        },
        receiveReportSocket:(reportData) => {
            dispatch(receiveReportSocket(reportData));
        },
    }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;