import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap'
import Middleware from '../../store/middleware'

class CompanySignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.accountType,
            companyName: '',
            HRname: '',
            email: '',
            password: '',
            mobile: '',
            discription: '',
            address: ''
        }
    }
    render() {
        const { signUpDispatch } = this.props;
        return (
            <div className='d-flex justify-content-center'>
                <Form className='shadow mt-5 col-xl-6 col-md-6 p-3'>
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5" style={{ fontFamily: 'sans-serif' }}>
                        Company Register
                 </h3>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Control placeholder="Company name" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="HR Name" />
                        </Col>
                    </Form.Row>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Control placeholder="Email" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Password" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Mobile" />
                        </Col>
                    </Form.Row>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Control placeholder="Description" />
                        </Col>
                    </Form.Row>
                    <Form.Row className='mb-3'>
                        <Col>
                            <Form.Control placeholder="Address" />
                        </Col>
                    </Form.Row>
                    <Form.Row className='mb-3'>
                        <Col>
                            <Button onClick={() => signUpDispatch(this.state)}>
                                <small>REGISTERED</small>
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        accountType: state.reducer.accountType,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signUpDispatch: data => dispatch(Middleware.signUp(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanySignUp);