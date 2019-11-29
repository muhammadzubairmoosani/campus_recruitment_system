import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import AuthReducer from './Reducer/authReducer';
import CompanyReducer from './Reducer/companyReducer';
import StudentReducer from './Reducer/studentReducer';
const rootReducer = combineReducers({
    AuthReducer,
    CompanyReducer,
    StudentReducer
})
let store = createStore(rootReducer, applyMiddleware(thunk));
export default store;