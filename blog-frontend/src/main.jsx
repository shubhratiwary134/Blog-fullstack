import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './component/Register.jsx';
import Login from './component/Login.jsx';
import Createpost from './component/Createpost.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<App/>} ></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/create' element={<Createpost/>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
