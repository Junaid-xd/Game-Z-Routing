import React from 'react'
import './NewQuestionInfoPopup.css'

function NewQuestionInfoPopup({setShowNewQuestionInfoPopup}) {
  return (
    <>
      <div className='new-question-info-pupup-wrapper'>


        <div className="new-question-info-popup-top">

          <div className='new-question-info-popup-heading-div'>
            <p>Things you should know</p>
          </div>

          <div className='close-btn-div'>
            <button className='close-btn' onClick={()=>setShowNewQuestionInfoPopup(false)}>X</button>
          </div>

        </div>


        <div className="new-question-info-popup-bottom">
          <p>You cannot answer your own question.</p>
          <p>Make sure to keep your question respectful, as all players (except you) will see it.</p>
          <p>Make your question answerable by providing related hints. Make it general so anyone can answer.</p>
          <p>Choose the difficulty level wisely as they all have different reward aura points.</p>
          <p>Make sure your answer doesn't have more than three words. Make it as short as possible.</p>
          <p>Questions that violate the Game Z policy will be removed from the database server.</p>
          <p>Game Z is not case sensitive.</p>
        </div>

      </div>
    </>
  )
}

export default NewQuestionInfoPopup
