import React from 'react';
import { Accordion, Card, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import CompanyMiddleware from '../../store/Middleware/companyMiddleware';
class Companies extends React.Component {
    componentDidMount() {
        this.props.getCompaniesDataDispatch()
    }
    render() {
        const {
            companiesData,
            deleteAccountDispatch,
            deletePostDispatch
        } = this.props;
        let companies = []
        let uid = [];
        for (let i in companiesData) {
            companies.push(companiesData[i])
            uid.push(i)
        }
        const _deletePost = (companyIndex, postIndex) => {
            companies[companyIndex].posts.splice(postIndex, 1)
            let selectedUid = uid.filter((item, indx) => indx === companyIndex)
            let selectedCompany = companies.filter((item, indx) => indx === companyIndex)
            deletePostDispatch(selectedCompany[0], selectedUid)
        }
        const _deleteAccount = (index, ACType) => {
            let selectedUid = uid.filter((item, indx) => indx === index)
            let accountType = ACType === 'Student' ? 'students' : 'companies'
            deleteAccountDispatch(accountType, selectedUid[0])
        }
        return (
            <Accordion>
                {!!companies.length && companies.map((item, index) => {
                    return <Card key={index}>
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
                                        <th>Delete Account</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{item.companyName}</td>
                                        <td>{item.HRname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.address}</td>
                                        <td className='text-right'>
                                            <Accordion.Toggle
                                                disabled={item.posts ? '' : 'disabled'}
                                                as={Button}
                                                eventKey={index}
                                            >View
                                            </Accordion.Toggle>
                                        </td>
                                        <td className='text-right'>
                                            <Button variant='danger'
                                                onClick={() => _deleteAccount(index, item.accountType)}
                                            >Delete</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Header>
                        <Card.Body>
                            {item.posts && item.posts.map((i, indx) => {
                                return <Accordion.Collapse eventKey={index} key={indx}>
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
                                                    <Button variant='danger'
                                                        onClick={() => _deletePost(index, indx)}
                                                    >Delete</Button>
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
const mapStateToProps = state => {
    return {
        companiesData: state.CompanyReducer.companies,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getCompaniesDataDispatch: () => dispatch(CompanyMiddleware.getCompanies()),
        deleteAccountDispatch: (...data) => dispatch(CompanyMiddleware.deleteAccount(data)),
        deletePostDispatch: (...data) => dispatch(CompanyMiddleware.deletePost(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Companies);