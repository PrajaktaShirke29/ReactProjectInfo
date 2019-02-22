import React, { Component } from 'react';
import Logout from './Logout'

class IdInput extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: ""
         }

    }
    onChangeUser(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    onClickSave(e){
      localStorage.setItem("PersonalId", `${this.state.id}`);
               let history = this.props.history;
            history.push("/userdisplay");
       
     
     
    };
    onClickCreate(e){
      let history = this.props.history;
            history.push("/createinfo");
    }
    onClickLogout(){
      localStorage.removeItem("token");
      localStorage.removeItem("User");
      let history = this.props.history;
          history.push("/");
    }
    render() { 
        return ( 
            <div className="form-group">
            <div>
              <input
                  type="button"
                   value="Logout"
                   align="center"
                   className="btn btn-secondary"
                      onClick={this.onClickLogout.bind(this)}/></div>
            <div>
            </div>
          <label>Enter your personal unique identification number</label>
          <br />
          <input 
            type="text"
            name="id"
           value={this.state.id}
            onChange={this.onChangeUser.bind(this)}
          />

        <input type="button" 
          value="Save" 
          className="btn btn-success" 
        onClick={this.onClickSave.bind(this)}
          />
          
        </div>
         );
    }
}
 
export default IdInput;