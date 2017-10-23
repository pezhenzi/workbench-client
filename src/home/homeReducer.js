import combineReducers from 'redux';
import * as reportAction from '../constants/actionType.js';

const report = {
    title:`spared title`,
    content:`spared content`,
};

const homeReducer = (state={report:report,reportId:''}, action) => {
    switch(action.type){
        case reportAction.ADD_REPORT:
            return {...state, report:action.reportData, time:action.timeStamp};
        case reportAction.USE_REPORT:
            return {...state, reportId:action.reportId};
        case reportAction.TOP_REPORT:
            return {...state, reportId:action.reportId};
        case reportAction.DROP_REPORT:
            return {...state, reportId:action.reportId};
        default:
            return state;
    }
};

export default homeReducer;