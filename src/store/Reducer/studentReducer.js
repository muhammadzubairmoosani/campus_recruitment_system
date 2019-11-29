import {
    MESSAGE,
    VACANCIES
} from '../constants';
const initialState = {
    message: '',
    vacancies: {}
}
export default function StudentReducer(state = initialState, action) {
    switch (action.type) {
        case MESSAGE:
            return {
                ...state,
                message: action.payload,
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