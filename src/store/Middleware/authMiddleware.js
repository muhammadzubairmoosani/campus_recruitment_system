import firebase from '../../config/config';
import AuthAction from '../Action/authAction';
export default class AuthMiddleware {
    static signUp(data) {
        return dispatch => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(() => {
                    delete data.password
                    let type = data.accountType === 'Student' ? 'students' : 'companies';
                    firebase
                        .database()
                        .ref(type)
                        .push(data)
                        .then(() => dispatch(AuthAction.message('Sign-up successfully!')))
                        .catch(err => dispatch(AuthAction.message('Sign-up failed!', err)))
                })
        }
    }
    static signOut() {
        return dispatch => {
            firebase
                .auth()
                .signOut()
                .then(() => dispatch(AuthAction.message('Sign-out successfully!')))
                .catch(err => dispatch(AuthAction.message('Sign-out fail:', err)))
        }
    }
    static userStatus() {
        return dispatch => {
            let signedInUser = [];
            firebase
                .auth()
                .onAuthStateChanged(user => {
                    if (user) {
                        firebase
                            .database()
                            .ref('students')
                            .on('value', std => {
                                signedInUser = Object.values(std.val()).filter(i => i.email === user.email)
                                let key = []
                                Object.values(std.val()).filter((i, index) => {
                                    if (i.email === user.email) {
                                        key = Object.keys(std.val()).filter((itm, indx) => indx === index);
                                    }
                                })
                                signedInUser.length && dispatch(AuthAction.userLoginStatus(signedInUser[0], key))
                            })
                        firebase
                            .database()
                            .ref('companies')
                            .on('value', cmp => {
                                signedInUser = Object.values(cmp.val()).filter(i => i.email === user.email)
                                let key = []
                                Object.values(cmp.val()).filter((i, index) => {
                                    if (i.email === user.email) {
                                        key = Object.keys(cmp.val()).filter((itm, indx) => indx === index)
                                    }
                                })
                                signedInUser.length && dispatch(AuthAction.userLoginStatus(signedInUser[0], key))
                            })
                        firebase
                            .database()
                            .ref('Admin')
                            .on('value', admin => {
                                let key = ''
                                for (let i in admin.val()) {
                                    if (admin.val()[i] === user.email) {
                                        signedInUser = [admin.val()];
                                        signedInUser.length && dispatch(AuthAction.userLoginStatus(signedInUser[0], key))
                                    }
                                }
                            })
                    }
                    else {
                        dispatch(AuthAction.userLoginStatus(user))
                    }
                })
        }
    }
    static signIn(data) {
        return dispatch => {
            if (data[0] === 'admin@g.com') {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(data[0], data[1])
                    .then(() => dispatch(AuthAction.message('Sign-in successfully!')))
                    .catch(err => dispatch(AuthAction.message('Sign-in failed!', err)))
            }
            else if (data[2]) {
                firebase
                    .database()
                    .ref(data[2])
                    .on('value', std => {
                        let std1 = std.val();
                        let flag = true;
                        for (let i in std1) {
                            if (std1[i].email === data[0]) {
                                firebase
                                    .auth()
                                    .signInWithEmailAndPassword(data[0], data[1])
                                    .then(() => dispatch(AuthAction.message('Sign-in successfully!')))
                                    .catch(err => dispatch(AuthAction.message('Sign-in failed!', err)))
                                flag = false
                                return '';
                            }
                        }
                        if (flag) {
                            dispatch(AuthAction.message('Your account has been deleted from admin, Please create a new account with new email-ID'))
                        }
                    })
            }
            else {
                dispatch(AuthAction.message('Please select your account type!'))
            }
        }
    }
} 