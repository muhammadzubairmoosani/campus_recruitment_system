import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware';

class Students extends React.Component {
    componentDidMount() {
        this.props.getStudentsDataDispatch()
    }
    render() {
        const { allAccounts, deleteStudentDispatch } = this.props;
        let students = [];
        let uid = [];
        for (let i in allAccounts[0]) {
            students.push(allAccounts[0][i])
            uid.push(i)
        }
        const _delete = (index, userEmail) => {
            let selectedUid = uid.filter((item, indx) => indx === index)
            deleteStudentDispatch(selectedUid[0],userEmail)
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
                                <td style={{ textAlign: 'right' }}>
                                    <Button variant='danger'
                                        onClick={() => _delete(index, item.email)}
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

function mapStateToProps(state) {
    return {
        allAccounts: state.reducer.allAccounts
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getStudentsDataDispatch: () => dispatch(Middleware.getCompaniesAndStudentsData()),
        deleteStudentDispatch: (...data) => dispatch(Middleware.deleteStudent(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Students);