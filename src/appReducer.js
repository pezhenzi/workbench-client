import {combineReducers} from 'redux';
import {appAction} from './constants/actionType.js';
import homeReducer from './home/homeReducer';

const initialReports = (state={oldReports:[]}, action) => {
    switch(action.type){
        case appAction.INITIAL_REPORTS:
            return {...state, oldReports:action.initialReports};
        case appAction.RECEIVE_REPORT_SOCKET:
            console.log(state.oldReports.data);
            return {...state, oldReports:[...state.oldReports.data, action.reportData]};
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    initialReports,
    homeReducer,
});
export default rootReducer;