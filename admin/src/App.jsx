import React, { useContext } from 'react';
import Admlogin from './pages/Admlogin';
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard';
import AllApointments from './pages/admin/AllApointments';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorsList from './pages/admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDasboard from './pages/doctor/DoctorDasboard';
import DoctorAppointment from './pages/doctor/DoctorAppointment';
import DoctorProfile from './pages/doctor/DoctorProfile';

const App = () => {

  const{aToken}=useContext(AdminContext)
  const{dToken}=useContext(DoctorContext)
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>

          {/* Admin routes */}

          <Route path='/' element={<></> } />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllApointments/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />

          {/* Doctor routes */}
          <Route path='doctor-dashboard' element={<DoctorDasboard/>}/>
          <Route path='doctor-appointment' element={<DoctorAppointment/>}/>
          <Route path='doctor-profile' element={<DoctorProfile/>}/>
          
        </Routes>
      </div>
    </div>
  ) : (
    <>
    <Admlogin/>
    <ToastContainer/>
    </>
  )
};

export default App;