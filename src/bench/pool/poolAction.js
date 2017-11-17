import {poolAction} from "../../constants/actionType";

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