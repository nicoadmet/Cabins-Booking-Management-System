import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Register from "./pages/Register";
import Login from "./pages/Login";
import UserBookings from "./pages/UserBookings";
import BookingForm from "./pages/BookingForm";

import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import AdminUsers from "./pages/AdminUsers";
import AdminCabins from "./pages/AdminCabins";
import AdminBookings from "./pages/AdminBookings";

import AdminRoute from "./components/AdminRoute";

import { AlertProvider } from "./context/AlertContext";
import GlobalAlert from "./components/GlobalAlert";


function App() {
 
  const [userRole, setUserRole] = useState(null);

  return (
    <BrowserRouter>
      <AlertProvider>
        <GlobalAlert />
        
        <Routes>
          {/* Rutas públicas */}
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={
          <Login />
        } />

        <Route path='/bookings' element={<UserBookings />} />
        <Route path='/BookingForm/:id' element={<BookingForm />} />

        {/* Rutas exclusivas para admin */}
        <Route element={<AdminRoute />}>
          <Route path='/adminPanel' element={<AdminPanel />} />
          <Route path='/adminUsers' element={<AdminUsers />} />
          <Route path='/adminCabins' element={<AdminCabins />} />
          <Route path='/adminBookings' element={<AdminBookings />} />
        </Route>
      </Routes>

    </AlertProvider>
  </BrowserRouter>
);
}

export default App;
