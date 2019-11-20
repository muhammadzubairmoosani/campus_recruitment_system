import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import Middleware from '../../store/middleware';
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            mobile: '',
            age: '',
            gender: '',
            marks: '',
            branch: '',
            university: '',
            address: '',
            otherSkills: '',
            flag: true
        }
    }
    componentDidUpdate(prevProps) {
        const { user } = this.props
        // console.log('stdProfil', user)
        // if (prevProps.user === user && user.data) {
        //     this.setState({
        //         name: user.data.name,
        //         email: user.data.email,
        //         mobile: user.data.mobile,
        //         gender: user.data.gender,
        //         marks: user.data.marks,
        //         branch: user.data.branch,
        //         university: user.data.university,
        //         address: user.data.address,
        //         otherSkills: user.data.otherSkills,
        //         rollNo: user.data.rollNo,
        //         accountType: user.data.accountType,
        //         password: user.data.password,
        //     })
        // }
        if (prevProps.user !== user) {
            this.setState({
                name: user[0].name,
                email: user[0].email,
                mobile: user[0].mobile,
                gender: user[0].gender,
                marks: user[0].marks,
                branch: user[0].branch,
                university: user[0].university,
                address: user[0].address,
                otherSkills: user[0].otherSkills,
                rollNo: user[0].rollNo,
                accountType: user[0].accountType,
                password: user[0].password,
            })
        }
    }

    _onChange = (key, value) => this.setState({ [key]: value, flag: false })
    _update = (...data) => {
        this.setState({ flag: true })
        this.props.updateDispatch(data)
    }
    render() {
        const { user } = this.props;
        const { name, email, mobile, age, gender, marks, branch, university, otherSkills, address, flag } = this.state;
        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="studentName">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control type="text" value={name}
                            onChange={(text) => this._onChange('name', text.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="rollNo">
                        <Form.Label >Roll No.</Form.Label>
                        <Form.Control disabled value={user[0] && user[0].rollNo} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={email} disabled
                            onChange={(text) => this._onChange('email', text.target.value)}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="Mobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="text" value={mobile}
                            onChange={(text) => this._onChange('mobile', text.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="Age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="text" value={age}
                            onChange={(text) => this._onChange('age', text.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="Gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" value={gender}
                            onChange={(text) => this._onChange('gender', text.target.value)}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="Marks">
                        <Form.Label>Marks</Form.Label>
                        <Form.Control type="text" value={marks}
                            onChange={(text) => this._onChange('marks', text.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="Branch">
                        <Form.Label>Branch</Form.Label>
                        <Form.Control value={branch} type="text"
                            onChange={(text) => this._onChange('branch', text.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="University">
                        <Form.Label>University</Form.Label>
                        <Form.Control value={university} type="text"
                            onChange={(text) => this._onChange('university', text.target.value)}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="otherSkills">
                    <Form.Label>Other Skills</Form.Label>
                    <Form.Control value={otherSkills} type="text"
                        onChange={(text) => this._onChange('otherSkills', text.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="Address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={address} type="text"
                        onChange={(text) => this._onChange('address', text.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" disabled={flag && 'disabled'}
                    onClick={() => this._update(this.state, user[1][0])}
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