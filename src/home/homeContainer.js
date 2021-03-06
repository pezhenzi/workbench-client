import Home from './home';
import {connect} from 'react-redux';
import {getToken, logout} from "./logAction";

//TODO：重写用户注册、登录、注销等功能。
//TODO:整合localStorage和redux。
//TODO:页面授权的实现。
const mapStateToProps = (state) => {
    const token = localStorage.user_token ? localStorage.user_token : state.homeReducer.logReducer.token;
    const name = localStorage.user_name ? localStorage.user_name : state.homeReducer.logReducer.name;
    const account = localStorage.user_account ? localStorage.user_account : state.homeReducer.logReducer.account;
    const role = localStorage.user_role ? localStorage.user_role : state.homeReducer.logReducer.role;
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
        logout:() => {
            dispatch(logout());
        }
    };
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;