import React from 'react'
import './SignupInfoPopup.css'

function SignupInfoPopup({setShowSignupInfoPopup}) {



  const closeSignupInfoPopup =()=>{
    setShowSignupInfoPopup(false)
  }


  return (
    <>
      <div className="signup-info-wrapper">

      <div className='signup-info-popup-top'>

        <div className='signup-info-popup-heading-div'>
          <p>Things you should know</p>
        </div>

        <div className='signup-info-popup-close-btn-div'>
          <button className='signup-popup-close-btn' onClick={closeSignupInfoPopup}>X</button>
        </div>
      </div>


      <div className='signup-info-popup-bottom'>
        <p>Choose your username wisely, you cannot change it later.</p>
        <p>Make your username respectable, as it will be visible to all players.</p>
        <p>You cannot take a name that is already taken.</p>
      </div>

      </div>
    </>
  )
}

export default SignupInfoPopup
