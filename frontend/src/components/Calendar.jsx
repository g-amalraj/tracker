import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { Navbar,  Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { checkIn, checkOut } from '../features/checkInOut/checkInOutSlice';
import {BiCalendarCheck} from 'react-icons/bi';

const MyCalendar = () => { 


  const dispatch = useDispatch();
  const checkedIn = useSelector((state) => state.checkInOut.checkedIn);
  const checkedOut = useSelector((state )=> state.checkInOut.checkedOut);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  const getData = async () => {

    try {
      
      const userId = JSON.parse(localStorage.getItem("userInfo"))._id;
      const response = await axios.get(`http://localhost:5001/details/remark/get/${userId}`);
      const collectionData = response.data;
      const dailyDurations= {};

      const formattedEvents = collectionData
        .map((responseData, index) => {
          
         
          

          const developed = moment(
            moment(
              `${responseData.Date} ${responseData.Entrytime} `,
              "MM/DD/YYYY HH:mm:ss"
            ).toDate()
          ).toISOString();
          const developedDate = moment(developed).format("YYYY-MM-DD");
       
          const developedStart = moment(
            moment(
              `${responseData.Date} ${responseData.Entrytime}`,
              "MM/DD/YYYY HH:mm:ss"
            ).toDate()
          ).toISOString();
          const developedEntry = moment(developedStart).format("HH:mm:ss");

          const developedEnd = moment(
            moment(
              `${responseData.Date} ${responseData.Exittime}`,
              "MM/DD/YYYY HH:mm:ss"
            ).toDate()
          ).toISOString();
          const developedExit = moment(developedEnd).format("HH:mm:ss");

          const checkin = `In  : ${developedEntry}`;
          const checkout = `Out : ${developedExit}`;

          let durationString = "";
     
          if (developedExit !== '00:00:00') {
            const developedEntryMoment = moment(developedEntry, "HH:mm:ss");
            const developedExitMoment = moment(developedExit, "HH:mm:ss");

            const duration = moment.duration(
            developedExitMoment.diff(developedEntryMoment)
          );
          const dateKey = moment(developedEntryMoment).format("YYYY-MM-DD");
          dailyDurations[dateKey] = (dailyDurations[dateKey] || 0) + duration.asHours();
          console.log(dailyDurations[dateKey])
          
          const hours = duration.hours();
          const minutes = duration.minutes();
          const seconds = duration.seconds();
          

          durationString = `Total hrs: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
          console.log(`Time difference: ${durationString}`);

        }
          
          
          return [
            {
              id: responseData._id,
              title: checkin,
              start: new Date(developed),
              end:new Date(developed),
              color: generateEventColor(index),
            },
            {
              id: responseData._id,
              title: checkout,
              start: new Date(developed),
              end: new Date(developed),
              color:generateToCenterEventColor(index),
            },
            {
              id: responseData._id,
              title: durationString,
              start: new Date(developed),
              end: new Date(developed),
              color: generateToEventColor(index),
            },
          ];
        })
        .flat();
       

      const monthlyTotalHours = Object.values(dailyDurations ).reduce((total, dailyTotal) => total + dailyTotal, 0);
     
      setTotalHours(monthlyTotalHours);
      setEvents(formattedEvents);
    } catch (error) {
  
    }
  };

  useEffect(() => {
   
      getData();
    
    
  }, []);

  useEffect(() => {
      console.log(events);
    }, [events]);
    
  const generateEventColor = (index) => {
    const colors = ["#CD8D7A"];
    return colors[index % colors.length];
  };
  const generateToCenterEventColor = (index) => {
    const colors = ["#F9B572"];
    return colors[index % colors.length];
  };
  const generateToEventColor = (index) => {
    const colors = ["#7EAA92"];
    return colors[index % colors.length];
  };
 
  
  const handleCheckIn = () => {
    const userId = JSON.parse(localStorage.getItem("userInfo"))._id;
    const storedCheckInDate = localStorage.getItem(`checkInDate_${userId}`);
    const today = moment().format("YYYY-MM-DD");
    if (storedCheckInDate === today) {
      alert("You have already checked in for the day.");
    } else {
      createData(userId);
      dispatch(checkIn());
      localStorage.setItem(`checkInDate_${userId}`, today);
    }
  };
  
  
 
  const createData = async (userId) => {
    try {

    console.log("hi",userId)
       const response = await axios.post("http://localhost:5001/details/remark",  {userId: userId},
      { headers: {
          "Content-Type": "application/json",
          
        },
      }
      );
      const responseData = response.data;
     
    console.log(responseData)
     localStorage.setItem("id", responseData._id);

      const developed = moment(
        moment(
          `${responseData.Date} ${responseData.Entrytime} `,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate()
      ).toISOString();
      const developedDate = moment(developed).format("YYYY-MM-DD");
  

      const developedstart = moment(
        moment(
          `${responseData.Date} ${responseData.Entrytime}`,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate()
      ).toISOString();
      const developedEntry = moment(developedstart).format("HH:mm:ss");

      const developedend = moment(
        moment(
          `${responseData.Date} ${responseData.Exittime}`,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate()
      ).toISOString();
      const developedExit = moment(developedend).format("HH:mm:ss");

      const checkin = `In  : ${developedEntry}`;
      const checkout = `Out : ${developedExit}`;

      const calendarFormattedEvents = [
        {
          id: responseData._id,
          title: checkin,
          start: new Date(developed),
          end: new Date(developed),
        },
        {
          id: responseData._id,
          title: checkout,
          start:new Date(developed),
          end: new Date(developed),
        },
      ];
      
      setEvents(calendarFormattedEvents);
      
     //localStorage.removeItem("id")

} catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

 
  const handleCheckOut = () => {
    const storedId = localStorage.getItem("id");
    const userId = JSON.parse(localStorage.getItem("userInfo"))._id;
    const storedCheckOutDate = localStorage.getItem(`checkOutDate_${userId}`);
    const today = moment().format("YYYY-MM-DD");
    
   
    if (storedCheckOutDate === today) {
      alert("You have already checked out for the day.");
    } else {
      implementData(storedId);
      dispatch(checkOut());
      localStorage.setItem(`checkOutDate_${userId}`, today);
    }
  };

  
const implementData = async () => {
    try {
      
      const storedId = localStorage.getItem("id");
      const response = await axios.put(
        `http://localhost:5001/details/remark/${storedId}`
      );
      const responseData = response.data;

      const developed = moment(
        moment(
          `${responseData.Date} ${responseData.Entrytime} `,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate()
      ).toISOString();
      const developedDate = moment(developed).format("YYYY-MM-DD");
    

      const developedstart = moment(
        moment(
          `${responseData.Date} ${responseData.Entrytime}`,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate()
      ).toISOString();
      const developedEntry = moment(developedstart).format("HH:mm:ss");

      const developedend = moment(
        moment(
          `${responseData.Date} ${responseData.Exittime}`,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate()
      ).toISOString();
      const developedExit = moment(developedend).format("HH:mm:ss");

      const checkin = `In  : ${developedEntry}`;
      const checkout = `Out : ${developedExit}`;

      const calendarFormattedEvents = [
        {
          id: responseData._id,
          title: checkin,
          start: new Date(developed),
          end: new Date(developed),
        },
        {
          id: responseData._id,
          title: checkout,
          start:new Date(developed),
          end: new Date(developed),
        },
      ];

      setEvents(calendarFormattedEvents);
      } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
   };
 
 
  return (
    <div>
     <div className="container mt-4">
      <div className="d-flex justify-content-center align-content-center mb-5">
        <h1 className="d-flex text-black">Calendar</h1>
      </div>
        <Button className="btn" onClick={handleCheckIn}>
        <BiCalendarCheck className="bi" /> checkIn
      </Button>
      {' '}
      <Button className="btn" onClick={handleCheckOut}>
        <BiCalendarCheck className="bi" /> checkOut
      </Button>
        <div>Total hours for the month: {Math.floor(totalHours)} hours {(totalHours % 1 * 60).toFixed(0)} minutes</div>
        
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "120vh" }}
          eventPropGetter={(event) => ({
            style: { backgroundColor: event.color },
          })}
        /> 
      </div>
      </div>
      
     );
};

export default MyCalendar;

 
