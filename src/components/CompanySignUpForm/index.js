import React from "react";
import { connect } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap'
import AuthMiddleware from '../../store/Middleware/authMiddleware'
class CompanySignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountType: 'Company',
            companyName: '',
            HRname: '',
            email: '',
            password: '',
            mobile: '',
            discription: '',
            address: '',
            posts: ''
        }
    }
    _onChange = (key, value) => this.setState({ [key]: value });
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
                            <Form.Control placeholder="Company name" onChange={(text) => this._onChange('companyName', text.target.value)} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="HR Name" onChange={(text) => this._onChange('HRname', text.target.value)} />
                        </Col>
                    </Form.Row>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Control placeholder="Email" onChange={(text) => this._onChange('email', text.target.value)} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Password" onChange={(text) => this._onChange('password', text.target.value)} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Mobile" onChange={(text) => this._onChange('mobile', text.target.value)} />
                        </Col>
                    </Form.Row>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Control placeholder="Description" onChange={(text) => this._onChange('discription', text.target.value)} />
                        </Col>
                    </Form.Row>
                    <Form.Row className='mb-3'>
                        <Col>
                            <Form.Control placeholder="Address" onChange={(text) => this._onChange('address', text.target.value)} />
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
const mapDispatchToProps = dispatch => {
    return {
        signUpDispatch: data => dispatch(AuthMiddleware.signUp(data))
    }
}
export default connect(null, mapDispatchToProps)(CompanySignUp);