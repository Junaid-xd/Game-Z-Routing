import React, {useState, useEffect} from 'react'
import './EmergencyPopup.css'

function EmergencyPopup({successMessage, failedMessage, setSuccessMessage, setFailedMessage, setShowEmergencyPopup, emergencyPopupNote, setEmergencyPopupNote}) {

  const [borderShadow, setBorderShadow] = useState("");

  const closeEmergencyPopup=()=>{
    setSuccessMessage(undefined);
    setFailedMessage(undefined);
    setShowEmergencyPopup(false);
    setEmergencyPopupNote(null);
  }

  useEffect(()=>{

    if(successMessage!=undefined){
      setBorderShadow("greenyellow");
    }
    else{
      setBorderShadow("red");
    }

  },[])

  

  return (
    <>
      <div className="emergency-popup-div" style={{ boxShadow: `0px 0px 10px 5px ${borderShadow}`}} >

        <div className="emergency-popup-top">

          <div className='emergency-popup-heading-div'>
            

            {successMessage ? (
               <p className='success-msg-heading-div'>Success</p>
              ) : (
                <></>
            )}

            {failedMessage ? (
                <p className='failed-msg-heading-div'>Error</p>
              ) : (
                <></>
            )}

          </div>

          <div className='close-btn-div'>
            <button className='close-btn' onClick={closeEmergencyPopup}>X</button>
          </div>

        </div>


        <div className="emergency-popup-bottom">
          <p style={{fontSize: 14}}>{successMessage || failedMessage}</p>
        </div>

        <div className='emergency-popup-note-div'>
            <p style={{fontSize: 13}}>{emergencyPopupNote}</p>
        </div>

      </div>
    </>
  )
}

export default EmergencyPopup
