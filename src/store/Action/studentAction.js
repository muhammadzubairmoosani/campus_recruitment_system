import {
    VACANCIES,
    STUDENTS,
    MESSAGE
} from '../constants';
export default class Action {
    static message(data) {
        return { type: MESSAGE, payload: data }
    }
    static students(data) {
        return { type: STUDENTS, payload: data }
    }
    static vacancies(data) {
        return { type: VACANCIES, payload: data }
    }
}