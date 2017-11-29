import {connect} from 'react-redux';
import Card from './card';
import * as cardAction from './cardAction';

const mapStateToProps = (state) => {
    let cardsList = state.cardReducer.cardsList;
    const currentCard = state.cardReducer.currentCard ? state.cardReducer.currentCard : 0;
    return {
        cardsList:cardsList,
        currentCard:currentCard,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentCard:(data) => {
            dispatch(cardAction.currentCard(data));
        },
        addDocument:(id, data) => {
            dispatch(cardAction.addDocument(id, data));
        },
        addComment:(id, data) => {
            dispatch(cardAction.addComment(id ,data));
        },
        addArticle:(id, data) => {
            dispatch(cardAction.addArticle(id, data));
        },
        addMembers:(id, data) => {
            dispatch(cardAction.addMembers(id, data));
        },
        addAccessory:(id, data) => {
            dispatch(cardAction.addAccessory(id, data));
        },
        completeCard:(id) => {
            dispatch(cardAction.completeCard(id));
        },
        hangupCard:(id) => {
            dispatch(cardAction.hangUpCard(id));
        },
        dropCard:(id) => {
            dispatch(cardAction.dropCard(id));
        },
    }
};

const CardContainer = connect(mapStateToProps, mapDispatchToProps)(Card);
export default CardContainer;