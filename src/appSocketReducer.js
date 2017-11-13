//import {combineReducers} from 'redux';
import {socketAction} from './constants/actionType.js';

const socketReducer = (state={reportSocket:[]}, action) => {
    switch(action.type){
        case socketAction.RECEIVE_REPORT:
            //将实时数据存入localStorage。
            const localReports = localStorage.localReports ? JSON.parse(localStorage.localReports) : [];
            localReports.push(action.reportData);
            localStorage.setItem('localReports',JSON.stringify(localReports));

            return {...state,
                    reportSocket:[
                        ...state.reportSocket,
                        ...JSON.parse(localStorage.localReports)
                    ]
            };
        default:
            return state;
    }
};

export default socketReducer;