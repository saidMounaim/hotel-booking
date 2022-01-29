import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
            <Route index element={<HomeScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
