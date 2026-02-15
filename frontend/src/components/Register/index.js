import {Link} from 'react-router-dom';
import { Component } from "react";

class Register extends Component{
  state={visible:false,c_visible:false}

  onChageState=()=>{
    this.setState(prev=>({visible:!prev.visible}))
  }
  
  onChangeConfirm=()=>{
    this.setState(prev=>({c_visible:!prev.c_visible}))
  }

  render(){
    const{visible,c_visible}=this.state
      return(
      <div className='bg-container'>
        <div className='card'>
          <div className='hed-section'>
            <h1>Create Account</h1>
            <p>Enter your credentials</p>
          </div>
          <form className='form'>
            <lable htmlFor='email'>Email</lable>
            <input id="email" name="email" type='text' placeholder="emil"></input>
            <lable htmlFor='password'>Password</lable>
            <div className="p-container">
              <input 
              id="password" name="password" placeholder="password" type={visible ? "text" : "password"}
              ></input>
              <p style={{cursor:"pointer"}} onClick={this.onChageState}>{visible?"Hide":"Show"}</p>
            </div>
            <lable htmlFor='confirm-password'>Confirm Password</lable>
            <div className="p-container">
              <input 
              id="c_password" name="c_password" placeholder="password" type={c_visible ? "text" : "password"}
              ></input>
              <p style={{cursor:"pointer"}} onClick={this.onChangeConfirm}>{c_visible?"Hide":"Show"}</p>
            </div>
            <button className='btn'>Submit</button>
          </form>
          <p style={{textAlign:"center"}}>Already have an account? <Link to='/login'>Sign in</Link></p>
        </div>
      </div>
    );
  }
}
export default Register;
