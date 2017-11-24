//import {combineReducers} from 'redux';
import {cardAction} from "../../constants/actionType";

const cardReducer = (state={cardsList:[], completedCards:[], droppedCards:[], hangedCards:[]}, action) => {
    switch(action.type){
        case cardAction.DROP_CARD:
            const cardIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            const frontList = state.cardsList.slice(0, cardIndex);
            const backList = state.cardsList.slice(cardIndex+1);
            return {...state, cardsList:[...frontList, ...backList]};
        case cardAction.ADD_CARD:
            //注意，数据在前后端传递时的格式，务必一致，经常在这里出问题！
            if(Object.prototype.toString.call(action.cardData) === '[object Array]'){ //判断变量为数组的标准方法
                return {...state, cardsList:[...action.cardData, ...state.cardsList]};
            } else{
                return {...state, cardsList:[action.cardData, ...state.cardsList]};
            }
        case cardAction.COMPLETE_CARD:
            //完成卡片，项目正常结束。
            const completeIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            const willComplete = state.cardsList[completeIndex];
            return {...state, completedCards:[willComplete, ...state.completedCards]};
        case cardAction.TOP_CARD:
            //将卡片置于卡片区域的最左侧
            const topIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            const willTop = state.cardsList[topIndex];
            const topFrontList = state.cardsList.slice(0, cardIndex);
            const topBackList = state.cardsList.slice(cardIndex+1);
            return {...state, cardsList:[willTop, ...topFrontList, ...topBackList]};
        case cardAction.HANGUP_CARD:
            const hangIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            const willHanged = state.cardsList[hangIndex];
            return {...state, hangedCards:[willHanged, ...state.hangedCards]};
            //选题未按时完结，需要延后交稿和发布。
            return state;
        default:
            return state;
    }
};

export default cardReducer;