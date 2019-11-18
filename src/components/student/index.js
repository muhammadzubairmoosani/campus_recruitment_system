import React from 'react';
import { Table, Button, Tab, Row, Col, Nav } from 'react-bootstrap';
import Vacancies from './vacancies';
import Notifications from './notifications';
import Profile from './profile';

export default class StudentDeshboard extends React.Component {
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
                                <Nav.Link eventKey="second">Notifications</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Profile</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {/* <Vacancies /> */}
                                <h1>Problem!</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Notifications />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Profile />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }
}