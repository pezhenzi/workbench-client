import App from './App';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        testData:`Good Luck!`,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        testDispatch:() => {
            console.log(`Test dispatch from appContainer.`);
        }
    }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;