import React, { useEffect } from 'react'
import './CongratulationPopup.css';
import musicPath from "../assets/music/music.mp3"
import correctGif from "../assets/images/correct4.gif"

function CongratulationPopup({setShowCongratulationPopup, setShowquestion, reward}) {

  const closeCongratsPopup = ()=>{
    setShowCongratulationPopup(false);
    setShowquestion(false);
  }

  useEffect(()=>{
    const music = document.getElementById('congratulationsMusic');
    if (music) {
      music.play().catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }
  },[]);


  return (
    <>
      <audio id="congratulationsMusic">
          <source src={musicPath} type="audio/mpeg"/>
          Your browser does not support the audio element.
      </audio>


      <div className='congratulation-popup-wrapper'>

        <div className='congratulation-popup-wrapper-top'>
          <button onClick={closeCongratsPopup} className='close-btn'>X</button>
        </div>

        <div className='congratulation-popup-wrapper-bottom'> 
          <p className='correct-answer-text-para'>Correct Answer!</p>
          <img src={correctGif} className='correct-gif-img-ele'/>
        </div>

        <div className='congratulation-popup-aura-msg-div'>
          <p>Aura increased by {reward} points</p>
        </div>
      </div>
    </>
  )
}

export default CongratulationPopup
