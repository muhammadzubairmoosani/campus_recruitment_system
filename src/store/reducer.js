import {
    USER_STATUS,
    VACANCIES,
    MESSAGE,
    COMPANIES,
    STUDENTS,
} from './constants';

const initialState = {
    user: {},
    message: '',
    companies: {},
    students: {},
    vacancies: {},
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case MESSAGE:
            return {
                ...state,
                message: action.payload,
            };
        case USER_STATUS:
            return {
                ...state,
                user: action.payload,
            };
        case COMPANIES:
            return {
                ...state,
                companies: action.payload,
            };
        case STUDENTS:
            return {
                ...state,
                students: action.payload,
            };
        case VACANCIES:
            return {
                ...state,
                vacancies: action.payload,
            };
        default:
            return state;
    }
}