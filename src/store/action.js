import {
    ACCOUNT_TYPE,
    LOGIN,
    LOGIN_STATUS
} from './constants';

export default class Action {
    static type(data) {
        return { type: ACCOUNT_TYPE, payload: data }
    }

    static login(data) {
        return { type: LOGIN, payload: data }
    }

    static userLoginStatus(data) {
        return { type: LOGIN_STATUS, payload: data }
    }

}