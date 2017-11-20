//import {combineReducers} from 'redux';
import {poolAction} from "../../constants/actionType";

const poolReducer = (state={usedReportsIds:[], cardsList:[]}, action) => {
    switch(action.type){
        case poolAction.USE_REPORT:
            console.log(action.oldReports); //现在的做法是把oldReports从pool以action参数的形式传过来。
            let targetReport = action.oldReports.filter((item) => {
                return Object.values(item).indexOf(action.reportId) !== -1;
            });
            if(state.usedReportsIds.indexOf(action.reportId) === -1){
                return {...state,
                        cardsList:[...state.cardsList, ...targetReport],
                    usedReportsIds:[...state.usedReportsIds, action.reportId],
                    };
            } else{
                return state;
            }
        default:
            return state;
    }
};

export default poolReducer;