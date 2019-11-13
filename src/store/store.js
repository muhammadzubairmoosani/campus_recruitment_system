import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer from './reducer.js';

const rootReducer = combineReducers({
    reducer,
})

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;