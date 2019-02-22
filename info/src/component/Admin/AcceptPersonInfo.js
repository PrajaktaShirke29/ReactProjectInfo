import React, { Component } from "react";
import UserAuth from "./../services/userauth";
import './../../App.css'
import TableHeader from './TableHeader'
import PersonsInfoTableRow from './PersonsInfoTableRow'
//import UserProfileTableRow from './UserProfileTableRow'

class AcceptPersonInfo extends Component {
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
      headers: [],
      head: []
    };
    this.generateTableHeaders();
    this.serv = new UserAuth();
    
  }

  generateTableHeaders() {
    for (let c in this.state.persons[0]) {
      this.state.headers.push(c);
    }
  }
 
  onChangeProduct(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClickAccept(e) {
      var PersonalUniqueId;
      console.log(e.PersonalUniqueId);
      if(e.PersonalUniqueId)
      {
        PersonalUniqueId= e.PersonalUniqueId; //then update user
      }
      else
      {
        PersonalUniqueId= e._id; //new user
      }
      

    let usr={
      PersonalUniqueId: PersonalUniqueId,
      FullName:{
          FirstName:e.FullName.FirstName,
          MiddleName:e.FullName.MiddleName,
          LastName:e.FullName.LastName
      },
      Gender:e.Gender,
      Dob: e.Dob,
      Age:e.Age,
      Address:{
          FlatNo:e.Address.FlatNo,
          SocietyName:e.Address.SocietyName,
          AreaName:e.Address.AreaName
      },
      City:e.City,
      State: e.State,
      Pincode: e.Pincode,
      PhoneNo: e.PhoneNo,
      Telephone: e.Telephone,
      PhysicalDisability: e.PhysicalDisability,
      MaritalStatus: e.MaritalStatus,
      EducationStatus: e.EducationStatus,
      BirthSign: e.BirthSign
  }
  console.log(usr);
  console.log(PersonalUniqueId);
  console.log(e.PersonalUniqueId);
  console.log(e._id);

    // if(e._id != e.PersonalUniqueId){
    //   this.serv
    //   .updateData(PersonalUniqueId, usr)
    //   .then(res => res.json())
    //   .then(resp => {
    //       console.log(resp.data)
    //   })
    //   .catch(error => console.log(error.status));
    // }
    if(PersonalUniqueId === e._id){
      this.serv
      .PostInfoData(usr)
      .then(res => res.json())
      .then(resp => {
          console.log(resp.data)
      })
      .catch(error => console.log(error.status));
    }
    if(e._id !== PersonalUniqueId){
      console.log(PersonalUniqueId);
      this.serv
      .updateData(PersonalUniqueId, usr)
      .then(res => res.json())
      .then(resp => {
          console.log(resp.data)
      })
      .catch(error => console.log(error.status));
    }
    
      this.serv
            .deletedinfo(e._id)
            .then(res => console.log(res.json()))
            .then(resp => {
                console.log(resp.data)
            })
            .catch(error => console.log(error.status));
 
  }

  //user Profile delete
  onClickDelete(e) {
    let id= e._id;
        
    console.log(id);
    this.serv
            .deletedinfo(id)
            .then(res => console.log(res.json()))
            .then(resp => {
                console.log(resp.data)
            })
            .catch(error => console.log(error.status));
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
  }
  getSelectedProduct(p) {
    //  this.setState({ id: p._id});
    
  }
  render() {
    return (
      <div>
      <div className="container">
      <div className="Display">
        <h2>
          <i>Accept Person Information Request</i>
        </h2>
        </div>
      <div>
      <br />
        <table className="table table-stripped table-bordered">  
          <thead className="Table">
            {this.state.headers.map((h, i) => (
              <TableHeader key={i} header={h} />
            ))}
          </thead>
          <tbody className="Table">
            {this.state.persons.map((usr, idx) => (
                
              <PersonsInfoTableRow
                key={idx}
                row={usr}
                select={this.getSelectedProduct.bind(this)}
                accept={this.onClickAccept.bind(this)}
                delete={this.onClickDelete.bind(this)}
                
              />
            ))}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    );
  }
}





export default AcceptPersonInfo;
