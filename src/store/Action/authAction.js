import {
    USER_STATUS,
    MESSAGE,
} from '../constants';
export default class AuthAction {
    static userLoginStatus(...data) {
        return { type: USER_STATUS, payload: data }
    }
    static message(data) {
        return { type: MESSAGE, payload: data }
    }
}