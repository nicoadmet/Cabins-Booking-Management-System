import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicHome from './pages/PublicHome';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Dashboard from "./pages/Dashboard";
import UserBookings from "./pages/UserBookings";
import AdminPanel from "./pages/AdminPanel";
import AdminUsers from "./pages/AdminUsers";
import AdminCabins from "./pages/AdminCabins";
import AdminBookings from "./pages/AdminBookings";
import BookingForm from "./pages/BookingForm";
import AdminRoute from "./components/AdminRoute";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState(null);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicHome />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login setIsLogged={setIsLogged} setUserRole={setUserRole} />}/>
        <Route path='/bookings' element={<UserBookings />}/>
        <Route path='/adminPanel' element={ <AdminPanel /> }/>
        <Route path='/adminUsers' element={ <AdminUsers /> }/>
        <Route path='/adminCabins' element={ <AdminCabins /> }/>
        <Route path='/adminBookings' element={ <AdminBookings /> }/>
        <Route path='/BookingForm/:id' element={<BookingForm />}/>

        {/* <Route element={<Protected isLogged={isLogged}/>}> */}
          <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}


export default App;