import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Day1CareerDiscovery from './pages/Day1CareerDiscovery';
import Day2CareerMatches from './pages/Day2CareerMatches';
import Day3CareerRoadmap from './pages/Day3CareerRoadmap';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/day1" element={<Day1CareerDiscovery />} />
          <Route path="/day2" element={<Day2CareerMatches />} />
          <Route path="/day3" element={<Day3CareerRoadmap />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;