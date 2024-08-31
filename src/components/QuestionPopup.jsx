import React, { useEffect, useState } from 'react';
import './QuestionPopup.css';
import CongratulationPopup from './CongratulationPopup';
import QuestionsInfoPopup from './QuestionsInfoPopup';

function QuestionPopup({ allQuestions, setShowquestion, user}) {

  const [questions, setQuestions] = useState([]);

  const [randomQuestion, setRandomQuestion] = useState({
    __id: "",
    query: "",
    answer: "",
    difficulty: "",
    doneBy: [],
    hint: "",
    noOfWords: 0,
    reward: 0
  });

  const [showCongratulationPopup, setShowCongratulationPopup] = useState(false);

  const [showQuestionsInfo, setShowQuestionsInfo] = useState(false);




  const closeQuestionPopup = () => {
    setShowquestion(false);
  };

  const showInfoPopup = ()=>{
    setShowQuestionsInfo(true);
  }


  useEffect(() => {
    let validQuestions = [];
    let found = false;

    allQuestions.forEach((question) => {
      question.doneBy.forEach((id) => {
        if (id === user._id) {
          found = true;
        }
      });

      if (!found) {
        validQuestions.push(question);
      }
      found = false;
    });

    if(validQuestions.length == 0){
      
      const element1 = document.querySelector('.question-popup-info-btn');
      const element2 = document.querySelector('.question-popup-question-div');
      const element3 = document.querySelector('.question-popup-answer-div');
      const element4 = document.querySelector('.question-popup-verify-btn');
      if(element1 && element2 && element3 && element4){
        element1.remove()
        element2.remove()
        element3.remove()
        element4.remove()
      }

      document.querySelector('.noQuestionsAvailableDiv').innerHTML = "You have answered all the questions, keep checking for the new questions here"

    }

    setQuestions(validQuestions);

    

  }, [allQuestions, user._id]);



  useEffect(() => {
    if (questions.length > 0) {
      const index = Math.floor(Math.random() * questions.length);
      setRandomQuestion(questions[index]);
    }
  }, [questions]);




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


      document.querySelector('.error-div').innerHTML = "";
      document.querySelector('.error-div').innerHTML = "Aura decreased by 1";

      setTimeout(()=>{
        document.querySelector('.error-div').innerHTML = "";
      },3000)

    }
    else{

      document.querySelector('.error-div').innerHTML = "";
      document.querySelector('.error-div').innerHTML = "Incorrect Answer*";
      setTimeout(()=>{
        document.querySelector('.error-div').innerHTML = "";
      },3000)
    }
    

    
  }


  const updatePlayerInfoOnCorrectAnswer = ()=>{

    const newScore = parseInt(user.score + randomQuestion.reward);
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
      console.log('Success:');
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



  const removeCurrentQuestionForTheUser = ()=>{

    fetch('https://ap-south-1.aws.data.mongodb-api.com/app/playersdata-xrbubxz/endpoint/api/playersData/markQuestionForUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "__id": randomQuestion._id,
        "doneById": user._id
      })
    })
    .then(response => response.json())
    .then(data => console.log('Success'))
    .catch((error) => console.error('Error:', error));
  }

  const verifyAnswer = ()=>{
    const givenAnswer = document.querySelector('.answer-input-ele').value.toLowerCase();

    if(givenAnswer!=""){

      if(givenAnswer == randomQuestion.answer){

        setShowCongratulationPopup(true);
        updatePlayerInfoOnCorrectAnswer();
        removeCurrentQuestionForTheUser();
  
      }
      else{
        
        document.querySelector('.answer-input-ele').value=""
        updatePlayerInfoOnWrongAnswer();
        decrementScore();
      }

    }
    else{
      document.querySelector('.error-div').innerHTML = "";
      document.querySelector('.error-div').innerHTML = "Please enter something first*";

      setTimeout(()=>{
        document.querySelector('.error-div').innerHTML = "";
      },3000)
    }


    

  }

  return (
    <>
      <div className='question-popup-wrapper'>
        <div className='question-popup-top'>
          <div className='question-popup-info-btn-div'>
            <button className='question-popup-info-btn' onClick={showInfoPopup}>i</button>
          </div>
          <div className='question-popup-close-btn-div'>
            <button className='question-popup-close-btn' onClick={closeQuestionPopup}>X</button>
          </div>
        </div>

        <div className="noQuestionsAvailableDiv"></div>

        <div className='question-popup-bottom'>
          <div className='question-popup-question-div'>
            <p style={{fontSize:13}}>Question: </p>
            <input
              type="text"
              className='question-input-ele'
              value={randomQuestion.query}
              readOnly
            />
          </div>
          <div className='question-popup-answer-div'>
            <p style={{fontSize:13}}>Answer: </p>
            <input type="text" className='answer-input-ele' defaultValue={""}/>
          </div>
          <div className='error-div'></div>
          <button className='question-popup-verify-btn' onClick={verifyAnswer}>Verify</button>
        </div>

        
      </div>


      <div>
        {showCongratulationPopup && <CongratulationPopup setShowCongratulationPopup={setShowCongratulationPopup} setShowquestion={setShowquestion}  reward={randomQuestion.reward}/>}
      </div>

      <div>
        {showQuestionsInfo && <QuestionsInfoPopup setShowQuestionsInfo={setShowQuestionsInfo} question={randomQuestion}/>}
      </div>
    </>
  );
}

export default QuestionPopup;



