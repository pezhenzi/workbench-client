import {logAction} from "../constants/actionType";

const saveUserInfo = (data) => ({
    type:logAction.SAVE_USER_INFO,
    data:data,
    timeStamp:Date.now(),
});

export const getToken = (data) => {
    return function(dispatch){
        return fetch('http://10.10.60.47:3000/users/login', {
            method:'post',
            body:data,
            mode:'cors',
        }).then((res) => res.json())
            .then((res) => {
            dispatch(saveUserInfo(res))
        });
    }

};

export const logout = (token) => ({
    type:logAction.LOGOUT,
    token:token,
    timeStamp:Date.now(),
});