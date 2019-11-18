import React from 'react';
import { Accordion, Card, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Middleware from '../../../store/middleware';

class Jobs extends React.Component {
    componentDidMount() {
        this.props.getdata()
    }
    render() {
        const { vacancies } = this.props;
        let jobs = Object.values(vacancies);
        let count = 0;
        console.log(vacancies)
        return (
            <Accordion defaultActiveKey={0}>
                {jobs.length && jobs.map(item => {
                    return < Card >
                        <Card.Header>
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th>Company Name</th>
                                        <th>HR Name</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>Adress</th>
                                        <th>View Vacancies</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{item.companyName}</td>
                                        <td>{item.HRname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <Accordion.Toggle as={Button} variant="link" eventKey={count}>View</Accordion.Toggle>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Header>
                        {}
                        <Accordion.Collapse eventKey={count++}>
                            {item.posts.length && item.posts.map(i => {
                                return <Card.Body>
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>Job Title</th>
                                                <th>Job Descripion</th>
                                                <th>Salary</th>
                                                <th>Apply</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i.jobTitle}</td>
                                                <td>{i.discription}</td>
                                                <td>{i.salary}</td>
                                                <td><Button>Apply</Button></td>
                                                <td>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey={count}>View</Accordion.Toggle>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            })}
                        </Accordion.Collapse>
                    </Card>
                })
                }
            </Accordion >
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

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);