import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware';

class PrevPosts extends React.Component {
    render() {
        const { user, deleteDispatch } = this.props;
        console.log(user[0] && user[1][0])
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Salary</th>
                        <th>Description</th>
                        <th>Edit Post</th>
                        <th>Delete Post</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].posts.map((item, index) =>
                        <tr key={index}>
                            <td
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                            >{item.jobTitle}
                            </td>
                            <td
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                            >{item.salary}
                            </td>
                            <td
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                            >{item.description}
                            </td>
                            <td className='text-center'>
                                <Button variant="success">
                                    <i className="fas fa-pen"></i>
                                </Button>
                            </td>
                            <td className='text-center'>
                                <Button variant="danger"
                                    onClick={() => deleteDispatch(index, user[1][0])}
                                >
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
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
        deleteDispatch: (...data) => dispatch(Middleware.deletePost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrevPosts);