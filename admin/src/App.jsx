import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import AdminRoute from './components/AdminRoute';
import DoctorRoute from './components/DoctorRoute';

import AdminLogin from './pages/AdminLogin';
import DoctorLogin from './pages/DoctorLogin';

import Dashboard from './pages/admin/Dashboard';
import AllApointments from './pages/admin/AllApointments';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorsList from './pages/admin/DoctorsList';

import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointment from './pages/doctor/DoctorAppointment';
import DoctorProfile from './pages/doctor/DoctorProfile';
import ScrollToTop from "./components/ScrollToTop";

const App = () => {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const location = useLocation();

  const isAuthPage =
    location.pathname === '/admin-login' ||
    location.pathname === '/doctor-login';

  return (
    <>
      <ToastContainer />

      <ScrollToTop />

      {/* Navbar only after login */}
      {!isAuthPage && (aToken || dToken) && <Navbar />}

      <div
        className={
          !isAuthPage && (aToken || dToken)
            ? "flex items-start bg-[#F8F9FD] min-h-screen pt-25 pl-5"
            : ""
        }
      >
        {/* Sidebar only after login */}
        {!isAuthPage && (aToken || dToken) && <Sidebar />}

        <div
          className={
            !isAuthPage && (aToken || dToken)
              ? "flex-1 ml-70"
              : "flex-1"
          }
        >

          <Routes>

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/admin-login" />} />

            {/* Login Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/doctor-login" element={<DoctorLogin />} />

            {/* Admin Protected Routes */}
            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/all-appointments"
              element={
                <AdminRoute>
                  <AllApointments />
                </AdminRoute>
              }
            />

            <Route
              path="/add-doctor"
              element={
                <AdminRoute>
                  <AddDoctor />
                </AdminRoute>
              }
            />

            <Route
              path="/doctor-list"
              element={
                <AdminRoute>
                  <DoctorsList />
                </AdminRoute>
              }
            />

            {/* Doctor Protected Routes */}
            <Route
              path="/doctor-dashboard"
              element={
                <DoctorRoute>
                  <DoctorDashboard />
                </DoctorRoute>
              }
            />

            <Route
              path="/doctor-appointment"
              element={
                <DoctorRoute>
                  <DoctorAppointment />
                </DoctorRoute>
              }
            />

            <Route
              path="/doctor-profile"
              element={
                <DoctorRoute>
                  <DoctorProfile />
                </DoctorRoute>
              }
            />

          </Routes>

        </div>
      </div>
    </>
  );
};

export default App;