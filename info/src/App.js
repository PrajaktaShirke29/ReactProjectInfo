import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './component/Login/login'
import Register from './component/Login/register'
import UserDisplay from './component/Login/userDisplay'
import Admin from './component/Admin/admin'
import IdInput from './component/Login/idInput'
import CreateInfo from './component/Login/createinfo'
import Operator from './component/Operator/operator'
import Logout from './component/Login/Logout'
import {createBrowserHistory} from "history"

const history=createBrowserHistory();
class App extends Component {
  render() {
    return (
      <div className="Display">
      <div className="App-header">
      <div id="main">
         <h2 className="Header">INFORMATION SYSTEM</h2>
         <p>BE UNIQUE WITH THE UNIQUE IDENTIFICATION NUMBER </p>
         
       </div>
         <Router history={history}>
           <Switch>
             <Route exact path="/" component={Login}/>
             <Route  path="/register" component={Register}/>
             <Route  path="/idinput" component={IdInput}/>
             <Route path="/userdisplay" component={UserDisplay}/>
             <Route path="/createinfo" component={CreateInfo}/>
             <Route  path="/admin" component={Admin}/>
             <Route  path="/operator" component={Operator}/>
             <Route path="/logout" component={Logout}/>
           </Switch>
         </Router>
         </div>
         </div>
    );
  }
}

export default App;
