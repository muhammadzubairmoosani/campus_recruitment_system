import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import Vacancies from './vacancies';
import Notifications from './notifications';
import Profile from './profile';

export default class StudentDeshboard extends React.Component {
    render() {
        return (
            <Tab.Container  id="left-tabs-example" defaultActiveKey="first" >
                <Row>
                    <Col sm={3} className='bg-white' style={{minHeight: '100vh'}}>
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
                    <Col sm={9} className='p-0 bg-white'>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Vacancies />
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