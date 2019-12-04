import React from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import AuthMiddleware from '../../store/Middleware/authMiddleware';
import CompanyMiddleware from '../../store/Middleware/companyMiddleware';
class PrevPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            text: 'Edit',
            flagIndex: ''
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user && this.props.user.length) {
            this.setState({ posts: this.props.user[0].posts })
        }
    }
    componentDidMount() {
        this.props.userStatusDispatch()
    }
    _onChange = (key, value, index) => {
        let posts = [...this.state.posts];
        posts[index][key] = value;
        this.setState({ posts });
    }
    _update = (key, index) => {
        this.setState({
            flagIndex: index
        }, () => this.setState({ text: this.state.text === 'Edit' ? 'Update' : 'Edit' }))
        if (this.state.text === 'Update') {
            this.props.updateDispatch(this.state.posts, key)
        }
    }
    render() {
        const { user, deletePostDispatch } = this.props;
        const { posts, flagIndex, text } = this.state;
        const _deletePost = (index) => {
            user[0].posts.splice(index, 1);
            deletePostDispatch(user)
        }
        return (
            <>
                {posts && posts.length ?
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Salary</th>
                                <th>Description</th>
                                <th>Update Post</th>
                                <th>Delete Post</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts && !!posts.length && posts.map((item, index) =>
                                <tr key={index}>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            value={item.jobTitle}
                                            onChange={(text) => this._onChange('jobTitle', text.target.value, index)}
                                            disabled={flagIndex === index && text === 'Update' ? false : true}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            value={item.salary}
                                            onChange={(text) => this._onChange('salary', text.target.value, index)}
                                            disabled={flagIndex === index && text === 'Update' ? false : true}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            value={item.description}
                                            onChange={(text) => this._onChange('description', text.target.value, index)}
                                            disabled={flagIndex === index && text === 'Update' ? false : true}
                                        />
                                    </td>
                                    <td className='text-center'>
                                        <Button variant="success" onClick={() => this._update(user[1][0], index)}>
                                            {flagIndex === index ? text : 'Edit'}
                                        </Button>
                                    </td>
                                    <td className='text-center'>
                                        <Button variant="danger" onClick={() => _deletePost(index)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    :
                    <div className='text-center mt-5 text-secondary text-secondary'>
                        <i className="far fa-folder-open fa-3x"></i><br />
                        <h2>Empty Posts</h2>
                    </div>
                }
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.AuthReducer.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deletePostDispatch: (data) => dispatch(CompanyMiddleware.deletePost(data)),
        updateDispatch: (...data) => dispatch(CompanyMiddleware.updatePost(data)),
        userStatusDispatch: () => dispatch(AuthMiddleware.userStatus())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PrevPosts);