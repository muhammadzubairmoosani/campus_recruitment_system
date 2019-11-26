import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import JobApplications from './jobApplications';
import Notifications from './notifications';
import Profile from './profile';
import AddNewPost from './addNewPost';
import PrevPosts from './prevPosts';

export default class CompanyDeshboard extends React.Component {
    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Job Applications</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Notifications</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Previous Posts</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fifth">Add New Post</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <JobApplications />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Notifications />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Profile />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <PrevPosts />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                                <AddNewPost />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }
}