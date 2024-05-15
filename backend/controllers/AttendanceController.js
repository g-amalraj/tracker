import Attendance from '../models/AttendanceModel.js';
import mongoose from 'mongoose';



export const createAttendance = async (req, res) => {
  try {
    const { Name, userId } = req.body; 
  //console.log(userId)
    const newAttendance = new Attendance({
    userId,
      Name,
      Date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      Entrytime: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      Exittime: null, 
      });

      console.log(newAttendance)
   const savedAttendance = await newAttendance.save();
   res.status(201).json(savedAttendance);
  
  } catch (err) {
    console.log({message: " err"});
   //res.status(500).json({ message: 'Internal server error' });
  }
};


export const getAttendance = async (req, res) => {
  const userId = req.params.userId;
  try {
   
      const register=  await Attendance.find({userId});
      //console.log(register)
      if(register){
        return res.status(200).json(register)
      }else{
        return res.status(400).json({message: "UserId not found"})
      }      
      } catch(err) {
        console.error(err);
        res.status(500).json(err.message);
      }
    };
  


export const checkoutAttendance = async (req, res) => {
  try {
    
    const { id } = req.params;
    const updatedExitTime = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const mongooseId = new mongoose.Types.ObjectId(id)

    const DetailAttendance = await Attendance.findByIdAndUpdate(
      mongooseId,
      { $set: { Exittime: updatedExitTime } },
      { new: true }
    );
      console.log(DetailAttendance)
 
    
    if ( !DetailAttendance  ) {
          return res.status(404).json({ error: 'Details not found' });
        }
      
    res.status(201).json(DetailAttendance);
  } catch (err) {
    //console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




