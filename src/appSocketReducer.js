//import {combineReducers} from 'redux';
import {socketAction} from './constants/actionType.js';

const socketReducer = (state={reportSocket:[]}, action) => {
    switch(action.type){
        case socketAction.RECEIVE_REPORT:
            return {...state, reportSocket:action.reportData};
        default:
            return state;
    }
};

export default socketReducer;