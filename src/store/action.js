import {
    USER_STATUS,
    VACANCIES,
    COMPANIES,
    STUDENTS,
    MESSAGE
} from './constants';

export default class Action {
    static message(data) {
        return { type: MESSAGE, payload: data }
    }

    static students(data) {
        return { type: STUDENTS, payload: data }
    }

    static companies(data) {
        return { type: COMPANIES, payload: data }
    }

    static userLoginStatus(...data) {
        return { type: USER_STATUS, payload: data }
    }

    static vacancies(data) {
        return { type: VACANCIES, payload: data }
    }
}