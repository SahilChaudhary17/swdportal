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

import React from 'react';
import './complaintCard.css';
import { Button } from '../ui/button';

const ComplaintCard = ({ complaint, onViewDetails }) => {
  return (
    <div className='complaintCard'>
      <p className='regNo'>{complaint.registrationNumber}</p>
      <p className='name'>{complaint.studentName}</p>
      <Button className='view-btn text-center' onClick={() => onViewDetails(complaint)}>
        View
      </Button>
    </div>
  );
};

export default ComplaintCard;

