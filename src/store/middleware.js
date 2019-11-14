import Action from './action';
import firebase from '../config/config';

export default class Middleware {
    static accountType(data) {
        return dispatch => {
            dispatch(Action.type(data))
        }
    }

    static signUp(data) {
        return dispatch => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    if (data.accountType === 'Student') {
                        firebase
                            .database()
                            .ref('students')
                            .push(data)
                            .then(res => {
                                let user = {
                                    data,
                                    accountType: data.accountType
                                }
                                dispatch(Action.signUpSuccess(user))
                            })
                            .catch(err => console.log(err))
                    }
                    else {
                        console.log(data.accountType)
                        firebase
                            .database()
                            .ref('companies')
                            .push(data)
                            .then(user => dispatch(Action.signUpSuccess(user)))
                            .catch(err => console.log(err))
                    }
                    // dispatch(Action.signUpSuccess(user))
                })
                .catch(err => console.log(err))
        }
    }

    static Login(data) {
        return dispatch => {
            firebase
                .auth()
                .signInWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    const user = {
                        res,
                        accountType: data.accountType
                    }
                    dispatch(Action.signInSuccess(user))
                })
                .catch(err => console.log(err))
        }
    }

    static signOut() {
        return dispatch => {
            firebase
                .auth()
                .signOut()
                .then(res => console.log(res))
        }
    }

    static userStatus() {
        return dispatch => {
            let students = {};
            let companies = {};
            firebase
                .auth()
                .onAuthStateChanged(user => {
                    firebase
                        .database()
                        .ref('students')
                        // .on('value', user => students = user.val())
                        .on('value', user => Object.values(user.val()).map(i => console.log(i.accountType)))
                    firebase
                        .database()
                        .ref('companies')
                        // .on('value', user => companies = user.val())
                        .on('value', user => console.log('company', user.val()))
                    // console.log(students)
                    // console.log(companies)

                    dispatch(Action.userLoginStatus(user))
                })
        }
    }
}