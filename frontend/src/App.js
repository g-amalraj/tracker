import Header from "./components/Header";

import { Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import "./App.css";
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {

   return (
   
    <>
     <Provider store={store}>
      <Header />
      
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
     
     
      <ToastContainer />
   
      </Provider>
      
    </>
  );
};


export default App;

