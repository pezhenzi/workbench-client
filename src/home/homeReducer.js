import {combineReducers} from 'redux';
import {reportAction, logAction} from '../constants/actionType.js';

const report = {
    title:`spared title`,
    content:`spared content`,
};

const reportReducer = (state={report:report,reportId:''}, action) => {
    switch(action.type){
        case reportAction.ADD_REPORT:
            return {...state, report:action.reportData, time:action.timeStamp};
        case reportAction.USE_REPORT:
            return {...state, reportId:action.reportId};
        case reportAction.TOP_REPORT:
            return {...state, reportId:action.reportId};
        case reportAction.DROP_REPORT:
            return {...state, reportId:action.reportId};
        case reportAction.GET_REPORTS:
            return {...state, report:action.data};
        default:
            return state;
    }
};

const logReducer = (state={token:'',name:'',account:''}, action) => {
    switch(action.type){
        case logAction.SAVE_USER_INFO:
            localStorage.setItem('user_name', action.data.name);
            localStorage.setItem('user_account', action.data.account);
            localStorage.setItem('user_role', action.data.role);
            localStorage.setItem('user_token', action.data.token);
            localStorage.setItem('user_avatar', '');
            return {
                ...state,
                token:action.data.token,
                name:action.data.name,
                account:action.data.account,
                role:action.data.role
            };
        case logAction.LOGOUT:
            localStorage.setItem('user_name', '');
            localStorage.setItem('user_account', '');
            localStorage.setItem('user_role', '');
            localStorage.setItem('user_token', '');
            localStorage.setItem('user_avatar', '');
            return {
                ...state,
                token:'',
                name:'',
                account:'',
                role:'',
            };
        default:
            return state;
    }
};

const homeReducer = combineReducers({
    reportReducer,
    logReducer,
});

export default homeReducer;