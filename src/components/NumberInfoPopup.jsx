import React from 'react'
import './NumberInfoPopup.css'

function NumberInfoPopup({setShowNumberPopupInfo, min, max}) {
  return (
    <>
      <div className="number-popup-info-wrapper">
        <div className='number-info-popup-top'>
           
          <div className='question-popup-close-btn-div'>
            <button className='question-popup-close-btn' onClick={()=>setShowNumberPopupInfo(false)} >X</button>
          </div>
            
        </div>

        <div className="number-info-popup-bottom">
          <p style={{fontSize:13}}>Guess the number between {min}-{max}.</p>
          <p style={{fontSize:13}}>Correct Answer will lead to +10 Aura Points.</p>
          <p style={{fontSize:13}}>Wrong Answer will lead to -1 Aura Point.</p>
        </div>
      </div>
    </>
  )
}

export default NumberInfoPopup
