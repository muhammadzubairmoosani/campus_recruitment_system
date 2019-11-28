import Action from './action';
import firebase from '../config/config';

export default class Middleware {
    static getCompanies() {
        return dispatch => {
            firebase
                .database()
                .ref('companies')
                .on('value', snapshot => dispatch(Action.companies(snapshot.val())))
        }
    }

    static getVacancies() {
        return dispatch => {
            firebase
                .database()
                .ref('companies')
                .on('value', snapshot => dispatch(Action.vacancies(snapshot.val())))
        }
    }

    static getStudents() {
        return dispatch => {
            firebase
                .database()
                .ref('students')
                .on('value', snapshot => dispatch(Action.students(snapshot.val())))
        }
    }

    static deleteAccount(data) {
        return dispatch => {
            firebase
                .database()
                .ref(`${data[0]}/${data[1]}`)
                .remove()
                .then(() => dispatch(Action.message('Delete Account successfully!')))
                .catch(err => dispatch(Action.message('Delete Account failed!', err)))
        }
    }

    static jobApply(data) {
        return dispatch => {
            firebase
                .database()
                .ref(`companies/${data[0]}/posts/${data[3]}/appliedStudents`)
                .push(data[2])
                .then(() => dispatch(Action.message('Application send successfully!')))
                .catch(err => dispatch(Action.message('Application failed!', err)))
        }
    }

    static deletePost(data) {
        return dispatch => {
            let uid = data[1][0];
            let posts = data[0].posts;
            firebase
                .database()
                .ref(`companies/${uid}/posts`)
                .set(posts)
                .then(() => dispatch(Action.message('Delete post successfully!')))
                .catch(err => dispatch(Action.message('Delete post failed!', err)))
        }
    }

    static updatePost(data) {
        return dispatch => {
            firebase
                .database()
                .ref(`companies/${data[1]}/posts`)
                .set(data[0])
                .then(res => dispatch(Action.message('Update post successfully!')))
                .catch(err => dispatch(Action.message('Delete post failed!', err)))
        }
    }

    static profileUpdate(data) {
        return dispatch => {
            delete data[0].flag
            delete data[0].posts
            let type = data[0].accountType === 'Student' ? 'students' : 'companies'
            firebase
                .database()
                .ref(`${type}/${data[1]}`)
                .set(data[0])
                .then(() => dispatch(Action.message('Profile updata successfully!')))
                .catch(err => dispatch(Action.message('Profile updata failed!', err)))
        }
    }

    static addNewPost(data) {
        let key = data.key;
        delete data.key;
        delete data.flag;
        let count = 0;
        return dispatch => {
            firebase
                .database()
                .ref('companies')
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
                .then(() => dispatch(Action.message('Add post successfully!')))
                .catch(err => dispatch(Action.message('Add post failed!', err)))
        }
    }

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
                        .then(() => dispatch(Action.message('Sign-up successfully!')))
                        .catch(err => dispatch(Action.message('Sign-up failed!', err)))
                })
        }
    }

    static signOut() {
        return dispatch => {
            firebase
                .auth()
                .signOut()
                .then(() => dispatch(Action.message('Sign-out successfully!')))
                .catch(err => dispatch(Action.message('Sign-out fail:', err)))
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
                                        key = Object.keys(std.val()).filter((itm, indx) => indx === index)
                                    }
                                })
                                signedInUser.length && dispatch(Action.userLoginStatus(signedInUser[0], key))
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
                                signedInUser.length && dispatch(Action.userLoginStatus(signedInUser[0], key))
                            })
                        firebase
                            .database()
                            .ref('Admin')
                            .on('value', admin => {
                                let key = ''
                                for (let i in admin.val()) {
                                    if (admin.val()[i] === user.email) {
                                        signedInUser = [admin.val()];
                                        signedInUser.length && dispatch(Action.userLoginStatus(signedInUser[0], key))
                                    }
                                }
                            })
                    }
                    else {
                        dispatch(Action.userLoginStatus(user))
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
                    .then(() => dispatch(Action.message('Sign-in successfully!')))
                    .catch(err => dispatch(Action.message('Sign-in failed!', err)))
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
                                    .then(() => dispatch(Action.message('Sign-in successfully!')))
                                    .catch(err => dispatch(Action.signInFail('Sign-in failed!', err)))
                                flag = false
                                return '';
                            }
                        }
                        if (flag) {
                            dispatch(Action.message('Your account has been deleted from admin, Please create a new account with new email-ID'))
                        }
                    })
            }
            else {
                dispatch(Action.message('Please select your account type!'))
            }
        }
    }
}