import {connect} from 'react-redux';
import Card from './card';

const mapStateToProps = (state) => {
    let cardsList = state.poolReducer.cardsList;
    return {
        cardsList:cardsList,
    }
};

const CardContainer = connect(mapStateToProps,)(Card);
export default CardContainer;