import Action from './action';
import firebase from '../config/config';

export default class Middleware {
    static deleteAccount(data) {
        return dispatch => {
            firebase
                .database()
                .ref(`${data[0]}/${data[1]}`)
                .remove()
                .then(() => console.log('delete account successfully!'))
                .catch(err => console.log(err))
        }
    }

    static getCompaniesAndStudentsData() {
        return dispatch => {
            let students = {};
            let companies = {};
            firebase
                .database()
                .ref('companies')
                .on('value', snapshot => {
                    companies = snapshot.val();
                    firebase
                        .database()
                        .ref('students')
                        .on('value', snapshot => {
                            students = snapshot.val()
                            dispatch(Action.companiesAndStudents(students, companies))
                        })
                })
        }
    }

    static accountType(data) {
        return dispatch => {
            dispatch(Action.type(data))
        }
    }

    static jobApply(data) {
        return dispatch => {
            firebase
                .database()
                .ref(`companies/${data[0]}/posts/${data[3]}/appliedStudents`)
                .push(data[2])
                .then(() => console.log('Apply Successfully!'))
                .catch(err => console.log(err))
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
                .then(res => console.log('delete successfully!'))
                .catch(err => console.log(err))
        }
    }

    static updatePost(data) {
        return dispatch => {
            firebase
                .database()
                .ref(`companies/${data[1]}/posts`)
                .set(data[0])
                .then(res => console.log('update successfully!'))
                .catch(err => console.log(err))
        }

    }

    static profileUpdate(data) {
        return dispatch => {
            delete data[0].flag
            delete data[0].posts

            if (data[0].accountType === 'Student') {
                firebase
                    .database()
                    .ref(`students/${data[1]}`)
                    .set(data[0])
            }
            else if (data[0].accountType === 'Company') {
                firebase
                    .database()
                    .ref(`companies/${data[1]}`)
                    .set(data[0])
            }
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
                .then(() => console.log('done!'))
        }
    }

    static signUp(data) {
        return dispatch => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    delete data.password;
                    if (data.accountType === 'Student') {
                        firebase
                            .database()
                            .ref('students')
                            .push(data)
                            .then(res => {
                                // let user = {
                                //     data,
                                //     accountType: data.accountType
                                // }
                                dispatch(Action.signUpSuccess([data, data.accountType]))
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

    // static Login(data) {
    //     return dispatch => {
    //         firebase
    //             .auth()
    //             .signInWithEmailAndPassword(data.email, data.password)
    //             .then(res => {
    //                 // const user = {
    //                 //     res,
    //                 //     accountType: data.accountType
    //                 // }
    //                 dispatch(Action.signInSuccess(res,data.accountType))
    //             })
    //             .catch(err => console.log(err))
    //     }
    // }

    static Login(data) {
        return dispatch => {
            if (data.email !== 'admin@g.com') {
                if (data.select) {
                    firebase
                        .database()
                        .ref(data.select)
                        .on('value', std => {
                            let std1 = std.val();
                            let flag = false;
                            for (let i in std1) {
                                flag = std1[i].email === data.email ? true : false;
                                if (flag) {
                                    firebase
                                        .auth()
                                        .signInWithEmailAndPassword(data.email, data.password)
                                        .then(() => dispatch(Action.signInSuccess('signIn successfully!')))
                                        .catch(err => console.log(err))
                                    return '';
                                }
                            }
                            setTimeout(() => {
                                console.log(flag)
                                !flag && alert('Your account has been deleted from Admin, Please create a new account with new Email-ID')
                            }, 1000)
                        })
                } else {
                    alert('Please select your account type!')
                }
            } else {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(data.email, data.password)
                    .then(() => {
                        dispatch(Action.signInSuccess('admin login successfully!'))
                    })
                    .catch(err => console.log(err))

            }

            // let user = firebase.auth().currentUser
            // user.delete().then(()=> console.log('delete user'))
            // firebase
            //     .auth()
            //     .signInWithEmailAndPassword(data.email, data.password)
            //     .then((res) => {
            //         res.user.delete()
            // dispatch(Action.signInSuccess('signIn successfully!'))
            // })
            // .catch(err => console.log(err))
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
            let loginUser = [];
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
                    firebase
                        .database()
                        .ref('Admin')
                        .on('value', admin => {
                            if (user) {
                                let key = ''
                                for (let i in admin.val()) {
                                    if (admin.val()[i] === user.email) {
                                        loginUser = [admin.val()];
                                        loginUser.length && dispatch(Action.userLoginStatus(loginUser[0], key))
                                    }
                                }
                            }
                        })
                })
        }
    }
}