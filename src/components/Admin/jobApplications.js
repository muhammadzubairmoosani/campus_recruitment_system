import React from 'react';
import { Accordion, Card, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware';

class JobApplications extends React.Component {
    // componentDidMount() {
    //     this.props.getdata()
    // }
    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Branch</th>
                        <th>Marks</th>
                        <th>University</th>
                        <th>Other Skills</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>hello world</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

function mapStateToProps(state) {
    return {
        vacancies: state.reducer.vacancies
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getdata: () => dispatch(Middleware.getVacancies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobApplications);