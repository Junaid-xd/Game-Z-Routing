import React from 'react'
import { useEffect, useState } from 'react'
import './Home.css'
import QuestionPopup from './QuestionPopup'
import menuLogoPath from "../assets/images/menu.jpg"
import SideBar from './SideBar'
import NumberPopup from './NumberPopup'

function Home({validUser, allUsers, setFailedMessage, setSuccessMessage, setShowEmergencyPopup, setEmergencyPopupNote, setAuthorize}) {

  
  //const [allusers, setAllusers] = useState([])

  const [questions, setQuestions] = useState([]);
  
  const [showQuestion, setShowquestion] = useState(false);       
  
  const [reloadKey, setReloadKey] = useState(0);

  const [showSideBar, setShowSideBar] = useState(false);

  const [showNumberPopup, setShowNumberPopup] = useState(false); 




  



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ap-south-1.aws.data.mongodb-api.com/app/playersdata-xrbubxz/endpoint/api/playersData/getQuestions");
        const result = await response.json();
        setQuestions(result);
       
      } catch (error) {
        console.error("Error fetching data:", error);
        setFailedMessage("Bad Internet Connection, error fetching questions from database server");
        setShowEmergencyPopup(true);
      }
    };

    fetchData();

  }, [showQuestion]);


  // useEffect(()=>{
  //   localStorage.setItem('validUser', JSON.stringify(validUser));

  //   console.log("This" + JSON.parse(localStorage.getItem('validUser')));
  // },[])


  const enableQuestion = ()=>{
    setShowquestion(true);
  }

  const openSideBar= ()=>{
    setShowSideBar(true)
  }

  const comingSoonMessage = ()=>{
    setFailedMessage("Coming Soon!");
    setShowEmergencyPopup(true);
  }

  return (
    <>
      <div>
        {showSideBar && <SideBar setShowSideBar={setShowSideBar} validUser={validUser} allUsers={allUsers} setFailedMessage={setFailedMessage}  setSuccessMessage={setSuccessMessage} setShowEmergencyPopup={setShowEmergencyPopup} setEmergencyPopupNote={setEmergencyPopupNote} setAuthorize={setAuthorize}/>}
      </div>


     <div className="home-nav-bar">

      <div className='nav-bar-top'>

        <div className='nav-bar-info-div'>
          <img src={menuLogoPath} alt="settings" onClick={openSideBar}/>
        </div>

        <div className='nav-bar-name-div'>
          <h1>Game Z</h1>
        </div>

      </div>

      <div key={reloadKey} className='nav-bar-bottom'>
        <marquee behavior="slide" direction="right" scrollamount="5" className='slider-tag'>
          <p>JD PRODUCTIONS</p>
        </marquee>  
      </div>

     </div>

      <div className='home-body'>

        <div className='home-body-qa' onClick={enableQuestion}>
          <p>Answer a Question</p>
        </div>

        <div className='home-body-gtn' onClick={()=>setShowNumberPopup(true)}>
          <p>Guess the Number</p>
        </div>

        <div className='home-body-gtp' onClick={comingSoonMessage}>
          <p>Guess the Password</p>
        </div>


        <div>
          {showQuestion && <QuestionPopup allQuestions={questions} setShowquestion={setShowquestion} user={validUser} />}
        </div>

        <div>
          {showNumberPopup && <NumberPopup user={validUser}  setShowNumberPopup={setShowNumberPopup}/>}
        </div>
        
      </div>

      
    </>
  )
}

export default Home
