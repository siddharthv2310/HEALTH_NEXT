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
import NotFound from './pages/NotFound';

const App = () => {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const location = useLocation();

  const validRoutes = [
    '/',
    '/admin-login',
    '/doctor-login',
    '/admin-dashboard',
    '/all-appointments',
    '/add-doctor',
    '/doctor-list',
    '/doctor-dashboard',
    '/doctor-appointment',
    '/doctor-profile'
  ];

  const isValidRoute = validRoutes.includes(location.pathname);

  const isAuthPage =
    location.pathname === '/admin-login' ||
    location.pathname === '/doctor-login';

  const showLayout =
    isValidRoute &&
    !isAuthPage &&
    (aToken || dToken);

  return (
    <>
      <ToastContainer />

      <ScrollToTop />

      {showLayout && <Navbar />}

      <div
        className={
          showLayout
            ? "flex bg-[#F8F9FD] min-h-screen pt-20 md:pt-25"
            : ""
        }
      >

        {showLayout && <Sidebar />}

        <div
          className={
            showLayout
              ? "flex-1 min-w-0 ml-16 md:ml-70 p-4 md:p-0 md:pl-5 transition-all duration-300"
              : "flex-1"
          }
        >

          <Routes>

            {/* Default Route */}
            <Route
              path="/"
              element={<Navigate to="/admin-login" />}
            />

            {/* Login Routes */}
            <Route
              path="/admin-login"
              element={<AdminLogin />}
            />

            <Route
              path="/doctor-login"
              element={<DoctorLogin />}
            />

            {/* Admin Routes */}
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

            {/* Doctor Routes */}
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

            {/* Not Found */}
            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

        </div>

      </div>
    </>
  );
};

export default App;