import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap'


class StudentSignUp extends React.Component {
    render() {
        return (
            <div className='d-flex justify-content-center'>
                <Form className='shadow mt-3 col-xl-6 col-md-6 p-3'>
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5" style={{ fontFamily: 'sans-serif' }}>
                        Student Register
                 </h3>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Control placeholder="Full name" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Roll No" />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col className='d-flex'>
                            <Form.Check className='mx-5' type="radio" label="Male" name='gender' />
                            <Form.Check type="radio" label="Female" name='gender' />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Mobile" />
                        </Col>
                    </Form.Row>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Control placeholder="Age" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="University" />
                        </Col>
                    </Form.Row>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Control as="select">
                                <option>Select Branch...</option>
                                <option>Arts</option>
                                <option>BCA</option>
                                <option>BE IT</option>
                                <option>BSC EXTC</option>
                                <option>BSC IT</option>
                                <option>BSC</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control placeholder="Marks" />
                        </Col>
                    </Form.Row>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Control placeholder="Email" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Password" />
                        </Col>
                    </Form.Row>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Control placeholder="Address" />
                        </Col>
                    </Form.Row>
                    <Form.Row className='mb-3'>
                        <Col>
                            <Form.Control placeholder="Other Skills" />
                        </Col>
                    </Form.Row>
                    <Form.Row className='mb-3'>
                        <Col>
                            <Button>
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
        // accountType: state.reducer.accountType,
        // formTitle: state.reducer.logInFormTitle
    }
}
export default connect(mapStateToProps)(StudentSignUp);