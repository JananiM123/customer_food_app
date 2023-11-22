import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, } from 'react-router-dom';
import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AdminLogin from './adminLogin';
import Food from './Food';
import Favourites from './Favourites';
import AddFood from './AddFood';

function App() {
  const [isLogIn, setIsLogIn] = useState(JSON.parse(localStorage.getItem('isLogin')))
  return (
    <Router>
      <Routes>
        {isLogIn ?
          <>
            <Route path="/food" element={<Food setIsLogIn={setIsLogIn} />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path='/addFood' element={<AddFood />} />
            <Route path="/" element={<Navigate to="/food" />} />
          </>
          :
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<SignIn setIsLogIn={setIsLogIn} />} />
            <Route path="/admin" element={<AdminLogin setIsLogIn={setIsLogIn} />} />
            <Route path="/food" element={<Navigate to="/" />} />
          </>
        }
      </Routes>
    </Router>
  );
}

export default App;
