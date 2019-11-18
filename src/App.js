import React from 'react';
import NavigationBar from './components/Header';
import Cards from './components/Cards';
import LoginForm from './components/LoginForm';
import StudentSignUp from './components/StudentSignUpForm';
import CompanySignUp from './components/CompanySignUpForm';
import StudentDeshboard from './components/student';
import CompanyDeshboard from './components/company';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavigationBar />
        <Route exact path='/' component={Cards} />
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/studentSignUp' component={StudentSignUp} />
        <Route exact path='/companySignUp' component={CompanySignUp} />
        <Route exact path='/studentDeshboard' component={StudentDeshboard} />
        <Route exact path='/companyDeshboard' component={CompanyDeshboard} />
      </Router>
    )
  }
}

export default App;