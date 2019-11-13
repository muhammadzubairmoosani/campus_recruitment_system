import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            displayClass: 'd-flex'
        }
    }
    componentDidMount() {
        this.setState({ displayClass: this.props.accountType === 'Admin' && 'none' })
    }

    render() {
        const {
            accountType,
        } = this.props;
        const { displayClass } = this.state;

        return (
            <MDBContainer className='shadow w-50 p-0 mt-5'>
                <MDBCard>
                    <div className="header pt-3 grey lighten-2">
                        <MDBRow className="d-flex justify-content-start">
                            <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                                {accountType} Log in
                </h3>
                        </MDBRow>
                    </div>
                    <MDBCardBody className="mx-4 mt-4">
                        <MDBInput label="Your email" group type="text" validate />
                        <MDBInput
                            label="Your password"
                            group
                            type="password"
                            validate
                            containerClass="mb-0"
                        />
                        <div className="text-center mb-4 mt-5">
                            <MDBBtn
                                color="danger"
                                type="button"
                                className="btn-block z-depth-2"
                            >
                                Log in
                </MDBBtn>
                        </div>
                        <p
                            className="font-small grey-text justify-content-center"
                            style={{ display: displayClass }}
                        >
                            Don't have an account?
                            <Link
                                to={accountType === 'Student' ? '/studentSignUp' : '/companySignUp'}
                                className="dark-grey-text font-weight-bold ml-1"
                            >
                                Sign up
                            </Link>
                        </p>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        );
    }
};
function mapStateToProps(state) {
    return {
        accountType: state.reducer.accountType,
        }
}
export default connect(mapStateToProps)(LoginForm);