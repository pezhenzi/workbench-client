import {appAction} from "./constants/actionType";

const initialReports = (data) => ({
    type:appAction.INITIAL_REPORTS,
    initialReports:data,
    timeStamp:Date.now(),
});

export const getInitialReports = () => {
    return function(dispatch){
        return fetch('http://10.10.60.47:3000/report/get-reports')
            .then((response) => response.json())
            .then((response) => {
                dispatch(initialReports(response));
            });
    }
};

export const receiveReportSocket = (data) => ({
    type:appAction.RECEIVE_REPORT_SOCKET,
    reportData:data,
    timeStamp:Date.now(),
});

export const receiveMessage = (data) => ({
    type:appAction.RECEIVE_MESSAGE,
    message:data,
    timeStamp:Date.now(),
});