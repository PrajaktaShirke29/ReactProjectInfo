import React, { Component } from 'react';
// User Registration row
class UserProfileTableRow extends Component {
    constructor(props) {
      super(props);
    }
    onRowClick() {
      alert(`Row clicked ${JSON.stringify(this.props.row)}`);
      // a new "selected()" method is used to Passed received data
      this.props.selected(this.props.row);
    }
    onRowDelete() {
      // a "selected" method is used to pass received data
      this.props.deleted(this.props.row);
    }
    onRowUpdate() {
      // a "selected" method is used to pass received data
      this.props.updated(this.props.row);
    }
    onRowAccept() {
      this.props.accepted(this.props.row);
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
              value="Accept"
              className="btn btn-success"
              onClick={this.onRowAccept.bind(this)}
            />
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={this.onRowDelete.bind(this)}
            >
              Reject
            </button>
          </td>
        </tr>
      );
    }
  }   

  export default UserProfileTableRow;