import {reportAction as REPORT} from '../../constants/actionType';

//无论来自本地form的数据，还是来自socket事件的数据，都用这个action。
export const addReport = (data) => ({
    type:REPORT.ADD_REPORT,
    reportData:data,
    timeStamp:Date.now(),
});

export const useReport = (id) => ({
    type:REPORT.USE_REPORT,
    reportId:id,
    timeStamp:Date.now(),
});

export const topReport = (id) => ({
    type:REPORT.TOP_REPORT,
    reportId:id,
    timeStamp:Date.now(),
});

export const dropReport = (id) => ({
    type:REPORT.DROP_REPORT,
    reportId:id,
    timeStamp:Date.now(),
});

export const getReports = (data) => {
    return function(dispatch){
        return fetch('http://10.10.60.47:3000/report/get-reports')
            .then((response) => response.json())
            .then((response) => dispatch(addReport(response)));
    }
};



