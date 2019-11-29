import React from "react";
import { MDBContainer, MDBRow, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthMiddleware from "../../store/Middleware/authMiddleware";
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
    render() {
        const {
            signInDispatch
        } = this.props;
        const {
            email,
            password,
            select
        } = this.state;

        return (
            <MDBContainer className='shadow w-50 p-0 pt-5'>
                <MDBCard>
                    <div className="header pt-3 grey lighten-2">
                        <MDBRow className="d-flex justify-content-start">
                            <h3 className=" text-dark mt-0 mb-0 pb-1 mx-5">Log In</h3>
                        </MDBRow>
                    </div>
                    <MDBCardBody className="mx-4 mt-4">
                        <MDBInput
                            label="Your email"
                            group
                            type="text"
                            onChange={(text) => this._onChange('email', text.target.value)}
                            validate
                        />
                        <MDBInput
                            label="Your password"
                            group
                            type="password"
                            validate
                            containerClass="mb-0"
                            onChange={(text) => this._onChange('password', text.target.value)}
                        />
                        <select
                            className="browser-default custom-select"
                            onChange={(text) => this._onChange('select', text.target.value)}
                        >
                            <option>Select your account type</option>
                            <option value="students">Student</option>
                            <option value="companies">Company</option>
                        </select>

                        <div className="text-center mb-4 mt-4">
                            <MDBBtn
                                color="success"
                                type="button"
                                className="btn-block z-depth-2 font-weight-bold"
                                onClick={() => signInDispatch(email, password, select)}
                            >
                                Sign In
                            </MDBBtn>
                        </div>
                        <p className="font-small grey-text justify-content-center">
                            Don't have an account?,
                                <span
                                className={select && select !== 'Select your account type' ? 'text-success' : 'text-danger'}
                                style={{ marginLeft: '.5em' }}
                            >
                                Select your account type before
                                </span>
                            <Link
                                disabled='disabled'
                                to={select === 'students' ? '/studentSignUp' : '/companySignUp'}
                                className=" font-weight-bold ml-1"
                            >
                                <MDBBtn
                                    color='primary'
                                    size="sm"
                                    disabled={select && select !== 'Select your account type' ? '' : 'disabled'}
                                >Sign Up</MDBBtn>
                            </Link>
                        </p>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        );
    }
};
const mapDispatchToProps = dispatch => {
    return {
        signInDispatch: (...data) => dispatch(AuthMiddleware.signIn(data))
    }
}
export default connect(null, mapDispatchToProps)(SignInForm);