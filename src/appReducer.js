import {combineReducers} from 'redux';
import {appAction} from './constants/actionType.js';
import homeReducer from './home/homeReducer';

const initialReports = (state={oldReports:[]}, action) => {
    switch(action.type){
        case appAction.INITIAL_REPORTS:
            console.log(action.initialReports.data);
            //反复出错是因为，socket接收的数据结构是{data:[{item}]},数组外面多了一个data，
            //造成reducer操作失败。去掉data后正常了。
            return {...state, oldReports:action.initialReports.data};
        case appAction.RECEIVE_REPORT_SOCKET:
            console.log(state.oldReports);
            return Object.assign({}, state, { //用展开运算符效果是一样的
                oldReports:[
                    action.reportData, //新数据放前面，以便降序排列。
                    ...state.oldReports  //注意这里引用oldReports的写法，在container中引用必须要加initialReports!
                ]
            });
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    initialReports,
    homeReducer,
});
export default rootReducer;