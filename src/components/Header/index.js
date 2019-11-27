import React from 'react';
import { Navbar, Nav, NavDropdown, FormControl, Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import Middleware from '../../store/middleware';
import { Link, Redirect } from 'react-router-dom';

// let w = window.screen.availWidth

// const styles = {
//     position: 'absolute',
//     left: w / 2.5,
//     minWidth: '250px',
//     textAlign: 'center',
// }

// const linkStyle = {
//     color: '#212529',
//     textDecoration: 'none'
// }
class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountType: this.props.accountType,
            color: '#969797'

        }
    }

    componentDidMount() {
        this.props.userStatusDispatch();
    }

    render() {
        const {
            user,
            signOutDispatch,
            // path,
            // message,
            // accountType
        } = this.props;
        // console.log(user)
        return (
            <Navbar bg="light" expand="lg" className='shadow-sm p-3 mx-3' >
                <Navbar.Brand
                    style={{ fontWeight: 'bold', fontSize: 17 }}
                >Campus Recruitment System
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {user[0] ?
                            <>
                                {
                                    user[0].accountType === 'Admin' ?
                                        <>
                                            <Nav.Link onClick={() => signOutDispatch()}>Sign Out</Nav.Link>
                                            <Redirect to='adminDeshboard' />
                                        </>
                                        : user[0].accountType === 'Student' ?
                                            <>
                                                <Nav.Link onClick={() => signOutDispatch()}>Sign Out</Nav.Link>
                                                <Redirect to='studentDeshboard' />
                                            </>
                                            : user[0].accountType === 'Company' ?
                                                <>
                                                    <Nav.Link onClick={() => signOutDispatch()}>Sign Out</Nav.Link>
                                                    <Redirect to='companyDeshboard' />
                                                </>
                                                : null
                                }
                            </>
                            : null}
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
        // path: state.reducer.path,
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