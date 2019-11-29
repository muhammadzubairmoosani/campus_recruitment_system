import {
    VACANCIES,
    MESSAGE
} from '../constants';
export default class Action {
    static message(data) {
        return { type: MESSAGE, payload: data }
    }
    static vacancies(data) {
        return { type: VACANCIES, payload: data }
    }
}