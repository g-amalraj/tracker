import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Routes,Route,
  RouterProvider
} from "react-router-dom";
import App from './App';
import './index.css';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import DashBoardScreen from "./screens/DashBoardScreen";
import ProjectScreen from "./screens/ProjectScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserScreen from "./screens/UserScreen";
// import CalendarScreen from "./screens/CalendarScreen";
import reportWebVitals from './reportWebVitals';
import "./assets/styles/bootstrap.custom.css";
import registerServiceWorker from './registerServiceWorker';
import Homes from "./screens/Homes";
import ProtectedRoute from './screens/protectedRoute';
import AdminRoute from './screens/AdminRoute';
import Assignproject from './screens/AssignProjectScreen';


const router = createBrowserRouter(
  createRoutesFromElements(

    
    <Route path="/" element={<App />}>
      <Route index={true} path="/home" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} /> 
      <Route path="/dashboard" element={<ProtectedRoute><DashBoardScreen /></ProtectedRoute>} /> 

      <Route path="/project" element={<AdminRoute><ProjectScreen /></AdminRoute>} /> 
      <Route path="/user" element={<ProtectedRoute><UserScreen /></ProtectedRoute>} /> 
      
      
      <Route path="/homes" element={<Homes/>} />
      <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} /> 
      <Route path="/assign" element={<ProtectedRoute>< Assignproject /></ProtectedRoute>} /> 

    </Route>
   

 
    ))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    
      <RouterProvider router={router} />
     
     
   
  </React.StrictMode>
);


reportWebVitals();
registerServiceWorker();







