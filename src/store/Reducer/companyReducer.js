import {
    MESSAGE,
    STUDENTS,
    COMPANIES
} from '../constants';
const initialState = {
    message: '',
    companies: {},
    students: {}
}
export default function CompanyReducer(state = initialState, action) {
    switch (action.type) {
        case MESSAGE:
            return {
                ...state,
                message: action.payload,
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
        default:
            return state;
    }
}