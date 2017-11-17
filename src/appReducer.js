import {combineReducers} from 'redux';
import {appAction, poolAction} from './constants/actionType.js';
import homeReducer from './home/homeReducer';
import poolReducer from './bench/pool/poolReducer';

const initialReports = (state={oldReports:[]}, action) => {
    switch(action.type){
        case appAction.INITIAL_REPORTS:
            //反复出错是因为，socket接收的数据结构是{data:[{item}]},数组外面多了一个data，
            //造成reducer操作失败。去掉data后正常了。
            return {...state, oldReports:action.initialReports.data};
        case appAction.RECEIVE_REPORT_SOCKET:
            return Object.assign({}, state, { //用展开运算符效果是一样的
                oldReports:[
                    action.reportData, //新数据放前面，以便降序排列。
                    ...state.oldReports  //注意这里引用oldReports的写法，在container中引用必须要加initialReports!
                ]
            });
        case poolAction.TOP_REPORT:
            const toTopIndex = state.oldReports.findIndex((item) => item.reportId === action.reportId);
            const toTopReport = state.oldReports[toTopIndex];
            const afterDrop = [...state.oldReports.slice(0, toTopIndex), ...state.oldReports.slice(toTopIndex + 1)];
            return {...state, oldReports:[toTopReport, ...afterDrop]};
        case poolAction.DROP_REPORT:
            let toDropIndex = state.oldReports.findIndex((item) => item.reportId === action.reportId);
            return {
                ...state,
                oldReports:[
                    ...state.oldReports.slice(0, toDropIndex),
                    ...state.oldReports.slice(toDropIndex + 1)
                ]
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    initialReports,
    homeReducer,
    poolReducer,
});
export default rootReducer;