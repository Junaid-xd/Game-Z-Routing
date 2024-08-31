import React from 'react'
import './QuestionsInfoPopup.css';

function QuestionsInfoPopup({setShowQuestionsInfo, question}) {


  const closeQuestionInfoPopup = ()=>{
    setShowQuestionsInfo(false)
  }

  return (
    <>
      <div className="questions-info-popup-wrapper">

        <div className='question-info-popup-top'>

          <div className='questions-info-popup-heading-div'>
            <p>Question Info</p>
          </div>

          <div className='question-info-popup-close-btn-div'>
            <button className='question-popup-close-btn' onClick={closeQuestionInfoPopup}>X</button>
          </div>
        </div>
        
        <div>

          <div className='all-info-div-wrapper'>

            <div className='top-layer'>
              <div><p style={{fontSize: 13}}>{`Reward Aura: ${question.reward}`}</p></div>
              <div><p style={{fontSize: 13}}>{`Difficulty: ${question.difficulty}`}</p></div>
            </div>

            <div className='bottom-layer'>
              <div><p style={{fontSize: 13}}>{`No of Words: ${question.noOfWords}`}</p></div>
              <div><p style={{fontSize: 13}}>{`Hint: ${question.hint}`}</p></div>
            </div>

          </div>


          <div className='last-layer'>{`Question Created By: ${question.createdBy}`}</div>

        </div>


      </div>
    </>
  )
}

export default QuestionsInfoPopup
