import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PasswordScreen from './screens/PasswordScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import RoomDetailsScreen from './screens/RoomDetailsScreen';

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
              <Route path="/account/password" element={<ProtectedRoute />} >
                <Route path="/account/password" element={<PasswordScreen />} />
              </Route>
              <Route path="/room/:id" element={<RoomDetailsScreen />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
