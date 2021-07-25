import React from 'react';
import { connect } from 'react-redux';
// import { Table } from 'react-bootstrap';
class Notifications extends React.Component {
    render() {
        return (
            <div className='text-center mt-5 text-secondary text-secondary'>
                <i className="far fa-bell fa-3x"></i><br />
                <h3>Empty Notifications</h3>
            </div>

            // <Table striped bordered hover>
            //     <thead>
            //         <tr>
            //             <th>Notifications</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         <tr>
            //             <td>notifications</td>
            //         </tr>
            //     </tbody>
            // </Table>
        );
    }
}
function mapStateToProps(state) {
    return {
        // notifications: state.reducer.notifications
    }
}
export default connect(mapStateToProps)(Notifications);