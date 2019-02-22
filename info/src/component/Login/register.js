import React, { Component } from 'react';
import UserAuth from './../services/userauth';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Username:"",
            Password:"",
            EmailAddr:"",
            ConfirmPassword:""
         }
         this.serv = new UserAuth();
    }

    onChangeUser(e){
        this.setState({[e.target.name]: e.target.value})
    }
    
    onClickSave(e){
        let log={
            Username:this.state.Username,
            EmailAddr: this.state.EmailAddr,
            Password:this.state.Password,
            ConfirmPassword:this.state.ConfirmPassword,
            RoleId: "103"
        }
        console.log(log);
        if((log.Username) && (log.Password) && (log.EmailAddr)){
            if(log.Password.localeCompare(log.ConfirmPassword)){
                alert("Password should be identical to confirm password");
             }else{
                this.serv
                .postUser(log)
                .then(res => res.json())
                
                .then(resp => {                 
                    console.log("status is ======"+resp.status);
                    if(resp.status === 200){
                        alert(`Successfull registration`);
                        let history= this.props.history;
                        history.push('/');
                    }
                    else{
                        alert(`UnSuccessfull registeration `)
                    }
                })
                .catch(error => console.log(error.status));
             }   
        }
        else{
            alert("Enter all the fields");
            let history= this.props.history;
            history.push('/register');
        }
        console.log(log);
       
    }

    onClickClear(e){
        this.setState({Username:""}); 
        this.setState({EmailAddr:""});  
        this.setState({Password:""});  
        this.setState({ConfirmPassword:""}); 
    }

    render() { 
        return ( 
        <div className="container" >
            <br />
            <h2>Register</h2>
            <br />
            <div  className="form-group">
                <label htmlFor="Username"><b>Username</b></label><br/>
                <input type="text" name="Username" className="group-control"
                    value={this.state.Username}
                    onChange={this.onChangeUser.bind(this)} />
            </div>
            <div  className="form-group">
                <label htmlFor="Password"><b>Email Address</b></label><br/>
                <input type="text" name="EmailAddr" className="group-control"
                    value={this.state.EmailAddr} 
                    onChange={this.onChangeUser.bind(this)} />
            </div>
            <div  className="form-group">
                <label htmlFor="Password"><b>Password</b></label><br/>
                <input type="password" name="Password" className="group-control"
                    value={this.state.Password} 
                    onChange={this.onChangeUser.bind(this)} />
            </div>
            <div  className="form-group">
                <label htmlFor="ConfirmPassword"><b>ConfirmPassword</b></label><br/>
                <input type="password" name="ConfirmPassword" className="group-control"
                    value={this.state.ConfirmPassword} 
                    onChange={this.onChangeUser.bind(this)} />
                    
                    
            </div>
            <div  className="form-group">
            <br />
            <input type="button" 
              value="Clear"
              className="btn btn-secondary" 
              style={{ borderColor :"#ffffff" }}
              onClick={this.onClickClear.bind(this)}
          />
            
            
            <input type="button" 
                value="Save" 
                className="btn btn-success" 
                onClick={this.onClickSave.bind(this)}
                />
                          
            <div>
            <br />
            <a href="./" align="center">Login... If you already has Account</a>
            </div>
                
            </div>
           
        </div> 
        );
    }
}
 
export default Register;