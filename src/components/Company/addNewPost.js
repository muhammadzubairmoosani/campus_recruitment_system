import React from "react";
import { connect } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap'
import Middleware from '../../store/middleware'

class AddNewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle: '',
            salary: '',
            description: '',
            key: '',
            flag: true
        }
    }
    _onChange = (key, value) => this.setState({ [key]: value, flag: false });

    _dispatch(data) {
        this.props.addNewPostDispatch(data);
        this.setState({ jobTitle: '', description: '', salary: '', flag: true })
    }

    componentDidUpdate(prvProps) {
        const { user } = this.props;
        if (prvProps.user !== user) {
            this.setState({ key: user[1][0] });
        }
    }
    render() {
        const { user } = this.props;
        return (
            <>
                {!!user.length ?
                    <Form className='border p-3'>
                        <Form.Row>
                            <Form.Group as={Col} controlId="CompanyName">
                                <Form.Label>Company name</Form.Label>
                                <Form.Control
                                    placeholder={user[0].companyName}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="HRname">
                                <Form.Label>HR Name</Form.Label>
                                <Form.Control
                                    placeholder={user[0].HRname}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="Email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    placeholder={user[0].email}
                                    disabled
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="Mobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    placeholder={user[0].mobile}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="jobTitle">
                                <Form.Label>Job Title</Form.Label>
                                <Form.Control
                                    placeholder="Job Title"
                                    onChange={(text) => this._onChange('jobTitle', text.target.value)}
                                    value={this.state.jobTitle}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="salary">
                                <Form.Label>Salary</Form.Label>
                                <Form.Control
                                    placeholder="Salary"
                                    onChange={(text) => this._onChange('salary', text.target.value)}
                                    value={this.state.salary}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group as={Col} controlId="Address">
                            <Form.Label>Job Description</Form.Label>
                            <Form.Control
                                placeholder="Job Description"
                                onChange={(text) => this._onChange('description', text.target.value)}
                                value={this.state.description}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="Address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                placeholder={user[0].address}
                                disabled
                            />
                        </Form.Group>

                        <Button variant="primary" disabled={this.state.flag && 'disabled'}
                            onClick={() => this._dispatch(this.state)}
                        >Update</Button>
                    </Form >
                    : null}
            </>
        );
    }
};

function mapStateToProps(state) {
    return {
        user: state.reducer.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewPostDispatch: data => dispatch(Middleware.addNewPost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPost);