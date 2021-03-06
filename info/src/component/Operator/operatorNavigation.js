import React, { Component } from 'react';
import './../Admin/admin.css'

class OperatorNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
     openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
      }
      
     closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
      }
    render() { 
        return ( 
        <div>
      <span  onClick={this.openNav.bind(this)}>&#9776;</span>
        <p>You have all the authorization related to the creating user profile and all assigning the role to the user</p>
        <div id="mySidenav" className="sidenav">
        <a className="closebtn" onClick={this.closeNav.bind(this)}>&times;</a>
        <a href="/operator/createinfo">Create Information</a>
        <a href="/operator/createrole">Create Role</a>
        <a href="/operator/updateinfo"> Update Information</a>
        <a href="/logout">Logout</a>
        <a href="#">Contact</a>
      </div>
      </div> );
    }
}
 
export default OperatorNavigation;