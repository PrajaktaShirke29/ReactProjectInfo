import React, { Component } from "react";
import UserAuth from "./../services/userauth";
import './../../App.css'
import TableHeader from './TableHeader'
import UpdateUserProfile from "./UpdateUserProfile";


class UserListAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      Username: "",
      EmailAddr: "",
      Password: "",
      RoleId: "",

     

      users: [
        {
          Username: "",
          EmailAddr: "",
          Password: "",
          RoleId: ""
        }
      ],
      head: []
    };
    
    this.generateHeaders();
    this.serv = new UserAuth();
    
  }
  generateHeaders() {
    for (let c in this.state.users[0]) {
      this.state.head.push(c);
    }
  }

 

  onClickAccepted(e) {
    let id= e._id;
    let log={
     // id:this.state._id,
      Username:e.Username,
      Password:e.Password,
      EmailAddr: e.EmailAddr,
      RoleId: e.RoleId
  }
  console.log(log);

  this.serv
  .postPermanentUser(log)
  .then(res => {
      console.log(res.json());
      console.log("..............................");
  })
  .then(resp => {
      console.log(resp.data);
  })
  .catch(error => console.log(error.status));

  
          this.serv
          .deletedUser(id)
          .then(res => console.log(res.json()))
          .then(resp => {
              console.log(resp.data)
          })
          .catch(error => console.log(error.status));
  }

  //user Profile delete
  onClickDeleted(e) {
       let id= e._id;
        
    console.log(id);
    this.serv
            .deletedUser(id)
            .then(res => console.log(res.json()))
            .then(resp => {
                console.log(resp.data)
            })
            .catch(error => console.log(error.status));
  }
  onClickUpdated(e) {
    let id= e._id;
    
    console.log(id);
    let log={
        _id:id,
        Username:this.state.Username,
        Password:this.state.Password,
        EmailAddr: this.state.EmailAddr,
        RoleId: this.state.RoleId
    }
    console.log(log);
    this.serv
            .updatPerUser(id, log)
            .then(res => console.log(res.json()))
            .then(resp => console.log(resp.data))
            .catch(error => console.log(error.status));
  }

  getSelectedProduct(p) {
    //  this.setState({ id: p._id});
    this.setState({ Username: p.Username});
    this.setState({ EmailAddr: p.EmailAddr});
    this.setState({ Password: p.Password });
    this.setState({ RoleId: p.RoleId });
  }

  // method will be executed after render() complete its job
  componentDidMount() {
    this.serv
      .getPerUser()
      .then(data => data.json())
      .then(value => {
        console.log(JSON.stringify(value.data));
        this.setState({ users: value.data });
      })
      .catch(error => {
        console.log(`Error Occured ${error.status}`);
      });
  }
  onChangeUser(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClickClear(e) {
    this.setState({ Username: "" });
    this.setState({ Password: "" });
    this.setState({ EmailAddr: "" });
    this.setState({ RoleId: "" });
  }
  
  render() {
    return (
      <div className="container">
        <h2>
          <i>Update roles</i>
        </h2>
        <br />
        <br />
        <table className="table table-bordered">
          <thead className="Table" >
            {this.state.head.map((h, i) => (
              <TableHeader key={i} header={h} />
            ))}
          </thead>
          <tbody className="Table">
            {this.state.users.map((usr, idx) => (
              <UpdateUserProfile
                key={idx}
                row={usr}
                selected={this.getSelectedProduct.bind(this)}
                accepted={this.onClickAccepted.bind(this)}
                updated={this.onClickUpdated.bind(this)}
                deleted={this.onClickDeleted.bind(this)}
              />
            ))}
          </tbody>
        </table>
        <br />
        <br />
        <div className="container">
               
        <div className="form-group">
          <label htmlFor="Username">Username</label>
          <br />
          <input
            type="text"
            name="Username"
            className="group-control"
            value={this.state.Username}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div  className="form-group">
                <label htmlFor="EmailAddr">Email Address</label><br/>
                <input 
                    type="text" 
                    name="EmailAddr" 
                    className="group-control"
                    value={this.state.EmailAddr} 
                    onChange={this.onChangeUser.bind(this)} />
            </div>
        <div className="form-group">
          <label htmlFor="Password">Password
          </label>
          <br />
          <input
            type="password"
            name="Password"
            className="group-control"
            value={this.state.Password}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="RoleId">RoleId
          </label>
          <br />
          <input
            type="input"
            name="RoleId"
            className="group-control"
            value={this.state.RoleId}
            onChange={this.onChangeUser.bind(this)}
          />
        </div>
        <div className="form-group">
          <input
            type="button"
            value="Clear"
            className="btn btn-secondary"
            onClick={this.onClickClear.bind(this)}
          />

        </div>
      </div>
      </div>
    );
  }
}
export default UserListAdmin;
