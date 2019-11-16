import Action from './action';
import firebase from '../config/config';

export default class Middleware {
    static accountType(data) {
        return dispatch => {
            dispatch(Action.type(data))
        }
    }

    static addNewPost(data) {
        let key = data.key
        delete data.key
        let count = 0;
        return dispatch => {
            firebase
                .database()
                .ref(`companies`)
                .on('value', res => {
                    if (res) {
                        Object.keys(res.val()).filter((i, index) => {
                            if (i === key) {
                                count = Object.values(res.val())[index].posts ?
                                    Object.values(res.val())[index].posts.length : 0
                            }
                        })
                    }
                })
            firebase
                .database()
                .ref(`companies/${key}/posts/${count}`)
                .set(data)
                .then(() => console.log('done!'))
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
                    if (data.accountType == 'Student') {
                        window.location.replace('/jobs')
                    } else if (data.accountType == 'Company') {
                        window.location.replace('/jobApplications')
                    } else {
                        window.location.replace('/dashboard')
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
                .then(() => window.location.replace('/'))
                .catch(err => console.log(err))
        }
    }

    static userStatus() {
        return dispatch => {
            let loginUser = {};
            firebase
                .auth()
                .onAuthStateChanged(user => {
                    firebase
                        .database()
                        .ref('students')
                        .on('value', std => {
                            if (user) {
                                loginUser = Object.values(std.val()).filter(i => i.email === user.email)
                                let key = []
                                Object.values(std.val()).filter((i, index) => {
                                    if (i.email === user.email) {
                                        key = Object.keys(std.val()).filter((itm, indx) => indx === index)
                                    }
                                })
                                loginUser.length && dispatch(Action.userLoginStatus(loginUser[0], key))
                            }
                        })
                    firebase
                        .database()
                        .ref('companies')
                        .on('value', cmp => {
                            if (user) {
                                loginUser = Object.values(cmp.val()).filter(i => i.email === user.email)
                                let key = []
                                Object.values(cmp.val()).filter((i, index) => {
                                    if (i.email === user.email) {
                                        key = Object.keys(cmp.val()).filter((itm, indx) => indx === index)
                                    }
                                })
                                loginUser.length && dispatch(Action.userLoginStatus(loginUser[0], key))
                            }
                        })
                })
        }
    }
}