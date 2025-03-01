import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthMiddleware from "../../store/Middleware/authMiddleware";
import { Form, Button } from 'react-bootstrap';
class SignInForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            select: '',
            flag: false
        }
    }
    _onChange = (key, value) => this.setState({ [key]: value });
    _onSubmit = e => {
        e.preventDefault();
        this.props.signInDispatch(this.state)
    }
    render() {
        const { select } = this.state;
        return (
            <div className='d-flex justify-content-center mt-5'>
                <Form className='bg-white col-xl-4 col-md-6 col-11 rounded-lg p-4'>
                    <h3 className="deep-grey-text mb-2" >Sign-in</h3>
                    <div className="d-flex justify-between mb-2">
                        <div>
                            <p>Student login</p>
                            <p>Email: std@test.com</p>
                            <p>Password: 123456</p>
                        </div>
                        <div>
                            <p>Company login</p>
                            <p>Email: company@test.com</p>
                            <p>Password: 123456</p>
                        </div>
                    </div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            onChange={(text) => this._onChange('email', text.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            onChange={(text) => this._onChange('password', text.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <select
                            className="browser-default custom-select"
                            onChange={(text) => this._onChange('select', text.target.value)}
                        >
                            <option>Select your account type</option>
                            <option value="students">Student</option>
                            <option value="companies">Company</option>
                        </select>
                    </Form.Group>
                    <Button
                        className='w-100'
                        type="submit"
                        onClick={(e) => this._onSubmit(e)}
                    >Sign-in
                    </Button>
                    <Form.Text className="text-muted my-1">
                        Don't have an account?,
                        <span
                            className={select && select !== 'Select your account type' ? 'text-success' : 'text-danger'}
                            style={{ marginLeft: '.5em' }}
                        >Select your account type before sign-up
                        </span>
                    </Form.Text>
                    <Link to={select === 'students' ? '/studentSignUp' : '/companySignUp'}>
                        <Button
                            variant='success'
                            className='w-100'
                            disabled={select && select !== 'Select your account type' ? '' : 'disabled'}
                        >Sign Up
                        </Button>
                    </Link>
                </Form>
            </div >
        );
    }
};
const mapDispatchToProps = dispatch => {
    return {
        signInDispatch: (data) => dispatch(AuthMiddleware.signIn(data))
    }
}
export default connect(null, mapDispatchToProps)(SignInForm);