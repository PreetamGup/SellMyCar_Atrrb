
import AddCarPage from './pages/AddCarPage';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Applayout from './component/layout'
import EditPage from './pages/EditPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';
import { Context } from './component/context';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [OemData, setOemdata]= useState([])


  useEffect(() => {
    axios.get('http://localhost:5050/api/car/oemspecs').then(
     res=> setOemdata(res.data.allOemCars)
   )
   
  
 }, [])



  return (

    <Context.Provider value={OemData}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Applayout /></ProtectedRoute>}>
          
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/addcar" element={<ProtectedRoute><AddCarPage /></ProtectedRoute>} />
            <Route path="/edit" element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
          
          </Route>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>

        </Routes>
      </BrowserRouter>
    </Context.Provider>
    

  );
}

export default App;


export function ProtectedRoute({children}){
  if(localStorage.getItem('token')){
    return children
  }else{
    return <Navigate to='/login'/>
  }
}