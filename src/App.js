import React from 'react';
import './App.css';
import NavigationBar from './components/Header';
import SignInForm from './components/SignInForm';
import StudentSignUp from './components/StudentSignUpForm';
import CompanySignUp from './components/CompanySignUpForm';
import StudentDeshboard from './components/Student';
import CompanyDeshboard from './components/Company';
import AdminDeshboard from './components/Admin';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <NavigationBar />
          <Route exact path='/signIn' component={SignInForm} />
          <Route exact path='/studentSignUp' component={StudentSignUp} />
          <Route exact path='/companySignUp' component={CompanySignUp} />
          <Route exact path='/studentDeshboard' component={StudentDeshboard} />
          <Route exact path='/companyDeshboard' component={CompanyDeshboard} />
          <Route exact path='/adminDeshboard' component={AdminDeshboard} />
        </div>
      </Router>
    )
  }
}