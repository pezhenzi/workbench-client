import Home from './home';
import {connect} from 'react-redux';
import {getToken, logout} from "./logAction";

const mapStateToProps = (state) => {
    return {
        token:state.logReducer.token, //state tree的结构是以sub-reducer的名称细分的，logReducer修改的数据归在这个tree的分支下。
        test:Date.now(),
        name:state.logReducer.name,
        account:state.logReducer.account,
        role:state.logReducer.role,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getToken:(loginData) => {
            dispatch(getToken(loginData));
        },
        logout:(token) => {
            dispatch(logout(token));
        },
    };
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;