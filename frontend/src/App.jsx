import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Navbar from './components/Navbar.jsx'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import Footer from './components/Footer.jsx'
import { ToastContainer } from 'react-toastify';
import ResetPassword from './forgetPassword/ResetPassword.jsx'
import OTPverification from './forgetPassword/OTPverification.jsx'
import ForgetPassword from './forgetPassword/ForgetPassword.jsx'
import ChatBoat from './components/chatboat/GeminiChatBoat.jsx'
import NotFound from './pages/NotFound.jsx'


const App = () => {
  return (
   <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 max-w-400 mx-auto">
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="light" />
      <Navbar/>
      
      <Routes>

        <Route path="*" element={<NotFound/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/doctors" element={<Doctors/>} />
        <Route path="/doctors/:speciality" element={<Doctors/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/my-profile" element={<MyProfile/>} />
        <Route path="/my-appointments" element={<MyAppointments/>} />
        <Route path="/appointment/:docId" element={<Appointment/>} />
        <Route path="/verify-reset-otp" element={<OTPverification/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/forgot-password" element={<ForgetPassword/>} />

      </Routes>
      <ChatBoat/>
      <Footer/>
    </div>
  )
}

export default App
