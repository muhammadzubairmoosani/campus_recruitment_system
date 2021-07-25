import CompanyAction from '../Action/companyAction';
import firebase from '../../config/config';
export default class CompanyMiddleware {
    static getCompanies() {
        return dispatch => {
            firebase
                .database()
                .ref('companies')
                .on('value', snapshot => dispatch(CompanyAction.companies(snapshot.val())))
        }
    }
    static getStudents() {
        return dispatch => {
            firebase
                .database()
                .ref('students')
                .on('value', snapshot => dispatch(CompanyAction.students(snapshot.val())))
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
                .then(() => dispatch(CompanyAction.message('Delete post successfully!')))
                .catch(err => dispatch(CompanyAction.message('Delete post failed!', err)))
        }
    }
    static updatePost(data) {
        return dispatch => {
            firebase
                .database()
                .ref(`companies/${data[1]}/posts`)
                .set(data[0])
                .then(res => dispatch(CompanyAction.message('Update post successfully!')))
                .catch(err => dispatch(CompanyAction.message('Delete post failed!', err)))
        }
    }
    static profileUpdate(data) {
        return dispatch => {
            delete data[0].flag
            firebase
                .database()
                .ref(`companies/${data[1]}`)
                .set(data[0])
                .then(() => dispatch(CompanyAction.message('Profile updata successfully!')))
                .catch(err => dispatch(CompanyAction.message('Profile updata failed!', err)))
        }
    }
    static deleteAccount(data) {
        return dispatch => {
            firebase
                .database()
                .ref(`${data[0]}/${data[1]}`)
                .remove()
                .then(() => dispatch(CompanyAction.message('Delete Account successfully!')))
                .catch(err => dispatch(CompanyAction.message('Delete Account failed!', err)))
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
                .then(() => dispatch(CompanyAction.message('Add post successfully!')))
                .catch(err => dispatch(CompanyAction.message('Add post failed!', err)))
        }
    }
}
