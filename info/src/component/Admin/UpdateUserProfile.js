import React, { Component } from 'react';

class UpdateUserProfile extends Component {
    constructor(props) {
      super(props);
      this.state={
          RoleId:""
      }
    }
    onRowClick() {
    //  alert(`Row clicked ${JSON.stringify(this.props.row)}`);
      // a new "selected()" method is used to Passed received data
      this.props.selected(this.props.row);
    }
  
    onRowUpdate() {
      // a "selected" method is used to pass received data
      this.props.updated(this.props.row);
    }
    onChangeUser(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    render() {
      return (
        <tr onClick={this.onRowClick.bind(this)}>
          <td>{this.props.row.Username}</td>
          <td>{this.props.row.EmailAddr}</td>
          <td>{this.props.row.Password}</td>
          <td>{this.props.row.RoleId}</td>
          
          <td>
            <input
              type="button"
              value="Update Role"
              className="btn btn-warning"
              onClick={this.onRowUpdate.bind(this)}
            />
          </td>
         
        </tr>
      );
    }
  }   

  export default UpdateUserProfile;