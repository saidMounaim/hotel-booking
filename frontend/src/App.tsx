import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="mt-4">
          <Routes>
              <Route index element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
