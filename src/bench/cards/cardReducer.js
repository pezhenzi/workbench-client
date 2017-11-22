//import {combineReducers} from 'redux';
import {cardAction} from "../../constants/actionType";

const cardReducer = (state={cardsList:[], completedCards:[], droppedCards:[], hangedCards:[]}, action) => {
    switch(action.type){
        case cardAction.DROP_CARD:
            cardIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            frontList = state.cardsList.slice(0, cardIndex);
            backList = state.cardsList.slice(cardIndex+1);
            return {...state, cardsList:[...frontList, ...backList]};
        case cardAction.ADD_CARD:
            //无论初始化数据还是本地add或socket add数据，都可以用这个reducer
            //这是应该做到的，如果有问题须想办法解决。
            if(Object.prototype.toString.call(action.cardData) === '[object Array]'){
                return {...state, cardsList:[...action.data, ...state.cardsList]};
            } else{
                return {...state, cardsList:[action.data, ...state.cardsList]};
            }
        case cardAction.COMPLETE_CARD:
            //完成卡片，项目正常结束。
            cardIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            willComplete = state.cardsList[cardIndex];
            return {...state, completedCards:[willComplete, ...state.completedCards]};
        case cardAction.TOP_CARD:
            //将卡片置于卡片区域的最左侧
            cardIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            willTop = state.cardsList[cardIndex];
            frontList = state.cardsList.slice(0, cardIndex);
            backList = state.cardsList.slice(cardIndex+1);
            return {...state, cardsList:[willTop, ...frontList, ...backList]};
        case cardAction.HANGUP_CARD:
            cardIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            willHanged = state.cardsList[cardIndex];
            return {...state, hangedCards:[willHanged, ...state.hangedCards]};
            //选题未按时完结，需要延后交稿和发布。
            return state;
        default:
            return state;
    }
};

export default cardReducer;