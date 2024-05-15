
import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; 


const MonthlySummaryCard = ({ daysInCurrentMonth, monthlyTotalHours , averageHours }) => {

  


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh' }}>
    <Card
    className=''  style={{ width: "470px",  textAlign:"center", color:"black",backgroundColor: "",border: "2px solid #DC3545"}}
  >
    <Card.Header>Monthly Summary</Card.Header>
    
    <Card.Body  className='py-1'>
    <FontAwesomeIcon icon={faUser} className='fa-2x float-left'/>
      {/* <Card.Title className='d-flex justify-content-end '>  {} </Card.Title> */}
      <Card.Text  className='d-flex flex-column w-100 align-items-end'>
     <div className='me-auto float-right'>
      Num of Days: {daysInCurrentMonth} <br/>
      Tot Hrs: {Math.floor(monthlyTotalHours )} hours<br/>
      Avg Hrs: {averageHours}
  </div>
      </Card.Text>
     
    </Card.Body>
  </Card>
  </div>
  );
};

export default MonthlySummaryCard;




