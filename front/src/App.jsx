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

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Dashboard userRole={userRole} isLogged={isLogged}/>} />
        <Route path='/login' element={
          <Login setIsLogged={setIsLogged} setUserRole={setUserRole} />
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
    </BrowserRouter>
  );
}

export default App;
