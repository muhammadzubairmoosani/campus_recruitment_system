import {
    ACCOUNT_TYPE,
    LOG_IN,
    SIGN_UP,
    LOGIN_STATUS,
    VACANCIES,
    COMPANIES_AND_STUDENTS,
    // MESSAGE
} from './constants';

const initialState = {
    accountType: '',
    user: {},
    // message: '',
    companies: [],
    vacancies: {},
    allAccounts: {}
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case ACCOUNT_TYPE:
            return {
                ...state,
                accountType: action.payload,
            };
        case COMPANIES_AND_STUDENTS:
            return {
                ...state,
                allAccounts: action.payload,
            };
        case LOGIN_STATUS:
        // case LOG_IN:
        case SIGN_UP:
            return {
                ...state,
                user: action.payload,
            };
        case VACANCIES:
            return {
                ...state,
                vacancies: action.payload,
            };
        // case LOG_IN:
        //     return {
        //         ...state,
        //         message: action.payload,
        //     };

        default:
            return state;
    }
}
