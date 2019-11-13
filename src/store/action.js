import {
    ACCOUNT_TYPE
} from './constants';

export default class Action {
    static type(data) {
        return { type: ACCOUNT_TYPE, payload: data }
    }


}