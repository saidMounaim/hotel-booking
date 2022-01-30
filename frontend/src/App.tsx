import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="mt-4">
          <Routes>
              <Route index element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/account/profile" element={<ProtectedRoute />} >
                <Route path="/account/profile" element={<ProfileScreen />} />
              </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
