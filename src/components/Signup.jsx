

import React, { useEffect, useState } from 'react'
import './Signup.css'
import SignupInfoPopup from './SignupInfoPopup';
import { Link, useNavigate } from 'react-router-dom';

function Signup({setFailedMessage, setSuccessMessage, setShowEmergencyPopup }) {

  const [reloadKey, setReloadKey] = useState(0);

  const [showSignupInfoPopup, setShowSignupInfoPopup] = useState(false);

  const minimumUsernameLength = 5;
  const minimumPasswordLength = 5;

  const [isRed, setIsRed] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsRed(prevIsRed => !prevIsRed);
    }, 300);

    return () => clearInterval(intervalId);
  }, []);


  const verifyUniqueUsername = async(username)=>{
    let isUnique = false;
    try {
      const response = await fetch(`https://ap-south-1.aws.data.mongodb-api.com/app/playersdata-xrbubxz/endpoint/api/playersData/isUniqueUsername?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.ok) {
        isUnique = await response.json();  
      }
  
    } catch (error) {
      console.error("Error in verifying unique username:", error);
    }
  
    return isUnique;
  }



  const handelLogin = () => {
    setLogin(true);
    setSignup(false);
  }


  const createUser = async () => {
    const user = document.querySelector(".name-input-ele").value.trim();

    if (user.length >= minimumUsernameLength) {


      const toBeVerifiedName = user.toLowerCase().split(" ").join("");;
      //console.log("Lower case name is: ", toBeVerifiedName)

      if (toBeVerifiedName !== "gamez") {


        const pass = document.querySelector(".password-input-ele").value;


        if (pass.length >= minimumPasswordLength) {
          const confirmPass = document.querySelector(".confirm-password-input-ele").value;

          if (user != "" && pass != "" && confirmPass != "") {

            document.querySelector('.error-div').innerHTML = "";


            if (await verifyUniqueUsername(user)) {

              if (pass == confirmPass) {

                try {

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



                  document.querySelector(".name-input-ele").value = "";
                  document.querySelector(".password-input-ele").value = "";
                  document.querySelector(".confirm-password-input-ele").value = "";


                  if (send.status === 200) {
                    setSuccessMessage("Your account has been created successfully");
                    setShowEmergencyPopup(true);
                    navigate('/')
                  }




                }
                catch (error) {
                  console.error("Error fetching data:", error);
                  setFailedMessage("Bad internet connection");
                  setShowEmergencyPopup(true);
                }

              }
              else {
                document.querySelector('.error-div').innerHTML = "";
                document.querySelector('.error-div').innerHTML = "Password fields dosen't match*";
                setTimeout(() => {
                  document.querySelector('.error-div').innerHTML = "";
                }, 3000)
              }
            }
            else{
              document.querySelector('.error-div').innerHTML = "";
              document.querySelector('.error-div').innerHTML = "This username is already taken*";
              setTimeout(() => {
                document.querySelector('.error-div').innerHTML = "";
              }, 3000)
            }

          }
          else {
            document.querySelector('.error-div').innerHTML = "";
            document.querySelector('.error-div').innerHTML = "Please fill all fields*";

            setTimeout(() => {
              document.querySelector('.error-div').innerHTML = "";
            }, 2000)
          }
        }
        else {
          document.querySelector('.error-div').innerHTML = "";
          document.querySelector('.error-div').innerHTML = "Minimun Password Length is 5 characters*";

          setTimeout(() => {
            document.querySelector('.error-div').innerHTML = "";
          }, 2000)
        }

      }
      else {

        document.querySelector('.error-div').innerHTML = "";
        document.querySelector('.error-div').innerHTML = "This username is already taken*";
        setTimeout(() => {
          document.querySelector('.error-div').innerHTML = "";
        }, 3000)

      }



    }
    else {

      document.querySelector('.error-div').innerHTML = "";
      document.querySelector('.error-div').innerHTML = "Minimum username length is 5 characters*";
      setTimeout(() => {
        document.querySelector('.error-div').innerHTML = "";
      }, 3000)

    }





  }


  const showPopup = () => {
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
            <p style={{ fontSize: 13 }}>Username</p>
            <input type="text" placeholder='enter username' className='name-input-ele' />
          </div>

          <div className='p-and-input'>
            <p style={{ fontSize: 13 }}>Password</p>
            <input type="password" placeholder='create password' className='password-input-ele' />
          </div>

          <div className='p-and-input'>
            <p style={{ fontSize: 13 }}>Confirm Password</p>
            <input type="password" placeholder='confirm password' className='confirm-password-input-ele' />
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
        {showSignupInfoPopup && <SignupInfoPopup setShowSignupInfoPopup={setShowSignupInfoPopup} />}
      </div>
    </>
  )
}

export default Signup



