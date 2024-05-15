import mongoose from "mongoose";

const Schema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
},
    Name: {
      type: String,
    },
    Date: {
      type: String,
      default: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    },
    Entrytime: {
      type: String,
      default: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    },
    Exittime: {
        type: String,
        default: new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      },
  });
  
  const Attendance = mongoose.model('Attendance', Schema);
  
  export default Attendance;
  

