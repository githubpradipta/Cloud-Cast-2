import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2'
import ArrowIcon from '@mui/icons-material/ArrowForward';

export default function Login() {
    const [loginData,setLoginData] = useState({username:"",password:""});
    const [passVisible,setPassVisible] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    let check = false;
    try{
        check = location.state.isLogout
    }
    catch{
        check = false
    }
    

    if(check){
        swal.fire({
            icon: "success",
            title: "You are successfully logged out",
            timer: 2000
          });
    }

    let name,value;
    const setValues = (e)=>{
        name=e.target.name
        value= e.target.value
        setLoginData({...loginData, [name]:value})
    }
    const loginSubmit=()=>{
        console.log(loginData);
        axios.post('http://localhost:8000/auth/login',loginData)
        .then(()=>{
            navigate('/', {state:{isLogin:true}})
        })
        .catch(err=>{
            console.log(err);
            let errorMessage = err.response.data.error.message;
            swal.fire({
                icon: "error",
                title: "Error",
                text:errorMessage,
                timer: 2000
              });
        })
        
    }
  return (
    <>
    <div className="loginContainer">
        <div className="loginBox">
            <h1>Login</h1>
            <div className="loginInputs">
                <input type="text" placeholder='Username' name='username' value={loginData.username} onChange={setValues}/>
                <input type={passVisible?"text":"password"} placeholder='Password' name='password' onChange={setValues}/>
            </div>
            <button className='loginBtn' onClick={loginSubmit}>
                Login
                <ArrowIcon className='arrowIcon'/>
            </button>
            <p>If you don't have any account then <Link to='/register'>Register</Link></p>
        </div>
    </div>
    </>
  )
}
