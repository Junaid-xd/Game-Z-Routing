import React, {useEffect, useState} from 'react'
import './RankTable.css'
import { Link } from 'react-router-dom';

function RankTable({allUsers, activeUser}) {

  const auraLimit = 10;



  useEffect(()=>{

    allUsers.sort((a, b) => b.score - a.score);

    const tableBody = document.querySelector('.rank-table-body');
    tableBody.innerHTML = "";
    
    allUsers.forEach((user, index)=>{

      if (user.score >= auraLimit) {
        const rowClass = user._id === activeUser._id ? 'you-row' : '';
        tableBody.innerHTML += 
          `<tr class='rank-table-row ${rowClass}'>
            <td>${user.username}</td>
            <td>${user.score}</td>
            <td>${index + 1}</td>
          </tr>`;
      }
    })


    if(activeUser.score<auraLimit){
      document.querySelector('.msg-div').innerHTML = "You should have atleast 10 aura points to be in Rank table"
    }

  },[allUsers])





  return (
    <>
      <div className='rank-table-popup-wrapper'>

        <div className='rank-popup-top'>


          <div className='profile-popup-close-btn-div'>
            <Link className='back-btn' to='/home'>Back</Link>
          </div>

          <div className='rank-table-heading-div'>
            <p>Rank Table</p>
          </div>

        </div>


        <div className='rank-table-div'>

          <table className='rank-table'>
            <thead className='rank-table-head'>
              <tr className='rank-table-head'>
                <th>Username</th>
                <th>Aura</th>
                <th>Rank</th>
              </tr>
            </thead>


            <tbody className='rank-table-body'>
              
           

            </tbody>

          </table> 


        </div>

        <div className="msg-div">

        </div>
      </div>
    </>
  )
}

export default RankTable
