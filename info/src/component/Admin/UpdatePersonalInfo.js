import React, { Component } from 'react';
//Update Info

class UpdatePersonalInfo extends Component {
    constructor(props) {
      super(props);
    }
    onRowClick() {
      //alert(`Row clicked ${JSON.stringify(this.props.row)}`);
      // a new "selected()" method is used to Passed received data
      this.props.selected(this.props.row);
    }
  
    onRowUpdated() {
      // a "selected" method is used to pass received data
      this.props.updated(this.props.row);
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
              value="Update "
              className="btn btn-warning"
              onClick={this.onRowUpdated.bind(this)}
            />
          </td>
         
        </tr>
      );
    }
  }   

  export default UpdatePersonalInfo;
