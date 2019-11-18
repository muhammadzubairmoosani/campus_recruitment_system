import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import Middleware from '../../store/middleware';

class Cards extends React.Component {
    render() {
        const { accountTypeDispatch } = this.props;
        return (
            <div
                style={{ marginTop: '6em' }}
                className='text-center d-flex flex-row justify-content-around align-items-center flex-wrap'
            >
                <Card style={{ width: '18rem' }} className='shadow p-3 mb-5 bg-white rounded'>
                    <i className="fas fa-user-graduate fa-4x mt-5"></i>
                    <Card.Body>
                        <Card.Title>Student</Card.Title>
                        <Link to='/login' >
                            <Button
                                variant="primary px-4"
                                onClick={() => accountTypeDispatch('Student')}
                            >
                                SignIn
                        </Button>
                        </Link>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className='shadow p-3 mb-5 bg-white rounded'>
                    <i className="far fa-building fa-4x mt-5"></i>
                    <Card.Body>
                        <Card.Title>Company</Card.Title>
                        <Link to='/login' >
                            <Button
                                variant="primary px-4"
                                onClick={() => accountTypeDispatch('Company')}
                            >SignIn</Button>
                        </Link>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className='shadow p-3 mb-5 bg-white rounded'>
                    <i className="fas fa-user-shield fa-4x mt-5"></i>
                    <Card.Body>
                        <Card.Title>Admin</Card.Title>
                        <Link to='/login'>
                            <Button
                                variant="primary px-4"
                                onClick={() => accountTypeDispatch('Admin')}
                            >SignIn</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        accountTypeDispatch: data => dispatch(Middleware.accountType(data))
    }
}

export default connect(null, mapDispatchToProps)(Cards);