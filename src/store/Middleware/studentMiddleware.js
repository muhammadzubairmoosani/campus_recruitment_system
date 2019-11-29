import StudentAction from '../Action/studentAction';
import firebase from '../../config/config';
export default class StudentMiddleware {
    static getVacancies() {
        return dispatch => {
            firebase
                .database()
                .ref('companies')
                .on('value', snapshot => dispatch(StudentAction.vacancies(snapshot.val())))
        }
    }
    static getStudents() {
        return dispatch => {
            firebase
                .database()
                .ref('students')
                .on('value', snapshot => dispatch(StudentAction.students(snapshot.val())))
        }
    }
    static jobApply(data) {
        return dispatch => {
            firebase
                .database()
                .ref(`companies/${data[0]}/posts/${data[3]}/appliedStudents`)
                .push(data[2])
                .then(() => dispatch(StudentAction.message('Application send successfully!')))
                .catch(err => dispatch(StudentAction.message('Application failed!', err)))
        }
    }
    static profileUpdate(data) {
        return dispatch => {
            delete data[0].flag
            firebase
                .database()
                .ref(`students/${data[1]}`)
                .set(data[0])
                .then(() => dispatch(StudentAction.message('Profile updata successfully!')))
                .catch(err => dispatch(StudentAction.message('Profile updata failed!', err)))
        }
    }
}