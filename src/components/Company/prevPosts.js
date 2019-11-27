import React from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware';

class PrevPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            flag: true,
            text: 'Edit'
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

    _update = (key) => {
        this.setState({
            flag: this.state.flag ? false : true
        }, () => this.setState({ text: this.state.flag ? 'Edit' : 'Update' }))
        if (this.state.text === 'Update') {
            this.props.updateDispatch(this.state.posts, key)
        }
    }

    render() {
        const { user, deleteDispatch, updateDispatch } = this.props;
        const { posts, flag } = this.state;
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
                                            disabled={flag && 'disabled'}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            value={item.salary}
                                            onChange={(text) => this._onChange('salary', text.target.value, index)}
                                            disabled={flag && 'disabled'}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            value={item.description}
                                            onChange={(text) => this._onChange('description', text.target.value, index)}
                                            disabled={flag && 'disabled'}
                                        />
                                    </td>
                                    <td className='text-center'>
                                        <Button variant="success" onClick={() => this._update(user[1][0])}>
                                            {this.state.text}
                                        </Button>
                                    </td>
                                    <td className='text-center'>
                                        <Button variant="danger" onClick={() => deleteDispatch(index, user[1][0])}>
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

function mapStateToProps(state) {
    return {
        user: state.reducer.user
    }
}
function mapDispatchToProps(dispatch) {
    return {
        deleteDispatch: (...data) => dispatch(Middleware.deletePost(data)),
        updateDispatch: (...data) => dispatch(Middleware.updatePost(data)),
        userStatusDispatch: () => dispatch(Middleware.userStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrevPosts);