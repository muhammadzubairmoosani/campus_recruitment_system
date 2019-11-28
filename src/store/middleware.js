import Action from './action';
import firebase from '../config/config';

export default class Middleware {
    static students = {};

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

    // static accountType(data) {
    //     return dispatch => {
    //         dispatch(Action.type(data))
    //     }
    // }

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
            let type = data[0].accountType === 'Student' ? 'students' : 'companies'
            firebase
                .database()
                .ref(`${type}/${data[1]}`)
                .set(data[0])
                .then(() => console.log('profile updata succeccfully!'))
                .catch(err => console.log(err))
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
                .then(() => {
                    delete data.password
                    let type = data.accountType === 'Student' ? 'students' : 'conpanies';
                    firebase
                        .database()
                        .ref(type)
                        .push(data)
                        .then(() => dispatch(Action.signUpSuccess(data)))
                        .catch(err => console.log('signUp error', err))
                })
        }
    }

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
                                        .then(() => {
                                            dispatch(Action.signInSuccess('signIn successfully!'))
                                            this.userStatus()
                                        })
                                        .catch(err => console.log(err))
                                }
                            }
                            setTimeout(() => {
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
                    .then(() => dispatch(Action.signInSuccess('admin login successfully!')))
                    .catch(err => console.log(err))
            }
        }
    }

    static signOut() {
        return dispatch => {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    console.log('Sign Out Successfully')
                    this.userStatus()
                })
                .catch(err => console.log(err))
        }
    }

    static userStatus() {
        return dispatch => {
            let loginUser = [];
            firebase
                .auth()
                .onAuthStateChanged(user => {
                    if (user) {
                        firebase
                            .database()
                            .ref('students')
                            .on('value', std => {
                                this.students = std.val();
                                loginUser = Object.values(std.val()).filter(i => i.email === user.email)
                                let key = []
                                Object.values(std.val()).filter((i, index) => {
                                    if (i.email === user.email) {
                                        key = Object.keys(std.val()).filter((itm, indx) => indx === index)
                                    }
                                })
                                loginUser.length && dispatch(Action.userLoginStatus(loginUser[0], key))
                            })
                        firebase
                            .database()
                            .ref('companies')
                            .on('value', cmp => {
                                loginUser = Object.values(cmp.val()).filter(i => i.email === user.email)
                                let key = []
                                Object.values(cmp.val()).filter((i, index) => {
                                    if (i.email === user.email) {
                                        key = Object.keys(cmp.val()).filter((itm, indx) => indx === index)
                                    }
                                })
                                loginUser.length && dispatch(Action.userLoginStatus(loginUser[0], key))
                            })
                        firebase
                            .database()
                            .ref('Admin')
                            .on('value', admin => {
                                let key = ''
                                for (let i in admin.val()) {
                                    if (admin.val()[i] === user.email) {
                                        loginUser = [admin.val()];
                                        loginUser.length && dispatch(Action.userLoginStatus(loginUser[0], key))
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
}