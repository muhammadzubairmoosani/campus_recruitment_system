import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

class CompaniesTable extends React.Component {
    render() {
        const { companies } = this.props;
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Description</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Adress</th>
                        <th>Job</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {companies.map(item => {
                        <tr key={Date.now()}>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                    })} */}
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

function mapStateToProps(state) {
    return {
        companies: state.reducer.companies
    }
}
export default connect(mapStateToProps)(CompaniesTable);

