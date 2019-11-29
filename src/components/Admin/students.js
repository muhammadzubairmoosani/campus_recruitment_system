import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import CompanyMiddleware from '../../store/Middleware/companyMiddleware';
class Students extends React.Component {
    componentDidMount() {
        this.props.getStudentsDataDispatch()
    }
    render() {
        const {
            studentsData,
            deleteStudentDispatch
        } = this.props;
        let students = [];
        let uid = [];
        for (let i in studentsData) {
            students.push(studentsData[i])
            uid.push(i)
        }
        const _delete = (index, ACType) => {
            let selectedUid = uid.filter((item, indx) => indx === index)
            let accountType = ACType === 'Student' ? 'students' : 'companies'
            deleteStudentDispatch(accountType, selectedUid[0])
        }
        return (
            <>
                {!!students.length && students.map((item, index) => {
                    return <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Marks</th>
                                <th>Branch</th>
                                <th>University</th>
                                <th>Other Skills</th>
                                <th>Delete Student</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.gender}</td>
                                <td>{item.age}</td>
                                <td>{item.mobile}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td>{item.marks}</td>
                                <td>{item.branch}</td>
                                <td>{item.university}</td>
                                <td>{item.otherSkills}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Button variant='danger'
                                        onClick={() => _delete(index, item.accountType)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                })}
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        studentsData: state.companyReducer.students,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getStudentsDataDispatch: () => dispatch(CompanyMiddleware.getStudents()),
        deleteStudentDispatch: (...data) => dispatch(CompanyMiddleware.deleteAccount(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Students);