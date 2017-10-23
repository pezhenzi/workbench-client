import {connect} from 'react-redux';
import Workbench from './workbench';
import {addReport} from './actions/reportAction';

const mapStateToProps = (state) => {
    const {title, content} = state.report;
    return {
        testBenchData:`This is some data from benchContainer.`,
        title,
        content,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        testBenchDispatch:() => {
            console.log(`A test dispatch from benchContainer.`);
        },
        testAddReport:(data) => {
            dispatch(addReport(data));
        }
    }
};

const BenchContainer = connect(mapStateToProps, mapDispatchToProps)(Workbench);
export default BenchContainer;