import React,{useState}from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { signup , login } from '../../config/Firebase'

const Login = () => {
  const [currState,setCurrState] =useState("Sign up");

  const [username,setusername]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");

  const onSubmitHandler =(event)=>{
    event.preventDefault();//prevent loading pages
         if(currState==="Sign up"){
             signup(username,email,password);
  }
  else{
    login(email,password);
  }
}
  {

  }
  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className='logo'/>
     
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState==="Sign up" ?  <input onChange={(e)=>setusername(e.target.value)} value={username} type="text" className="form-input" placeholder='UserName' required /> : null}
         
         <input type="email" onChange={(e)=>setemail(e.target.value)} value={email} className="form-input" placeholder='Email Address' required/>
         
         <input type="password"  onChange={(e)=>setpassword(e.target.value)}  value={password}  className="form-input" placeholder='password' required/>
        <button type='submit'>{currState==='Sign up' ? "Create account" : "Login Now"}</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="login-forget">
          {
            currState==='Sign up' ?  <p className='login-toggle'>Already have an account? <span onClick={
            ()=>{
              setCurrState("Login")
            }
          }>click here</span></p> :  <p className='login-toggle'>Create an account <span onClick={
            ()=>{
              setCurrState("Sign up")
            }
          }>click here</span></p>
          }
          
         
        </div>


      </form>

    </div>
    
  )
}

export default Login
