import React, {useEffect, useState} from 'react'
import './NumberPopup.css'
import NumberInfoPopup from './NumberInfoPopup';
import CongratulationPopup from './CongratulationPopup';

function NumberPopup({user, setShowNumberPopup}) {

  const min = 1;
  const max = 5;

  const [showNumberPopupInfo, setShowNumberPopupInfo] = useState(false);

  const [number, setNumber] = useState(null);

  const [showCongratulationPopup, setShowCongratulationPopup] = useState(false);




  const decrementScore = ()=>{

    if(user.score>0){

      fetch('https://ap-south-1.aws.data.mongodb-api.com/app/playersdata-xrbubxz/endpoint/api/playersData/decrementScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "__id": user._id
        })
      })
      .then(response => response.json())
      .then(data => {
        const tempUser = {
          _id: user._id,
          username:user.username,
          password: user.password,
          score: parseInt(user.score - 1),
          correctAnswers: user.correctAnswers,
          attempts: user.attempts
        }
    
        //setValiduser(tempUser);
    
      })
      .catch((error) => console.error('Error:', error));


      document.querySelector('.number-popup-answer-input-ele').value = "";
      document.querySelector('.number-popup-error-div').innerHTML = "";
      document.querySelector('.number-popup-error-div').innerHTML = "Aura decreased by 1";
      document.querySelector('.show-number-div').innerHTML = `The number was ${number}`;

      setTimeout(()=>{
        document.querySelector('.number-popup-error-div').innerHTML = "";
        document.querySelector('.show-number-div').innerHTML = "";
      },3000)

    }
    else{

      document.querySelector('.number-popup-error-div').innerHTML = "";
      document.querySelector('.number-popup-error-div').innerHTML = "Incorrect Answer*";
      document.querySelector('.show-number-div').innerHTML = `The number was ${number}`;
      setTimeout(()=>{
        document.querySelector('.number-popup-error-div').innerHTML = "";
        document.querySelector('.show-number-div').innerHTML = "";
      },3000)
    }
    

    
  }



  const updatePlayerInfoOnCorrectAnswer = ()=>{

    const newScore = parseInt(user.score + 10);
    const newCorrectAnswers = parseInt(user.correctAnswers + 1);
    const newAttempts = parseInt(user.attempts + 1)



    fetch('https://ap-south-1.aws.data.mongodb-api.com/app/playersdata-xrbubxz/endpoint/api/playersData/updatePlayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "__id": user._id,
        "score": newScore,
        "correctAnswers": newCorrectAnswers,
        "attempts": newAttempts
      })
    })
    .then(response => response.json())
    .then(data => {
      
      const tempUser = {
        _id: user._id,
        username: user.username,
        password: user.password,
        score: newScore,
        correctAnswers: newCorrectAnswers,
        attempts: newAttempts
      };

      //setValiduser(tempUser);
    })
    .catch((error) => console.error('Error:', error));
    
  }


  const updatePlayerInfoOnWrongAnswer = ()=>{

    fetch('https://ap-south-1.aws.data.mongodb-api.com/app/playersdata-xrbubxz/endpoint/api/playersData/incrementAttempt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "__id": user._id
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success')
      const tempUser = {
        _id: user._id,
        username:user.username,
        password: user.password,
        score: user.score,
        correctAnswers: user.correctAnswers,
        attempts: parseInt(user.attempts+1)
      }
  
      //setValiduser(tempUser);
  
    })
    .catch((error) => console.error('Error:', error));

    
  }

  const resetRandomNumber = ()=>{
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumber(randomNumber);
  }




  useEffect(()=>{
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumber(randomNumber);
  },[])




  const verifyGuess = ()=>{
    const guess = document.querySelector('.number-popup-answer-input-ele').value;

    if(guess!=""){
      if(guess == number){

        updatePlayerInfoOnCorrectAnswer();
        setShowCongratulationPopup(true);
  
      }else{
        updatePlayerInfoOnWrongAnswer();
        decrementScore();
        resetRandomNumber();
      }
    }
    else{
      document.querySelector('.number-popup-error-div').innerHTML = "";
      document.querySelector('.number-popup-error-div').innerHTML = "Enter something first*";
      setTimeout(()=>{
        document.querySelector('.number-popup-error-div').innerHTML = "";
      },2000)
    }
  }


  return (
    <>
      <div className="numberPopupWrapper">
        <div className='number-popup-top'>
          <div className='number-popup-info-btn-div'>
            <button className='number-popup-info-btn' onClick={()=>setShowNumberPopupInfo(true)}>i</button>
          </div>
          <div className='question-popup-close-btn-div'>
            <button className='question-popup-close-btn' onClick={()=>setShowNumberPopup(false)}>X</button>
          </div>
        </div>

        <div className='number-popup-bottom'>

            <div className='number-popup-answer-div'>
              <p style={{fontSize:13}}>Your Guess:</p>
              <input type="number" className='number-popup-answer-input-ele' defaultValue={""} placeholder={`guess range (${min}-${max})`}/>
            </div>

            <div className='number-popup-error-div'></div>
            <div className='show-number-div'></div>

            <button className='number-popup-verify-btn' onClick={verifyGuess}>Guess</button>

          </div>

          <div className="noQuestionsAvailableDiv"></div>
        </div>

      <div>
        {showNumberPopupInfo && <NumberInfoPopup setShowNumberPopupInfo={setShowNumberPopupInfo} min={min} max={max}/>}
      </div>


      <div>
      {showCongratulationPopup && <CongratulationPopup setShowCongratulationPopup={setShowCongratulationPopup} setShowquestion={setShowNumberPopup}  reward={10}/>}
      </div>
    </>
  )
}

export default NumberPopup
