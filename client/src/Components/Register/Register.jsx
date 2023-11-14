import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';
export default function Register() {
  const [registerData,setRegisterData] = useState({name:"",username:"",password:"",cpassword:""});
  const navigate = useNavigate();

    let name,value;
    const setValues = (e)=>{
        name=e.target.name
        value= e.target.value
        setRegisterData({...registerData, [name]:value})
    }
    const registerSubmit=()=>{
      console.log(registerData);
      axios.post('http://localhost:8000/auth/register',registerData)
      .then((res)=>{
        swal.fire({
          icon: "success",
          title: 'Registration Successful',
          text: 'You are succesfully registered, now go to the login page and proceed',
          timer: 2000
        });
      })
      .catch((err)=>{
        let errorMessage = err.response.data.error.message;
        swal.fire({
          icon: "error",
          title: 'Error',
          text:errorMessage,
          timer: 2000
        });
    })
    }
  return (
    <>
    <div className="loginContainer">
        <div className="loginBox">
            <h1>Register</h1>
            <div className="loginInputs">
                <input type="text" placeholder='Name' name='name' onChange={setValues}/>
                <input type="text" placeholder='Username' name='username' onChange={setValues}/>
                <input type="password" placeholder='Password' name='password' onChange={setValues}/>
                <input type="password" placeholder='Confirm Password' name='cpassword' onChange={setValues}/>
            </div>
            <button className='loginBtn' onClick={registerSubmit}>
                Register
            </button>
            <p>If you already have an account then <Link to='/login'>Login</Link></p>
        </div>
    </div>
    </>
  )
}
