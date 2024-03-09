import React from 'react';
import './complaintCard.css';

function ComplaintCard({ complaint }) {
  return (
    <div className='complaintCard'>
      <p className='regNo'>{complaint.regNo}</p>
      <p className='name'>{complaint.complaintName}</p>
      <button className='view-btn' onClick={()=>{console.log("View Complaint")}}>View</button>
    </div>
  )
}

export default ComplaintCard
