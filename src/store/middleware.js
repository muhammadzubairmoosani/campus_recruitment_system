import Action from './action';
import firebase from '../config/config';

export default class Middleware {
    static accountType(data) {
        return dispatch => {
            dispatch(Action.type(data))
        }
    }

    static Login(data) {
        return dispatch => {
            firebase
                .auth()
                .signInWithEmailAndPassword(data.email, data.password)
                .then(user => dispatch(Action.login(user)))
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
            firebase
                .auth()
                .onAuthStateChanged(user => dispatch(Action.userLoginStatus(user)))
        }
    }
}