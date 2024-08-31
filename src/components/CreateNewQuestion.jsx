import React, {useEffect, useState} from 'react'
import './CreateNewQuestion.css'
import NewQuestionInfoPopup from './NewQuestionInfoPopup';

function CreateNewQuestion({user, setShowCreateNewQuestionPopup, setFailedMessage, setSuccessMessage, setShowEmergencyPopup, setEmergencyPopupNote}) {


  const [showNewQuestionInfoPopup, setShowNewQuestionInfoPopup] = useState(false);



  const [isRed, setIsRed] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsRed(prevIsRed => !prevIsRed);
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  

  


  const createQuestion = ()=>{

    const question = document.querySelector('.form-input-question-ele').value
    const answerToLowerCase = document.querySelector('.form-input-answer-ele').value.toLowerCase();

    if(question!="" && answerToLowerCase!=""){
      const answer = answerToLowerCase.trim().split(/\s+/).join(' ');
      let hint = document.querySelector('.form-input-hint-ele').value
      const noOfWords = answer.trim().split(/\s+/).filter(word => word.length > 0).length;
      const selectedRadio = document.querySelector('input[name="difficulty"]:checked');

      const difficulty = selectedRadio ? selectedRadio.value : null;

      let reward = 10;

      if(difficulty=="Easy"){
        reward = 10;
      }
      else if(difficulty=="Medium"){
        reward = 30;
      }
      else{
        reward = 50;
      }


      if(!hint){
        hint=null;
      }


      if(difficulty=="Hard" && hint==null){
        document.querySelector('.error-msg-div').innerHTML = "";
        document.querySelector('.error-msg-div').innerHTML = "For hard difficulty, Hint is mandatory*";

        setTimeout(()=>{
          document.querySelector('.error-msg-div').innerHTML = "";
        },3000)

      }
      else{
        const newQuestion = {
          "query":question,
          "answer":answer,
          "difficulty":difficulty,
          "noOfWords": noOfWords,
          "reward":reward,
          "doneBy":[
            user._id
          ],
          "createdBy":user.username,
          "hint":hint
        }


        //===============================================================
        //================ API CALL STARTS FROM HERE ====================
        //===============================================================


        const runCreateQuestionApi = async()=>{
          try{

            const send = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/playersdata-xrbubxz/endpoint/api/playersData/createQuestion', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newQuestion)
            });
        
            const result = await send.json();

            if(send.ok){
              setShowCreateNewQuestionPopup(false);
              setSuccessMessage("Question created Successfully");
              setEmergencyPopupNote("Note: You can not answer the questions that are created by you.");
              setShowEmergencyPopup(true);

              document.querySelector('.form-input-question-ele').value = "";
              document.querySelector('.form-input-answer-ele').value = "";
            }
            
            

          }catch(error){
            setFailedMessage("An error occured")
            setShowEmergencyPopup(true);
          }


        }

        runCreateQuestionApi();
        


        //===============================================================
        //================ API CALL STARTS FROM HERE ====================
        //===============================================================


      }
    }
    else{
      document.querySelector('.error-msg-div').innerHTML = "";
        document.querySelector('.error-msg-div').innerHTML = "Please fill all fields*";

        setTimeout(()=>{
          document.querySelector('.error-msg-div').innerHTML = "";
        },3000)
    }
    
  }



  return (
    <>
      <div className='new-question-popup-wrapper'>

        <div className="new-question-popup-top">

          <div className='new-question-popup-heading-div'>
            <p className='new-question-info-popup-btn' style={{ backgroundColor: isRed ? 'red' : 'blue' }} onClick={()=>setShowNewQuestionInfoPopup(true)}>i</p>
            <p>Create your question</p>
          </div>

          <div className='clone-btn-div'>
            <button className='close-btn' onClick={()=>setShowCreateNewQuestionPopup(false)}>X</button>
          </div>

        </div>


        <div className="new-question-popup-form">

          <div className='form-input'>
            <p style={{fontSize: 13}}>Question</p>
            <input type="text" placeholder='question goes here' className='form-input-question-ele'/>
          </div>


          <div className='form-input'>
            <p style={{fontSize: 13}}>Answer</p>
            <input type="text" placeholder='answer goes here' className='form-input-answer-ele'/>
          </div>

          <div className='form-input'>
            <p style={{fontSize: 13}}>Hint</p>
            <input type="text" placeholder='(optional)' className='form-input-hint-ele'/>
          </div>


          <div className='form-input radio-div'>
            
            <div>
              <label>
                <input type="radio" name="difficulty" value="Easy" required defaultChecked className='radio-field'/>
                Easy
              </label>
            </div>
           
            <div>
              <label>
                <input type="radio" name="difficulty" value="Medium" required className='radio-field'/>
                Medium
              </label>
            </div>

            <div>
              <label>
                <input type="radio" name="difficulty" value="Hard" required className='radio-field'/>
                Hard
              </label>
            </div>

          </div>

          <div className="error-msg-div"></div>


          <div className='create-btn-div'>
            <button className='create-btn' onClick={createQuestion}>CREATE</button>
          </div>

          

        </div>


      </div>


      <div>
        {showNewQuestionInfoPopup && <NewQuestionInfoPopup setShowNewQuestionInfoPopup={setShowNewQuestionInfoPopup}/>}
      </div>
    </>
  )
}

export default CreateNewQuestion
