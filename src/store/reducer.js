import {
    ACCOUNT_TYPE,
    LOG_IN,
    SIGN_UP,
    LOGIN_STATUS
} from './constants';

const initialState = {
    accountType: '',
    user: {},
    // message: ''
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case ACCOUNT_TYPE:
            return {
                ...state,
                accountType: action.payload,
            };
        case LOGIN_STATUS:
        case LOG_IN:
        case SIGN_UP:
            return {
                ...state,
                user: action.payload,
                // accountType: action.payload.accountType
            };

        default:
            return state;
    }
}
