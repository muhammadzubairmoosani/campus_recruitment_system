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
            key: ''
        }
    }
    _onChange = (key, value) => this.setState({ [key]: value });

    _dispatch(data) {
        this.props.addNewPostDispatch(data);
        this.setState({
            jobTitle: '',
            description: '',
            salary: ''
        })
    }

    render() {
        const { user } = this.props;
        this.state.key = user[0] && user[1][0]
        return (
            <div className='d-flex justify-content-center'>
                <Form className='shadow mt-2 col-xl-6 col-md-6 p-3'>
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5" style={{ fontFamily: 'sans-serif' }}>
                        Add New Post
                 </h3>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Label>Company name</Form.Label>
                            <Form.Control
                                placeholder={user[0] && user[0].companyName}
                                disabled
                            />
                        </Col>
                        <Col>
                            <Form.Label>HR Name</Form.Label>
                            <Form.Control
                                placeholder={user[0] && user[0].HRname}
                                disabled
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                placeholder={user[0] && user[0].email}
                                disabled
                            />
                        </Col>
                        <Col>
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                placeholder={user[0] && user[0].mobile}
                                disabled
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className='mb-3'>
                        <Col>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                placeholder={user[0] && user[0].address}
                                disabled
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Control
                                placeholder="Job Title"
                                onChange={(text) => this._onChange('jobTitle', text.target.value)}
                                value={this.state.jobTitle}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder="Salary"
                                onChange={(text) => this._onChange('salary', text.target.value)}
                                value={this.state.salary}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className='my-3'>
                        <Col>
                            <Form.Control
                                placeholder="Description"
                                onChange={(text) => this._onChange('description', text.target.value)}
                                value={this.state.description}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className='mb-3'>
                        <Col>
                            <Button className='px-4' onClick={() => this._dispatch(this.state)}>
                                Add
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
        user: state.reducer.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewPostDispatch: data => dispatch(Middleware.addNewPost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPost);