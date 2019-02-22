import React, { Component } from "react";
import UserAuth from "./../services/userauth";
import './../../App.css'
import TableHeader from './../Admin/TableHeader'
import UpdatePersonalInfo from './../Admin/UpdatePersonalInfo'

class UpdateInfoOp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        _id:"",
        PersonalUniqueId: "",
        FullName: {FirstName: "",
        MiddleName: "",
        LastName: ""},
        Gender: "",
        Dob: new Date(),
        Age: "",
        Address: {
          FlatNo: "",
         SocietyName: "",
         AreaName: ""
        },
        City: "",
        State: "",
        Pincode: "",
        PhoneNo: "",
        Telephone: "",
        PhysicalDisability: "",
        MaritalStatus: "",
        EductionStatus: "",
        BirthSign: "",
  
        persons: [
          {
            FullName: { FirstName: "", MiddleName: "", LastName: ""},
            Address: {FlatNo: "", SocietyName:"", AreaName:"", City:""},
            State: "",
            Pincode: "",
            PhoneNo: "",
            Telephone: ""
          }
        ],
        readOnly: true,
        head: []
    };
    this.generateHeaders();
    this.serv = new UserAuth();
    
  }
  onClickEdit() {
    this.setState({
        readOnly : false
    });
}
  
  generateHeaders() {
    for (let c in this.state.persons[0]) {
      this.state.head.push(c);
    }
  }


  onClickUpdated(e) {
    console.log(e._id);
    localStorage.setItem("PersonalId", `${e._id}`);
    let history = this.props.history;
            history.push("/operator/userdisplay");
  }

  getSelectedProduct(p) {
    
  }

  // method will be executed after render() complete its job
  componentDidMount() {
    this.serv
      .getPerData()
      .then(data => data.json())
      .then(value => {
        console.log(JSON.stringify(value.data));
        this.setState({ persons: value.data });
      })
      .catch(error => {
        console.log(`Error Occured ${error.status}`);
      });

  }
  onUserInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClickClear(e) {
    this.setState({ PersonalUniqueId: ""});
    this.setState({ FirstName: "" });
    this.setState({ MiddleName: "" });
    this.setState({ LastName: "" });
    this.setState({ Gender: "" });
    this.setState({ Age: "" });
    this.setState({ Dob:""});
    this.setState({ FlatNo: "" });
    this.setState({ SocietyName: "" });
    this.setState({ AreaName: "" });
    this.setState({ City: "" });
    this.setState({ State: "" });
    this.setState({ Pincode: "" });
    this.setState({ State: "" });
    this.setState({ PhoneNo: "" });
    this.setState({ PhysicalDisability: "" });
    this.setState({ MaritalStatus: "" });
    this.setState({ EducationStatus: "" });
    this.setState({ BirthSign: "" });
  }

  onClickSave(e) {
//     let id= e._id;
//    let usr={
//       // PersonalUniqueId:this.state._id,
//        FullName:{
//            FirstName:this.state.FirstName,
//            MiddleName:this.state.MiddleName,
//            LastName:this.state.LastName
//        },
//        Gender:this.state.Gender,
//        Dob: this.state.Dob,
//        Age:this.state.Age,
//        Address:{
//            FlatNo:this.state.FlatNo,
//            SocietyName:this.state.SocietyName,
//            AreaName:this.state.AreaName
//        },
//        City:this.state.City,
//        State: this.state.State,
//        Pincode: this.state.Pincode,
//        PhoneNo: this.state.PhoneNo,
//        Telephone: this.state.Telephone,
//        PhysicalDisability: this.state.PhysicalDisability,
//        MaritalStatus:this.state.MaritalStatus,
//        EducationStatus:this.state.EducationStatus,
//        BirthSign:this.state.BirthSign
//    }

  
//    console.log(usr);
//    console.log(id);
//    this.serv
//        .updateData(id,usr)
//        .then(res => res.json())
//        .then(resp => {
//            console.log(resp.data);
//            if(resp){
//                alert(`Information Updated.   Thank You!!!`);
//            }
//        })
//        .catch(error => console.log(error.status));

 } 

  render() {
    return (
      <div className="container" >
      <div>
        <h2>
          <i>Accept the Changes</i>
        </h2>
        <br />
        <br />
        <table className="Display" className="table table-stripped table-bordered">
          <thead className="Table">
            {this.state.head.map((h, i) => (
              <TableHeader key={i} header={h} />
            ))}
          </thead>
          <tbody className="Table">
            {this.state.persons.map((usr, idx) => (
              <UpdatePersonalInfo
                key={idx}
                row={usr}
                selected={this.getSelectedProduct.bind(this)}
                updated={this.onClickUpdated.bind(this)}
              />
            ))}
          </tbody>
        </table>
        </div>
        
      
      </div>
    );
  }
}

// class UserProfileTableRow extends Component {
//     constructor(props) {
//       super(props);
//     }
//     onRowClick() {
//       //alert(`Row clicked ${JSON.stringify(this.props.row)}`);
//       // a new "selected()" method is used to Passed received data
//       this.props.selected(this.props.row);
//     }
  
//     onRowUpdated() {
//       // a "selected" method is used to pass received data
//       this.props.updated(this.props.row);
//     }
    
//     render() {
//       return (
//         <tr onClick={this.onRowClick.bind(this)}>
//           <td>{this.props.row.FullName.FirstName} {this.props.row.FullName.MiddleName} {this.props.row.FullName.LastName}</td>
//           <td>{this.props.row.Address.FlatNo} {this.props.row.Address.SocietyName} {this.props.row.Address.AreaName} {this.props.row.City}</td>
//           <td>{this.props.row.State}</td>
//           <td>{this.props.row.Pincode}</td>
//           <td>{this.props.row.PhoneNo}</td>
//           <td>{this.props.row.Telephone}</td>
//           <td>
//             <input
//               type="button"
//               value="Update "
//               className="btn btn-warning"
//               onClick={this.onRowUpdated.bind(this)}
//             />
//           </td>
         
//         </tr>
//       );
//     }
//   }   

export default UpdateInfoOp;
