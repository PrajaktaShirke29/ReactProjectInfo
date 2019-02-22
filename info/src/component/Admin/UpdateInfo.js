import React, { Component } from "react";
import UserAuth from "./../services/userauth";
import './../../App.css'
import TableHeader from './TableHeader'
import UserDisplay from "../Login/userDisplay";
import UpdatePersonalInfo from './UpdatePersonalInfo'


class UpdateInfo extends Component {
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
        NoOfStates:["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
        "Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir",
        "Jharkhand","Karnataka","Karnataka","Madhya Pradesh","Maharashtra",
        "Manipur","Meghalaya","Mizoram","Nagaland","Odisha",
        "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
        "Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
           ],
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
    console.log(this.state.PersonalUniqueId);
    console.log(e.PersonalUniqueId);
    localStorage.setItem("PersonalId", `${e.PersonalUniqueId}`);
    let history = this.props.history;
            history.push("/admin/userdisplay");
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
   // this.setState({ PersonalUniqueId: ""});
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

  onSearch(e){
    let info={
        State: this.state.State,
        City: this.state.City
    }
    console.log(this.state.State);
    this.serv
    .Search(info)
    .then(res => res.json())
    .then(resp => {
        console.log(resp.data)
        this.setState({ persons: resp.data });
    })
    .catch(error => console.log(error.status));
  }


  render() {
    return (
      <div className="container" >
      <div>
        <h2>
          <i>Update Information</i>
        </h2>
        <br />
        <div> 
                    <label htmlFor="State">State</label>
                    <div className="Dropdown-text">
                    <select
                     name="State"
                    value={this.state.State}
                    onChange={this.onUserInput.bind(this)}>
                    {this.state.NoOfStates.map((c,i) =>(<Options key={i} data={c} />))}
                        </select>&nbsp;
                        <input type="text" placeholder="City" 
                         name="City"
                          value={this.state.City}
                          onChange={this.onUserInput.bind(this)}
                        />
                        </div>

                        <input
                            type="button"
                             value="Search"
                             className="btn btn-success"
                            onClick={this.onSearch.bind(this)}
            />
        </div>
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
class Options extends Component{
  render(){
      return(
          <option  value={this.props.data}>
              {this.props.data}
          </option>
      );

  }
}
export default UpdateInfo;
