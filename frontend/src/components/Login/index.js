// import React, { useState } from "react";
import {Link} from 'react-router-dom';
import './index.css';
import { Component } from "react";

class Login extends Component{
  state={visible:false}

  onChageState=()=>{
    this.setState(prev=>({visible:!prev.visible}))
  }
  render(){
    const {visible}=this.state
      return(
      <div className='bg-container'>
        <div className='card'>
          <div className='hed-section'>
            <h1 className='login-hed'>Login</h1>
            <p className='login-para'>Enter your details</p>
          </div>
          <form className='form'>
            <lable htmlFor='email'>Email</lable>
            <input id="email" name="email" type='email' placeholder="email"></input>
            <lable htmlFor='password'>Password</lable>
            <div className="p-container">
              <input id="password" name="password" placeholder="password" type={visible ? "text" : "password"}></input>
              <p style={{cursor:"pointer"}} onClick={this.onChageState}>{visible?"Hide":"Show"}</p>
            </div>
            <button className='btn'>Submit</button>
          </form>
          <div className="link-block">
            <Link to='/register'>Create account</Link>
            <Link to='/'>Home</Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;