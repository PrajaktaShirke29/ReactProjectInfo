import React, { Component } from 'react';
import ThankYou from './../../image/thank_you.jpg'

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        
    }
    onClickSave(){
        localStorage.removeItem("token");
        localStorage.removeItem("User");
        let history = this.props.history;
            history.push("/");
    }

    onChangeUser(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    render() { 
        return ( <div>
           <h2>Thank you {localStorage.getItem("User")}, Bye!!!!!</h2>
           <h2>Have a Nice Day</h2>
           <img src={ThankYou}/>
            <button value="Login" className="btn btn-info" onClick={this.onClickSave.bind(this)} >For more information Click here </button>
         </div> );
    }
}
 
export default Logout;

