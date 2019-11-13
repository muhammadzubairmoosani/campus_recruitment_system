import React from 'react';
import { Navbar, Nav, NavDropdown, FormControl, Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
    componentDidMount() {
        this.props.userStatusDispatch()
    }
    render() {
        const {
            user,
            signOutDispatch
        } = this.props;
        return (
            <Navbar bg="light" expand="lg" className='shadow-sm p-3 mx-3' >

                <div className='fixed-top right-0 left-0'>
                    <Alert variant='primary'>Successfully!</Alert>
                </div>
                <Navbar.Brand href="#home">Recruitment System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {user.uid === '2k1bWXTr07VT15IVIh5pcxI8v5w1' && user.email === 'zubair@gmail.com' ?
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
                            : null
                        }
                    </Nav>
                    {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
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
        user: state.reducer.user
    }
}
function mapDispatchToProps(dispatch) {
    return {
        userStatusDispatch: () => dispatch(Middleware.userStatus()),
        signOutDispatch: () => dispatch(Middleware.signOut())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);