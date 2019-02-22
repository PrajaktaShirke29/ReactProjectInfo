import React, { Component } from "react";
import UserAuth from "./../services/userauth";
import './../../App.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: ""
    };
    this.serv = new UserAuth();
  }

  onChangeUser(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClickClear(e) {
    this.setState({ Username: "" });
    this.setState({ Password: "" });
  }

  onClickSave(e) {
    let log = {
      Username: this.state.Username,
      Password: this.state.Password
    };
    console.log(log);

    this.serv
      .postData(log)
      //.CheckUser(this.state.UserName,this.state.Password)
      .then(res => res.json())
      .then(resp => {
        console.log("api values" + JSON.stringify(resp));
        localStorage.setItem("token", `Bearer ${resp.token}`);
        var token = JSON.stringify(resp.token);
        console.log(resp);
        console.log(resp.role);
        if (token != null) {
          localStorage.setItem("User", `${log.Username}`);
          if (resp.role === "AccessUser") {
            alert(`Successfull login ${log.Username} as ${resp.role}`);
            let history = this.props.history;
            history.push("/idInput");
          } else if (resp.role === "Operator") {
            alert(`Successfull login ${log.Username} as ${resp.role}`);
            let history = this.props.history;
            history.push("/operator");
          } else if (resp.role === "Administrator") {
            alert(`Successfull login ${log.Username} as ${resp.role}`);
            let history = this.props.history;
            history.push("/admin");
          }
        } else {
                   this.serv
                   .postPerData(log)
                      //.CheckUser(this.state.UserName,this.state.Password)
                   .then(res => res.json())
                   .then(resp => {
                       console.log("api values" + JSON.stringify(resp));
                       localStorage.setItem("token", `Bearer ${resp.token}`);
                      var token = JSON.stringify(resp.token);
                       console.log(resp);
                      console.log(resp.role);
                    if (token != null) {
                         localStorage.setItem("User", `${log.Username}`);
                    if (resp.role === "AccessUser") {
                         alert(`Successfull login ${log.Username} as ${resp.role}`);
                           let history = this.props.history;
                               history.push("/idInput");
                             }
                              else if (resp.role === "Operator") {
                              alert(`Successfull login ${log.Username} as ${resp.role}`);
                              let history = this.props.history;
                               history.push("/operator");
                         } else if (resp.role === "Administrator") {
                      alert(`Successfull login ${log.Username} as ${resp.role}`);
                           let history = this.props.history;
                            history.push("/admin");
                         }
                     } else {
                   alert(`UnSuccessfull login. Login again`);
                 }
                 })
                 .catch(error => console.log(error.status));
            //     alert(`UnSuccessfull login. Login again`);
                }
               })
      .catch(error => console.log(error.status));
  }
  render() {
    return (
      <div className="container">
       
          
      <form>
        <h2>Login Page</h2>
        <div className="form-group">
          <label>Username</label>
          <br />
          <input 
            type="text"
            name="Username"
            value={this.state.Username}
            onChange={this.onChangeUser.bind(this)}
          />
          
        </div>

        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <br />
          <input
            type="password"
            name="Password"
            value={this.state.Password}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
        <input type="button" 
          value="Clear"
          className="btn btn-secondary" 
          style={{ borderColor :"#ffffff" }}
          onClick={this.onClickClear.bind(this)}
          />
    
      
      <input type="button" 
          value="Save" 
          className="btn btn-success" 
        onClick={this.onClickSave.bind(this)}
          />

          <div>
          <br/>
            <a href="./register" align="center">
              SignUp on Information System
            </a>
          </div>
        </div>
        </form>
      </div>
    );
  }
}

export default Login;
