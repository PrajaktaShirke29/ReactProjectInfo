import React, { Component } from 'react';
import UserAuth from './../services/userauth'

class CreateRole extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Username:"",
            Password:"",
            EmailAddr:"",
            RoleId:""
         }
         this.serv= new UserAuth();
    }
    onChangeUser(e){
        this.setState({[e.target.name]: e.target.value})
    }
    onClickSave(e){
        let log={
            Username:this.state.Username,
            Password:this.state.Password,
            EmailAddr: this.state.EmailAddr,
            ConfirmPassword:this.state.ConfirmPassword,
            RoleId: this.state.RoleId
        }
        
        if((log.Username) && (log.Password) && (log.EmailAddr) && (log.RoleId))
        {            
            this.serv
            .postUser(log)
            .then(res => res.json())
            .then(resp => { 
                if(resp.status === 200){
                    alert(`Request send to admin`);
                }
                else{
                    alert(`Unable to send request `)
                }
            })
            .catch(error => console.log(error.status));
               
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
                <input type="text" name="Password" className="group-control"
                    value={this.state.Password} 
                    onChange={this.onChangeUser.bind(this)} />
            </div>
            <div  className="form-group">
                <label htmlFor="RoleId"><b>RoleId</b></label><br/>
                <input type="text" name="RoleId" className="group-control"
                    value={this.state.RoleId} 
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
                
            </div>
           
        </div> 
         );
    }
}
 
export default CreateRole;