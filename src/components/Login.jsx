import React from 'react'
import { useEffect, useState } from 'react'
import './Login.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Login({setAuthorize, setValiduser, allUsers}) {


  const [reloadKey, setReloadKey] = useState(0);

  const navigate = useNavigate();
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setReloadKey(prevKey => prevKey + 1);
    }, 15000); // 20000 milliseconds = 20 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);




  


  const signIn = ()=>{

    const enteredName = document.querySelector('.login-username-input-ele').value;
    const enteredPassword = document.querySelector('.login-password-input-ele').value;

    if(enteredName != "" && enteredPassword != ""){

      document.querySelector('.error-div').innerHTML="";


      let found = false;
      allUsers.forEach((user)=>{
        if(user.username == enteredName && user.password == enteredPassword){
          setValiduser(user);
          setAuthorize(true);
          found=true;
          navigate('/home')
          localStorage.setItem('validUser', JSON.stringify(user));

        }
      })

      if(!found){

        document.querySelector('.error-div').innerHTML="";
        document.querySelector('.error-div').innerHTML="Incorrect credentials*";
        setTimeout(()=>{
          document.querySelector('.error-div').innerHTML="";
        }, 2000);
      }
      
    }
    else{
      document.querySelector('.error-div').innerHTML="";
      document.querySelector('.error-div').innerHTML="Please fill all fields*";

      setTimeout(()=>{
        document.querySelector('.error-div').innerHTML="";
      }, 2000)
    }


  }

  
  const setupSignup = ()=>{
    setSignup(true);
    setLogin(false);
  }



  return (
    <>

      <div className="login-nav-bar">

        <div className='nav-bar-top'>

          <div className='login-nav-bar-name-div'>
            <h1>Game Z</h1>
          </div>

        </div>

        <div key={reloadKey} className='login-nav-bar-bottom'>
          <marquee behavior="slide" direction="right" scrollamount="5" className='login-slider-tag'>
            <p>JD PRODUCTIONS</p>
          </marquee>  
        </div>

      </div>


      <div className='login-page-bottom'>
        <div className='login-wrapper' >

          <div className='p-and-input upper'>
            <p style={{fontSize: 13}}>Username:</p>
            <input type="text" placeholder='enter your username' className='login-username-input-ele'/>
          </div>


          <div className='p-and-input'>
            <p style={{fontSize: 13}}>Password:</p>
            <input type="password" placeholder='enter your password' className='login-password-input-ele'/>
          </div>

          <div>
            <p className='error-div'></p>
          </div>
          <button className='signin-btn' onClick={signIn}>Sign-In</button>
        </div>

        <div className='sign-up-link-div'>
          {/* <a  onClick={setupSignup}>Click here to SignUp</a> */}

          <Link to='/signup'>Click here to SignUp</Link>
        </div>
      </div>
    </>
    
  )
}

export default Login
