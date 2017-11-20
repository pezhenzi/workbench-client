import {connect} from 'react-redux';
import Workbench from './workbench';
import {getToken, logout} from "../home/logAction";
import {hiddenEditorCreateModal} from "./pool/poolAction";

const mapStateToProps = (state) => {
    const {title, content} = state.report ? state.report : {title:'', content:''};
    const token = localStorage.user_token ? localStorage.user_token : state.homeReducer.logReducer.token;
    const name = localStorage.user_name ? localStorage.user_name : state.homeReducer.logReducer.name;
    const account = localStorage.user_account ? localStorage.user_account : state.homeReducer.logReducer.account;
    const role = localStorage.user_role ? localStorage.user_role : state.homeReducer.logReducer.role;
    const cardsList = state.poolReducer.cardsList;
    const editorCreateModalVisible = state.UIReducer.editorCreateModalVisible || false;
    return {
        title,
        content,
        token:token,
        name:name,
        account:account,
        role:role,
        cardsList:cardsList,
        editorCreateModalVisible:editorCreateModalVisible,
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
        hiddenEditorCreateModal:() => {
            console.log('action was dispatched!');
            dispatch(hiddenEditorCreateModal());
        }
    }
};

const BenchContainer = connect(mapStateToProps, mapDispatchToProps)(Workbench);
export default BenchContainer;