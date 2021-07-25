import {
    MESSAGE,
    STUDENTS,
    COMPANIES
} from '../constants';
export default class CompanyAction {
    static message(data) {
        return { type: MESSAGE, payload: data }
    }
    static companies(data) {
        return { type: COMPANIES, payload: data }
    }
    static students(data) {
        return { type: STUDENTS, payload: data }
    }
}