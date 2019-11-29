import {
    USER_STATUS,
    MESSAGE,
} from '../constants';
const initialState = {
    user: {},
    message: '',
}
export default function AuthReducer(state = initialState, action) {
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
        default:
            return state;
    }
}