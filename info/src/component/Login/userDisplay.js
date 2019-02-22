import React, { Component } from 'react';
import UserAuth from "./../services/userauth";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import './../../App.css'

class UserDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            _id: "",
            PersonalUniqueId:"",
                FirstName: "",
                MiddleName: "",
                LastName: "",
            Gender: "",
            Dob: new Date(),
            Age : "",
                FlatNo: "", 
                SocietyName: "", 
                AreaName: "",
            City: "",
            State: "",
            Pincode: "",
            PhoneNo : "",
            Telephone : "",
            PhysicalDisability: "",
            MaritalStatus : "",
            EducationStatus: "",
            BirthSign: "" ,
            NoOfStates:["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
                        "Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir",
                        "Jharkhand","Karnataka","Karnataka","Madhya Pradesh","Maharashtra",
                        "Manipur","Meghalaya","Mizoram","Nagaland","Odisha",
                        "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
                        "Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
                    ],
            readOnly: true
         };

         this.serv = new UserAuth();
    }
    onClickEdit() {
		this.setState({
			readOnly : false
		});
	}
		
    onChangeMarital= MaritalStatus => this.setState({MaritalStatus});
    onChangeGender= Gender => this.setState({Gender});
    onChangePhysical= PhysicalDisability => this.setState({PhysicalDisability});
    onChangeBirth = BirthSign => this.setState({BirthSign})
    onUserInput(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
      onClickClear(e) {
        //this.setState({ PersonalUniqueId: ""});
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
          var id;
          var PersonalUniqueId = this.state.PersonalUniqueId;
         if(PersonalUniqueId === null){
             id= e._id;
         }
         else{
              id=this.state.PersonalUniqueId;
         }
        let usr={
            PersonalUniqueId:id,
            FullName:{
                FirstName:this.state.FirstName,
                MiddleName:this.state.MiddleName,
                LastName:this.state.LastName
            },
            Gender:this.state.Gender,
            Dob: this.state.Dob,
            Age:this.state.Age,
            Address:{
                FlatNo:this.state.FlatNo,
                SocietyName:this.state.SocietyName,
                AreaName:this.state.AreaName
            },
            City:this.state.City,
            State: this.state.State,
            Pincode: this.state.Pincode,
            PhoneNo: this.state.PhoneNo,
            Telephone: this.state.Telephone,
            PhysicalDisability: this.state.PhysicalDisability,
            MaritalStatus:this.state.MaritalStatus,
            EducationStatus:this.state.EducationStatus,
            BirthSign:this.state.BirthSign
        }


        console.log(usr);
        console.log(id);
        this.serv
            .PostData(usr)
            .then(res => res.json())
            .then(resp => {
                console.log(resp.data);
                if(resp){
                    alert(`Information Updated.   Thank You!!!`);
                }
                localStorage.removeItem("PersonalId");
            })
            .catch(error => console.log(error.status));
    
      }

      componentDidMount(){
        this.serv
        .getDataById()
        .then(data => data.json())
        .then(value => {
        console.log(JSON.stringify(value.data));
        let info = value.data;
        console.log(info.City);
        this.setState({  PersonalUniqueId: info.PersonalUniqueId, FirstName:info.FullName.FirstName,
                MiddleName:info.FullName.MiddleName,  LastName:info.FullName.LastName,
                Gender:info.Gender,  Dob: info.Dob,  Age: info.Age, FlatNo: info.Address.FlatNo,
                SocietyName: info.Address.SocietyName,  AreaName:info.Address.AreaName,
                City:info.City,  State: info.State,  Pincode: info.Pincode, PhoneNo: info.PhoneNo,
                Telephone: info.Telephone, PhysicalDisability: info.PhysicalDisability,
                MaritalStatus: info.MaritalStatus,  EducationStatus: info.EducationStatus,
                BirthSign: info.BirthSign });
       })
      .catch(error => {
        console.log(`Error Occured ${error.status}`);
      });
      }
    render() {   
        return ( 
            <div className="container">
            <form  >
              <div>
                <h1><b><i>Update the information of the user</i></b></h1>
                <hr />
                <br />
                <input
                  type="button"
                   value="Edit"
                   align="center"
                   className="btn btn-secondary"
                      onClick={this.onClickEdit.bind(this)}
          />
                <div className="form-group">
                    <label htmlFor="PersonalUniqueId">PersonalUniqueId</label>
                    <input type="text"
                        className="form-control"
                        name="PersonalUniqueId"
                        value={this.state.PersonalUniqueId}
                        onChange={this.onUserInput.bind(this)}
                        disabled
                    />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="FirstName">FirstName</label>
                    <input type="text"
                        className="form-control"
                        name="FirstName"
                        value={this.state.FirstName}
                        onChange={this.onUserInput.bind(this)}
                        disabled={this.state.readOnly}
                    />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="MiddleName">MiddleName</label>
                    <input type="text" className="form-control"
                        value={this.state.MiddleName}
                        name="MiddleName"
                        onChange={this.onUserInput.bind(this)}
                        disabled={this.state.readOnly}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="LastName">LastName</label>
                    <input type="text" className="form-control"
                        value={this.state.LastName}
                        name="LastName"
                        onChange={this.onUserInput.bind(this)}
                        disabled={this.state.readOnly}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Gender">Gender</label>
                    <RadioGroup onChange={ this.onChangeGender } 
                                disabled={this.state.readOnly} horizontal>
                              <RadioButton value="Male" disabled={this.state.readOnly}>
                                    Male
                                  </RadioButton>
                              <RadioButton value="Female" disabled={this.state.readOnly}>
                                    Female
                                  </RadioButton>
                         </RadioGroup>
                </div>
                <div className="form-group">
                    <label htmlFor="Dob">Date of birth</label>
                    <div className="form-group">
                        <input type="Date" className="form-control"
                            value={this.state.Dob}
                            name="Dob"
                            onChange={this.onUserInput.bind(this)}
                            disabled={this.state.readOnly}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Age">Age</label>
                    <input
                        type="text"
                        className="form-control"
                         name="Age"
                         value={this.state.Age}
                         onChange={this.onUserInput.bind(this)}
                         disabled={this.state.readOnly}
                    />
                    
                </div>
                <label htmlFor="Address">Address</label>
                <div className="container">
                    <div className="form-group">
                        <label htmlFor="FlatNo">Flat No</label>
                        <input type="text" className="form-control"
                            value={this.state.FlatNo}
                            name="FlatNo"
                            onChange={this.onUserInput.bind(this)}
                            disabled={this.state.readOnly}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="SocietyName">Society Name</label>
                        <input type="text" className="form-control"
                            value={this.state.SocietyName}
                            name="SocietyName"
                            onChange={this.onUserInput.bind(this)}
                            disabled={this.state.readOnly}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="AreaName">Area Name</label>
                        <input type="text" className="form-control"
                            value={this.state.AreaName}
                            name="AreaName"
                            onChange={this.onUserInput.bind(this)}
                            disabled={this.state.readOnly}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="City">City</label>
                    <input type="text" className="form-control"
                        value={this.state.City}
                        name="City"
                        onChange={this.onUserInput.bind(this)}
                        disabled={this.state.readOnly}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="State">State</label>
                    <div className="Dropdown-text">
                    <select className="form-control"
                     name="State"
                    value={this.state.State}
                    onChange={this.onUserInput.bind(this)}
                    disabled={this.state.readOnly}
                 >
                    {this.state.NoOfStates.map((c,i) =>(<Options key={i} data={c} />))}
                        </select>
                        </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Pincode">PinCode</label>
                    <input type="text" className="form-control"
                        value={this.state.Pincode}
                        name="Pincode"
                        onChange={this.onUserInput.bind(this)}
                        disabled={this.state.readOnly}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="PhoneNo">Phone Number</label>
                    <input type="text" className="form-control"
                        value={this.state.PhoneNo}
                        name="PhoneNo"
                        onChange={this.onUserInput.bind(this)}
                        disabled={this.state.readOnly}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Telephone">Telephone Number</label>
                    <input type="text" className="form-control"
                        value={this.state.Telephone}
                        name="Telephone"
                        onChange={this.onUserInput.bind(this)}
                        disabled={this.state.readOnly}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="PhysicalDisability">Physical Disability</label>
                    <RadioGroup onChange={ this.onChangePhysical } 
                                disabled={this.state.readOnly} horizontal>
                              <RadioButton value="Yes" disabled={this.state.readOnly}>
                                    Yes
                                  </RadioButton>
                              <RadioButton value="No" disabled={this.state.readOnly}>
                                    No
                                  </RadioButton>
                         </RadioGroup>
                </div>
                <div className="form-group">
                    <label htmlFor="MaritalStatus">Marital Status</label>
                    <RadioGroup onChange={ this.onChangeMarital } 
                                disabled={this.state.readOnly} horizontal>
                              <RadioButton value="Married" disabled={this.state.readOnly}>
                                    Married
                                  </RadioButton>
                              <RadioButton value="Unmarried" disabled={this.state.readOnly}>
                                    Unmarried
                                  </RadioButton>
                                  
                         </RadioGroup>
                </div>
                <div className="form-group">
                    <label htmlFor="EducationStatus">Education Status</label>
                    <input type="text" className="form-control"
                        value={this.state.EducationStatus}
                        name="EducationStatus"
                         onChange={this.onUserInput.bind(this)}
                         disabled={this.state.readOnly}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="BirthSign" style={ { marginTop: 32 } }>Birth Sign</label>
                         <RadioGroup onChange={ this.onChangeBirth } 
                                    
                                     horizontal>
                              <RadioButton value="Yes" disabled={this.state.readOnly}>
                                    Yes
                                  </RadioButton>
                              <RadioButton value="No"   disabled={this.state.readOnly}>
                                    No
                                  </RadioButton>
                         </RadioGroup>
                   
                </div>
                <div className="form-group">
          <input
            type="button"
            value="Clear"
            className="btn btn-secondary" 
          style={{ borderColor :"#ffffff" }}
            onClick={this.onClickClear.bind(this)}
            disabled={this.state.readOnly}
          />

          <input
            type="button"
            value="Update"
            className="btn btn-success"
            onClick={this.onClickSave.bind(this)}
            disabled={this.state.readOnly}
          />

          </div>
          </div>  
          </form>
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
export default UserDisplay;