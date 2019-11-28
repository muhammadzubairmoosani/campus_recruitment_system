import {
    ACCOUNT_TYPE,
    LOG_IN,
    SIGN_UP,
    LOGIN_STATUS,
    VACANCIES,
    COMPANIES_AND_STUDENTS,
    JOB_APPLICATIONS
} from './constants';

export default class Action {
    static jobApplications(data) {
        return { type: JOB_APPLICATIONS, payload: data }
    }
    static type(data) {
        return { type: ACCOUNT_TYPE, payload: data }
    }

    static companiesAndStudents(...data) {
        return { type: COMPANIES_AND_STUDENTS, payload: data }
    }

    // static signInSuccess(...data) {
    //     return { type: LOG_IN, payload: data }
    // }
    static signInSuccess(data) {
        return { type: LOG_IN, payload: data }
    }

    static signUpSuccess(data) {
        console.log(data)
        return { type: SIGN_UP, payload: data }
    }

    static userLoginStatus(...data) {
        return { type: LOGIN_STATUS, payload: data }
    }

    static vacancies(data) {
        return { type: VACANCIES, payload: data }
    }
}