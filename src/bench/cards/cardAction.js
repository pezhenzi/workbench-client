import {cardAction} from "../../constants/actionType";

export const dropCard = (id) => ({
    type:cardAction.DROP_CARD,
    cardId:id,
    timestamp:Date.now(),
});

export const addCard = (data) => ({
    type:cardAction.ADD_CARD,
    cardData:data,
    timestamp:Date.now(),
});

export const topCard = (id) => ({
    type:cardAction.TOP_CARD,
    cardId:id,
});

export const completeCard = (id, data) => ({
    type:cardAction.COMPLETE_CARD,
    cardId:id,
    cardData:data,
    timestamp:Date.now(),
});

export const hangUpCard = (id,data) => ({
    type:cardAction.HANGUP_CARD,
    cardId:id,
    cardData:data,
    timestamp:Date.now(),
});

export const getInitialCards = () => {
    return (dispatch) => {
        return fetch('http://10.10.60.47:3000/card/get-cards')
            .then((response) => response.json())
            .then((response) => dispatch(addCard(response)));
    };
};