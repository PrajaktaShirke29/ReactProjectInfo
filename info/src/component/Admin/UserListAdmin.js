import React, { Component } from "react";
import UserAuth from "./../services/userauth";
import './../../App.css'
import TableHeader from './TableHeader'
import UserProfileTableRow from './UserProfileTableRow'

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
      headers: [],
      head: [],
      isHidden: true
    };
    this.generateHeaders();
    this.serv = new UserAuth();
    
  }

  
  generateHeaders() {
    for (let c in this.state.users[0]) {
      this.state.head.push(c);
    }
  }

  onChangeProduct(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClickAccepted(e) {
    let id= e._id;
    let log={
      id:this.state._id,
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
      .getData()
      .then(data => data.json())
      .then(value => {
        console.log(JSON.stringify(value.data));
        this.setState({ persons: value.data });
      })
      .catch(error => {
        console.log(`Error Occured ${error.status}`);
      });

    this.serv
      .getUser()
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
  onClickSave(e){
    let log={
        Username:this.state.Username,
        Password:this.state.Password,
        EmailAddr: this.state.EmailAddr,
        RoleId: this.state.RoleId
    }
    console.log(log);
    this.serv
            .updateUser(this.state._id, log)
            .then(res => console.log(res.json()))
            .then(resp => {
              console.log(resp.data);
              let tempArray = this.state.users.slice();
              tempArray.push(resp.data);
              this.setState({ users: tempArray });
            })
            .catch(error => console.log(error.status));
   
}
  render() {
    return (
      <div className="container">
      <div>
        <h2>
          <i>Accept User Request</i>
        </h2>
        <br />
        <br />
        <table className="Table" className="table table-bordered table-stripped">
          <thead className="Table">
            {this.state.head.map((h, i) => (
              <TableHeader key={i} header={h} />
            ))}
          </thead>
          <tbody className="Table">
            {this.state.users.map((usr, idx) => (
              <UserProfileTableRow
                key={idx}
                row={usr}
                selected={this.getSelectedProduct.bind(this)}
                accepted={this.onClickAccepted.bind(this)}
                deleted={this.onClickDeleted.bind(this)}
              />
            ))}
          </tbody>
        </table>
        </div>
      
      </div>
    );
  }
}





export default UserListAdmin;
