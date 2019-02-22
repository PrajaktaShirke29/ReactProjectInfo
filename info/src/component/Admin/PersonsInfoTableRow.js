import React, { Component } from 'react';
//Persons Information in row
class PersonsInfoTableRow extends Component {
    constructor(props) {
      super(props);
    }
    onRowClick() {
      //alert(`Row clicked ${JSON.stringify(this.props.row)}`);
      // a new "selected()" method is used to Passed received data
      this.props.select(this.props.row);
    }
    onRowDelete() {
      // a "selected" method is used to pass received data
      this.props.delete(this.props.row);
    }
    onRowUpdate() {
        
      // a "selected" method is used to pass received data
      // this.props.update(this.props.row);
    }
    onRowAccept() {
      this.props.accept(this.props.row);
    }
    render() {
      return (
        <tr onClick={this.onRowClick.bind(this)}>
          <td>{this.props.row.FullName.FirstName} {this.props.row.FullName.MiddleName} {this.props.row.FullName.LastName}</td>
          <td>{this.props.row.Address.FlatNo} {this.props.row.Address.SocietyName} {this.props.row.Address.AreaName} {this.props.row.City}</td>
          <td>{this.props.row.State}</td>
          <td>{this.props.row.Pincode}</td>
          <td>{this.props.row.PhoneNo}</td>
          <td>{this.props.row.Telephone}</td>
          
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
  export default PersonsInfoTableRow;