import {connect} from 'react-redux';
import Workbench from './workbench';
import {addReport} from './actions/reportAction';

const mapStateToProps = (state) => {
    const {title, content} = state.report ? state.report : {title:'', content:''};
    const token = localStorage.user_token ? localStorage.user_token : state.logReducer.token;
    const name = localStorage.user_name ? localStorage.user_name : state.logReducer.name;
    const account = localStorage.user_account ? localStorage.user_account : state.logReducer.account;
    const role = localStorage.user_role ? localStorage.user_role : state.logReducer.role;
    return {
        testBenchData:`This is some data from benchContainer.`,
        title,
        content,
        token:token,
        name:name,
        account:account,
        role:role,
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