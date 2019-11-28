import React from 'react';
import { Accordion, Card, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware';

class Vacancies extends React.Component {
    render() {
        const { user } = this.props;
        let jobApplications = Middleware.students;
        return (
            <Accordion>
                {!!user.length && !!user[0].posts && user[0].posts.map((item, index) => {
                    return <Card>
                        <Card.Header>
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th>Job Title</th>
                                        <th>Job Descripion</th>
                                        <th>Salary</th>
                                        <th>View Applicant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{item.jobTitle}</td>
                                        <td>{item.description}</td>
                                        <td>{item.salary}</td>
                                        <td className='p-0 text-right'>
                                            <Accordion.Toggle
                                                disabled={item.appliedStudents ? '' : 'disabled'}
                                                as={Button}
                                                variant="link"
                                                eventKey={index}
                                            >
                                                <Button variant='success'>View</Button>
                                            </Accordion.Toggle>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Header>
                        <Card.Body>
                            {
                                item.appliedStudents && Object.values(item.appliedStudents).map(i => {
                                    for (let uid in jobApplications) {
                                        if (uid === i) {
                                            return <Accordion.Collapse eventKey={index}>
                                                <Table striped bordered>
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Gender</th>
                                                            <th>Marks</th>
                                                            <th>Branch</th>
                                                            <th>University</th>
                                                            <th>Other Skills</th>
                                                            <th>Age</th>
                                                            <th>Mobile</th>
                                                            <th>Email</th>
                                                            <th>Address</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{jobApplications[uid].name}</td>
                                                            <td>{jobApplications[uid].gender}</td>
                                                            <td>{jobApplications[uid].marks}</td>
                                                            <td>{jobApplications[uid].branch}</td>
                                                            <td>{jobApplications[uid].university}</td>
                                                            <td>{jobApplications[uid].otherSkills}</td>
                                                            <td>{jobApplications[uid].age}</td>
                                                            <td>{jobApplications[uid].mobile}</td>
                                                            <td>{jobApplications[uid].email}</td>
                                                            <td>{jobApplications[uid].address}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Accordion.Collapse>
                                        }
                                    }
                                })
                            }
                        </Card.Body>
                    </Card>
                })}
            </Accordion>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.reducer.user,
    }
}
export default connect(mapStateToProps)(Vacancies);