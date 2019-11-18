import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import Middleware from '../../store/middleware';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            HRname: '',
            email: '',
            mobile: '',
            address: '',
            accountType: '',
            password: '',
            posts: [],
            flag: true
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({
                companyName: this.props.user[0].companyName,
                HRname: this.props.user[0].HRname,
                email: this.props.user[0].email,
                mobile: this.props.user[0].mobile,
                address: this.props.user[0].address,
                posts: this.props.user[0].posts,
                accountType: this.props.user[0].accountType,
                password: this.props.user[0].password,
            })
        }
    }
    _onChange = (key, value) => this.setState({ [key]: value, flag: false })
    _update = (...data) => {
        this.setState({ flag: true })
        this.props.updateDispatch(data)
    }
    render() {
        const { companyName, email, mobile, HRname, address, flag } = this.state;
        return (
            <Form className='mt-3'>
                <Form.Row>
                    <Form.Group as={Col} controlId="CompanyName">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" value={companyName}
                            onChange={(text) => this._onChange('companyName', text.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="HRname">
                        <Form.Label >HR Name</Form.Label>
                        <Form.Control value={HRname}
                            onChange={(text) => this._onChange('HRname', text.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={email} disabled
                            onChange={(text) => this._onChange('email', text.target.value)}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group controlId="Mobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="text" value={mobile}
                            onChange={(text) => this._onChange('mobile', text.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address} type="text"
                            onChange={(text) => this._onChange('address', text.target.value)}
                        />
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" disabled={flag && 'disabled'}
                    onClick={() => this._update(this.state, this.props.user[1][0])}
                >Update</Button>
            </Form>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.reducer.user,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateDispatch: (data) => dispatch(Middleware.profileUpdate(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);