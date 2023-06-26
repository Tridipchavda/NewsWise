import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BoxComponent from './Components/MainScreen';
import Home from './Components/MainScreen';
import View from './Components/ViewTech';
import ViewBusiness from './Components/ViewBusiness';
import ViewTech from './Components/ViewTech';
import ViewFashion from './Components/ViewFashion';
import ViewSearchedNews from './Components/ViewSearchedNews';
import { useEffect, useState } from 'react';
import SignIn from './Components/SignIn';

function App() {
    const {search} = useParams();

    return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/business" element={<ViewBusiness/>} />
          <Route path="/techcrunch" element={<ViewTech/>} />
          <Route path='/fashion' element={<ViewFashion/>}/>
          <Route path='/anything/:search' element={<ViewSearchedNews search={search}/>}/>
          <Route element={"NotFound"} />
        </Routes>
      </Router>
    );
}

export default App;
