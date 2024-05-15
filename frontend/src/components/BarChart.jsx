
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {


  const [activeCard, setActiveCard] = useState(0); 

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveCard((prevActiveCard) => prevActiveCard + 1); 
    }, 1000);
    return () => clearTimeout(timeout);
  }, [activeCard]);



  const [events, setEvents] = useState([]);
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "TotalHours ",
        data: [],
        backgroundColor: "#7EAA92", 
      },
    ],
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "TotalHours ",
        data: [],
        backgroundColor: "#7EAA92", 
      },
    ],
  });

  const [weekData, setWeekData] = useState({
    labels: [],
    datasets: [
      {
        label: "TotalHours ",
        data: [],
        backgroundColor: "#7EAA92", 
      },
    ],
  });
  const getData = async () => {

    try {
      const userId = JSON.parse(localStorage.getItem("userInfo"))._id;
      
      const response = await axios.get(`http://localhost:5001/details/remark/get/${userId}`);
      
      const collectionData = response.data;
      const dailyDurations = {};
      const bar = [];
      const formattedEvents = collectionData.map((responseData) => {
        

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

        let durationString = "";
      

        if (developedExit !== "00:00:00") {
         

          const developedEntryMoment = moment(developedEntry, "HH:mm:ss");
          const developedExitMoment = moment(developedExit, "HH:mm:ss");

          const duration = moment.duration(
            developedExitMoment.diff(developedEntryMoment)
          );
          

          const dateKey = moment(developedEntryMoment).format("YYYY-MM-DD");
          dailyDurations[dateKey] =
            (dailyDurations[dateKey] || 0) + duration.asHours();

        
          const hours = duration.hours();
          const content ={developedDate,hours};
             bar.push(content);

          setChartData ( {
            labels: bar.map((item) => item.developedDate),
            datasets: [
              {
                label: " Hours by day",
                data: bar.map((item) => item.hours),
                backgroundColor: "#F9B572",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          });

        const generateSampleDailyDurations = () => {
        const weeklyDurations = {};

        const startDate = moment().startOf('month');
        const endDate = moment().endOf('month');

      
        let currentDate = startDate.clone();
        while (currentDate.isSameOrBefore(endDate, 'day')) {
          
          const randomDuration = Math.floor(Math.random() * 10) + 1;
          const weekNumber = moment(currentDate).isoWeek();
          weeklyDurations[currentDate.format('YYYY-MM-DD')] = randomDuration;
          currentDate.add(1, 'day');
        }

        return weeklyDurations;
      };


      const weeklyDurations = generateSampleDailyDurations();
      //console.log(weeklyDurations)

      const calculateTotalHoursPerWeek = (weeklyDurations) => {
        const totalHoursPerWeek = {};

        
        Object.keys(weeklyDurations).forEach((currentDate) => {
          const durationHours = weeklyDurations[currentDate];
          const weekNumber = moment(currentDate).isoWeek();
          totalHoursPerWeek[weekNumber] = (totalHoursPerWeek[weekNumber] || 0) + durationHours;
        });

        return totalHoursPerWeek;
      };


      const totalHoursPerWeekInCurrentMonth= calculateTotalHoursPerWeek(weeklyDurations);
     


      setWeekData({
        labels: Object.keys(totalHoursPerWeekInCurrentMonth),
        datasets: [
          {
            label: "Hours per week",
            data: Object.values(totalHoursPerWeekInCurrentMonth),
            backgroundColor: "#F9B572",
            barPercentage: 0.2,
            categoryPercentage: 0.4,
          },
        ],
      });
      
              
              }
            });

      const monthlyTotalHours = Object.values(dailyDurations).reduce(
        (total, dailyTotal) => total + dailyTotal,
        0
      );
    

      
      setBarData({
        labels: Object.keys(dailyDurations),
        datasets: [
          {
            label: "Hours per month",
            data: Object.values(dailyDurations),
            backgroundColor: "#F9B572",
            barPercentage: 0.2,
            categoryPercentage: 0.4,
          },
        ],
      });

      setEvents(formattedEvents);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

 
 

  return (
    <>
   
    
   <div style={{ display: "flex", flexDirection: "column", alignItems: "center"  }}>
  <Card style={{ width: "470px", height: "265px", marginTop: "0.5rem", opacity: activeCard >= 0 ? 1 : 0, backgroundColor: "", border: "1px solid #DC3545", padding:"5px" }}>

        <CardContent>
          <Typography variant="h5" component="h2">
            Days
          </Typography>
          <div style={{ width: "100%", height: "100%" }}>
            <Bar data={chartData} />
          </div>
        </CardContent>
      </Card>

      <Card style={{ width: "470px", height: "265px", marginTop: "0.5rem", opacity: activeCard >= 1 ? 1 : 0, backgroundColor: "", border: "1px solid #DC3545", padding:"5px"}}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Weeks
          </Typography>
          <div style={{ width: "100%", height: "100%"}}>
            <Bar data={weekData} />
          </div>
        </CardContent>
      </Card>

      <Card style={{ width: "470px", height: "265px", marginTop: "0.5rem", opacity: activeCard >= 2 ? 1 : 0, backgroundColor: "", border: "1px solid #DC3545", padding:"5px" }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Months
          </Typography>
          <div style={{ width: "100%", height: "100%"}}>
            <Bar data={barData} />
          </div>
        </CardContent>
      </Card>
    </div>
    
    

    </>
  );
};

export default BarChart; 


