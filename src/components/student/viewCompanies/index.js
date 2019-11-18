import React from 'react';
import { Table, Button, Tab, Row, Col, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import Middleware from '../../../store/middleware';
import Jobs from './jobs';

class CompaniesTable extends React.Component {
    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Vacancies</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Tab 2</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Jobs />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                world
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }
}

export default CompaniesTable;

