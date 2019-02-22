import React, { Component } from 'react';
import UserAuth from "./../services/userauth";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import './../../App.css'

class CreateInfo extends Component {
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
         };

         this.serv = new UserAuth();
    }
    
		
    onChangeMarital= MaritalStatus => this.setState({MaritalStatus});
    onChangeGender= Gender => this.setState({Gender});
    onChangePhysical= PhysicalDisability => this.setState({PhysicalDisability});
    onChangeBirth = BirthSign => this.setState({BirthSign})
    onUserInput(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
      onChangeDate = Dob => this.setState({ Dob })

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
         let id= e._id;
        let usr={
           // PersonalUniqueId:this.state._id,
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
        this.serv
            .PostData(usr)
            .then(res => res.json())
            .then(resp => {
                console.log(resp.data);
                if(resp){
                    alert(`Information created successfully.   Thank You!!!`);
                }
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
        this.setState({  PersonalUniqueId: info._id,
                FirstName:info.FullName.FirstName,
                MiddleName:info.FullName.MiddleName,
                LastName:info.FullName.LastName,
            Gender:info.Gender,
            Dob: info.Dob,
            Age: info.Age,
                FlatNo: info.Address.FlatNo,
                SocietyName: info.Address.SocietyName,
                AreaName:info.Address.AreaName,
            City:value.data.City,
            State: info.State,
            Pincode: info.Pincode,
            PhoneNo: info.PhoneNo,
            Telephone: info.Telephone,
            PhysicalDisability: info.PhysicalDisability,
            MaritalStatus: info.MaritalStatus,
            EducationStatus: info.EducationStatus,
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
                <h1><b><i>The information of the user</i></b></h1>
                <hr />
                <br />
               
                <div className="form-group">
                    <label htmlFor="FirstName">FirstName</label>
                    <input type="text"
                        className="form-control"
                        name="FirstName"
                        value={this.state.FirstName}
                        onChange={this.onUserInput.bind(this)}
                        
                    />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="MiddleName">MiddleName</label>
                    <input type="text" className="form-control"
                        value={this.state.MiddleName}
                        name="MiddleName"
                        onChange={this.onUserInput.bind(this)}
                       
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="LastName">LastName</label>
                    <input type="text" className="form-control"
                        value={this.state.LastName}
                        name="LastName"
                        onChange={this.onUserInput.bind(this)}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Gender">Gender</label>
                    <RadioGroup onChange={ this.onChangeGender } 
                                 horizontal>
                              <RadioButton value="Male" >
                                    Male
                                  </RadioButton>
                              <RadioButton value="Female" >
                                    Female
                                  </RadioButton>
                         </RadioGroup>
                </div>
                <div className="form-group">
                    <label htmlFor="Dob">Date of birth</label>
                    <div className="form-group">
                        <input type="date" className="form-control"
                            value={this.state.Dob}
                            name="Dob"
                            onChange={this.onUserInput.bind(this)}
                            
                        />
                    </div>
                    {/* <Calendar
                         onChange={this.onChangeDate}
                        //  value={this.state.Dob}
                    /> */}

                </div>
                <div className="form-group">
                    <label htmlFor="Age">Age</label>
                    <input
                        type="text"
                        className="form-control"
                         name="Age"
                         value={this.state.Age}
                         onChange={this.onUserInput.bind(this)}
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
                           
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="SocietyName">Society Name</label>
                        <input type="text" className="form-control"
                            value={this.state.SocietyName}
                            name="SocietyName"
                            onChange={this.onUserInput.bind(this)}
                           
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="AreaName">Area Name</label>
                        <input type="text" className="form-control"
                            value={this.state.AreaName}
                            name="AreaName"
                            onChange={this.onUserInput.bind(this)}
                            
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="City">City</label>
                    <input type="text" className="form-control"
                        value={this.state.City}
                        name="City"
                        onChange={this.onUserInput.bind(this)}
                        
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="State">State</label>
                    <div className="Dropdown-text">
                    <select className="form-control"
                     name="State"
                    value={this.state.State}
                    onChange={this.onUserInput.bind(this)}
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
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="PhoneNo">Phone Number</label>
                    <input type="text" className="form-control"
                        value={this.state.PhoneNo}
                        name="PhoneNo"
                        onChange={this.onUserInput.bind(this)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Telephone">Telephone Number</label>
                    <input type="text" className="form-control"
                        value={this.state.Telephone}
                        name="Telephone"
                        onChange={this.onUserInput.bind(this)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="PhysicalDisability">Physical Disability</label>
                    <RadioGroup onChange={ this.onChangePhysical } 
                                horizontal>
                              <RadioButton value="Yes">
                                    Yes
                                  </RadioButton>
                              <RadioButton value="No">
                                    No
                                  </RadioButton>
                         </RadioGroup>
                </div>
                <div className="form-group">
                    <label htmlFor="MaritalStatus">Marital Status</label>
                    <RadioGroup onChange={ this.onChangeMarital } 
                                horizontal>
                              <RadioButton value="Married" >
                                    Married
                                  </RadioButton>
                              <RadioButton value="Unmarried" >
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="BirthSign" style={ { marginTop: 32 } }>Birth Sign</label>
                         <RadioGroup onChange={ this.onChangeBirth } 
                                    
                                     horizontal>
                              <RadioButton value="Yes">
                                    Yes
                                  </RadioButton>
                              <RadioButton value="No">
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
          />

          <input
            type="button"
            value="Submit"
            className="btn btn-success"
            onClick={this.onClickSave.bind(this)}
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
export default CreateInfo;