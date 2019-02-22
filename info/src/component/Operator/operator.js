import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import './../../App.css';
import './../Admin/admin.css'
import OperatorNavigation from './operatorNavigation'
import CreateInfo from '../Login/createinfo';
import UpdateInfoOp from './updateinfoOp'
import CreateRole from './CreateRole'
import {createBrowserHistory} from "history"
import UserDisplay from '../Login/userDisplay';

const history=createBrowserHistory();
class Admin extends Component {
  render() {
    return (
     <div className="App-header">
     <OperatorNavigation/>
        <h2>Welcome {localStorage.getItem("User")}</h2>
        <h5> As Operator </h5>
        <Router history={history}>
          <Switch>
            <Route path="/operator/createinfo" component={CreateInfo}/>
            <Route path="/operator/updateinfo" component={UpdateInfoOp}/>
            <Route path="/operator/createrole" component={CreateRole}/>
            <Route path="/operator/userdisplay" component={UserDisplay}/>
            
          </Switch>
        </Router>
     </div>
    );
  }
}

export default Admin;
