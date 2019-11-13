import {
    ACCOUNT_TYPE,
    LOGIN,
    LOGIN_STATUS
} from './constants';

const initialState = {
    accountType: '',
    user: {}
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case ACCOUNT_TYPE:
            return {
                ...state,
                accountType: action.payload,
            };
        case LOGIN_STATUS:
        case LOGIN:
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state;
    }
}
