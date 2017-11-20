import {connect} from 'react-redux';
import Header from './header';
import {getToken, logout} from "../home/logAction";

const mapStateToProps = (state) => {
    const token = localStorage.user_token ? localStorage.user_token : state.homeReducer.logReducer.token;
    const name = localStorage.user_name ? localStorage.user_name : state.homeReducer.logReducer.name;
    const account = localStorage.user_account ? localStorage.user_account : state.homeReducer.logReducer.account;
    const role = localStorage.user_role ? localStorage.user_role : state.homeReducer.logReducer.role;
    return {
        token:token,
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
        logout:() => {
            dispatch(logout());
        },
    }
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
export default HeaderContainer;