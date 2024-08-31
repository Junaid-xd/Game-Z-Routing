import React, { useState, useEffect } from 'react'
import './SideBar.css'
import Profile from './Profile'
import CreateNewQuestion from './CreateNewQuestion';
import { Link, useNavigate } from 'react-router-dom';



function SideBar({setShowSideBar, validUser, allUsers, setFailedMessage, setSuccessMessage, setShowEmergencyPopup, setEmergencyPopupNote, setAuthorize}) {

  const [showProfile, setShowProfile] = useState(false);

  const [showCreateNewQuestionPopup, setShowCreateNewQuestionPopup] = useState(false);

  const [optionsEnable, setOptionsEnable] = useState(false);

  const navigate = useNavigate();

  const enableLimit = 10;




  useEffect(()=>{
    if(validUser.score>=enableLimit){
      setOptionsEnable(true);
    }
    else{
      setOptionsEnable(false);
    }
  },[])


  const closeSideBar = ()=>{
    setShowSideBar(false)
  }

  const disabledQuestionMessage = ()=>{
    setFailedMessage("You need atleast 10 Aura points to create your own Question.");
    setShowEmergencyPopup(true);
  }

  const handelLogout = ()=>{
    setAuthorize(false);
    navigate('/');
  }


  return (
   <>
    <div className='sidebar-wrapper'>
      <div className='side-bar-close-btn-div'>
        <button onClick={closeSideBar} className='close-btn'>X</button>
      </div>

      <div className='side-bar-username-div'>
        <p>{validUser.username}</p>
      </div>


      <div className='side-bar-options-div'>

        <div className='side-bar-option' onClick={()=>setShowProfile(true)}>View Profile</div>
       
          <Link className='side-bar-option' to='/ranktable'>View Rank Table</Link>

        {optionsEnable ? (
          <div className='side-bar-option' onClick={()=> setShowCreateNewQuestionPopup(true)} >Create a Question</div>
        ) : (
          <div className='side-bar-option disabled' onClick={disabledQuestionMessage}>Create a Question</div>
        )}


        <div className='side-bar-option' onClick={handelLogout}>LogOut</div>

        


      </div>
    </div>

    <div>
      {showProfile && <Profile setShowProfile={setShowProfile} user={validUser} allUsers={allUsers}/>}
    </div>


    <div>
      {showCreateNewQuestionPopup && <CreateNewQuestion user={validUser} setShowCreateNewQuestionPopup={setShowCreateNewQuestionPopup} setFailedMessage={setFailedMessage} setSuccessMessage={setSuccessMessage} setShowEmergencyPopup={setShowEmergencyPopup} setEmergencyPopupNote={setEmergencyPopupNote}/>}
    </div>
   </> 
  )
}

export default SideBar
