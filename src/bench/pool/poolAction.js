import {poolAction, UIAction} from "../../constants/actionType";

export const useReport = (id, oldReports) => ({
    type:poolAction.USE_REPORT,
    reportId:id,
    oldReports:oldReports,
    timeStamp:Date.now(),
});

export const topReport = (id) => ({
    type:poolAction.TOP_REPORT,
    reportId:id,
    timeStamp:Date.now(),
});

export const dropReport = (id) => ({
    type:poolAction.DROP_REPORT,
    reportId:id,
    timeStamp:Date.now(),
});

export const showEditorCreateModal = () => ({
    type:UIAction.SHOW_EDITOR_CREATE_MODAL,
    visible:true,
});

export const hiddenEditorCreateModal = () => ({
    type:UIAction.HIDDEN_EDITOR_CREATE_MODAL,
    visible:false,
});
