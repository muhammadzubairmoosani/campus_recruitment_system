import React from 'react';
import { Navbar, Nav, FormControl, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AuthMiddleware from '../../store/Middleware/authMiddleware';
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
            // message,
        } = this.props;
        return (
            <Navbar bg="light" expand="lg" className='shadow-sm py-2 px-4' >
                <Navbar.Brand style={{ fontWeight: 'bold', fontSize: 17 }} className='text-dark'>
                    Campus Recruitment System
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {user[0] ?
                            <>
                                <Redirect to={user[0].accountType === 'Admin' ?
                                    'adminDeshboard' : user[0].accountType === 'Student' ?
                                        'studentDeshboard' : user[0].accountType === 'Company' ?
                                            'companyDeshboard' : null
                                }
                                />
                                <Nav.Link onClick={() => signOutDispatch()}>
                                    <Link to='/'>
                                        <Button size='sm' variant='outline-dark' onClick={() => signOutDispatch()}>Sign Out</Button>
                                    </Link>
                                </Nav.Link>
                            </>
                            :
                            <Nav.Link>
                                <Link to='signIn'>
                                    <Button size='sm' variant='outline-success'>Sign In</Button>
                                </Link>
                            </Nav.Link>
                        }
                    </Nav>
                    <Form inline>
                        <FormControl type="text" size='sm' placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success" size='sm'>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.AuthReducer.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        userStatusDispatch: () => dispatch(AuthMiddleware.userStatus()),
        signOutDispatch: () => dispatch(AuthMiddleware.signOut()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);

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
