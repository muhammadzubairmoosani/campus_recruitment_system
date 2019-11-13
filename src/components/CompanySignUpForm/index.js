import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap'


class CompanySignUp extends React.Component {
    render() {
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
                            <Form.Control placeholder="Contact" />
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
export default connect(mapStateToProps)(CompanySignUp);