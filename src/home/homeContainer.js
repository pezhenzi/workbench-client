import Home from './home';
import {connect} from 'react-redux';
import {getToken, logout} from "./logAction";

const mapStateToProps = (state) => {
    const token = localStorage.user_token ? localStorage.user_token : state.logReducer.token;
    const name = localStorage.user_name ? localStorage.user_name : state.logReducer.name;
    const account = localStorage.user_account ? localStorage.user_account : state.logReducer.account;
    const role = localStorage.user_role ? localStorage.user_role : state.logReducer.role;
    return {
        token:token, //state tree的结构是以sub-reducer的名称细分的，logReducer修改的数据归在这个tree的分支下。
        test:Date.now(),
        name:name,
        account:account,
        role:role,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getToken:(loginData) => {
            dispatch(getToken(loginData));
        },
        logout:(token) => {
            dispatch(logout(token));
        }
    };
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;