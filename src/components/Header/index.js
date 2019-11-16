import React from 'react';
import { Navbar, Nav, NavDropdown, FormControl, Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware';
import { Link } from 'react-router-dom';

let w = window.screen.availWidth

const styles = {
    position: 'absolute',
    left: w / 2.5,
    minWidth: '250px',
    textAlign: 'center',
}

const linkStyle = {
    color: '#212529',
    textDecoration: 'none'
}
class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountType: this.props.accountType

        }
    }
    componentDidMount() {
        this.props.userStatusDispatch();
    }




    // forceUpdate() {
    //     this.setState({ accountType: this.props.accountType })
    //     // console.log(this.state.accountType)
    //     console.log('===== hello')
    // }

    render() {
        const {
            user,
            signOutDispatch,
            // message,
            accountType
        } = this.props;
        // console.log(user)
        // console.log(Object.values(user).accountType)
        return (
            <Navbar bg="light" expand="lg" className='shadow-sm p-3 mx-3' >

                {/* message box */}
                {/* <div>
                    <Alert variant='primary'>{message}</Alert>
                </div> */}
                {/* message box */}

                <Navbar.Brand href="#home">Recruitment System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {
                            user[0] && user[0].accountType === 'Admin' ?
                                <NavDropdown title="View" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Students</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Companies</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Notifications</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={() => signOutDispatch()}
                                    >Sign Out
                                </NavDropdown.Item>
                                </NavDropdown>
                                : user[0] && user[0].accountType === 'Student' ?
                                    <NavDropdown title="View" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.2">Companies</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Notifications</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={() => signOutDispatch()}>Sign Out</NavDropdown.Item>
                                    </NavDropdown>
                                    : user[0] && user[0].accountType === 'Company' ?
                                        <>
                                            <NavDropdown title="View" id="basic-nav-dropdown">
                                                <NavDropdown.Item href="#action/3.2">Job Application</NavDropdown.Item>
                                                <NavDropdown.Item href="#action/3.3">Notifications</NavDropdown.Item>
                                                {/* <Link to='viewPosts' style={linkStyle}> */}
                                                <NavDropdown.Item to='viewPosts'>
                                                    Posts
                                                </NavDropdown.Item>
                                                {/* </Link> */}
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item onClick={() => signOutDispatch()}>Sign Out</NavDropdown.Item>
                                            </NavDropdown>
                                            <Nav.Link to='addNewPost'>
                                                {/* <Link to='addNewPost'> */}
                                                    Add New Post
                                            {/* </Link> */}
                                            </Nav.Link>
                                        </>
                                        : null
                        }
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.reducer.user,
        // reducer: state.reducer,
        // accountType: state.reducer.accountType,
        // message: state.reducer.message
    }
}
function mapDispatchToProps(dispatch) {
    return {
        userStatusDispatch: () => dispatch(Middleware.userStatus()),
        signOutDispatch: () => dispatch(Middleware.signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);