import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
class Notifications extends React.Component {
    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Notifications</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>notifications</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}
function mapStateToProps(state) {
    return {
        notifications: state.reducer.notifications
    }
}
export default connect(mapStateToProps)(Notifications);





