// import React from 'react';
// import './complaintCard.css';
// import { Button } from '../ui/button';

// const ComplaintCard = ( complaint, key ) =>  {

//   return (

//     <div className='complaintCard' key={key}>
//       <p className='regNo'>{complaint.complaint.registrationNumber}</p>
//       <p className='name'>{complaint.complaint.studentName}</p>
//       <Button className='view-btn text-center ' href={``}>View</Button>
//     </div>
//   )
// }

// export default ComplaintCard

import React from "react";
import "./complaintCard.css";
import { Button } from "../ui/button";

const ComplaintCard = ({ complaint, onViewDetails }) => {
  return (
    <div className="complaintCard">
      <div
        className={`relative rounded-full h-6 w-6 ${
          complaint.status === "Resolved" ? "bg-green-400" : "bg-orange-400"
        }`}
      ></div>
      <p className="regNo">{complaint.registrationNumber}</p>
      <div className="flex gap-2">
        <p className="name">{complaint.studentName}</p>
      </div>
      <Button
        className="view-btn text-center"
        onClick={() => onViewDetails(complaint)}
      >
        View
      </Button>
    </div>
  );
};

export default ComplaintCard;
