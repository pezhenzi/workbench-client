import {UIAction} from "./constants/actionType";

const UIReducer = (state={editorCreateModalVisible:false}, action) => {
    switch(action.type){
        case UIAction.SHOW_EDITOR_CREATE_MODAL:
            return {...state, editorCreateModalVisible:action.visible};
        case UIAction.HIDDEN_EDITOR_CREATE_MODAL:
            return {...state, editorCreateModalVisible:action.visible};
        default:
            return state;
    }
};

export default UIReducer;