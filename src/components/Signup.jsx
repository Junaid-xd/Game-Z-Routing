

import React, { useEffect, useState } from 'react'
import './Signup.css'
import SignupInfoPopup from './SignupInfoPopup';
import { Link } from 'react-router-dom';

function Signup({ allUsers, setFailedMessage, setSuccessMessage, setShowEmergencyPopup}) {

  const [reloadKey, setReloadKey] = useState(0);

  const [showSignupInfoPopup, setShowSignupInfoPopup] = useState(false);

  
  const [isRed, setIsRed] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsRed(prevIsRed => !prevIsRed);
    }, 300);

    return () => clearInterval(intervalId);
  }, []);
  
  
  


  const handelLogin = ()=>{
    setLogin(true);
    setSignup(false);
  }


  const createUser = async()=>{
    const user = document.querySelector(".name-input-ele").value;

    if(user!="Game Z" || user!="Game z" || user!="game z"){


      const pass = document.querySelector(".password-input-ele").value;
      const confirmPass = document.querySelector(".confirm-password-input-ele").value;

      if(user!="" && pass!="" && confirmPass!=""){

        document.querySelector('.error-div').innerHTML = "";

        let fineName = true;

        allUsers.forEach((singleUser)=>{
          if(singleUser.username == user){
            fineName=false;
            document.querySelector('.error-div').innerHTML = "";
            document.querySelector('.error-div').innerHTML = "This username is already taken*";
            setTimeout(()=>{
              document.querySelector('.error-div').innerHTML = "";
            },3000)
          }
        })

        if(fineName){

          if(pass==confirmPass){

            try{

              const send = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/playersdata-xrbubxz/endpoint/api/playersData/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                  username: user,
                  password: pass,
                  score: 0,
                  correctAnswers: 0,
                  attempts: 0
                })
              });
        
              const result = await send.json();
        
        
              document.querySelector(".name-input-ele").value = "";
              document.querySelector(".password-input-ele").value = "";
              document.querySelector(".confirm-password-input-ele").value = "";

              setSignup(false);
              setLogin(true);


              if(send.ok){
                setSuccessMessage("Your account has been created successfully");
                setShowEmergencyPopup(true);
              }

              


            }
            catch(error){
              console.error("Error fetching data:", error);
              setFailedMessage("Bad internet connection");
              setShowEmergencyPopup(true);
            }

          }
          else{
            document.querySelector('.error-div').innerHTML = "";
            document.querySelector('.error-div').innerHTML = "Password fields dosen't match*";
            setTimeout(()=>{
              document.querySelector('.error-div').innerHTML = "";
            },3000)
          }
        }

      }
      else{
        document.querySelector('.error-div').innerHTML = "";
        document.querySelector('.error-div').innerHTML = "Please fill all fields*";

        setTimeout(()=>{
          document.querySelector('.error-div').innerHTML = "";
        }, 2000)
      }

    }
    else{

      document.querySelector('.error-div').innerHTML = "";
      document.querySelector('.error-div').innerHTML = "This username is already taken*";
      setTimeout(()=>{
        document.querySelector('.error-div').innerHTML = "";
      },3000)

    }

    
  }


  const showPopup=()=>{
    setShowSignupInfoPopup(true);
  }

  

  return (
    <>

      <div className="signup-nav-bar">

        <div className='nav-bar-top'>

          <div className='signup-nav-bar-name-div'>
            <h1>Game Z</h1>
          </div>

        </div>

        <div key={reloadKey} className='signup-nav-bar-bottom'>
          <marquee behavior="slide" direction="right" scrollamount="5" className='login-slider-tag'>
            <p>JD PRODUCTIONS</p>
          </marquee>  
        </div>

      </div>


      <div className='signup-page-bottom'>
        <div className='signup-wrapper'>

          <div className='signup-info-div'>
            <p onClick={showPopup} style={{ backgroundColor: isRed ? 'red' : 'blue' }}>i</p>
          </div>


          <div className='p-and-input upper'>
            <p style={{fontSize: 13}}>Username</p>
            <input type="text" placeholder='enter username' className='name-input-ele'/>
          </div>

          <div className='p-and-input'>
            <p style={{fontSize: 13}}>Password</p>
            <input type="password" placeholder='create password' className='password-input-ele'/>
          </div>

          <div className='p-and-input'>
            <p style={{fontSize: 13}}>Confirm Password</p>
            <input type="password" placeholder='confirm password' className='confirm-password-input-ele'/>
          </div>



          <div>
            <p className='error-div'></p>
          </div>
          <button onClick={createUser} className='signup-btn'>Sign-Up</button>
        </div>

        <div className='login-link-div'>
          {/* <a onClick={handelLogin}>Click here to Login</a> */}

          <Link to='/'>Click here to Login</Link>

        </div>
      </div>


      <div>
        {showSignupInfoPopup && <SignupInfoPopup setShowSignupInfoPopup={setShowSignupInfoPopup}/>}
      </div>
    </>
  )
}

export default Signup



