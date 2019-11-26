import React from 'react';
import { Accordion, Card, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware';
// let keys;
// let userKey;

class Companies extends React.Component {
    componentDidMount() {
        this.props.getCompaniesDataDispatch()
    }
    // componentDidUpdate(prevProps) {
    //     const { user } = this.props;
    //     if (prevProps.user !== user) {
    //         userKey = user[1][0];
    //     }
    // }

    // _apply = (companyIndex, jobIndex) => {
    //     let companykey = keys[companyIndex];
    //     this.props.jobApplyDispatch(companykey, companyIndex, [userKey, this.props.user[0]], jobIndex)
    // }
    render() {
        const { vacancies, user, allAccounts } = this.props;
        // let jobs = Object.values(vacancies);
        // keys = Object.keys(vacancies);
        let companies = []
        for(let i in allAccounts[1]) {
            companies.push(allAccounts[1][i])
        }
        
        return (
            <Accordion>
                {!!companies.length && companies.map((item, index) => {
                    return <Card>
                        <Card.Header>
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th>Company Name</th>
                                        <th>HR Name</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>Adress</th>
                                        <th>View Posts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{item.companyName}</td>
                                        <td>{item.HRname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.address}</td>
                                        <td className='p-0 text-center'>
                                            <Accordion.Toggle
                                                disabled={item.posts ? '' : 'disabled'}
                                                as={Button}
                                                variant="link"
                                                eventKey={index}
                                            >
                                                <Button>View</Button>
                                            </Accordion.Toggle>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Header>
                        <Card.Body>
                            {item.posts && item.posts.map((i, indx) => {
                                let isExist = null;
                                for (let key in i.appliedStudents) {
                                    if (user.length && key === user[1][0]) {
                                        isExist = i.appliedStudents[key]
                                    }
                                }
                                return <Accordion.Collapse eventKey={index}>
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>Job Title</th>
                                                <th>Job Descripion</th>
                                                <th>Salary</th>
                                                <th>Delete Post</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i.jobTitle}</td>
                                                <td>{i.description}</td>
                                                <td>{i.salary}</td>
                                                <td className='text-right'>
                                                    <Button variant='danger'>Delete</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Accordion.Collapse>
                            })}
                        </Card.Body>
                    </Card>
                })}
            </Accordion>
        );
    }
}

function mapStateToProps(state) {
    return {
        // vacancies: state.reducer.vacancies,
        user: state.reducer.user,
        allAccounts: state.reducer.allAccounts
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getCompaniesDataDispatch: () => dispatch(Middleware.getCompaniesAndStudentsData()),
        // jobApplyDispatch: (...data) => dispatch(Middleware.jobApply(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Companies);