import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware';

class PrevPosts extends React.Component {
    // componentDidMount() {
    //     this.props.getdata()
    // }
    render() {
        const { user } = this.props;
        console.log(user[0] && user[0].posts)
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Salary</th>
                        <th>Description</th>
                        <th>Remove Post</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].posts.map((item, index) =>
                        <tr key={index}>
                            <td>{item.jobTitle}</td>
                            <td>{item.salary}</td>
                            <td>{item.description}</td>
                            <td className='text-center'>
                                <Button variant="danger">Remove</Button>
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
        getdata: () => dispatch(Middleware.getVacancies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrevPosts);