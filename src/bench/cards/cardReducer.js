//import {combineReducers} from 'redux';
import {cardAction} from "../../constants/actionType";

const cardReducer = (state={
    cardsList:[],
    completedCards:[],
    droppedCards:[],
    hangedCards:[],
    currentCard:{}}, action) => {
    switch(action.type){
        case cardAction.DROP_CARD:
            const cardIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            const willDrop = state.cardsList[cardIndex];
            const willDropList = state.cardsList;
            willDropList.splice(cardIndex, 1);
            return {
                ...state,
                cardsList:[...willDropList],
                droppedCards:[willDrop, ...state.droppedCards],
            };
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
            const delOneWillCom = state.cardsList;
            delOneWillCom.splice(completeIndex, 1);
            return {
                ...state,
                completedCards:[willComplete, ...state.completedCards],
                cardsList:[...delOneWillCom],
            };
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
            const delWillHang = state.cardsList;
            delWillHang.splice(hangIndex, 1);
            return {
                ...state,
                hangedCards:[willHanged, ...state.hangedCards],
                cardsList:[...delWillHang],
            };
            //选题未按时完结，需要延后交稿和发布。
            return state;
        case cardAction.CURRENT_CARD:
            return {...state, currentCard:action.cardData};
        case cardAction.ADD_DOCUMENT:
            const documentIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            if(documentIndex > -1){
                const documentCardsList = state.cardsList;
                documentCardsList[documentIndex].documents.push(action.document);
                return {...state, cardsList:[...documentCardsList]};
            } else{
                return state;
            }
        case cardAction.ADD_MEMBERS:
            const membersIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            if(membersIndex > -1){
                const membersCardsList = state.cardsList;
                membersCardsList[membersIndex].members = action.members;
                return {...state, cardsList:[...membersCardsList]};
            } else{
                return state;
            }
        case cardAction.ADD_COMMENT:
            const commentIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            if(commentIndex > -1){
                const commentCardsList = state.cardsList;
                commentCardsList[commentIndex].comments.push(action.comment);
                return {...state, cardsList:[...commentCardsList]};
            } else{
                return state;
            }
        case cardAction.ADD_ARTICLE:
            const articleIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            if(articleIndex > -1){
                const articleCardsList = state.cardsList;
                articleCardsList[articleIndex].article = action.article;
                return {...state, cardsList:[...articleCardsList]};
            } else{
                return state;
            }
        case cardAction.ADD_ACCESSORY:
            const accessoryIndex = state.cardsList.findIndex((item) => item.cardId === action.cardId);
            if(accessoryIndex > -1){
                const accessoryCardsList = state.cardsList;
                accessoryCardsList[accessoryIndex].accessory.push(action.accessory.paths);
                return {...state, cardsList:[...accessoryCardsList]};
            } else{
                return state;
            }
        default:
            return state;
    }
};

export default cardReducer;