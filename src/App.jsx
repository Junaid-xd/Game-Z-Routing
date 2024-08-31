import { useEffect, useState } from 'react'

import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import EmergencyPopup from './components/EmergencyPopup'
import { RouterProvider, createHashRouter} from 'react-router-dom'
import RankTable from './components/RankTable'






function App() {

  const [authorize, setAuthorize] = useState(false);

  const [validUser, setValiduser] = useState({
    _id:'',
    username:'',
    password:'',
    score:0,
    correctAnswers:0,
    attepts:0
  });

  const [allUsers, setAllUsers] = useState([]);

  const [successMessage, setSuccessMessage] = useState(undefined);

  const [failedMessage, setFailedMessage] = useState(undefined);

  const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);

  const [emergencyPopupNote, setEmergencyPopupNote] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ap-south-1.aws.data.mongodb-api.com/app/playersdata-xrbubxz/endpoint/api/playersData/getUsers");
        const result = await response.json();
        setAllUsers(result);
       
      } catch (error) {
        console.error("Error fetching data:", error);
        setFailedMessage("Bad internet connection");
        setShowEmergencyPopup(true);
      }
    };

    fetchData();   

    setInterval(fetchData, 1500);

  }, []);


  useEffect(()=>{

    allUsers.forEach((user)=>{
      if(user._id==validUser._id){
        setValiduser(user);
      }
    })

    if (Object.keys(validUser).length === 0) {
      const localUser = JSON.parse(localStorage.getItem('validUser'));
      setValiduser(localUser);
    }

  }, [allUsers])


  







  const router = createHashRouter([
    {
      path:'/',
      element: <Login  setAuthorize={setAuthorize}  setValiduser={setValiduser} allUsers={allUsers}/>
    },
    {
      path:'/signup',
      element: <Signup  allUsers={allUsers} setFailedMessage={setFailedMessage}  setSuccessMessage={setSuccessMessage} setShowEmergencyPopup={setShowEmergencyPopup}/>
    },
    {
      path:'/home',
      element: <Home validUser={validUser} allUsers={allUsers} setFailedMessage={setFailedMessage}  setSuccessMessage={setSuccessMessage} setShowEmergencyPopup={setShowEmergencyPopup} setEmergencyPopupNote={setEmergencyPopupNote} setAuthorize={setAuthorize}/>,
    },
    {
      path:'/ranktable',
      element:<RankTable allUsers={allUsers} activeUser={validUser}/>
    }
  ]
);











  return (
    <>
      <div>
        {showEmergencyPopup && <EmergencyPopup successMessage={successMessage} failedMessage={failedMessage} setSuccessMessage={setSuccessMessage} setFailedMessage={setFailedMessage} setShowEmergencyPopup={setShowEmergencyPopup} emergencyPopupNote={emergencyPopupNote} setEmergencyPopupNote={setEmergencyPopupNote}/>}
      </div>

      <RouterProvider router={router}/>
    </>
  )
}

export default App
