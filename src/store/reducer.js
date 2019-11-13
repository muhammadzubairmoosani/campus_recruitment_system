import {
    ACCOUNT_TYPE

} from './constants';

const initialState = {
    accountType: '',
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case ACCOUNT_TYPE:
            return {
                ...state,
                accountType: action.payload,
            };
        default:
            return state;
    }
}
