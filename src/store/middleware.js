import Action from './action';

export default class Middleware {
    // static studentLogin(data) {
    //     return dispatch => {
    //         dispatch(Action.studentType(data))
    //     }
    // }


    // static companyLogin(data) {
    //     return dispatch => {
    //         dispatch(Action.companyType(data))
    //     }
    // }
    static accountType(data) {
        return dispatch => {
            dispatch(Action.type(data))
        }
    }
}