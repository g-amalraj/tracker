
import React, { useState, useEffect } from "react";
import BarChart from "../components/BarChart";
import axios from "axios";
import moment from "moment";
import MonthlySummaryCard from "../components/Card";
import { Card, CardContent, Typography } from "@mui/material";
import { Title } from "chart.js";

const DashBoardScreen = () => {

  const [showSummary, setShowSummary] = useState(false); 
  const [monthlyTotalHours, setMonthlyTotalHours] = useState(0);
  const [daysInCurrentMonth, setDaysInCurrentMonth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userInfo"))._id;
        console.log(userId)
        const response = await axios.get(`http://localhost:5001/details/remark/get/${userId}`);
        const collectionData = response.data;

        const dailyDurations = {};

        collectionData.forEach((responseData) => {
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

          if (developedExit !== "00:00:00") {
            const developedEntryMoment = moment(developedEntry, "HH:mm:ss");
            const developedExitMoment = moment(developedExit, "HH:mm:ss");

            const duration = moment.duration(
              developedExitMoment.diff(developedEntryMoment)
            );

            const dateKey = moment(developedEntryMoment).format("YYYY-MM-DD");
            dailyDurations[dateKey] =
              (dailyDurations[dateKey] || 0) + duration.asHours();
          }
        });

        const monthlyTotalHours = Object.values(dailyDurations).reduce(
          (total, dailyTotal) => total + dailyTotal,
          0
        );
        setMonthlyTotalHours(monthlyTotalHours);


        const getCurrentMonthDays = () => {
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth();
          const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
          return daysInCurrentMonth;
        };
        
        // Example usage:
        const daysInCurrentMonth = getCurrentMonthDays();
        setDaysInCurrentMonth(daysInCurrentMonth);
        console.log(daysInCurrentMonth); // Output: Number of days in the current month
        

       

      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
      const timeout = setTimeout(() => {
        setShowSummary(true);
      }, 1000); 
    
      return () => clearTimeout(timeout);
    }, []);

  const averageHours = (monthlyTotalHours / daysInCurrentMonth ).toFixed(2);

  
  
  
return (
  <>
   <h1 style={{textAlign: "center"}}>Analytics</h1>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px"}}>
    <Card style={{ flex: "1",height:"780px", marginRight: "5px", transition: "opacity 0.5s", opacity: showSummary ? 1 : 0 }}>
      <CardContent>
        <MonthlySummaryCard
          daysInCurrentMonth={daysInCurrentMonth}
          monthlyTotalHours={monthlyTotalHours}
          averageHours={averageHours} />
      </CardContent>
    </Card>
    <Card style={{ flex: "1", marginLeft: "5px", transition: "opacity 0.5s", opacity: showSummary ? 1 : 0 }}>
      <CardContent>
        <div style={{ height: "740px" }}>
          <BarChart />
        </div>
      </CardContent>
    </Card>
  </div>
      </>
  );
}

export default DashBoardScreen;




