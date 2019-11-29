import React from 'react';
import { Accordion, Card, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import CompanyMiddleware from '../../store/Middleware/companyMiddleware';
class Vacancies extends React.Component {
    componentDidMount() {
        this.props.getJobApplicationsDispatch();
    }
    render() {
        const { user, jobApplications } = this.props;
        return (
            <>
                {!!user.length && !!user[0].posts ?
                    <Accordion>
                        {user[0].posts.map((item, index) => {
                            return <Card key={index}>
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
                                                        eventKey={index}
                                                    >View
                                                    </Accordion.Toggle>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Header>
                                <Card.Body>
                                    {
                                        item.appliedStudents && Object.values(item.appliedStudents).map((i, indx) => {
                                            for (let uid in jobApplications) {
                                                if (uid === i) {
                                                    return <Accordion.Collapse eventKey={index} key={indx}>
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
                    :
                    <div className='text-center mt-5 text-secondary text-secondary'>
                        <i className="far fa-folder-open fa-3x"></i><br />
                        <h3>Empty Job Applications</h3>
                    </div>
                }
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.AuthReducer.user,
        jobApplications: state.CompanyReducer.students,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getJobApplicationsDispatch: () => dispatch(CompanyMiddleware.getStudents()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Vacancies);