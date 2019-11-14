import {
    ACCOUNT_TYPE,
    LOG_IN,
    SIGN_UP,
    LOGIN_STATUS
} from './constants';

export default class Action {
    static type(data) {
        return { type: ACCOUNT_TYPE, payload: data }
    }

    static signInSuccess(data) {
        return { type: LOG_IN, payload: data }
    }

    static signUpSuccess(data) {
        return { type: SIGN_UP, payload: data }
    }

    static userLoginStatus(data) {
        return { type: LOGIN_STATUS, payload: data }
    }

}