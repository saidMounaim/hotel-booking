import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import OnlyAdmin from './components/OnlyAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import AdminCreateRoomScreen from './screens/AdminCreateRoomScreen';
import AdminRoomsScreen from './screens/AdminRoomsScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';
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
              <Route path="/bookings/me" element={<ProtectedRoute />} >
                <Route path="/bookings/me" element={<MyBookingsScreen />} />
              </Route>
              <Route path="/admin/rooms" element={<OnlyAdmin />} >
                <Route path="/admin/rooms" element={<AdminRoomsScreen />} />
              </Route>
              <Route path="/admin/rooms/create" element={<OnlyAdmin />} >
                <Route path="/admin/rooms/create" element={<AdminCreateRoomScreen />} />
              </Route>
              <Route path="/room/:id" element={<RoomDetailsScreen />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
