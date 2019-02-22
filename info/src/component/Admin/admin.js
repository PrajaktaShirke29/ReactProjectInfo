import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import './../../App.css';
import './admin.css'
import {createBrowserHistory} from "history"
import UpdateRole from './UpdateRole'
import UserListAdmin from './UserListAdmin'
import AdminNavigation from './adminNavigation'
import AcceptPersonInfo from './AcceptPersonInfo'
import UpdateInfo from './UpdateInfo'
import UserDisplay from './../Login/userDisplay'



const history=createBrowserHistory();
class Admin extends Component {
  render() {
    return (
     <div className="App-header">
     <AdminNavigation/>
        <h2>Welcome {localStorage.getItem("User")}</h2>
        <h5> As Administration </h5>
        <Router history={history}>
          <Switch>
            <Route path="/admin/updaterole" component={UpdateRole}/>
            <Route path="/admin/userlistadmin" component={UserListAdmin}/>
            <Route path="/admin/acceptpersoninfo" component={AcceptPersonInfo}/>
            <Route path="/admin/updateinfo" component={UpdateInfo}></Route>
            <Route path="/admin/userdisplay" component={UserDisplay}></Route>
          </Switch>
        </Router>
     </div>
    );
  }
}

export default Admin;
