import React, { useEffect, useState } from 'react'
import './Profile.css'

function Profile({setShowProfile, user, allUsers}) {

  const [rank, setRank] = useState("undefined")

  const closeProfilePopup = ()=>{
    setShowProfile(false)
  }

  useEffect(()=>{
    allUsers.sort((a, b) => b.score - a.score);

    const index = allUsers.findIndex(obj => obj._id === user._id) + 1;

    setRank(index);


  },[allUsers])

  return (
    <>

      <div className='profile-main-wrapper'>

        <div className='profile-popup-top'>

          <div className='profile-popup-heading-div'>
            <p><i>Player's Profile</i></p>
          </div>

          <div className='profile-popup-close-btn-div'>
            <button className='close-btn' onClick={closeProfilePopup}>X</button>
          </div>

        </div>

        <div className='profile-detail-div'>

          <div className='profile-detail-upper-div'>

            <div className='profile-detail-upper-right-div'>
              <p style={{fontSize: 13}}>Username : {user.username}</p>
              <p style={{fontSize: 13}}>Correct  : {user.correctAnswers}</p>
            </div>

            <div className='profile-detail-upper-left-div'>
              <p style={{fontSize: 13}}>Aura : {user.score}</p>
              <p style={{fontSize: 13}}>Attempts : {user.attempts}</p>
            </div>

          </div>

          <div className='profile-detail-lower-div'>
            <p>Rank : {rank}</p>
          </div>

        </div>
        
      </div>
    </>
  )
}

export default Profile
