import {connect} from 'react-redux';
import Workbench from './workbench';
import {getToken, logout} from "../home/logAction";

const mapStateToProps = (state) => {
    const {title, content} = state.report ? state.report : {title:'', content:''};
    const token = localStorage.user_token ? localStorage.user_token : state.logReducer.token;
    const name = localStorage.user_name ? localStorage.user_name : state.logReducer.name;
    const account = localStorage.user_account ? localStorage.user_account : state.logReducer.account;
    const role = localStorage.user_role ? localStorage.user_role : state.logReducer.role;
    const cardsList = state.poolReducer.cardsList;
    return {
        title,
        content,
        token:token,
        name:name,
        account:account,
        role:role,
        cardsList:cardsList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getToken:(loginData) => {
            dispatch(getToken(loginData));
        },
        logout:() => {
            dispatch(logout());
        }
    }
};

const BenchContainer = connect(mapStateToProps, mapDispatchToProps)(Workbench);
export default BenchContainer;